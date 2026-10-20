# Factual Solutions: website

Read this before every task.

## Status

- The site is being rebuilt from zero on branch `rebuild`. `main` is the live site; do not push `rebuild` to it until the owner says so.
- Built: admin panel (`/admin`), blog (`/blog`), contact (`/contact`, form saves to `/api/inquiries`), services (`/services`, `/services/<line>`, `/services/<service>`), about (`/about`, content in `src/data/aboutContent.ts`), home (`/`, Option B "choice first", latest posts refresh every 10 minutes and hide when none are published), site header and footer. All pages are built.
- Old addresses `/what-we-think` and `/case-studies` redirect (next.config.mjs) to `/about#principles` and `/services`.
- `/contact?topic=consulting|training|digital` preselects a service on the form.
- Form spam protection: honeypot, link filter and a send limit (3 per 10 min, 10 per day per hashed IP, `lib/formGuard.ts`). reCAPTCHA adds the checkbox once `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` are set (not set yet).
- Inquiry ids come from the `counters` collection (`dbNextInquiryId`), never from counting inquiries.
- Vercel Preview has its own database (`factual_solutions_preview`) plus `ADMIN_PASSWORD` and `NOTIFICATION_EMAIL`, so previews can be tested end to end without touching live data. Production has `MONGODB_URI`, `MONGODB_DB_NAME`, `ADMIN_PASSWORD`, `NOTIFICATION_EMAIL` (no `RESEND_API_KEY` yet, so lead emails are not sent).
- Done so far: colour scheme, typography, header and footer, contact, services, about and home pages. Next: pre-launch review, then go live when the owner says so, one step at a time with the owner's approval.
- Deploys: push `rebuild` to GitHub and make a Vercel preview (`npx vercel deploy --yes`, never `--prod`) until the owner says go live.
- Content sources for the rebuild: `src/data/servicesData.ts`, `src/data/companyData.ts`.

## Colours: Option B "Sky Open" (locked 2026-10-20)

From the logo only: navy `#1E2E59`, sky `#8EAAD4`, brick `#A33F2E`, ink `#0B1320`.

- All colours live in `src/styles/tokens.css` (light and dark). `tailwind.config.ts` replaces Tailwind's palette with these tokens, so `slate-*`, `white`, `emerald-*` etc. do not exist.
- Never use raw colours (hex, `rgb()`, `bg-[#…]`) in components. Use the tokens:
  - `bg`, `surface`, `band`, `line`: backgrounds and borders
  - `ink` (body text), `heading`, `muted`
  - `primary`: navy (sky in dark): links, secondary buttons, focus, selected states
  - `action` / `action-hover`: brick, for the ONE main action on a screen (`btn-primary`)
  - `accent`: brick as text for small labels; `tint`: sky, decoration only (too light for text on white)
  - `success`, `warning`, `danger`: status; use `/10`–`/15` opacity for soft backgrounds
  - `on-action` text on brick; `on-solid` text on primary/status fills; `scrim` behind dialogs
- Modern layer (approved 2026-10-20): deep navy sections use `fs-deep` (+ `fs-dots`) with `deep`/`on-deep` tokens, which stay dark in both themes. Glows (`fs-glow fs-glow-navy|sky|brick`), glass (`fs-glass`) and gradients exist only as classes in `globals.css`; never add ad-hoc gradients. Other exceptions: `themeColor` in `app/layout.tsx` (meta tags cannot read CSS variables) and the Google result preview in the admin blog editor, which copies Google's own colours.
- Theme: `<html data-theme="light|dark">`, set before paint by the inline script in `app/layout.tsx` (saved choice in `localStorage` key `fs-theme`, otherwise the device setting).

## Typography: Manrope + Inter (locked 2026-10-20)

- Manrope 700 for headings (`h1`–`h6`, `.font-display`), Inter for everything else. Loaded with `next/font/google` in `app/layout.tsx` (self-hosted at build, size-matched fallbacks). Do not add other fonts.
- Use the type scale in `tailwind.config.ts`: `text-display`, `text-h1`, `text-h2`, `text-h3` (fluid from phone to desktop), `text-lede` 19px, `text-body` 17px, `text-small` 14px, `text-label` 12px caps. The admin panel may keep Tailwind's small sizes (`text-xs`, `text-sm`) for dense tables.
- No arbitrary sizes like `text-[3.4rem]` in new code.

## Header, footer and page heroes (modern layer, 2026-10-20)

- No contact strip. Menu: What we do (Services dropdown, `/services`), What we think (`/what-we-think`), Who we are (`/about`), Case studies (`/case-studies`), Blog. No Contact item; "Book a consultation" goes to `/contact`. Labels live in `src/data/navigation.ts`; addresses did not change.
- The header is fixed and transparent over the deep hero, solid after scrolling. So EVERY public page must start with `components/layout/PageHero.tsx`.
- Scroll reveal: add `data-reveal` (optional `--d` delay); `RevealObserver` in the site layout does the rest and respects reduced motion.
- Case studies come from `src/data/caseStudies.ts` (empty = "coming soon"); never invent results.

## Header and footer: original Option B notes

- Public pages live in `src/app/(site)/` and share `(site)/layout.tsx` (header, `<main id="main">`, footer). The admin panel stays outside this group.
- `components/layout/SiteHeader.tsx`: contact strip (large screens), sticky bar, Services menu, phone slide-in menu with call button, `ThemeToggle`. `SiteFooter.tsx`: call-to-action band, then links.
- All links and contact details come from `src/data/navigation.ts` (which reads `companyData.ts`). Change them there, not in the components.
- Buttons are pills (`btn-primary` brick, `btn-secondary` navy outline). Logo-piece marks use the `piece-navy|sky|brick` tokens.

## Services pages (Option B, built 2026-10-20)

- `/services` overview, `/services/consulting|training|digital` (line pages: cards + How we work), `/services/<service-id>` (12 service pages; ids match the old site so indexed addresses keep working). One route, `services/[slug]`, serves both line and service pages.
- All content comes from `src/data/servicesData.ts` (English entries; Arabic entries are unused). Lookups and related-service matching live in `src/data/servicePages.ts`. Shared parts: `components/services/ServiceParts.tsx`.

## Security

- The GitHub repo is public. Never commit passwords, keys or `.env*` files, and never hardcode credentials or defaults for them (an old `admin123` default is visible in history; the password was rotated on 2026-10-20).
- Admin credentials come only from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (env vars, set per environment on Vercel).

## Stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3, MongoDB, Vercel.

## Commands

- `npm run dev`, `npm run build` (must pass before committing).
- The old `push_*.bat` / `publish_*.bat` scripts push the current branch; do not use them during the rebuild.
