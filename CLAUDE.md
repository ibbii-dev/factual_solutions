# Factual Solutions: website

Read this before every task.

## Status

- The site is being rebuilt from zero on branch `rebuild`. `main` is the live site; do not push `rebuild` to it until the owner says so.
- Only the admin panel (`/admin`) and the blog (`/blog`) are built. The home page is a placeholder.
- Done so far: colour scheme. Next: typography, then layout and pages, one step at a time with the owner's approval.
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

## Stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3, MongoDB, Vercel. Fonts are interim (Inter, Plus Jakarta Sans) until the typography step.

## Commands

- `npm run dev`, `npm run build` (must pass before committing).
- The old `push_*.bat` / `publish_*.bat` scripts push the current branch; do not use them during the rebuild.
