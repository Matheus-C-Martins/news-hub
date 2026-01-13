# 📰 News Hub

<div align="center">
  <h3>Your Global News Source</h3>
  <p>A modern, multilingual news application built with Vue.js 3</p>
</div>

## ✨ Features

- **🌐 Multilingual Support**: Switch between English, Portuguese, Spanish, French, and German
- **🌙 Dark/Light Theme**: Toggle between dark and light modes with persistent preferences
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🔍 Real-time Search**: Search through articles instantly
- **🏷️ Category Filters**: Filter news by category (General, Business, Technology, Science, Health, Sports, Entertainment)
- **⚡ Fast & Modern**: Built with Vue 3 and Vite for optimal performance
- **🎨 Minimalist Design**: Clean and modern UI with SCSS styling

## 🚀 Live Demo

[View Live Demo](https://matheus-c-martins.github.io/news-hub/)

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: SCSS
- **Internationalization**: Vue I18n
- **API**: NewsAPI
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 💻 Local Development

### Prerequisites

- Node.js 18+ and npm
- NewsAPI key (get yours at [newsapi.org](https://newsapi.org))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Matheus-C-Martins/news-hub.git
cd news-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
VITE_NEWS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔑 Setting Up NewsAPI Key

### For Local Development

1. Get a free API key from [NewsAPI](https://newsapi.org/register)
2. Create a `.env` file with your key:
   ```
   VITE_NEWS_API_KEY=your_api_key_here
   ```

### For GitHub Pages Deployment

1. Go to your repository settings
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Name: `VITE_NEWS_API_KEY`
5. Value: Your NewsAPI key
6. Click **Add secret**

The GitHub Actions workflow will automatically use this secret during deployment.

## 🌍 Supported Languages

- 🇬🇧 English (US)
- 🇵🇹 Portuguese (Portugal)
- 🇪🇸 Spanish (Spain)
- 🇫🇷 French (France)
- 🇩🇪 German (Germany)

## 📁 Project Structure

```
news-hub/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── components/
│   │   ├── Header.vue          # Header with theme toggle and language selector
│   │   ├── SearchBar.vue       # Search functionality
│   │   ├── CategoryFilter.vue  # Category filter buttons
│   │   ├── NewsCard.vue        # Individual news article card
│   │   ├── NewsList.vue        # Grid layout for articles
│   │   └── Footer.vue          # Footer component
│   ├── locales/
│   │   ├── en.json             # English translations
│   │   ├── pt.json             # Portuguese translations
│   │   ├── es.json             # Spanish translations
│   │   ├── fr.json             # French translations
│   │   └── de.json             # German translations
│   ├── services/
│   │   └── newsApi.js          # NewsAPI integration
│   ├── styles/
│   │   └── main.scss           # Global styles and themes
│   ├── App.vue                 # Main app component
│   └── main.js                 # Application entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🎨 Design Features

- **Minimalist Interface**: Clean, uncluttered design focusing on content
- **Smooth Transitions**: Elegant animations and hover effects
- **Accessible**: Keyboard navigation and ARIA labels
- **Performance Optimized**: Lazy loading images and efficient rendering
- **Mobile First**: Responsive design that works on all screen sizes

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` is configured for GitHub Pages deployment with the correct base path.

### Environment Variables

- `VITE_NEWS_API_KEY` - Your NewsAPI key (required for production)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🚀 Deployment

The application automatically deploys to GitHub Pages when you push to the `main` branch. The GitHub Actions workflow handles:

- Installing dependencies
- Building the application
- Deploying to GitHub Pages
- Using secrets for API keys

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

<div align="center">
  Made with ❤️ using Vue.js 3
</div>
