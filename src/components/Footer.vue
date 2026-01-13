<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="url(#footerGradient)" />
              <path d="M10 13h16M10 18h16M10 23h11" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              <defs>
                <linearGradient id="footerGradient" x1="0" y1="0" x2="36" y2="36">
                  <stop offset="0%" stop-color="#3b82f6"/>
                  <stop offset="100%" stop-color="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h3>News Hub</h3>
            <p>{{ t('footer.tagline') }}</p>
          </div>
        </div>
        
        <div class="footer-info">
          <div class="footer-section">
            <h4>{{ t('footer.aboutTitle') }}</h4>
            <p>{{ t('footer.aboutText') }}</p>
          </div>
          
          <div class="footer-section">
            <h4>{{ t('footer.languagesTitle') }}</h4>
            <div class="languages-list">
              <span>🇬🇧 English</span>
              <span>🇵🇹 Português</span>
              <span>🇪🇸 Español</span>
              <span>🇫🇷 Français</span>
              <span>🇩🇪 Deutsch</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">&copy; {{ currentYear }} News Hub. {{ t('footer.rights') }}</p>
        <div class="footer-links">
          <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" class="powered-by">
            {{ t('footer.poweredBy') }}
            <span class="api-badge">NewsAPI</span>
          </a>
        </div>
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
  background: linear-gradient(180deg, transparent 0%, var(--bg-secondary) 20%);
  border-top: 2px solid var(--border-color);
  margin-top: 6rem;
  padding-top: 1px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.footer-brand {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  
  .footer-logo {
    filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--accent-color) 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.footer-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.footer-section {
  h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
  }
}

.languages-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  
  span {
    padding: 0.5rem 1rem;
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 50px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-secondary);
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--accent-color);
      color: var(--accent-color);
      transform: translateY(-2px);
    }
  }
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 2px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.powered-by {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
    
    .api-badge {
      background: var(--accent-color);
      color: white;
      transform: translateY(-2px);
    }
  }
}

.api-badge {
  padding: 0.375rem 0.875rem;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 50px;
  font-weight: 700;
  color: var(--accent-color);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 2rem 1rem 1.5rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
