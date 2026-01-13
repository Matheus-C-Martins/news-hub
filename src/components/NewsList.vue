<template>
  <div class="news-list">
    <div v-if="loading && articles.length === 0" class="loading-state">
      <div class="loading-animation">
        <div class="spinner"></div>
        <div class="pulse-ring"></div>
      </div>
      <h3>{{ t('loading.articles') }}</h3>
      <p>{{ t('loading.subtitle') }}</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <div class="error-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h3>{{ t('error.title') }}</h3>
      <p>{{ error }}</p>
      <button class="retry-btn" @click="$emit('retry')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
        {{ t('error.retry') }}
      </button>
    </div>
    
    <div v-else-if="articles.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
      <h3>{{ t('empty.title') }}</h3>
      <p>{{ t('empty.description') }}</p>
    </div>
    
    <div v-else>
      <div class="results-header">
        <h2>{{ t('results.title') }}</h2>
        <p class="results-count">
          {{ articles.length }} / {{ totalResults }} {{ t('results.articles') }}
        </p>
      </div>
      
      <div class="articles-grid">
        <NewsCard 
          v-for="(article, index) in articles" 
          :key="index"
          :article="article"
          :style="{ animationDelay: `${(index % 20) * 0.05}s` }"
        />
      </div>
      
      <div v-if="hasMore" class="load-more-section">
        <button 
          class="load-more-btn"
          @click="$emit('load-more')"
          :disabled="loading"
        >
          <svg v-if="!loading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          <div v-else class="btn-spinner"></div>
          {{ loading ? t('loading.more') : t('actions.loadMore') }}
        </button>
        <p class="pagination-info">
          {{ t('pagination.showing') }} {{ articles.length }} {{ t('pagination.of') }} {{ totalResults }}
        </p>
      </div>
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
  },
  hasMore: {
    type: Boolean,
    default: false
  },
  totalResults: {
    type: Number,
    default: 0
  }
})

defineEmits(['retry', 'load-more'])
</script>

<style lang="scss" scoped>
.news-list {
  min-height: 500px;
}

.results-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  
  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    margin: 0;
    color: var(--text-primary);
    letter-spacing: -0.5px;
  }
  
  .results-count {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    font-weight: 600;
    margin: 0;
    padding: 0.5rem 1rem;
    background: var(--bg-secondary);
    border-radius: 50px;
    border: 2px solid var(--border-color);
  }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
  
  > * {
    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.load-more-section {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px var(--accent-color-alpha);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--accent-color-alpha);
    
    svg {
      transform: translateY(3px);
    }
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
}

.btn-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.pagination-info {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin: 0;
  font-weight: 500;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
  
  h3 {
    margin: 1.5rem 0 0.75rem 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
  }
  
  p {
    margin: 0;
    font-size: 1.0625rem;
    color: var(--text-secondary);
    max-width: 500px;
  }
}

.loading-animation {
  position: relative;
  width: 100px;
  height: 100px;
}

.spinner {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 10px;
  left: 10px;
  border: 4px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.pulse-ring {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 3px solid var(--accent-color);
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
  opacity: 0.5;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.error-icon,
.empty-icon {
  color: var(--text-secondary);
  opacity: 0.5;
  margin-bottom: 1rem;
  
  svg {
    stroke-width: 1.5;
  }
}

.error-icon {
  color: #ef4444;
}

.retry-btn {
  margin-top: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px var(--accent-color-alpha);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--accent-color-alpha);
    
    svg {
      transform: rotate(180deg);
    }
  }
  
  svg {
    transition: transform 0.5s ease;
  }
}

@media (max-width: 768px) {
  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    
    h2 {
      font-size: 1.5rem;
    }
  }
  
  .load-more-section {
    margin-top: 2rem;
  }
  
  .load-more-btn {
    width: 100%;
    max-width: 300px;
  }
  
  .loading-state,
  .error-state,
  .empty-state {
    padding: 4rem 1.5rem;
    
    h3 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
}
</style>
