# ClaroFlux Landing Page

The marketing site for [ClaroFlux](https://app.claroflux.com) — the
intelligent study platform. Built as a standalone project; the application
itself lives elsewhere and is **not** part of this codebase.

## Stack

- **Next.js 16** (App Router, fully static output) + **TypeScript**
- **Tailwind CSS v4** (token-driven theming)
- **Framer Motion** (scroll-linked storytelling, magnetic CTAs, reveals)
- Real product screenshots in `public/shots/{light,dark}/`

## Theming

There is intentionally **no theme toggle**. Both themes follow the visitor's
operating-system preference via `prefers-color-scheme`:

- All semantic colors are CSS variables defined in `app/globals.css`
  (`:root` = light, overridden inside the dark media query). Each theme is
  individually designed — not an inversion.
- Screenshots swap per theme with `<picture>` +
  `media="(prefers-color-scheme: …)"` sources (see
  `components/ui/ThemedShot.tsx`), so the browser downloads **only** the
  variant it displays. Zero flash, zero JS.
- `viewport.themeColor` and `color-scheme` are declared for both modes.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm start        # serve the production build
```

## Project layout

```
app/                 layout (SEO metadata), page, globals.css, sitemap, robots
components/
  sections/          one file per landing chapter, in page order
  ui/                ThemedShot, BrowserFrame, CTAButton, Reveal, Aurora, …
lib/                 site URLs, screenshot manifest, FAQ content, cn()
public/shots/        real app screenshots (light = png, dark = webp)
scripts/make-og.mjs  regenerates public/og.png from the dark dashboard shot
```

## Editing content

- **CTA destinations** — `lib/site.ts` (every button reads from here).
- **FAQ** — `lib/faqs.ts` (also feeds the FAQPage JSON-LD automatically).
- **Testimonials** — `components/sections/Testimonials.tsx` contains
  **placeholder quotes**; replace them with real, permissioned user quotes
  before making public marketing claims.
- **Screenshots** — drop new captures into `public/shots/{light,dark}/`
  using the same filenames, then update dimensions in `lib/shots.ts` if they
  changed. Regenerate the social card with `node scripts/make-og.mjs`.
  If captures contain a real account, run `node scripts/sanitize-shots.mjs`
  **once** on the pristine files — it replaces the sidebar profile chip
  (photo, name, email) with a generic "USER" badge and removes personal
  names from greetings. Verify the patch coordinates against the new
  captures first (`scripts/measure.mjs` draws a coordinate grid to help).

## Deployment (Vercel)

1. Push this `landing/` folder to a Git repository (it is self-contained).
2. In Vercel: **New Project → import the repo**. If the repo root contains
   more than this folder, set **Root Directory** to `landing/`.
3. Framework preset: **Next.js** (auto-detected). No environment variables
   are required.
4. Assign the production domain `claroflux.com` (the canonical URL, sitemap
   and Open Graph tags in `lib/site.ts` already point there).

Any other Node host works too: `npm run build && npm start` behind a proxy.

## Accessibility & performance notes

- Every animation respects `prefers-reduced-motion` (MotionConfig
  `reducedMotion="user"` plus a global CSS fallback).
- The page prerenders fully static; the hero screenshot is the only
  `priority` image, everything else lazy-loads.
- Headings are hierarchical, sections labelled, FAQ accordion uses
  `aria-expanded`/`aria-controls`, and focus rings are visible in both
  themes.
