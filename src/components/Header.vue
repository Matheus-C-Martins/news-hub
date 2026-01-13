<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <div class="logo-icon">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill="url(#gradient)" />
            <path d="M10 13h16M10 18h16M10 23h11" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="36" y2="36">
                <stop offset="0%" stop-color="#3b82f6"/>
                <stop offset="100%" stop-color="#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="logo-text">
          <h1>News Hub</h1>
          <span class="tagline">Global News Source</span>
        </div>
      </div>
      
      <div class="header-actions">
        <select 
          class="language-selector"
          :value="currentLanguage"
          @change="$emit('change-language', $event.target.value)"
        >
          <option value="en">🇬🇧 English</option>
          <option value="pt">🇵🇹 Português</option>
          <option value="es">🇪🇸 Español</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="de">🇩🇪 Deutsch</option>
        </select>
        
        <button 
          class="theme-toggle"
          @click="$emit('toggle-theme')"
          :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="!isDarkMode" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="category-nav">
      <div class="categories-container">
        <button
          v-for="category in categories"
          :key="category.value"
          :class="['category-btn', { active: activeCategory === category.value }]"
          @click="$emit('filter', category.value)"
        >
          <span class="category-icon">{{ category.icon }}</span>
          <span class="category-label">{{ t(`categories.${category.value}`) }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  isDarkMode: Boolean,
  currentLanguage: String,
  activeCategory: String
})

defineEmits(['toggle-theme', 'change-language', 'filter'])

const categories = [
  { value: 'general', icon: '📰' },
  { value: 'business', icon: '💼' },
  { value: 'technology', icon: '💻' },
  { value: 'science', icon: '🔬' },
  { value: 'health', icon: '🏥' },
  { value: 'sports', icon: '⚽' },
  { value: 'entertainment', icon: '🎬' }
]
</script>

<style lang="scss" scoped>
.header {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-sm);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .logo-icon {
    display: flex;
    align-items: center;
    filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.3));
  }
  
  .logo-text {
    display: flex;
    flex-direction: column;
    
    h1 {
      font-size: 1.75rem;
      font-weight: 800;
      margin: 0;
      background: linear-gradient(135deg, var(--accent-color) 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.5px;
    }
    
    .tagline {
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-weight: 500;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.language-selector {
  padding: 0.625rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--accent-color);
    background: var(--accent-color-alpha);
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 4px var(--accent-color-alpha);
  }
}

.theme-toggle {
  padding: 0.625rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--accent-color);
    background: var(--accent-color-alpha);
    transform: translateY(-1px) rotate(15deg);
  }
  
  &:active {
    transform: translateY(0) rotate(0deg);
  }
}

.category-nav {
  border-top: 1px solid var(--border-color);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 2px;
  }
}

.categories-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  gap: 0.75rem;
  min-width: min-content;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 2px solid transparent;
  border-radius: 50px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
    transition: width 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    border-color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--accent-color-alpha);
    
    &::before {
      width: 100%;
    }
    
    color: white;
  }
  
  &.active {
    background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
    color: white;
    border-color: transparent;
    box-shadow: 0 4px 16px var(--accent-color-alpha);
  }
}

.category-icon {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
    flex-wrap: wrap;
  }
  
  .logo {
    .logo-text h1 {
      font-size: 1.5rem;
    }
    
    .tagline {
      font-size: 0.7rem;
    }
  }
  
  .header-actions {
    gap: 0.75rem;
  }
  
  .language-selector {
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
  }
  
  .categories-container {
    padding: 0.75rem 1rem;
  }
  
  .category-btn {
    font-size: 0.85rem;
    padding: 0.625rem 1rem;
  }
}
</style>
