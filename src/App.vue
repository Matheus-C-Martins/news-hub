<template>
  <div :class="['app', { 'dark-theme': isDarkMode }]">
    <Header 
      @toggle-theme="toggleTheme"
      @change-language="changeLanguage"
      @filter="handleCategoryFilter"
      :is-dark-mode="isDarkMode"
      :current-language="currentLanguage"
      :active-category="activeCategory"
    />
    
    <main class="main-content">
      <SearchBar @search="handleSearch" />
      <NewsList 
        :articles="filteredArticles"
        :loading="loading"
        :error="error"
        :has-more="hasMore"
        :total-results="totalResults"
        @retry="loadNews"
        @load-more="loadMoreNews"
      />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from './components/Header.vue'
import SearchBar from './components/SearchBar.vue'
import NewsList from './components/NewsList.vue'
import Footer from './components/Footer.vue'
import { fetchNews } from './services/newsApi'

const { locale } = useI18n()

const isDarkMode = ref(false)
const currentLanguage = ref('en')
const articles = ref([])
const filteredArticles = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const activeCategory = ref('general')
const currentPage = ref(1)
const totalResults = ref(0)
const hasMore = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

const changeLanguage = (lang) => {
  currentLanguage.value = lang
  locale.value = lang
  localStorage.setItem('language', lang)
  currentPage.value = 1
  articles.value = []
  loadNews(activeCategory.value)
}

const handleSearch = (query) => {
  searchQuery.value = query
  if (query) {
    filteredArticles.value = articles.value.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description?.toLowerCase().includes(query.toLowerCase())
    )
  } else {
    filteredArticles.value = articles.value
  }
}

const handleCategoryFilter = (category) => {
  activeCategory.value = category
  searchQuery.value = ''
  currentPage.value = 1
  articles.value = []
  loadNews(category)
}

const loadNews = async (category = 'general', append = false) => {
  loading.value = true
  error.value = null
  
  try {
    const data = await fetchNews(
      currentLanguage.value, 
      category, 
      searchQuery.value,
      currentPage.value,
      20 // pageSize
    )
    
    const newArticles = data.articles || []
    
    if (append) {
      articles.value = [...articles.value, ...newArticles]
    } else {
      articles.value = newArticles
    }
    
    filteredArticles.value = articles.value
    totalResults.value = data.totalResults || 0
    hasMore.value = articles.value.length < totalResults.value
    
  } catch (err) {
    error.value = err.message
    console.error('Error loading news:', err)
  } finally {
    loading.value = false
  }
}

const loadMoreNews = () => {
  if (!loading.value && hasMore.value) {
    currentPage.value++
    loadNews(activeCategory.value, true)
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const savedLanguage = localStorage.getItem('language') || 'en'
  
  isDarkMode.value = savedTheme === 'dark'
  currentLanguage.value = savedLanguage
  locale.value = savedLanguage
  
  loadNews()
})
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: calc(100vh - 300px);
}

@media (max-width: 768px) {
  .main-content {
    padding: 2rem 1rem;
  }
}
</style>
