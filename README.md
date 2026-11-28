# DIKB — Design and Interior Consultation Bureau

Portfolio site for a studio designing interactive touchscreen exhibits for museums,
science centers and cultural institutions.

Vue 3 + Vite + TypeScript, bilingual (English/Latvian) via `vue-i18n`, no CSS
framework — a small design-token system in `src/assets/styles/`.

Project data (case studies, services) lives in `src/data/*.ts` as typed,
bilingual placeholder content — swap in real project copy and screenshots
there once available.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with ESLint + oxlint

```sh
npm run lint
```

Requires Node ^22.18.0 or >=24.12.0 (see `engines` in `package.json`).

## Contact form

The form on the Contact page posts JSON to `public/api/contact.php`, which is
copied into `dist/api/` on build and sends the enquiry with PHP's `mail()`.

- **Hosting:** needs PHP 8.1+ with a working `mail()` (standard on shared
  hosting).
- **Settings** (environment variables, all optional): `CONTACT_TO`
  (recipient), `CONTACT_FROM` (sender, default `noreply@dizainsuninterjers.lv`),
  `CONTACT_ORIGINS` (allowed origins, default the production domain with and
  without `www`).
- **Deliverability:** the sender domain needs SPF (and ideally DKIM) records
  that authorise the hosting server, otherwise Gmail may file enquiries as spam.
- **Local development:** run `php -S localhost:8000 -t public` next to
  `npm run dev`; Vite proxies `/api` to it. Locally, `mail()` only works if
  your machine has a mail transport configured.

## Fonts

Archivo, Inter and IBM Plex Mono are self-hosted from `public/fonts/`
(latin + latin-ext subsets, SIL OFL 1.1). No requests go to Google.
