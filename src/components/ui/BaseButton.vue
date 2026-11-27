<script setup lang="ts">
withDefaults(
  defineProps<{
    /** primary: ink block · secondary: outlined · signal: orange block (use on dark bands) */
    variant?: 'primary' | 'secondary' | 'signal'
    to?: string
    href?: string
  }>(),
  {
    variant: 'primary',
  },
)
</script>

<template>
  <RouterLink v-if="to" :to="to" class="btn label" :class="variant">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" class="btn label" :class="variant">
    <slot />
  </a>
  <button v-else type="button" class="btn label" :class="variant">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 48px;
  padding-inline: 22px;
  border: 1px solid var(--color-text);
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.primary {
  background: var(--color-text);
  color: var(--color-bg);
}

.primary:hover {
  background: var(--color-signal);
  border-color: var(--color-signal);
  color: var(--color-ink);
}

.secondary {
  background: transparent;
  color: var(--color-text);
}

.secondary:hover {
  background: var(--color-text);
  color: var(--color-bg);
}

.signal {
  background: var(--color-signal);
  border-color: var(--color-signal);
  color: var(--color-ink);
}

.signal:hover {
  background: var(--color-paper);
  border-color: var(--color-paper);
}
</style>
