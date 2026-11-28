<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import ImageLightbox from '@/components/ui/ImageLightbox.vue'
import { getProjectBySlug, pick, projects } from '@/data/projects'
import { buildSrcset } from '@/utils/responsiveImage'
import { useLocalizedPath } from '@/composables/useLocalizedPath'
import { usePageMeta } from '@/composables/usePageMeta'

const route = useRoute()
const { t, locale } = useI18n()
const { path } = useLocalizedPath()

const project = computed(() => getProjectBySlug(String(route.params.slug)))
const number = computed(() =>
  project.value ? String(projects.indexOf(project.value) + 1).padStart(2, '0') : '',
)
const next = computed(() => {
  if (!project.value) return undefined
  const i = projects.indexOf(project.value)
  return projects[(i + 1) % projects.length]
})

const lightboxIndex = ref<number | null>(null)
const lightboxImages = computed(() => {
  if (!project.value) return []
  const alt = pick(project.value.title, locale.value)
  return [project.value.heroImage, ...project.value.gallery].map((src) => ({ src, alt }))
})

// Search results show roughly 60 characters of title and 160 of description.
function clip(text: string, max = 155): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:—–-]+$/, '')}…`
}

usePageMeta({
  title: () => {
    if (!project.value) return t('seo.workDetail.notFoundTitle')
    const title = pick(project.value.title, locale.value)
    // Short names ("RQR") get the category for context; long ones stay near 60 characters.
    return title.length <= 30
      ? `${title} — ${pick(project.value.category, locale.value)} | DIKB`
      : `${title} | DIKB`
  },
  description: () =>
    project.value
      ? clip(pick(project.value.summary, locale.value))
      : t('seo.workDetail.notFoundDescription'),
})
</script>

<template>
  <section v-if="project" class="section detail">
    <div class="container">
      <div class="topline label">
        <RouterLink :to="path('work')" class="back">← {{ t('common.backToWork') }}</RouterLink>
        <span>No. {{ number }} · {{ pick(project.category, locale) }}</span>
      </div>

      <h1 class="title">{{ pick(project.title, locale) }}</h1>

      <div class="grid-12 hero">
        <button
          type="button"
          class="image-trigger hero-image"
          :aria-label="t('workDetail.expandImage')"
          @click="lightboxIndex = 0"
        >
          <img
            :src="project.heroImage"
            :srcset="buildSrcset(project.heroImage)"
            sizes="(max-width: 1024px) 100vw, 66vw"
            :alt="pick(project.title, locale)"
            class="photo hero-photo"
          />
        </button>

        <aside class="wall-label">
          <p class="summary">{{ pick(project.summary, locale) }}</p>
          <dl class="meta">
            <div>
              <dt class="label">{{ t('common.client') }}</dt>
              <dd>{{ pick(project.client, locale) }}</dd>
            </div>
            <div>
              <dt class="label">{{ t('common.year') }}</dt>
              <dd>{{ project.year }}</dd>
            </div>
            <div>
              <dt class="label">{{ t('common.location') }}</dt>
              <dd>{{ project.location }}</dd>
            </div>
            <div>
              <dt class="label">{{ t('common.techUsed') }}</dt>
              <dd>{{ project.tech.join(' · ') }}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div v-if="project.narrative" class="grid-12 content narrative">
        <span class="label section-label">{{ t('common.about') }}</span>
        <div class="lead-text">
          <p>{{ pick(project.narrative, locale) }}</p>
        </div>
      </div>
      <div v-else class="grid-12 content">
        <article class="block">
          <h2 class="label">01 — {{ t('common.challenge') }}</h2>
          <p>{{ pick(project.challenge!, locale) }}</p>
        </article>
        <article class="block">
          <h2 class="label">02 — {{ t('common.solution') }}</h2>
          <p>{{ pick(project.solution!, locale) }}</p>
        </article>
        <article class="block">
          <h2 class="label">03 — {{ t('common.results') }}</h2>
          <p>{{ pick(project.results!, locale) }}</p>
        </article>
      </div>

      <div v-if="project.gallery.length" class="gallery">
        <h2 class="gallery-title">{{ t('workDetail.screensTitle') }}</h2>
        <div class="grid-12 gallery-grid">
          <button
            v-for="(img, i) in project.gallery"
            :key="img"
            type="button"
            class="image-trigger cell"
            :aria-label="`Fig. ${i + 1} — ${t('workDetail.expandImage')}`"
            @click="lightboxIndex = i + 1"
          >
            <img
              :src="img"
              :srcset="buildSrcset(img)"
              sizes="(max-width: 820px) 100vw, 33vw"
              :alt="pick(project.title, locale)"
              loading="lazy"
              class="photo thumb"
            />
            <span class="label thumb-caption">Fig. {{ i + 1 }}</span>
          </button>
        </div>
      </div>

      <RouterLink
        v-if="next"
        :to="path('work-detail', undefined, { slug: next.slug })"
        class="next"
      >
        <span class="label">{{ t('workDetail.next') }}</span>
        <span class="next-title">{{ pick(next.title, locale) }} →</span>
      </RouterLink>
    </div>

    <ImageLightbox
      v-if="lightboxIndex !== null"
      :images="lightboxImages"
      :index="lightboxIndex"
      @update:index="lightboxIndex = $event"
      @close="lightboxIndex = null"
    />
  </section>

  <section v-else class="section">
    <div class="container not-found">
      <h1>{{ t('workDetail.notFoundTitle') }}</h1>
      <p class="text-muted">{{ t('workDetail.notFoundBody') }}</p>
      <BaseButton :to="path('work')">← {{ t('common.backToWork') }}</BaseButton>
    </div>
  </section>
</template>

<style scoped>
.detail {
  padding-top: var(--space-6);
}

.topline {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-ink);
  margin-bottom: var(--space-6);
}

.back:hover {
  text-decoration: underline;
}

.title {
  font-size: clamp(2.75rem, 7vw, 6.5rem);
  max-width: 18ch;
  margin-bottom: var(--space-7);
}

.hero {
  row-gap: var(--space-6);
  margin-bottom: var(--space-9);
}

.hero-image {
  grid-column: span 8;
}

.wall-label {
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding-top: var(--space-4);
  border-top: 2px solid var(--color-ink);
  align-self: start;
}

.summary {
  font-size: var(--font-size-lead);
}

.meta {
  display: flex;
  flex-direction: column;
}

.meta div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-block: 12px;
  border-top: 1px solid var(--color-ink);
}

.meta dt {
  font-size: var(--font-size-2xs);
  color: var(--color-text-faint);
}

.photo {
  width: 100%;
  height: auto;
  object-fit: cover;
  background: var(--color-bg-elevated);
}

.hero-photo {
  aspect-ratio: 4 / 3;
  object-fit: contain;
  /* the box is reserved to stop layout shift; the photo sits top-left in it with no grey fill */
  object-position: left top;
  background: none;
}

.content {
  row-gap: var(--space-7);
  margin-bottom: var(--space-9);
}

.section-label {
  grid-column: span 4;
}

/* label and text share one hairline, like every other block on the site */
.section-label,
.lead-text {
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-ink);
}

.lead-text {
  grid-column: span 8;
}

/* the rule spans the full column; the text keeps a comfortable line length */
.lead-text p {
  font-size: clamp(1.125rem, 1.4vw, 1.3125rem);
  line-height: 1.6;
  max-width: 62ch;
}

.block {
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-ink);
}

.block h2 {
  font-family: var(--font-mono);
  font-weight: 400;
  font-stretch: 100%;
  line-height: 1.4;
}

.block p {
  color: var(--color-text-muted);
}

.gallery {
  margin-bottom: var(--space-9);
}

.gallery-title {
  font-size: var(--display-m);
  margin-bottom: var(--space-6);
}

.gallery-grid {
  row-gap: var(--space-6);
}

.cell {
  grid-column: span 4;
}

.thumb {
  aspect-ratio: 4 / 3;
}

.thumb-caption {
  display: block;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--color-ink);
  font-size: var(--font-size-2xs);
}

.image-trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  text-align: left;
  cursor: zoom-in;
}

.image-trigger:hover .photo {
  opacity: 0.9;
}

.next {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-block: var(--space-6);
  border-top: 2px solid var(--color-ink);
  border-bottom: 1px solid var(--color-ink);
}

.next-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-stretch: 75%;
  text-transform: uppercase;
  font-size: var(--display-l);
  line-height: 0.95;
}

.next:hover .next-title {
  color: var(--color-signal);
}

.not-found {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  align-items: flex-start;
}

@media (max-width: 1024px) {
  .hero-image,
  .wall-label {
    grid-column: 1 / -1;
  }
}

@media (max-width: 820px) {
  .section-label,
  .lead-text,
  .block,
  .cell {
    grid-column: 1 / -1;
  }
  .lead-text {
    padding-top: 0;
    border-top: none;
  }

  .content.narrative {
    row-gap: var(--space-3);
  }
}
</style>
