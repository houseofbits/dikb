<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { company } from '@/data/company'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type ErrorKind = 'validation' | 'rate' | 'captcha' | 'send'

const { t, locale } = useI18n()

usePageMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description'),
})

const form = reactive({ name: '', organization: '', email: '', message: '', website: '' })
const status = ref<Status>('idle')
const errorKind = ref<ErrorKind>('send')
const invalidFields = ref<string[]>([])
// Set on mount (client only) so the server can reject instant, bot-speed submits.
const startedAt = ref(0)

// Cloudflare Turnstile captcha, enabled only when a site key is configured at build time.
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
const captchaEl = ref<HTMLElement | null>(null)
const captchaToken = ref('')
let widgetId: string | undefined

interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string
  reset: (id?: string) => void
  remove: (id?: string) => void
}

function loadTurnstile(): Promise<TurnstileApi> {
  const w = window as unknown as { turnstile?: TurnstileApi }
  if (w.turnstile) return Promise.resolve(w.turnstile)
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => (w.turnstile ? resolve(w.turnstile) : reject(new Error('turnstile')))
    script.onerror = () => reject(new Error('turnstile'))
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  startedAt.value = Date.now()
  if (!turnstileSiteKey) return
  try {
    const turnstile = await loadTurnstile()
    if (!captchaEl.value) return
    widgetId = turnstile.render(captchaEl.value, {
      sitekey: turnstileSiteKey,
      language: locale.value,
      callback: (token: string) => (captchaToken.value = token),
      'expired-callback': () => (captchaToken.value = ''),
      'error-callback': () => (captchaToken.value = ''),
    })
  } catch {
    // Captcha script blocked or offline: the server rejects the submit and the user sees the error.
  }
})

onBeforeUnmount(() => {
  const w = window as unknown as { turnstile?: TurnstileApi }
  if (widgetId !== undefined) w.turnstile?.remove(widgetId)
})

function resetCaptcha() {
  captchaToken.value = ''
  const w = window as unknown as { turnstile?: TurnstileApi }
  if (widgetId !== undefined) w.turnstile?.reset(widgetId)
}

const errorMessage = computed(() => t(`contact.error.${errorKind.value}`))

