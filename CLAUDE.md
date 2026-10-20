# Factual Solutions: website

Read this before every task.

## Status

- The site is being rebuilt from zero on branch `rebuild`. `main` is the live site; do not push `rebuild` to it until the owner says so.
- Built: admin panel (`/admin`), blog (`/blog`), contact (`/contact`, form saves to `/api/inquiries`), site header and footer. The home page is a placeholder; services and about pages are next (header links to them already).
- `/contact?topic=consulting|training|digital` preselects a service on the form.
- reCAPTCHA keys (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`) are not set yet, so the form relies on the honeypot only. MongoDB env vars exist only for Vercel Production, so preview deployments keep inquiries in memory.
- Done so far: colour scheme, typography, header and footer, contact page. Next: the remaining pages, one step at a time with the owner's approval.
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
- No gradients or glow blobs. Exceptions: `themeColor` in `app/layout.tsx` (meta tags cannot read CSS variables) and the Google result preview in the admin blog editor, which copies Google's own colours.
- Theme: `<html data-theme="light|dark">`, set before paint by the inline script in `app/layout.tsx` (saved choice in `localStorage` key `fs-theme`, otherwise the device setting).

## Typography: Manrope + Inter (locked 2026-10-20)

- Manrope 700 for headings (`h1`–`h6`, `.font-display`), Inter for everything else. Loaded with `next/font/google` in `app/layout.tsx` (self-hosted at build, size-matched fallbacks). Do not add other fonts.
- Use the type scale in `tailwind.config.ts`: `text-display`, `text-h1`, `text-h2`, `text-h3` (fluid from phone to desktop), `text-lede` 19px, `text-body` 17px, `text-small` 14px, `text-label` 12px caps. The admin panel may keep Tailwind's small sizes (`text-xs`, `text-sm`) for dense tables.
- No arbitrary sizes like `text-[3.4rem]` in new code.

## Header and footer: Option B "Contact strip" (locked 2026-10-20)

- Public pages live in `src/app/(site)/` and share `(site)/layout.tsx` (header, `<main id="main">`, footer). The admin panel stays outside this group.
- `components/layout/SiteHeader.tsx`: contact strip (large screens), sticky bar, Services menu, phone slide-in menu with call button, `ThemeToggle`. `SiteFooter.tsx`: call-to-action band, then links.
- All links and contact details come from `src/data/navigation.ts` (which reads `companyData.ts`). Change them there, not in the components.
- Buttons are pills (`btn-primary` brick, `btn-secondary` navy outline). Logo-piece marks use the `piece-navy|sky|brick` tokens.

## Stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3, MongoDB, Vercel.

## Commands

- `npm run dev`, `npm run build` (must pass before committing).
- The old `push_*.bat` / `publish_*.bat` scripts push the current branch; do not use them during the rebuild.
