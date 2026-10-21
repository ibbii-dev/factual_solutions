# Factual Solutions: website

Read this before every task.

## Status

- Design: the "classic" look (restored 2026-10-21 at the owner's request, from the earlier production build at commit 9349668): light glowing canvas, white `fs-card` cards with icon tiles, Plus Jakarta Sans headings, navy gradient panels and a navy footer. Work happens on branch `classic`; the owner merges it into `main` on GitHub (Vercel deploys `main` to production). The `modern` design (deep navy heroes) was replaced; do not bring it back.
- Pages: home, `/services`, `/services/<line>`, `/services/<service>`, `/about`, `/what-we-think`, `/case-studies`, `/contact`, `/blog`, `/blog/<slug>`, client portal (`/portal`), admin (`/admin`).
- `/contact?topic=consulting|training|digital` preselects a service on the form. `/services?line=training` preselects a catalogue tab.
- Form spam protection: honeypot, link filter and a send limit (`lib/formGuard.ts`, also used by the newsletter and client follow-ups). reCAPTCHA adds the checkbox once `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` are set (not set yet).
- Inquiry ids come from the `counters` collection (`dbNextInquiryId`), never from counting inquiries.
- Vercel Preview has its own database (`factual_solutions_preview`). Production has `MONGODB_URI`, `MONGODB_DB_NAME`, `ADMIN_PASSWORD`, `NOTIFICATION_EMAIL` (no `RESEND_API_KEY` yet, so lead emails are not sent).
- Deploys: Claude may not push to `main` or deploy to production. Push the working branch and make a preview (`npx vercel deploy --yes`, never `--prod`); the owner merges on GitHub.

## Colours

Brand palette (exact logo colours) in `tailwind.config.ts`: navy `#25346B`, steel `#9BB3D9`, rust `#9B391E`, ink text `#0E1A38`, paper `#F6F8FC`; `night-*` is the midnight-navy dark theme.

- Site components use the brand palette with `dark:` variants (`text-ink dark:text-white`, `bg-navy`, `text-rust dark:text-rust-light`, `bg-paper dark:bg-night-900/60`, `border-paper-line dark:border-white/10`).
- Theme tokens in `src/styles/tokens.css` (`bg`, `surface`, `band`, `line`, `ink`, `heading`, `muted`, `primary`, `action`, `accent`, status colours) carry the same colours and switch with the theme; the admin panel, contact form and blog use them. Note `ink` is a token: it turns light in dark mode, so never use `bg-ink` behind white text (use `bg-navy`).
- Shared classes in `globals.css`: `fs-card` (+ `fs-card-hover`, `fs-topbar`), `fs-icon`, `fs-check`, `fs-pill`, `fs-label`, `fs-glow`, `fs-input`, `btn-primary` (rust), `btn-secondary`, `link-arrow`. Navy panels use `bg-gradient-to-br from-[#0E1A38] via-[#1A2756] to-[#25346B]` with a `bg-brand-tri` top bar.
- Theme: `<html data-theme="light|dark">`, set before paint by the inline script in `app/layout.tsx` (`localStorage` key `fs-theme`, otherwise the device setting).

## Typography

- Plus Jakarta Sans (`--font-display`, `.font-display`, headings), Inter for text, Tajawal for Arabic. Loaded with `next/font/google` in `app/layout.tsx`. Do not add other fonts.

## Layout and shared parts

- Public pages live in `src/app/(site)/` and share `(site)/layout.tsx`: `Navbar`, `<main id="main">`, `Footer` (newsletter sign-up), floating `WhatsAppButton`, `ScrollProgress`, the client sign-in modal and `RevealObserver`. The admin panel stays outside this group.
- Every inner page starts with `components/ui/PageHeader.tsx` (pill, big title, lede, optional `crumbs`), placed inside the page's `max-w-7xl` container.
- Menu: What we do (dropdown, `/services`), What we think, Who we are, Case studies, Blog. No Contact item; "Request Consultation" goes to `/contact`. Links and contact details come from `src/data/navigation.ts` (which reads `companyData.ts`).
- Services: `components/services/ServiceCatalog.tsx` (tabs, search, cards; `only` for line pages), `ApproachPanel.tsx`, `ServiceMatcherQuiz.tsx` (`/services#quiz`). Content from `src/data/servicesData.ts` via `src/data/servicePages.ts`. Pages stay server-rendered with metadata and JSON-LD.
- Scroll reveal: add `data-reveal` (optional `--d` delay).
- Case studies are posted from the admin panel (Case Studies tab, `components/admin/CaseStudiesManager.tsx`), stored in MongoDB `case_studies`, served by `/api/case-studies` (staff-only writes, checked by `lib/caseStudyInput.ts`) and shown at `/case-studies` and `/case-studies/<slug>` ("coming soon" while none are published). Never invent results.
- Blog articles have a sidebar (`components/blog/BlogSidebar.tsx`: search, categories, recent articles, newsletter). No comments section yet.

## Extras

- Language switcher: every non-English language is Google machine translation (`googtrans` cookie, `lib/i18n.ts`, `components/i18n/GoogleTranslateLoader.tsx`); Arabic and Urdu switch the page to RTL. Site copy is English only; `useLanguage()` always returns English text.
- Client sign-in: Google only, verified on the server (`/api/auth/google` checks the token's audience and verified email, then sets the signed `fs_client` cookie). Needs `NEXT_PUBLIC_GOOGLE_CLIENT_ID` on Vercel; until then the modal says "coming soon". Signed-in clients see their own inquiries at `/portal` and can add follow-ups (stored as internal notes, ownership checked by email).

## Security

- The GitHub repo is public. Never commit passwords, keys or `.env*` files, and never hardcode credentials or defaults for them (an old `admin123` default is visible in history; the password was rotated on 2026-10-20).
- Admin credentials come only from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (env vars, set per environment on Vercel).
- Never trust the browser for identity: no client-side "logins", no open upsert endpoints.

## Stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3, MongoDB, Vercel.

## Commands

- `npm run dev`, `npm run build` (must pass before committing).
- Do not use the old `push_*.bat` / `publish_*.bat` scripts.
