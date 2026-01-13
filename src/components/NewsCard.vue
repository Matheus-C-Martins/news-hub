<template>
  <article class="news-card">
    <div class="card-image" v-if="article.urlToImage">
      <img :src="article.urlToImage" :alt="article.title" loading="lazy" />
    </div>
    <div class="card-image placeholder" v-else>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor" opacity="0.3">
        <path d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zm0 6c9.941 0 18 8.059 18 18s-8.059 18-18 18-18-8.059-18-18 8.059-18 18-18zm-8 12a4 4 0 100 8 4 4 0 000-8zm16 0a4 4 0 100 8 4 4 0 000-8zm-8 12c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z"/>
      </svg>
    </div>
    
    <div class="card-content">
      <div class="card-meta">
        <span class="source">{{ article.source?.name || 'Unknown Source' }}</span>
        <span class="date">{{ formatDate(article.publishedAt) }}</span>
      </div>
      
      <h3 class="card-title">
        <a :href="article.url" target="_blank" rel="noopener noreferrer">
          {{ article.title }}
        </a>
      </h3>
      
      <p class="card-description" v-if="article.description">
        {{ truncateText(article.description, 150) }}
      </p>
      
      <div class="card-footer">
        <span class="author" v-if="article.author">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2 1H6a4 4 0 00-4 4v1h12v-1a4 4 0 00-4-4z"/>
          </svg>
          {{ article.author }}
        </span>
        <a :href="article.url" target="_blank" rel="noopener noreferrer" class="read-more">
          {{ t('article.readMore') }}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 9H2a1 1 0 110-2h9.586L8.293 3.707a1 1 0 010-1.414z"/>
          </svg>
        </a>
      </div>
    </div>
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
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString()
}

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}
</script>

<style lang="scss" scoped>
.news-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: var(--accent-color);
  }
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: var(--bg-primary);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
  }
  
  .news-card:hover & img {
    transform: scale(1.05);
  }
}

.card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.source {
  font-weight: 600;
  color: var(--accent-color);
}

.date {
  font-weight: 400;
}

.card-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--accent-color);
    }
  }
}

.card-description {
  margin: 0 0 1rem 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-secondary);
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.8125rem;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--text-secondary);
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  transition: gap 0.2s ease;
  
  &:hover {
    gap: 0.625rem;
  }
}

@media (max-width: 768px) {
  .card-image {
    height: 180px;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .card-description {
    font-size: 0.875rem;
  }
}
</style>
