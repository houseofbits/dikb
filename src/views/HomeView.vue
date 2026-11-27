<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ProcessStep from '@/components/ui/ProcessStep.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import WallLabelImage from '@/components/ui/WallLabelImage.vue'
import { getProjectBySlug, pick, projects, type Project } from '@/data/projects'
import { services } from '@/data/services'
import { useLocalizedPath } from '@/composables/useLocalizedPath'
import { usePageMeta } from '@/composables/usePageMeta'

const { t, locale, tm } = useI18n()
const { path } = useLocalizedPath()

function bySlug(slug: string): Project {
  const project = getProjectBySlug(slug)
  if (!project) throw new Error(`Unknown project slug: ${slug}`)
  return project
}

// Curated rather than shuffled: the layout pairs specific crops (wide / tall).
const heroPair = [bySlug('staro-riga-2019'), bySlug('birds-museum-kiosk')] as const
const featured = [
  { project: bySlug('sea-life-baltic-sea-exhibit'), span: 'wide', ratio: '16 / 9' },
  { project: bySlug('rqr'), span: 'narrow', ratio: '3 / 4' },
  { project: bySlug('selfie-booth'), span: 'narrow', ratio: '3 / 4' },
  { project: bySlug('unbalanced-force'), span: 'wide', ratio: '3 / 2' },
] as const

const indexRows = computed(() =>
  projects.map((project, i) => ({
    project,
    number: String(i + 1).padStart(2, '0'),
    title: pick(project.title, locale.value),
    category: pick(project.category, locale.value),
    client: pick(project.client, locale.value),
  })),
)
const years = projects.map((project) => Number(project.year))
const yearRange = `${Math.min(...years)}–${Math.max(...years)}`

const serviceLetters = 'ABCDEFGH'
const processSteps = computed(() => tm('process.steps') as { title: string; description: string }[])

usePageMeta({ title: () => t('seo.home.title'), description: () => t('seo.home.description') })
</script>

