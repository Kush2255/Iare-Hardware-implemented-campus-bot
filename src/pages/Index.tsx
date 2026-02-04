import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useAuth } from '@/hooks/useAuth';
import { useParallax } from '@/hooks/useScrollAnimation';
import { 
  MessageSquare, 
  Mic, 
  Shield, 
  Zap, 
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  Plane,
  Keyboard,
  Headphones,
  ArrowRight,
  BarChart3,
  Sparkles
} from 'lucide-react';

/**
 * LANDING PAGE
 * ============
 * Modern landing page with scroll animations, parallax effects,
 * and smooth transitions for the IARE Campus AI Assistant.
 */
const Index = () => {
  const { user } = useAuth();
  const parallaxOffset = useParallax(0.3);

  const features = [
    {
      icon: Keyboard,
      title: 'Text Chat',
      description: 'Type your questions and get instant AI-powered answers about IARE.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Headphones,
      title: 'Voice Chat',
      description: 'Speak naturally using your microphone for hands-free interaction.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your conversations are encrypted and securely stored.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Lightning-fast responses powered by advanced AI technology.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const topics = [
    { icon: BookOpen, name: 'Admissions', description: 'TS EAMCET, fees & process' },
    { icon: GraduationCap, name: 'Courses', description: 'B.Tech, M.Tech, MBA, MCA' },
    { icon: Users, name: 'Placements', description: '90%+ placement record' },
    { icon: Clock, name: 'Campus Life', description: 'Hostels, labs & facilities' }
  ];

  const stats = [
    { value: '90%+', label: 'Placement Rate' },
    { value: '32', label: 'Acre Campus' },
    { value: '2000', label: 'Established' },
    { value: 'A++', label: 'NAAC Grade' }
  ];

  return (
    <Layout>
      {/* Hero Section with Scrolling Background Images */}
      <section className="relative overflow-hidden py-20 lg:py-32 min-h-screen">
        {/* Background Images with Auto-Scroll */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Image 1 - IARE Campus */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slideshow"
            style={{
              backgroundImage: `url('https://www.iare.ac.in/sites/all/themes/iare/images/IARE_Campus.jpg')`,
              animationDelay: '0s',
              zIndex: 1
            }}
          />
          {/* Image 2 - Slider */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slideshow"
            style={{
              backgroundImage: `url('https://www.iare.ac.in/sites/all/themes/iare/images/slider7.jpg')`,
              animationDelay: '-8s',
              zIndex: 2
            }}
          />
          {/* Image 3 - Incubation Centre */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slideshow"
            style={{
              backgroundImage: `url('https://www.iare.ac.in/sites/all/themes/iare/images/Incubation_Centre.jpg')`,
              animationDelay: '-16s',
              zIndex: 3
            }}
          />
          {/* Image 4 - Open Theatre */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slideshow"
            style={{
              backgroundImage: `url('https://www.iare.ac.in/sites/all/themes/iare/images/Open_Theatre_back.jpg')`,
              animationDelay: '-24s',
              zIndex: 4
            }}
          />
          {/* Subtle Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        
        {/* Floating Elements */}
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1.5s' }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-up" delay={0}>
              <Badge variant="secondary" className="mb-6 px-4 py-2 animate-fade-in">
                <Plane className="h-4 w-4 mr-2" />
                Institute of Aeronautical Engineering, Dundigal
              </Badge>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                IARE Campus
                <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  AI Assistant
                </span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-lg md:text-xl text-black mb-8 max-w-2xl mx-auto leading-relaxed font-medium bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-2xl px-8 py-5 border border-primary/30 shadow-lg">
                Get instant answers to all your IARE-related questions using our AI-powered 
                text and voice chatbot. Simply speak or type to get started.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="scale" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <>
                    <Button size="lg" asChild className="text-lg px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                      <Link to="/text-chat">
                        <Keyboard className="mr-2 h-5 w-5" />
                        Text Chat
                      </Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild className="text-lg px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                      <Link to="/voice-chat">
                        <Headphones className="mr-2 h-5 w-5" />
                        Voice Chat
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" asChild className="text-lg px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                      <Link to="/signup">
                        <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="text-lg px-8 h-14 rounded-xl hover:scale-105 transition-all">
                      <Link to="/signin">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="text-center group">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose IARE Assistant?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of campus enquiries with cutting-edge AI technology
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <Card 
                  className="group hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <feature.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Knowledge Base</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Can You Ask?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI is trained on comprehensive IARE information
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {topics.map((topic, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 100}>
                <Card 
                  className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <topic.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{topic.name}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis CTA */}
      <AnimatedSection animation="fade-up" as="section" className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <Badge variant="secondary" className="mb-4">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Technical Docs
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    System Analysis
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Explore the technical architecture, security measures, AI processing pipeline, 
                    and voice recognition analysis of our campus assistant system.
                  </p>
                  <Button asChild className="group">
                    <Link to="/analysis">
                      View Analysis
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 md:p-12 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-background/50 backdrop-blur hover:bg-background/80 transition-colors cursor-pointer group">
                      <Shield className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium">Secure</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 backdrop-blur hover:bg-background/80 transition-colors cursor-pointer group">
                      <Zap className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium">Fast</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 backdrop-blur hover:bg-background/80 transition-colors cursor-pointer group">
                      <Mic className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium">Voice</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 backdrop-blur hover:bg-background/80 transition-colors cursor-pointer group">
                      <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium">Chat</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join IARE students who use our AI assistant for campus enquiries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 h-14 rounded-xl hover:scale-105 transition-all">
                <Link to={user ? '/chatbot' : '/signup'}>
                  {user ? 'Open Chatbot' : 'Sign Up Free'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {!user && (
                <Button size="lg" variant="outline" asChild className="text-lg px-8 h-14 rounded-xl bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/analysis">Learn More</Link>
                </Button>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
