/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cloudflare Turnstile public site key; the widget is hidden when unset. */
  readonly VITE_TURNSTILE_SITE_KEY?: string
}
