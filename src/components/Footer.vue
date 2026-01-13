<template>
  <footer class="footer">
    <div class="footer-container">
      <p class="copyright">&copy; {{ currentYear }} News Hub. {{ t('footer.rights') }}</p>
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
  background: var(--bg-secondary);
  border-top: 2px solid var(--border-color);
  margin-top: 6rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.copyright {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 1.5rem 1rem;
  }
  
  .copyright {
    font-size: 0.8125rem;
  }
}
</style>
