<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { pick, projects, type Project } from '@/data/projects'
import { buildSrcset } from '@/utils/responsiveImage'
import { useLocalizedPath } from '@/composables/useLocalizedPath'

const props = withDefaults(
  defineProps<{
    project: Project
    /** h2 where cards sit directly under the page h1 (Work page); h3 under a section h2 */
    headingLevel?: 'h2' | 'h3'
    /** CSS aspect-ratio for the photo crop */
    ratio?: string
    sizes?: string
  }>(),
  {
    ratio: '4 / 3',
    headingLevel: 'h3',
    sizes: '(max-width: 820px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
)

const { locale } = useI18n()
const { path } = useLocalizedPath()

// Catalogue number = position in the project list, so it is stable across pages.
const number = computed(() => String(projects.indexOf(props.project) + 1).padStart(2, '0'))
</script>

<template>
  <RouterLink :to="path('work-detail', undefined, { slug: project.slug })" class="card">
    <div class="frame">
      <img
        :src="project.heroImage"
        :srcset="buildSrcset(project.heroImage)"
        :sizes="sizes"
        :alt="pick(project.title, locale)"
        :style="{ aspectRatio: ratio }"
        loading="lazy"
        class="photo"
      />
    </div>
    <div class="title-row">
      <component :is="headingLevel" class="card-title">{{ pick(project.title, locale) }}</component>
      <span class="label">No. {{ number }} · {{ project.year }}</span>
    </div>
    <p class="summary text-muted">{{ pick(project.summary, locale) }}</p>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
}

.frame {
  overflow: hidden;
}

.photo {
  width: 100%;
  object-fit: cover;
  background: var(--color-bg-elevated);
  transition: transform 0.4s ease;
}

.card:hover .photo {
  transform: scale(1.02);
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-4);
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.title-row .label {
  white-space: nowrap;
  font-size: var(--font-size-2xs);
}

.card-title {
  font-size: var(--font-size-lg);
}

.card:hover .card-title {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}

.summary {
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  max-width: 36rem;
}
</style>
