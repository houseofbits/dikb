<script setup lang="ts">
// Section opener: a mono "§ 01 — Label" in the left four columns, the
// condensed headline (and optional lead) in the right eight.
withDefaults(
  defineProps<{
    eyebrow?: string
    /** Section number, rendered as "§ 01". Omit for unnumbered sections. */
    index?: number
    title: string
    subtitle?: string
    /** h1 for page openers, h2 for sections within a page */
    level?: 'h1' | 'h2'
  }>(),
  {
    level: 'h2',
  },
)
</script>

<template>
  <div class="heading grid-12">
    <span class="eyebrow">
      <template v-if="index !== undefined">§ {{ String(index).padStart(2, '0') }} — </template
      >{{ eyebrow }}
    </span>
    <div class="copy">
      <component :is="level" class="title" :class="level">{{ title }}</component>
      <p v-if="subtitle" class="subtitle text-muted">{{ subtitle }}</p>
    </div>
  </div>
</template>

<style scoped>
.heading {
  row-gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.eyebrow {
  grid-column: span 4;
  padding-top: 0.5em;
}

.copy {
  grid-column: span 8;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.title.h2 {
  font-size: var(--display-l);
}

.title.h1 {
  font-size: clamp(3rem, 7vw, 6.5rem);
}

.subtitle {
  font-size: var(--font-size-lead);
  max-width: 38rem;
}

@media (max-width: 820px) {
  .eyebrow,
  .copy {
    grid-column: 1 / -1;
  }
}
</style>
