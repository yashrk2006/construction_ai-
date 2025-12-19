# 🏗️ BuildSmart AI - India Construction Field Management

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)](https://vitejs.dev/)

A modern, AI-powered construction site management application built for India, featuring multi-language support, real-time monitoring, safety analysis, and project tracking using Google Gemini AI.

![BuildSmart AI Banner](https://img.shields.io/badge/BuildSmart-AI%20Powered-orange)

## ✨ Features

### 🤖 AI-Powered Intelligence
- **Smart Predictions** - Automated project delay analysis using Gemini AI
- **Safety Compliance** - Computer vision-based PPE detection and IS 4014 compliance
- **Automated Reports** - AI-generated daily project summaries

### 🌐 Multi-Language Support
- **4 Indian Languages** - English, Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు)
- **Instant Switching** - Real-time UI translation without page reload
- **Persistent Preference** - Remembers your language choice

### 🇮🇳 India-Specific Features
- **Indian Standards** - IS 4014, IS 456, IS 2062, IS 732 compliance
- **Local Context** - Mumbai Metro, ACC Cement, Tata Steel
- **INR Currency** - Indian Rupee (₹) support
- **Tricolor Theme** - Saffron, White, and Green design elements

### 📊 Core Modules
- **Dashboard** - Real-time project overview with AI insights
- **Task Board** - Kanban-style task management
- **Materials** - Inventory tracking with low-stock alerts
- **Workforce** - Attendance and productivity monitoring
- **Safety AI** - Image-based safety analysis
- **Reports** - Automated report generation

### 💾 Advanced State Management
- **Redux Persist** - Data survives navigation
- **Smart Caching** - Form data auto-save
- **Session Management** - Clears only on refresh

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yashrk2006/construction_ai-.git
cd construction_ai-
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

4. **Add your Gemini API key to `.env.local`**
```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

5. **Start development server**
```bash
npm run dev
```

6. **Open in browser**
```
http://localhost:3000
```

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool |
| **Redux Toolkit** | State Management |
| **Redux Persist** | State Persistence |
| **TailwindCSS** | Styling |
| **i18next** | Internationalization |
| **Recharts** | Data Visualization |
| **Google Gemini AI** | AI Features |

## 🗂️ Project Structure

```
construction_ai-/
├── components/           # React components
│   ├── Layout.tsx       # Main layout with sidebar
│   └── LanguageSwitcher.tsx  # Language dropdown
├── pages/               # Application pages
│   ├── Dashboard.tsx    # Overview & AI predictions
│   ├── Tasks.tsx        # Task management
│   ├── Materials.tsx    # Inventory tracking
│   ├── Workforce.tsx    # Personnel management
│   ├── SafetyAI.tsx     # Safety analysis
│   └── Reports.tsx      # Report generation
├── store/               # Redux state management
│   ├── index.ts         # Store configuration
│   ├── tasksSlice.ts    # Tasks state
│   ├── safetySlice.ts   # Safety state
│   └── reportsSlice.ts  # Reports state
├── hooks/               # Custom React hooks
│   └── usePersistentState.ts  # Persistence utilities
├── constants.tsx        # Mock data & constants
├── types.ts            # TypeScript definitions
├── geminiService.ts    # AI integration
└── i18n.ts             # Translation configuration
```

## 🔐 Security

- ✅ `.env.local` is gitignored (API keys never committed)
- ✅ Comprehensive `.gitignore` for sensitive files
- ✅ Environment variable validation
- ✅ Secure API key handling

**⚠️ NEVER commit your `.env.local` file!**

## 🌍 Internationalization

### Available Languages

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| हिन्दी (Hindi) | `hi` | ✅ Complete |
| தமிழ் (Tamil) | `ta` | ✅ Complete |
| తెలుగు (Telugu) | `te` | ✅ Complete |

### Adding More Languages

1. Edit `i18n.ts`
2. Add translation object for new language
3. Update `LanguageSwitcher.tsx` with new option

## 🧪 Testing

### Test AI Features
```bash
# Dashboard predictions
- Open dashboard, wait for AI prediction panel

# Safety analysis
- Go to Safety AI
- Upload construction image
- View compliance report

# Report generation
- Navigate to Reports
- Click "Generate Report"
- Review AI-generated summary
```

### Test State Persistence
```bash
# Navigate between pages
- Data should persist

# Refresh browser (F5)
- Data should clear (new session)
```

## 📚 Documentation

- **[Quick Start Guide](QUICK_START_INDIA.md)** - Get started in 5 minutes
- **[Environment Setup](ENV_SETUP.md)** - Configure API keys
- **[India Localization](INDIA_LOCALIZATION.md)** - Indian context details
- **[Persistent State](PERSISTENT_STATE_FIX.md)** - State management guide
- **[Testing Guide](TESTING_GUIDE.md)** - Comprehensive testing

## 🎨 Screenshots

### Dashboard
Modern overview with AI predictions and real-time metrics

### Multi-Language
Seamless switching between English, Hindi, Tamil, and Telugu

### Safety AI
Computer vision-based PPE compliance monitoring

## 🚧 Roadmap

- [ ] Mobile app (React Native)
- [ ] Real-time collaboration
- [ ] Offline mode (PWA)
- [ ] More Indian languages (Marathi, Bengali, Kannada)
- [ ] Advanced analytics dashboard
- [ ] Voice commands in Hinglish
- [ ] WhatsApp integration
- [ ] SMS notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful AI capabilities
- React team for the amazing framework
- Indian construction industry for inspiration
- Open source community

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: buildsmart@construction.ai

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

**Built with ❤️ for the Indian Construction Industry** 🇮🇳

**Made in India** | **AI-Powered** | **Open Source**
