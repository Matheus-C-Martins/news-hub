<template>
  <article class="news-card">
    <div class="card-image-wrapper">
      <div class="card-image" v-if="article.urlToImage">
        <img :src="article.urlToImage" :alt="article.title" loading="lazy" />
        <div class="image-overlay"></div>
      </div>
      <div class="card-image placeholder" v-else>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor" opacity="0.2">
          <path d="M40 10C23.43 10 10 23.43 10 40s13.43 30 30 30 30-13.43 30-30S56.57 10 40 10zm0 8c12.15 0 22 9.85 22 22s-9.85 22-22 22-22-9.85-22-22 9.85-22 22-22zM30 30a5 5 0 100 10 5 5 0 000-10zm20 0a5 5 0 100 10 5 5 0 000-10zm-10 15c-5.52 0-10 4.48-10 10h20c0-5.52-4.48-10-10-10z"/>
        </svg>
      </div>
      <div class="card-badge">
        <span class="source-badge">{{ article.source?.name || 'Unknown' }}</span>
      </div>
    </div>
    
    <div class="card-content">
      <div class="card-meta">
        <span class="date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          {{ formatDate(article.publishedAt) }}
        </span>
      </div>
      
      <h3 class="card-title">
        <a :href="article.url" target="_blank" rel="noopener noreferrer">
          {{ article.title }}
        </a>
      </h3>
      
      <p class="card-description" v-if="article.description">
        {{ truncateText(article.description, 140) }}
      </p>
      
      <div class="card-footer">
        <span class="author" v-if="article.author">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          {{ truncateText(article.author, 30) }}
        </span>
        <a :href="article.url" target="_blank" rel="noopener noreferrer" class="read-more-btn">
          {{ t('article.readMore') }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
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
  
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}
</script>

<style lang="scss" scoped>
.news-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
    border-radius: 18px;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: var(--accent-color);
    
    &::before {
      opacity: 0.03;
    }
    
    .card-image img {
      transform: scale(1.08);
    }
    
    .image-overlay {
      opacity: 0.4;
    }
    
    .card-title a {
      color: var(--accent-color);
    }
  }
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  background: var(--bg-primary);
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
  }
}

.card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
}

.source-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dark-theme .source-badge {
  background: rgba(26, 31, 46, 0.95);
  color: var(--accent-color);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 1;
}

.card-meta {
  margin-bottom: 0.75rem;
}

.date {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
  
  svg {
    opacity: 0.7;
  }
}

.card-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.3px;
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.3s ease;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    &:hover {
      color: var(--accent-color);
    }
  }
}

.card-description {
  margin: 0 0 1.5rem 0;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-secondary);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.25rem;
  border-top: 2px solid var(--border-color);
  gap: 1rem;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 600;
  flex: 1;
  min-width: 0;
  
  svg {
    flex-shrink: 0;
    opacity: 0.7;
  }
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.8125rem;
  border-radius: 50px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  box-shadow: 0 4px 12px var(--accent-color-alpha);
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 6px 20px var(--accent-color-alpha);
    
    svg {
      transform: translateX(3px);
    }
  }
  
  svg {
    transition: transform 0.3s ease;
  }
}

@media (max-width: 768px) {
  .card-image-wrapper {
    height: 200px;
  }
  
  .card-content {
    padding: 1.25rem;
  }
  
  .card-title {
    font-size: 1.125rem;
  }
  
  .card-description {
    font-size: 0.875rem;
  }
  
  .read-more-btn {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
}
</style>
