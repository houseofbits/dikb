<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalizedPath } from '@/composables/useLocalizedPath'
import { company } from '@/data/company'

const { t } = useI18n()
const { path } = useLocalizedPath()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer on-ink">
    <div class="container grid-12 inner">
      <h2 class="cta-title">{{ t('footer.ctaTitle') }}</h2>

      <div class="cta-copy">
        <p class="text-muted">{{ t('home.ctaSubtitle') }}</p>
        <RouterLink :to="path('contact')" class="cta-button label"
          >{{ t('home.ctaButton') }} →</RouterLink
        >
      </div>

      <div class="col">
        <span class="label text-muted">{{ t('footer.emailPhone') }}</span>
        <a :href="`mailto:${company.email}`">{{ company.email }}</a>
        <a :href="`tel:${company.phone}`">{{ company.phoneDisplay }}</a>
      </div>

      <div class="col">
        <span class="label text-muted">{{ t('footer.studio') }}</span>
        <span>{{ company.address.line }}</span>
        <span>{{ company.address.postalCode }}</span>
      </div>

      <div class="legal label text-muted">
        <span>© {{ year }} {{ company.legalName }} · {{ company.regNr }}</span>
        <span>{{ t('footer.rights') }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.inner {
  row-gap: var(--space-7);
  padding-block: var(--space-9) var(--space-6);
}

.cta-title {
  grid-column: 1 / -1;
  font-size: clamp(3rem, 8vw, 8rem);
  max-width: 14ch;
}

.cta-copy {
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-5);
}

.cta-copy p {
  font-size: var(--font-size-lead);
  max-width: 34rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  min-height: 52px;
  padding-inline: 24px;
  background: var(--color-signal);
  color: var(--color-ink);
}

.cta-button:hover {
  background: var(--color-paper);
}

.col {
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: var(--font-size-base);
}

.col .label {
  margin-bottom: var(--space-2);
}

.col a:hover {
  color: var(--color-signal);
}

.legal {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding-top: var(--space-5);
  border-top: 1px solid #4a4844;
}

@media (max-width: 820px) {
  .cta-copy,
  .col {
    grid-column: 1 / -1;
  }
}
</style>