<template>
  <!-- Hero -->
  <section class="hero container grid-12">
    <div class="hero-meta label">
      <span>{{ t('home.heroEyebrow') }}</span>
      <span>{{ t('home.heroLocation') }}</span>
    </div>
    <h1 class="hero-title">
      {{ t('home.heroTitlePre') }}<span class="signal">{{ t('home.heroTitleHighlight') }}</span
      >{{ t('home.heroTitlePost') }}
    </h1>
    <div class="hero-lead">
      <p>{{ t('home.heroSubtitle') }}</p>
      <div class="hero-actions">
        <BaseButton :to="path('work')">{{ t('home.heroCtaPrimary') }} →</BaseButton>
        <BaseButton :to="path('contact')" variant="secondary">{{
          t('home.heroCtaSecondary')
        }}</BaseButton>
      </div>
    </div>
    <dl class="hero-stats">
      <div>
        <dt class="label">{{ t('home.heroStatProjects') }}</dt>
        <dd>15+</dd>
      </div>
      <div>
        <dt class="label">{{ t('home.heroStatYears') }}</dt>
        <dd>12</dd>
      </div>
    </dl>
  </section>

  <section class="container grid-12 hero-images">
    <RouterLink
      v-for="(project, i) in heroPair"
      :key="project.slug"
      :to="path('work-detail', undefined, { slug: project.slug })"
      :class="i === 0 ? 'span-7' : 'span-5'"
    >
      <WallLabelImage
        :src="project.heroImage"
        :alt="pick(project.title, locale)"
        :caption="pick(project.title, locale)"
        :meta="`${pick(project.category, locale)} · ${project.year}`"
        :sizes="i === 0 ? '(max-width: 820px) 100vw, 58vw' : '(max-width: 820px) 100vw, 42vw'"
        :eager="i === 0"
      />
    </RouterLink>
  </section>

  <!-- Selected work -->
  <section class="section on-ink">
    <div class="container">
      <SectionHeading
        :index="1"
        :eyebrow="t('home.featuredEyebrow')"
        :title="t('home.featuredTitle')"
      />
      <div class="grid-12 featured">
        <ProjectCard
          v-for="item in featured"
          :key="item.project.slug"
          :project="item.project"
          :ratio="item.ratio"
          :class="item.span === 'wide' ? 'span-8' : 'span-4'"
          :sizes="
            item.span === 'wide'
              ? '(max-width: 820px) 100vw, 66vw'
              : '(max-width: 820px) 100vw, 33vw'
          "
        />
      </div>
    </div>
  </section>

  <!-- Index of works -->
  <section class="section container">
    <div class="index-head">
      <h2>{{ t('home.indexTitle') }}</h2>
      <span class="label">{{
        t('home.indexMeta', { count: projects.length, range: yearRange })
      }}</span>
    </div>
    <ol class="index">
      <li v-for="row in indexRows" :key="row.project.slug">
        <RouterLink
          :to="path('work-detail', undefined, { slug: row.project.slug })"
          class="index-row"
        >
          <span class="label">{{ row.number }}</span>
          <span class="index-title">{{ row.title }}</span>
          <span class="text-muted hide-mobile">{{ row.category }}</span>
          <span class="text-muted hide-mobile">{{ row.client }}</span>
          <span class="label index-year">{{ row.project.year }}</span>
        </RouterLink>
      </li>
    </ol>
  </section>

  <!-- Services -->
  <section class="section rule-top">
    <div class="container">
      <SectionHeading
        :index="2"
        :eyebrow="t('home.servicesEyebrow')"
        :title="t('home.servicesTitle')"
      />
      <div class="grid-12 services">
        <div v-for="(service, i) in services" :key="service.title.en" class="service span-4">
          <span class="label service-letter">{{ serviceLetters[i] }}</span>
          <h3>{{ pick(service.title, locale) }}</h3>
          <p class="text-muted">{{ pick(service.description, locale) }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="section on-signal">
    <div class="container">
      <SectionHeading
        :index="3"
        :eyebrow="t('home.processEyebrow')"
        :title="t('home.processTitle')"
        :subtitle="t('home.processSubtitle')"
      />
      <div class="grid-12 process">
        <ProcessStep
          v-for="(step, index) in processSteps"
          :key="step.title"
          class="span-3"
          :index="index + 1"
          :title="step.title"
          :description="step.description"
        />
      </div>
    </div>
  </section>

  <!-- About -->
  <section class="section container grid-12 about">
    <span class="label span-4">§ 04 — {{ t('nav.about') }}</span>
    <div class="span-8 about-copy">
      <p class="about-story">{{ t('about.storyBody') }}</p>
      <BaseButton :to="path('about')" variant="secondary">{{ t('nav.about') }} →</BaseButton>
    </div>
  </section>
</template>

<style scoped>
.span-3 {
  grid-column: span 3;
}
.span-4 {
  grid-column: span 4;
}
.span-5 {
  grid-column: span 5;
}
.span-7 {
  grid-column: span 7;
}
.span-8 {
  grid-column: span 8;
}

/* hero */
.hero {
  row-gap: var(--space-6);
  align-items: end;
  padding-block: var(--space-7) var(--space-6);
}

.hero-meta {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.hero-title {
  grid-column: 1 / -1;
  font-size: var(--display-xl);
  line-height: 0.88;
}

.signal {
  color: var(--color-signal);
}

.hero-lead {
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.hero-lead p {
  font-size: var(--font-size-lead);
  color: var(--color-text-muted);
  max-width: 34rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.hero-stats {
  grid-column: 9 / span 4;
  display: flex;
  gap: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-ink);
}

.hero-stats div {
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
}

.hero-stats dd {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 3rem;
  line-height: 1;
}

.hero-images {
  row-gap: var(--space-5);
  padding-bottom: var(--space-9);
}

/* featured */
.featured {
  row-gap: var(--space-7);
}

/* index */
.index-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.index-head h2 {
  font-size: var(--display-m);
}

.index {
  list-style: none;
  border-top: 2px solid var(--color-ink);
}

.index-row {
  display: grid;
  grid-template-columns: 64px minmax(0, 3fr) minmax(0, 2fr) minmax(0, 2fr) 64px;
  gap: var(--gutter);
  align-items: baseline;
  padding-block: 16px;
  border-bottom: 1px solid var(--color-ink);
  transition: background 0.15s ease;
}

.index-row:hover {
  background: var(--color-surface-hover);
}

.index-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
}

.index-year {
  text-align: right;
}

/* services */
.rule-top {
  border-top: 1px solid var(--color-ink);
}

.services {
  row-gap: var(--space-7);
}

.service {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-ink);
}

.service-letter {
  color: var(--color-signal-ink);
}

.service h3 {
  font-size: var(--font-size-lg);
}

/* process */
.process {
  row-gap: var(--space-7);
}

/* about */
.about {
  row-gap: var(--space-5);
}

.about-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-6);
}

.about-story {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.5rem, 2.6vw, 2.25rem);
  line-height: 1.25;
}

@media (max-width: 1024px) {
  .hero-lead,
  .hero-stats {
    grid-column: 1 / -1;
  }

  .span-3 {
    grid-column: span 6;
  }
}

@media (max-width: 820px) {
  .span-3,
  .span-4,
  .span-5,
  .span-7,
  .span-8 {
    grid-column: 1 / -1;
  }

  .index-row {
    grid-template-columns: 36px minmax(0, 1fr) 48px;
  }

  .hide-mobile {
    display: none;
  }
}
</style>
