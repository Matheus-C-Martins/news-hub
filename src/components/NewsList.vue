<template>
  <div class="news-list">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>{{ t('loading.articles') }}</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
        <path d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zm0 6c9.941 0 18 8.059 18 18s-8.059 18-18 18-18-8.059-18-18 8.059-18 18-18zm-2 8v12h4V22h-4zm0 16v4h4v-4h-4z"/>
      </svg>
      <h3>{{ t('error.title') }}</h3>
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="articles.length === 0" class="empty-state">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
        <path d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zm0 6c9.941 0 18 8.059 18 18s-8.059 18-18 18-18-8.059-18-18 8.059-18 18-18zm-8 16h16v4H24v-4z"/>
      </svg>
      <h3>{{ t('empty.title') }}</h3>
      <p>{{ t('empty.description') }}</p>
    </div>
    
    <div v-else class="articles-grid">
      <NewsCard 
        v-for="(article, index) in articles" 
        :key="index"
        :article="article"
      />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import NewsCard from './NewsCard.vue'

const { t } = useI18n()

defineProps({
  articles: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.news-list {
  min-height: 400px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: var(--text-secondary);
  
  svg {
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    color: var(--text-primary);
  }
  
  p {
    margin: 0;
    font-size: 1rem;
  }
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
