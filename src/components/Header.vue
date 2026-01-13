<template>
  <header class="header">
    <div class="header-content">
      <div class="top-bar">
        <div class="logo">
          <div class="logo-icon">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="10" fill="currentColor" opacity="0.1"/>
              <path d="M8 12h16M8 16h16M8 20h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
          <h1>News Hub</h1>
        </div>
        
        <div class="header-actions">
          <LanguageSelector
            :model-value="currentLanguage"
            @update:model-value="$emit('change-language', $event)"
          />
          
          <button 
            class="control-item theme-toggle"
            @click="$emit('toggle-theme')"
            :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="!isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>
        </div>
      </div>

      <nav class="nav-categories">
        <ul class="category-list">
          <li v-for="category in categories" :key="category.value">
            <button
              :class="['nav-link', { active: activeCategory === category.value }]"
              @click="$emit('filter', category.value)"
            >
              <span class="label">{{ t(`categories.${category.value}`) }}</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import LanguageSelector from './LanguageSelector.vue'

const { t } = useI18n()

defineProps({
  isDarkMode: Boolean,
  currentLanguage: String,
  activeCategory: String
})

defineEmits(['toggle-theme', 'change-language', 'filter'])

const categories = [
  { value: 'general' },
  { value: 'business' },
  { value: 'technology' },
  { value: 'science' },
  { value: 'health' },
  { value: 'sports' },
  { value: 'entertainment' }
]
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-primary);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .logo-icon {
    color: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary);
    letter-spacing: -0.025em;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
    border-color: var(--accent-color);
    background-color: var(--bg-secondary);
  }
  
  &:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }
}

.nav-categories {
  padding: 0 1.5rem;
  background-color: var(--bg-primary);
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.category-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: max-content;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 1.5rem;
    padding: 0.25rem 0;
  }
}

.nav-link {
  position: relative;
  background: none;
  border: none;
  padding: 1rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
  }
  
  &.active {
    color: var(--accent-color);
    font-weight: 600;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px; // Align with border-bottom
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--accent-color);
      border-radius: 2px 2px 0 0;
    }
  }
}

@media (max-width: 768px) {
  .top-bar {
    padding: 0.75rem 1rem;
  }
  
  .nav-categories {
    padding: 0 1rem;
  }
}
</style>

