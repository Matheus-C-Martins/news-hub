# 📰 News Hub

<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.4-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js">
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS">
  <img src="https://img.shields.io/badge/NewsAPI-Powered-00C853?style=for-the-badge" alt="NewsAPI">
  
  <h3>🌍 Your Modern Global News Source</h3>
  <p>A beautiful, multilingual news aggregator with dark mode, real-time search, and responsive design</p>
  
  <a href="https://matheus-c-martins.github.io/news-hub/"><strong>🚀 View Live Demo »</strong></a>
</div>

<br>

## ✨ Key Features

### 🌐 Multilingual Support
- **5 Languages**: English 🇬🇧, Portuguese 🇵🇹, Spanish 🇪🇸, French 🇫🇷, German 🇩🇪
- Full UI translation with Vue I18n
- Language-specific news sources
- Persistent language preference

### 🌙 Dark/Light Theme
- Smooth theme transitions
- System preference detection
- localStorage persistence
- Optimized color contrast
- Modern glassmorphism effects

### 📱 Fully Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-optimized interactions
- Smooth scrolling and animations
- Progressive Web App ready

### 🔍 Advanced Search & Filters
- Real-time article search
- 7 news categories with icons
- Instant filter switching
- Smart content matching

### 🎨 Modern UI/UX
- **Gradient Accents**: Beautiful blue-to-purple gradients
- **Card Animations**: Smooth hover effects and transitions
- **Glassmorphism**: Modern frosted glass effects
- **Micro-interactions**: Delightful button animations
- **Loading States**: Animated spinners with pulse effects
- **Empty States**: Helpful illustrations and messages

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|----------|
| **Vue.js 3** | Progressive JavaScript framework with Composition API |
| **Vite** | Next-generation frontend build tool |
| **SCSS** | Advanced CSS with variables and nesting |
| **Vue I18n** | Internationalization and localization |
| **Axios** | HTTP client for API requests |
| **NewsAPI** | Global news data provider |
| **GitHub Actions** | Automated CI/CD pipeline |
| **GitHub Pages** | Static site hosting |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- NewsAPI key ([Get yours free](https://newsapi.org/register))

### Installation

```bash
# Clone the repository
git clone https://github.com/Matheus-C-Martins/news-hub.git
cd news-hub

# Install dependencies
npm install

# Create environment file
echo "VITE_NEWS_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 🔑 API Configuration

### Local Development

1. Register at [NewsAPI.org](https://newsapi.org/register)
2. Create `.env` file:
   ```env
   VITE_NEWS_API_KEY=your_actual_api_key
   ```
3. Restart dev server

### GitHub Pages Deployment

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add new secret:
   - Name: `VITE_NEWS_API_KEY`
   - Value: Your NewsAPI key
3. Push to `main` branch → Auto-deploys! 🎉

## 🏷️ Available Categories

- 📰 **General** - Top headlines and breaking news
- 💼 **Business** - Markets, economy, and finance
- 💻 **Technology** - Tech innovations and startups
- 🔬 **Science** - Research and discoveries
- 🏥 **Health** - Medical news and wellness
- ⚽ **Sports** - Athletics and competitions
- 🎬 **Entertainment** - Movies, music, and culture

## 📁 Project Structure

```
news-hub/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── public/
│   └── .gitkeep
├── src/
│   ├── components/
│   │   ├── Header.vue          # Navigation with categories
│   │   ├── SearchBar.vue       # Search interface
│   │   ├── NewsCard.vue        # Article card component
│   │   ├── NewsList.vue        # Articles grid
│   │   └── Footer.vue          # Footer with info
│   ├── locales/
│   │   ├── en.json             # English translations
│   │   ├── pt.json             # Portuguese translations
│   │   ├── es.json             # Spanish translations
│   │   ├── fr.json             # French translations
│   │   └── de.json             # German translations
│   ├── services/
│   │   └── newsApi.js          # API integration
│   ├── styles/
│   │   └── main.scss           # Global styles
│   ├── App.vue                 # Root component
│   └── main.js                 # Application entry
├── .env.example                # Environment template
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design Highlights

### Color Palette

**Light Theme:**
- Background: `#ffffff` / `#f8fafc`
- Text: `#0f172a` / `#64748b`
- Accent: `#3b82f6` → `#8b5cf6` (gradient)

**Dark Theme:**
- Background: `#0f172a` / `#1e293b`
- Text: `#f1f5f9` / `#94a3b8`
- Accent: `#60a5fa` → `#8b5cf6` (gradient)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive**: 16px (desktop) → 14px (tablet) → 13px (mobile)

### Animations

- Card hover: `translateY(-8px)` with shadow
- Button hover: Scale and color transitions
- Loading: Spinner with pulse ring
- Staggered entry: Sequential fade-in animations

## 📝 Available Scripts

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions are **greatly appreciated**.

1. Fork the Project
2. Create Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit Changes (`git commit -m 'Add AmazingFeature'`)
4. Push to Branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Matheus C. Martins - [@Matheus-C-Martins](https://github.com/Matheus-C-Martins)

Project Link: [https://github.com/Matheus-C-Martins/news-hub](https://github.com/Matheus-C-Martins/news-hub)

## 🚀 Deployment Status

The application automatically deploys to GitHub Pages on every push to `main` branch.

[![Deploy Status](https://github.com/Matheus-C-Martins/news-hub/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/Matheus-C-Martins/news-hub/actions)

## 🌟 Acknowledgments

- [NewsAPI](https://newsapi.org) for providing news data
- [Vue.js](https://vuejs.org) for the amazing framework
- [Vite](https://vitejs.dev) for blazing fast builds
- [Inter Font](https://fonts.google.com/specimen/Inter) by Rasmus Andersson
- [Heroicons](https://heroicons.com) for beautiful SVG icons

---

<div align="center">
  <strong>Made with ❤️ using Vue.js 3</strong>
  <br>
  <sub>News Hub © 2026</sub>
</div>
