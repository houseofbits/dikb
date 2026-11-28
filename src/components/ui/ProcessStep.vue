<script setup lang="ts">
defineProps<{
  index: number
  title: string
  description: string
}>()
</script>

<template>
  <div class="step">
    <span class="index" aria-hidden="true">{{ index }}</span>
    <h3>{{ title }}</h3>
    <p class="text-muted">{{ description }}</p>
  </div>
</template>

<style scoped>
.step {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 2px solid var(--color-text);
}

.index {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 4rem;
  line-height: 1;
  margin-bottom: var(--space-2);
}

h3 {
  font-size: var(--font-size-lg);
}

p {
  font-size: var(--font-size-base);
}
</style>
