import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || ''

// Use proxy to bypass CORS restrictions
const PROXY_URL = 'https://api.allorigins.win/raw?url='
const BASE_URL = 'https://newsapi.org/v2'

const languageMap = {
  en: 'us',
  pt: 'pt',
  es: 'es',
  fr: 'fr',
  de: 'de'
}

export const fetchNews = async (language = 'en', category = 'general', query = '', page = 1, pageSize = 20) => {
  try {
    if (!API_KEY) {
      console.warn('NewsAPI key not configured. Using mock data.')
      return getMockNews(category, page, pageSize)
    }
    
    const country = languageMap[language] || 'us'
    const endpoint = query ? 'everything' : 'top-headlines'
    
    // Build NewsAPI URL
    const params = new URLSearchParams({
      apiKey: API_KEY,
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(query ? { q: query, language } : { country, category })
    })
    
    const newsApiUrl = `${BASE_URL}/${endpoint}?${params.toString()}`
    
    // Use proxy to avoid CORS issues
    const proxyUrl = `${PROXY_URL}${encodeURIComponent(newsApiUrl)}`
    
    const response = await axios.get(proxyUrl, {
      headers: {
        'Accept': 'application/json'
      }
    })
    
    // Parse response if it's a string
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
    
    if (data.status === 'error') {
      console.error('NewsAPI Error:', data)
      throw new Error(data.message || 'Failed to fetch news')
    }
    
    return data
  } catch (error) {
    console.error('Error fetching news:', error)
    
    // Check if it's a CORS error
    if (error.message?.includes('CORS') || error.message?.includes('cors')) {
      console.warn('CORS error detected. Using mock data.')
      return getMockNews(category, page, pageSize)
    }
    
    // Return mock data on error for demo purposes
    return getMockNews(category, page, pageSize)
  }
}

const getMockNews = (category, page = 1, pageSize = 20) => {
  const allArticles = {
    general: [
      {
        source: { id: null, name: 'BBC News' },
        author: 'BBC Editorial Team',
        title: 'Breaking: Major Climate Summit Reaches Historic Agreement',
        description: 'World leaders have agreed on unprecedented measures to combat climate change, marking a turning point in global environmental policy.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=400&fit=crop',
        publishedAt: new Date().toISOString(),
        content: 'Demo content for climate summit news...'
      },
      {
        source: { id: null, name: 'Reuters' },
        author: 'Reuters Staff',
        title: 'Global Markets Rally on Economic Recovery Signs',
        description: 'Stock markets worldwide surge as economic indicators point to stronger than expected recovery across major economies.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        content: 'Demo content for market news...'
      },
      {
        source: { id: null, name: 'The Guardian' },
        author: 'International Desk',
        title: 'New Archaeological Discovery Rewrites Ancient History',
        description: 'Archaeologists uncover artifacts that challenge our understanding of ancient civilizations and their technological capabilities.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=400&fit=crop',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        content: 'Demo content for archaeology news...'
      }
    ],
    technology: [
      {
        source: { id: null, name: 'TechCrunch' },
        author: 'Tech Reporter',
        title: 'Revolutionary AI Breakthrough Announced by Leading Research Lab',
        description: 'Scientists unveil new artificial intelligence system that demonstrates unprecedented reasoning capabilities.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
        publishedAt: new Date().toISOString(),
        content: 'Demo content for AI news...'
      },
      {
        source: { id: null, name: 'Wired' },
        author: 'Tech Editorial',
        title: 'Quantum Computing Reaches New Milestone',
        description: 'Tech giant demonstrates quantum computer solving complex problems thousands of times faster than classical systems.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        content: 'Demo content for quantum computing...'
      }
    ],
    business: [
      {
        source: { id: null, name: 'Bloomberg' },
        author: 'Business Desk',
        title: 'Tech Giants Announce Major Sustainability Initiatives',
        description: 'Leading technology companies commit to carbon neutrality and renewable energy goals for next decade.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        publishedAt: new Date().toISOString(),
        content: 'Demo content for business news...'
      }
    ],
    sports: [
      {
        source: { id: null, name: 'ESPN' },
        author: 'Sports Reporter',
        title: 'Underdog Team Claims Championship in Dramatic Finale',
        description: 'Against all odds, the underdog team secures victory in one of the most thrilling championships in recent history.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop',
        publishedAt: new Date().toISOString(),
        content: 'Demo content for sports news...'
      }
    ],
    science: [
      {
        source: { id: null, name: 'Nature' },
        author: 'Science Team',
        title: 'Breakthrough in Fusion Energy Brings Clean Power Closer',
        description: 'Researchers achieve sustained fusion reaction, marking significant progress toward unlimited clean energy.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&h=400&fit=crop',
        publishedAt: new Date().toISOString(),
        content: 'Demo content for science news...'
      }
    ],
    health: [
      {
        source: { id: null, name: 'Medical News Today' },
        author: 'Health Editor',
        title: 'New Study Reveals Benefits of Mediterranean Diet',
        description: 'Large-scale research confirms significant health benefits of Mediterranean eating patterns for longevity.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop',
        publishedAt: new Date().toISOString(),
        content: 'Demo content for health news...'
      }
    ],
    entertainment: [
      {
        source: { id: null, name: 'Variety' },
        author: 'Entertainment Staff',
        title: 'Award-Winning Film Breaks Box Office Records',
        description: 'Critically acclaimed movie surpasses expectations, becoming highest-grossing film of the year.',
        url: 'https://newsapi.org',
        urlToImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=400&fit=crop',
        publishedAt: new Date().toISOString(),
        content: 'Demo content for entertainment news...'
      }
    ]
  }

  const articles = allArticles[category] || allArticles.general
  const totalResults = articles.length
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedArticles = articles.slice(startIndex, endIndex)
  
  return {
    status: 'ok',
    totalResults: totalResults,
    articles: paginatedArticles
  }
}
