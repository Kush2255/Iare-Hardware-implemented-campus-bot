# React Chat Application

## Project Info

This is a modern React-based chat application built with TypeScript and Vite.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
```

2. Navigate to the project directory:
```sh
cd <YOUR_PROJECT_NAME>
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run build:dev` - Build the project in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Modern UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a service for authentication and database

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── integrations/  # External service integrations
├── lib/           # Utility functions and configurations
├── pages/         # Application pages/routes
└── ui/            # shadcn/ui components
```

## Deployment

This application can be deployed to various platforms:

- **Vercel**: Connect your GitHub repository (see instructions below)
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment

To build for production:
```sh
npm run build
```

### Vercel (GitHub Actions) ⚡

A GitHub Actions workflow has been added at `.github/workflows/deploy-to-vercel.yml` to deploy the project on pushes to the `main` branch. To enable automatic deployments:

1. Sign in to https://vercel.com and create a project (or note your existing org and project IDs).
2. Create a Vercel token: go to **Settings → Tokens → Generate Token** and copy it.
3. In your GitHub repository, go to **Settings → Secrets → Actions** and add these secrets:
   - `VERCEL_TOKEN` — the token created in step 2
   - `VERCEL_ORG_ID` — your Vercel organization ID
   - `VERCEL_PROJECT_ID` — your Vercel project ID
4. Push to `main` — the workflow will build the site (`npm ci && npm run build`) and deploy to Vercel (`--prod`).

If you prefer the Vercel UI, import this repository and set the framework preset to **Vite**, build command `npm run build`, and output directory `dist`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
