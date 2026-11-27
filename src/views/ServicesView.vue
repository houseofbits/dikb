<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProcessStep from '@/components/ui/ProcessStep.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { services } from '@/data/services'
import { pick } from '@/data/projects'
import { useLocalizedPath } from '@/composables/useLocalizedPath'
import { usePageMeta } from '@/composables/usePageMeta'

const { t, locale, tm } = useI18n()
const { path } = useLocalizedPath()

const serviceLetters = 'ABCDEFGH'
const processSteps = computed(() => tm('process.steps') as { title: string; description: string }[])

usePageMeta({
  title: () => t('seo.services.title'),
  description: () => t('seo.services.description'),
})
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeading
        level="h1"
        :eyebrow="t('services.eyebrow')"
        :title="t('services.title')"
        :subtitle="t('services.subtitle')"
      />

      <ol class="service-list">
        <li v-for="(service, i) in services" :key="service.title.en" class="service-row">
          <span class="label letter">{{ serviceLetters[i] }}</span>
          <h2 class="service-title">{{ pick(service.title, locale) }}</h2>
          <p class="text-muted">{{ pick(service.description, locale) }}</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="section on-signal">
    <div class="container">
      <SectionHeading
        :eyebrow="t('home.processEyebrow')"
        :title="t('services.processTitle')"
        :subtitle="t('services.processSubtitle')"
      />
      <div class="grid-12 process">
        <ProcessStep
          v-for="(step, index) in processSteps"
          :key="step.title"
          class="step"
          :index="index + 1"
          :title="step.title"
          :description="step.description"
        />
      </div>
      <div class="cta-row">
        <BaseButton :to="path('contact')">{{ t('home.ctaButton') }} →</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-list {
  list-style: none;
  border-top: 2px solid var(--color-ink);
}

.service-row {
  display: grid;
  grid-template-columns: 64px minmax(0, 5fr) minmax(0, 6fr);
  gap: var(--gutter);
  align-items: baseline;
  padding-block: var(--space-5);
  border-bottom: 1px solid var(--color-ink);
}

.letter {
  color: var(--color-signal-ink);
}

.service-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-stretch: 100%;
  text-transform: none;
  letter-spacing: 0;
  line-height: 1.15;
  font-size: clamp(1.4rem, 2.2vw, 2rem);
}

.service-row p {
  font-size: var(--font-size-md);
}

.process {
  row-gap: var(--space-7);
}

.step {
  grid-column: span 3;
}

.cta-row {
  margin-top: var(--space-8);
}

@media (max-width: 1024px) {
  .step {
    grid-column: span 6;
  }
}

@media (max-width: 820px) {
  .service-row {
    grid-template-columns: 32px minmax(0, 1fr);
  }

  .service-row p {
    grid-column: 2;
  }

  .step {
    grid-column: 1 / -1;
  }
}
</style>
