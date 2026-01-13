<template>
  <div class="category-filter">
    <div class="categories">
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
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  activeCategory: String
})

defineEmits(['filter'])

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
.category-filter {
  margin-bottom: 2rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--bg-secondary);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
    
    &:hover {
      background: var(--text-secondary);
    }
  }
}

.categories {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0;
  min-width: min-content;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    border-color: var(--accent-color);
    background-color: var(--accent-color-alpha);
  }
  
  &.active {
    background-color: var(--accent-color);
    color: white;
    border-color: var(--accent-color);
  }
}

.category-icon {
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .category-filter {
    margin-bottom: 1.5rem;
    padding: 0 0.5rem;
  }
  
  .category-btn {
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
  }
  
  .category-icon {
    font-size: 1rem;
  }
}
</style>
