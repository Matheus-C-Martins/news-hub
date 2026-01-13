<template>
  <div class="language-dropdown" ref="dropdownRef">
    <button 
      class="dropdown-trigger" 
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
    >
      <span class="current-flag">{{ currentFlag }}</span>
      <span class="current-code">{{ modelValue.toUpperCase() }}</span>
      <svg 
        class="chevron" 
        :class="{ rotated: isOpen }" 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    </button>

    <transition name="dropdown">
      <ul 
        v-if="isOpen" 
        class="dropdown-menu" 
        role="listbox"
      >
        <li 
          v-for="lang in languages" 
          :key="lang.code"
          class="dropdown-item"
          :class="{ selected: modelValue === lang.code }"
          @click="selectLanguage(lang.code)"
          role="option"
          :aria-selected="modelValue === lang.code"
        >
          <span class="item-flag">{{ lang.flag }}</span>
          <span class="item-name">{{ lang.name }}</span>
          <svg 
            v-if="modelValue === lang.code" 
            class="check-icon" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="currentColor"
          >
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
          </svg>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const languages = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'pt', flag: '🇵🇹', name: 'Português' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' }
]

const currentFlag = computed(() => {
  const lang = languages.find(l => l.code === props.modelValue)
  return lang ? lang.flag : '🌐'
})

const selectLanguage = (code) => {
  emit('update:modelValue', code)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.language-dropdown {
  position: relative;
  z-index: 50;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 40px;
  padding: 0 0.75rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--accent-color);
    background-color: var(--bg-secondary);
  }

  .current-flag {
    font-size: 1.2rem;
    line-height: 1;
  }
  
  .chevron {
    color: var(--text-secondary);
    transition: transform 0.2s ease;
    
    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.5rem;
  margin: 0;
  list-style: none;
  box-shadow: var(--shadow-lg);
  transform-origin: top right;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-primary);
  font-size: 0.9rem;
  
  &:hover {
    background-color: var(--bg-secondary);
  }
  
  &.selected {
    background-color: var(--accent-color-alpha);
    color: var(--accent-color);
    font-weight: 600;
  }
  
  .item-flag {
    font-size: 1.2rem;
  }
  
  .item-name {
    flex: 1;
  }
  
  .check-icon {
    width: 14px;
    height: 14px;
  }
}

// Transitions
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
</style>
