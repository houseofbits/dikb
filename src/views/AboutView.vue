<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import WallLabelImage from '@/components/ui/WallLabelImage.vue'
import { getProjectBySlug, pick } from '@/data/projects'
import { usePageMeta } from '@/composables/usePageMeta'

const { t, locale } = useI18n()

usePageMeta({ title: () => t('seo.about.title'), description: () => t('seo.about.description') })

const values = [
  { title: 'valueDurability', body: 'valueDurabilityBody' },
  { title: 'valueCuratorial', body: 'valueCuratorialBody' },
  { title: 'valueLongevity', body: 'valueLongevityBody' },
] as const

const photo = getProjectBySlug('unbalanced-force')
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeading
        level="h1"
        :eyebrow="t('about.eyebrow')"
        :title="t('about.title')"
        :subtitle="t('about.subtitle')"
      />

      <div class="grid-12 story">
        <WallLabelImage
          v-if="photo"
          class="story-photo"
          :src="photo.heroImage"
          :alt="pick(photo.title, locale)"
          :caption="pick(photo.title, locale)"
          :meta="`${pick(photo.category, locale)} · ${photo.year}`"
          sizes="(max-width: 820px) 100vw, 58vw"
          eager
        />
        <div class="story-copy">
          <span class="label">{{ t('about.storyTitle') }}</span>
          <p>{{ t('about.storyBody') }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section on-ink">
    <div class="container">
      <SectionHeading :eyebrow="t('about.eyebrow')" :title="t('about.valuesTitle')" />
      <div class="grid-12 values">
        <div v-for="(value, i) in values" :key="value.title" class="value">
          <span class="value-number" aria-hidden="true">{{ i + 1 }}</span>
          <h3>{{ t(`about.${value.title}`) }}</h3>
          <p class="text-muted">{{ t(`about.${value.body}`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story {
  row-gap: var(--space-6);
  align-items: start;
}

.story-photo {
  grid-column: span 7;
}

.story-copy {
  grid-column: 9 / span 4;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 2px solid var(--color-ink);
}

.story-copy p {
  font-size: var(--font-size-lead);
}

.values {
  row-gap: var(--space-7);
}

.value {
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 2px solid var(--color-border);
}

.value-number {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 4rem;
  line-height: 1;
  color: var(--color-signal);
}

.value h3 {
  font-size: var(--font-size-lg);
}

@media (max-width: 820px) {
  .story-photo,
  .story-copy,
  .value {
    grid-column: 1 / -1;
  }
}
</style>
