<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocalizedPath } from '@/composables/useLocalizedPath'
import type { Locale, PageKey } from '@/router/segments'

const { t, locale } = useI18n()
const router = useRouter()
const { path, localeSwitchPath } = useLocalizedPath()
const isMenuOpen = ref(false)

const navKeys: PageKey[] = ['work', 'services', 'about', 'contact']

function switchLocale(next: Locale) {
  router.push(localeSwitchPath(next))
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container bar">
      <RouterLink :to="path('home')" class="wordmark" @click="closeMenu">
        <span class="mark" aria-hidden="true">D</span>
        <span class="name">DIKB</span>
      </RouterLink>

      <div class="menu" :class="{ open: isMenuOpen }">
        <nav class="nav">
          <RouterLink
            v-for="key in navKeys"
            :key="key"
            :to="path(key)"
            class="nav-link label"
            @click="closeMenu"
          >
            {{ t(`nav.${key}`) }}
          </RouterLink>
        </nav>

        <div class="actions">
          <div class="lang-switch label">
            <button type="button" :class="{ active: locale === 'en' }" @click="switchLocale('en')">
              EN
            </button>
            <span aria-hidden="true">/</span>
            <button type="button" :class="{ active: locale === 'lv' }" @click="switchLocale('lv')">
              LV
            </button>
          </div>
          <RouterLink :to="path('contact')" class="cta label" @click="closeMenu"
            >{{ t('nav.cta') }} →</RouterLink
          >
        </div>
      </div>

      <button
        type="button"
        class="menu-toggle label"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        {{ isMenuOpen ? t('nav.close') : t('nav.menu') }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--color-paper);
  border-bottom: 1px solid var(--color-ink);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  padding-block: 14px;
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 20px;
}

.name {
  font-family: var(--font-display);
  font-weight: 800;
  font-stretch: 112%;
  font-size: 18px;
  letter-spacing: 0.02em;
}

.menu {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  padding-left: var(--space-7);
}

.nav {
  display: flex;
  gap: var(--space-6);
}

.nav-link {
  padding-block: 4px;
  border-bottom: 2px solid transparent;
}

.nav-link:hover,
.nav-link.router-link-active {
  border-bottom-color: var(--color-ink);
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.lang-switch {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-faint);
}

.lang-switch button {
  border: none;
  background: none;
  font: inherit;
  letter-spacing: inherit;
  color: var(--color-text-faint);
  min-height: 44px;
  padding-inline: 4px;
}

.lang-switch button.active {
  color: var(--color-ink);
  font-weight: 500;
}

.cta {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: 18px;
  background: var(--color-ink);
  color: var(--color-paper);
  white-space: nowrap;
}

.cta:hover {
  background: var(--color-signal);
  color: var(--color-ink);
}

.menu-toggle {
  display: none;
  min-height: 44px;
  min-width: 64px;
  border: 1px solid var(--color-ink);
  background: none;
  color: var(--color-ink);
}

@media (max-width: 900px) {
  .menu-toggle {
    display: block;
  }

  .menu {
    display: none;
  }

  .menu.open {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-5);
    padding: var(--space-5) 20px;
    background: var(--color-paper);
    border-bottom: 1px solid var(--color-ink);
  }

  .menu.open .nav {
    flex-direction: column;
    gap: 0;
  }

  .menu.open .nav-link {
    font-size: var(--font-size-md);
    padding-block: 12px;
    border-bottom: 1px solid var(--color-ink);
  }

  .menu.open .actions {
    justify-content: space-between;
  }
}
</style>
