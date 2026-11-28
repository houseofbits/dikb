<script setup lang="ts">
// A photograph with a museum-style wall label underneath: a hairline rule,
// then the caption on the left and its meta (category · year) on the right.
import { buildSrcset } from '@/utils/responsiveImage'

withDefaults(
  defineProps<{
    src: string
    alt: string
    caption?: string
    meta?: string
    /** CSS aspect-ratio for the crop, e.g. "3 / 2" */
    ratio?: string
    sizes?: string
    eager?: boolean
  }>(),
  {
    ratio: '3 / 2',
    sizes: '(max-width: 820px) 100vw, 50vw',
  },
)
</script>

<template>
  <figure class="figure">
    <img
      :src="src"
      :srcset="buildSrcset(src)"
      :sizes="sizes"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      :style="{ aspectRatio: ratio }"
      class="photo"
    />
    <figcaption v-if="caption || meta" class="caption label">
      <span>{{ caption }}</span>
      <span>{{ meta }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.figure {
  margin: 0;
}

.photo {
  width: 100%;
  object-fit: cover;
  background: var(--color-bg-elevated);
}

.caption {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--color-border);
  font-size: var(--font-size-2xs);
}
</style>
