<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  images: { src: string; alt: string }[]
  index: number
}>()

const emit = defineEmits<{
  'update:index': [index: number]
  close: []
}>()

const { t } = useI18n()

const current = computed(() => props.images[props.index]!)

function go(delta: number) {
  const total = props.images.length
  emit('update:index', (props.index + delta + total) % total)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
  else if (event.key === 'ArrowLeft') go(-1)
  else if (event.key === 'ArrowRight') go(1)
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="images.length > 0"
        class="lightbox-overlay"
        role="dialog"
        aria-modal="true"
        @click.self="emit('close')"
      >
        <button type="button" class="control close" :aria-label="t('lightbox.close')" @click="emit('close')">
          ✕
        </button>

        <button
          v-if="images.length > 1"
          type="button"
          class="control prev"
          :aria-label="t('lightbox.previous')"
          @click="go(-1)"
        >
          ‹
        </button>

        <img :src="current.src" :alt="current.alt" class="lightbox-image" />

        <button
          v-if="images.length > 1"
          type="button"
          class="control next"
          :aria-label="t('lightbox.next')"
          @click="go(1)"
        >
          ›
        </button>

        <span v-if="images.length > 1" class="counter">
          {{ t('lightbox.counter', { current: index + 1, total: images.length }) }}
        </span>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 8, 16, 0.92);
  backdrop-filter: blur(6px);
}

.lightbox-image {
  max-width: min(90vw, 1400px);
  max-height: 86vh;
  object-fit: contain;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-elevated);
}

.control {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.control:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-accent);
}

.close {
  top: var(--space-6);
  right: var(--space-6);
  width: 44px;
  height: 44px;
  font-size: 1.1rem;
}

.prev,
.next {
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  font-size: 1.8rem;
  line-height: 1;
}

.prev {
  left: var(--space-6);
}

.next {
  right: var(--space-6);
}

.counter {
  position: absolute;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .prev,
  .next {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
  }

  .prev {
    left: var(--space-3);
  }

  .next {
    right: var(--space-3);
  }

  .close {
    top: var(--space-3);
    right: var(--space-3);
  }
}
</style>
