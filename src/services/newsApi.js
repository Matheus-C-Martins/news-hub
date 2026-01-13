import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || ''
const BASE_URL = 'https://newsapi.org/v2'

const languageMap = {
  en: 'us',
  pt: 'pt',
  es: 'es',
  fr: 'fr',
  de: 'de'
}

export const fetchNews = async (language = 'en', category = 'general', query = '') => {
  try {
    const country = languageMap[language] || 'us'
    
    if (!API_KEY) {
      // Return mock data for development/demo
      return getMockNews(category)
    }
    
    const endpoint = query ? 'everything' : 'top-headlines'
    const params = {
      apiKey: API_KEY,
      ...(query ? { q: query, language } : { country, category })
    }
    
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params })
    return response.data
  } catch (error) {
    console.error('Error fetching news:', error)
    // Return mock data on error for demo purposes
    return getMockNews(category)
  }
}

const getMockNews = (category) => {
  return {
    status: 'ok',
    totalResults: 3,
    articles: [
      {
        source: { id: null, name: 'Demo Source' },
        author: 'Demo Author',
        title: `Latest ${category.charAt(0).toUpperCase() + category.slice(1)} News - Demo Mode`,
        description: 'This is a demo article. Add your NewsAPI key to the VITE_NEWS_API_KEY environment variable to see real news.',
        url: 'https://newsapi.org',
        urlToImage: 'https://via.placeholder.com/800x400?text=News+Hub+Demo',
        publishedAt: new Date().toISOString(),
        content: 'Demo content'
      },
      {
        source: { id: null, name: 'Demo Technology' },
        author: 'Tech Writer',
        title: 'Breaking News in Technology - Demo Article',
        description: 'Configure your NewsAPI key to access real-time news from around the world.',
        url: 'https://newsapi.org',
        urlToImage: 'https://via.placeholder.com/800x400?text=Technology+News',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        content: 'Demo content'
      },
      {
        source: { id: null, name: 'Demo Sports' },
        author: 'Sports Reporter',
        title: 'Top Sports Headlines - Demo Mode',
        description: 'Get your free API key at newsapi.org to see real sports news and updates.',
        url: 'https://newsapi.org',
        urlToImage: 'https://via.placeholder.com/800x400?text=Sports+News',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        content: 'Demo content'
      }
    ]
  }
}
