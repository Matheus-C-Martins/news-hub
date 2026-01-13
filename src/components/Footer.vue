<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <h3>News Hub</h3>
          <p>{{ t('footer.tagline') }}</p>
        </div>
        
        <div class="footer-links">
          <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">
            {{ t('footer.poweredBy') }} NewsAPI
          </a>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} News Hub. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.footer-brand {
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: var(--text-primary);
  }
  
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
}

.footer-links {
  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--accent-color);
    }
  }
}

.footer-bottom {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
  
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.8125rem;
  }
}
</style>
