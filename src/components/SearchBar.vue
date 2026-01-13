<template>
  <div class="search-section">
    <div class="search-header">
      <h2 class="search-title">{{ t('search.title') }}</h2>
      <p class="search-subtitle">{{ t('search.subtitle') }}</p>
    </div>
    
    <div class="search-bar">
      <div class="search-input-wrapper">
        <svg class="search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="t('search.placeholder')"
          @input="handleSearch"
          class="search-input"
        />
        <button 
          v-if="searchQuery"
          @click="clearSearch"
          class="clear-button"
          :aria-label="t('search.clear')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['search'])
const searchQuery = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}
</script>

<style lang="scss" scoped>
.search-section {
  margin-bottom: 3rem;
  text-align: center;
}

.search-header {
  margin-bottom: 2rem;
  
  .search-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -1px;
  }
  
  .search-subtitle {
    font-size: 1.125rem;
    color: var(--text-secondary);
    margin: 0;
    font-weight: 400;
  }
}

.search-bar {
  max-width: 700px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:focus-within {
    box-shadow: 0 12px 48px rgba(59, 130, 246, 0.2);
    transform: translateY(-2px);
  }
}

.search-icon {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
  transition: color 0.3s ease;
  
  .search-input-wrapper:focus-within & {
    color: var(--accent-color);
  }
}

.search-input {
  width: 100%;
  padding: 1.25rem 4rem;
  border: 2px solid var(--border-color);
  border-radius: 16px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1.0625rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    background: var(--bg-primary);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    font-weight: 400;
  }
}

.clear-button {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: var(--accent-color-alpha);
  border: none;
  color: var(--accent-color);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-50%) rotate(90deg);
  }
}

@media (max-width: 768px) {
  .search-section {
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
  
  .search-header {
    .search-title {
      font-size: 2rem;
    }
    
    .search-subtitle {
      font-size: 1rem;
    }
  }
  
  .search-input {
    font-size: 1rem;
    padding: 1rem 3.5rem;
  }
  
  .search-icon {
    left: 1.25rem;
  }
}
</style>
