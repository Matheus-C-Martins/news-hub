<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="t('search.placeholder')"
        @input="handleSearch"
        class="search-input"
        spellcheck="false"
      />
      <button 
        v-if="searchQuery"
        @click="clearSearch"
        class="clear-button"
        :aria-label="t('search.clear')"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
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
.search-bar {
  margin-bottom: 2.5rem;
}

.search-input-wrapper {
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  transition: transform 0.2s ease;
  
  &:focus-within {
    transform: translateY(-2px);
  }
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
  z-index: 10;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 3.5rem;
  border: none;
  border-radius: 999px; // Pill shape
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1.1rem;
  font-family: inherit;
  box-shadow: var(--shadow);
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    box-shadow: var(--shadow-lg), 0 0 0 2px var(--accent-color-alpha);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
}

.clear-button {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
    background-color: var(--bg-secondary);
  }
}

@media (max-width: 768px) {
  .search-bar {
    margin-bottom: 2rem;
    padding: 0 0.5rem;
  }
  
  .search-input {
    font-size: 1rem;
    padding: 0.875rem 2.5rem 0.875rem 3rem;
  }
  
  .search-icon {
    left: 1rem;
    width: 18px;
    height: 18px;
  }
}
</style>
