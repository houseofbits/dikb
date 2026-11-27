<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { pick, projects } from '@/data/projects'
import { usePageMeta } from '@/composables/usePageMeta'

const { t, locale } = useI18n()

usePageMeta({ title: () => t('seo.work.title'), description: () => t('seo.work.description') })

const categories = computed(() => {
  const seen = new Map<string, string>()
  for (const project of projects) {
    seen.set(project.category.en, pick(project.category, locale.value))
  }
  return Array.from(seen.entries())
})

const activeCategory = ref<string | null>(null)

const filteredProjects = computed(() =>
  activeCategory.value
    ? projects.filter((project) => project.category.en === activeCategory.value)
    : projects,
)
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeading
        level="h1"
        :eyebrow="t('work.eyebrow')"
        :title="t('work.title')"
        :subtitle="t('work.subtitle')"
      />

      <div class="filters label" role="group" :aria-label="t('work.eyebrow')">
        <button
          type="button"
          :aria-pressed="activeCategory === null"
          @click="activeCategory = null"
        >
          {{ t('common.allProjects') }} <span class="count">{{ projects.length }}</span>
        </button>
        <button
          v-for="[key, label] in categories"
          :key="key"
          type="button"
          :aria-pressed="activeCategory === key"
          @click="activeCategory = key"
        >
          {{ label }}
          <span class="count">{{ projects.filter((p) => p.category.en === key).length }}</span>
        </button>
      </div>

      <div class="grid-12 project-grid">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.slug"
          :project="project"
          heading-level="h2"
          class="cell"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-6);
  margin-bottom: var(--space-7);
  border-top: 1px solid var(--color-ink);
  border-bottom: 1px solid var(--color-ink);
}

.filters button {
  min-height: 52px;
  border: none;
  border-bottom: 3px solid transparent;
  background: none;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: var(--color-text-faint);
}

.filters button:hover {
  color: var(--color-ink);
}

.filters button[aria-pressed='true'] {
  color: var(--color-ink);
  border-bottom-color: var(--color-signal);
}

.count {
  margin-left: 4px;
  font-size: var(--font-size-2xs);
  vertical-align: super;
}

.project-grid {
  row-gap: var(--space-8);
}

.cell {
  grid-column: span 4;
}

@media (max-width: 1024px) {
  .cell {
    grid-column: span 6;
  }
}

@media (max-width: 640px) {
  .cell {
    grid-column: 1 / -1;
  }
}
</style>