async function handleSubmit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  invalidFields.value = []
  try {
    const response = await fetch('/api/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        locale: locale.value,
        startedAt: startedAt.value,
        captcha: captchaToken.value,
      }),
    })
    const result = (await response.json().catch(() => ({}))) as {
      ok?: boolean
      error?: string
      fields?: string[]
    }
    if (response.ok && result.ok) {
      status.value = 'sent'
      Object.assign(form, { name: '', organization: '', email: '', message: '', website: '' })
      return
    }
    const kinds: ErrorKind[] = ['validation', 'rate', 'captcha']
    errorKind.value = kinds.find((k) => k === result.error) ?? 'send'
    invalidFields.value = result.fields ?? []
    status.value = 'error'
    resetCaptcha()
  } catch {
    errorKind.value = 'send'
    status.value = 'error'
    resetCaptcha()
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeading
        level="h1"
        :eyebrow="t('contact.eyebrow')"
        :title="t('contact.title')"
        :subtitle="t('contact.subtitle')"
      />

      <div class="grid-12 contact">
        <div class="details">
          <h2 class="label">{{ t('contact.detailsTitle') }}</h2>
          <div class="detail-row">
            <span class="label muted">{{ t('contact.emailLabel') }}</span>
            <a :href="`mailto:${company.email}`">{{ company.email }}</a>
          </div>
          <div class="detail-row">
            <span class="label muted">{{ t('contact.phoneLabel') }}</span>
            <a :href="`tel:${company.phone}`">{{ company.phoneDisplay }}</a>
          </div>
          <div class="detail-row">
            <span class="label muted">{{ t('contact.addressLabel') }}</span>
            <span>{{ company.address.line }}, {{ company.address.postalCode }}</span>
          </div>
        </div>

        <div v-if="status === 'sent'" class="form sent" role="status">
          <p class="sent-title">{{ t('contact.sentTitle') }}</p>
          <p class="text-muted">{{ t('contact.sentBody') }}</p>
          <button type="button" class="again label" @click="status = 'idle'">
            {{ t('contact.sendAnother') }}
          </button>
        </div>

        <form v-else class="form" @submit.prevent="handleSubmit">
          <label class="field" :class="{ invalid: invalidFields.includes('name') }">
            <span class="label">{{ t('contact.formName') }} <span aria-hidden="true">*</span></span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              maxlength="200"
              required
              :aria-invalid="invalidFields.includes('name')"
            />
          </label>
          <label class="field">
            <span class="label">{{ t('contact.formOrg') }}</span>
            <input
              v-model="form.organization"
              type="text"
              name="organization"
              autocomplete="organization"
              maxlength="200"
            />
          </label>
          <label class="field" :class="{ invalid: invalidFields.includes('email') }">
            <span class="label"
              >{{ t('contact.formEmail') }} <span aria-hidden="true">*</span></span
            >
            <input
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              maxlength="254"
              required
              :aria-invalid="invalidFields.includes('email')"
            />
          </label>
          <label class="field" :class="{ invalid: invalidFields.includes('message') }">
            <span class="label"
              >{{ t('contact.formMessage') }} <span aria-hidden="true">*</span></span
            >
            <textarea
              v-model="form.message"
              name="message"
              rows="6"
              maxlength="5000"
              required
              :aria-invalid="invalidFields.includes('message')"
            ></textarea>
          </label>

          <!-- Honeypot: invisible to people and screen readers; bots tend to fill every field. -->
          <div class="honeypot" aria-hidden="true">
            <label>
              Website
              <input
                v-model="form.website"
                type="text"
                name="website"
                tabindex="-1"
                autocomplete="off"
              />
            </label>
          </div>

          <div v-if="turnstileSiteKey" ref="captchaEl" class="captcha"></div>

          <div class="form-foot">
            <button type="submit" class="submit label" :disabled="status === 'sending'">
              {{ status === 'sending' ? t('contact.sending') : `${t('contact.formSubmit')} →` }}
            </button>
            <p v-if="status === 'error'" class="error" role="alert">{{ errorMessage }}</p>
          </div>
          <p class="note text-muted">{{ t('contact.formNote') }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  row-gap: var(--space-7);
  align-items: start;
}

.details {
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  padding-top: var(--space-4);
  border-top: 2px solid var(--color-ink);
  gap: var(--space-5);
}

.details h2 {
  font-family: var(--font-mono);
  font-weight: 400;
  font-stretch: 100%;
  line-height: 1.4;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: var(--font-size-md);
}

.detail-row a:hover {
  text-decoration: underline;
}

.muted {
  color: var(--color-text-faint);
  font-size: var(--font-size-2xs);
}

.form {
  grid-column: 6 / span 7;
  display: flex;
  flex-direction: column;
  border-top: 2px solid var(--color-ink);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-ink);
}

.field input,
.field textarea {
  font: inherit;
  font-size: var(--font-size-md);
  padding: 8px 0;
  border: none;
  background: transparent;
  color: var(--color-text);
  resize: vertical;
}

.field input:focus-visible,
.field textarea:focus-visible {
  outline: none;
}

.field:focus-within {
  border-bottom: 2px solid var(--color-signal);
}

.field.invalid {
  border-bottom: 2px solid var(--color-signal-ink);
}

.field.invalid .label {
  color: var(--color-signal-ink);
}

.captcha {
  min-height: 65px;
}

.honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.form-foot {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-5);
}

.submit,
.again {
  min-height: 52px;
  padding-inline: 24px;
  border: none;
  background: var(--color-ink);
  color: var(--color-paper);
}

.submit:hover:not(:disabled),
.again:hover {
  background: var(--color-signal);
  color: var(--color-ink);
}

.submit:disabled {
  opacity: 0.6;
  cursor: progress;
}

.error {
  color: var(--color-signal-ink);
  font-size: var(--font-size-sm);
}

.note {
  margin-top: var(--space-4);
  font-size: var(--font-size-xs);
}

.sent {
  gap: var(--space-4);
  padding-top: var(--space-5);
  align-items: flex-start;
}

.sent-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-stretch: 75%;
  text-transform: uppercase;
  font-size: var(--display-m);
  line-height: 1;
}

@media (max-width: 820px) {
  .details,
  .form {
    grid-column: 1 / -1;
  }
}
</style>
