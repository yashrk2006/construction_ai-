# BuildSmart AI - Construction Field Management

A modern, AI-powered construction site management application with real-time monitoring, safety analysis, and project tracking.

## Features

- 🏗️ **Dashboard** - Real-time project overview with AI-powered delay predictions
- ✅ **Task Board** - Kanban-style task management system
- 📦 **Materials Management** - Inventory tracking with low-stock alerts
- 👷 **Workforce Management** - Personnel attendance and productivity tracking
- 🛡️ **Safety AI** - Computer vision-based PPE compliance monitoring
- 📊 **Reports** - AI-generated project summaries and analytics

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd buildsmart-ai---construction-field-management
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Technology Stack

- **Frontend**: React 18, TypeScript, TailwindCSS
- **Charts**: Recharts
- **AI**: Google Gemini API
- **Build Tool**: Vite
- **Icons**: Font Awesome

## Project Structure

```
├── components/        # React components
├── pages/            # Main application pages
├── constants.tsx     # Mock data and constants
├── types.ts          # TypeScript type definitions
├── geminiService.ts  # AI service integration
├── index.html        # HTML entry point
├── index.tsx         # React entry point
└── vite.config.ts    # Vite configuration
```

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
