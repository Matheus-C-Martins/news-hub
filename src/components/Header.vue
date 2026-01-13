<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
          <path d="M8 12h16M8 16h16M8 20h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <h1>News Hub</h1>
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
          <svg v-if="!isDarkMode" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  isDarkMode: Boolean,
  currentLanguage: String
})

defineEmits(['toggle-theme', 'change-language'])
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
  
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
  
  svg {
    color: var(--accent-color);
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.language-selector {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--accent-color);
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px var(--accent-color-alpha);
  }
}

.theme-toggle {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--accent-color);
    background-color: var(--accent-color-alpha);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-color-alpha);
  }
}

@media (max-width: 768px) {
  .logo h1 {
    font-size: 1.25rem;
  }
  
  .header-container {
    padding: 0.75rem 0.5rem;
  }
  
  .language-selector {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
  }
}
</style>
