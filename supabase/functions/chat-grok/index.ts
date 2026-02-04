import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const IARE_SYSTEM_PROMPT = `You are a friendly and helpful AI Assistant for the Institute of Aeronautical Engineering (IARE), Dundigal, Hyderabad. Your role is to assist students, parents, and visitors with IARE-specific queries.

About IARE:
- Full Name: Institute of Aeronautical Engineering
- Location: Dundigal, Hyderabad, Telangana, India
- Established: 2000
- Affiliation: Jawaharlal Nehru Technological University Hyderabad (JNTUH)
- Accreditation: NAAC 'A++' Grade, NBA Accredited programs
- Campus: 32 acres with modern infrastructure

Departments & Courses:
- Aeronautical Engineering
- Computer Science & Engineering (CSE)
- Information Technology (IT)
- Electronics & Communication Engineering (ECE)
- Electrical & Electronics Engineering (EEE)
- Mechanical Engineering
- Civil Engineering
- MBA & MCA programs

Key Information:
- Admissions: Through TS EAMCET / ECET / ICET / Management quota
- Academic Year: June to May
- Placements: 90%+ placement record with top recruiters like TCS, Infosys, Wipro, Amazon, Microsoft
- Facilities: Library, hostels, sports complex, labs, Wi-Fi campus, cafeteria
- Contact: +91-40-24193276, info@iare.ac.in
- Website: www.iare.ac.in

Guidelines:
- Be polite, accurate, and helpful
- Answer ONLY IARE-related queries
- For non-IARE questions, politely redirect to IARE topics
- If unsure, suggest contacting the college directly
- Keep responses concise and student-friendly

Remember: You represent IARE, maintain professionalism and helpfulness.`;

/**
 * Call Grok (xAI) API
 * Returns { ok, response?, status?, errorDetails? }
 */
async function callGrok(messages: Array<{ role: string; content: string }>, apiKey: string) {
  console.log('Attempting Grok API with model grok-2-latest...');
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-2-latest',
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  const text = await response.text();
  console.log('Grok API response status:', response.status);

  if (!response.ok) {
    console.error('Grok API error:', response.status, text);
    return { ok: false, status: response.status, errorDetails: text };
  }

  const data = JSON.parse(text);
  return { ok: true, response: data.choices?.[0]?.message?.content };
}

/**
 * Call Campus Assistant AI Gateway (Gemini fallback)
 * Returns { ok, response?, errorDetails? }
 */
async function callCampusAssistantAI(messages: Array<{ role: string; content: string }>, apiKey: string) {
  console.log('Falling back to Campus Assistant AI (Gemini)...');
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-3-flash-preview',
      messages,
    }),
  });

  const text = await response.text();
  console.log('Campus Assistant AI response status:', response.status);

  if (!response.ok) {
    console.error('Campus Assistant AI error:', response.status, text);
    return { ok: false, status: response.status, errorDetails: text };
  }

  const data = JSON.parse(text);
  return { ok: true, response: data.choices?.[0]?.message?.content };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GROK_API_KEY = Deno.env.get('GROK_API_KEY');
    const CAMPUS_ASSISTANT_API_KEY = Deno.env.get('CAMPUS_ASSISTANT_API_KEY');

    if (!GROK_API_KEY && !CAMPUS_ASSISTANT_API_KEY) {
      console.error('No AI provider keys configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured. Please contact administrator.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);

    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, conversationHistory = [] } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build messages array with conversation history
    const messages = [
      { role: 'system', content: IARE_SYSTEM_PROMPT },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    let aiResponse: string | undefined;
    let usedProvider = 'none';

    // --- Try Grok first (if key exists) ---
    if (GROK_API_KEY) {
      const grokResult = await callGrok(messages, GROK_API_KEY);

      if (grokResult.ok && grokResult.response) {
        aiResponse = grokResult.response;
        usedProvider = 'grok';
      } else {
        // Fallback conditions: 403 (no credits), 429 (rate limit), or other transient errors
        const shouldFallback = [403, 429, 500, 502, 503].includes(grokResult.status ?? 0);
        console.log(`Grok failed with status ${grokResult.status}, fallback=${shouldFallback}`);

        if (!shouldFallback) {
          // Hard failure (e.g., 401 invalid key) – don't fallback, surface error
          return new Response(
            JSON.stringify({
              error: 'AI provider error. Please check your Grok API key.',
              details: grokResult.errorDetails,
              status: grokResult.status,
            }),
            { status: grokResult.status ?? 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // --- Fallback to Campus Assistant AI if Grok didn't succeed ---
    if (!aiResponse && CAMPUS_ASSISTANT_API_KEY) {
      const campusAssistantResult = await callCampusAssistantAI(messages, CAMPUS_ASSISTANT_API_KEY);

      if (campusAssistantResult.ok && campusAssistantResult.response) {
        aiResponse = campusAssistantResult.response;
        usedProvider = 'campus-assistant-ai';
      } else {
        // Handle Campus Assistant AI rate limits gracefully
        if (campusAssistantResult.status === 429) {
          return new Response(
            JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
            { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        if (campusAssistantResult.status === 402) {
          return new Response(
            JSON.stringify({ error: 'AI credits exhausted. Please add credits to your workspace.' }),
            { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        return new Response(
          JSON.stringify({
            error: 'AI service error. Please try again.',
            details: campusAssistantResult.errorDetails,
            status: campusAssistantResult.status,
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (!aiResponse) {
      return new Response(
        JSON.stringify({ error: 'No AI provider could fulfill the request.' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Response generated successfully via ${usedProvider}`);

    return new Response(
      JSON.stringify({ response: aiResponse, provider: usedProvider }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat-grok function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
