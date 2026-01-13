<template>
  <article class="news-card">
    <a :href="article.url" target="_blank" rel="noopener noreferrer" class="card-link" :aria-label="article.title">
      <div class="card-image-wrapper">
        <img 
          v-if="article.urlToImage" 
          :src="article.urlToImage" 
          :alt="article.title" 
          loading="lazy" 
          class="card-image"
        />
        <div v-else class="card-image placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </div>
      </div>
      
      <div class="card-content">
        <div class="card-meta">
          <span class="source">{{ article.source?.name || 'Unknown Source' }}</span>
          <span class="dot">•</span>
          <span class="date">{{ formatDate(article.publishedAt) }}</span>
        </div>
        
        <h3 class="card-title">
          {{ article.title }}
        </h3>
        
        <p class="card-description" v-if="article.description">
          {{ truncateText(article.description, 120) }}
        </p>
        
        <div class="card-footer" v-if="article.author">
          <span class="author">
            {{ t('article.by') }} {{ article.author }}
          </span>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  article: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('default', { 
    month: 'short', 
    day: 'numeric' 
  }).format(date)
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}
</script>

<style lang="scss" scoped>
.news-card {
  height: 100%;
  background-color: var(--bg-primary);
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border: 1px solid transparent; // visual clarity
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    
    .card-title {
      color: var(--accent-color);
    }
    
    .card-image {
      transform: scale(1.05);
    }
  }
}

.card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 Aspect Ratio
  overflow: hidden;
  background-color: var(--bg-secondary);
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    opacity: 0.5;
    
    svg {
      width: 48px;
      height: 48px;
    }
  }
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  
  .source {
    color: var(--accent-color);
  }
  
  .dot {
    opacity: 0.5;
  }
}

.card-title {
  font-size: 1.125rem;
  line-height: 1.4;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: var(--text-primary);
  transition: color 0.2s ease;
  
  // Multi-line truncation
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
  flex: 1;
  
  // Multi-line truncation
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.8rem;
  color: var(--text-secondary);
  
  .author {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 768px) {
  .card-content {
    padding: 1rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
}
</style>
