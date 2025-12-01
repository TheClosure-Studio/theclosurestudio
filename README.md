# The Closure Studio – Web Experience Stack

Single repository for the public marketing site and project studio pages of **The Closure Studio**.  
Built with the Next.js App Router, Tailwind CSS v4, Framer Motion and several bespoke components (Fractal hero, stacked services, etc.).

## Tech Stack

| Layer      | Stack                                                              |
| ---------- | ------------------------------------------------------------------ |
| Framework  | Next.js 16 (App Router, React 19)                                  |
| Styling    | Tailwind CSS v4 + custom globals                                   |
| Animation  | Framer Motion + custom WebGL shader hero                           |
| Assets     | `/public` folder (hero export, OG image, favicon, service imagery) |
| Deployment | Vercel (`vercel.json`, `app/robots.js`, `app/sitemap.js`, OG tags) |

## Develop Locally

```bash
npm install
npm run dev
# visit http://localhost:3000
```

Useful scripts:

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start local dev server            |
| `npm run build` | Production build (used by Vercel) |
| `npm run start` | Preview production build locally  |

## Directory Cheatsheet

- `app/` – App Router pages, SEO routes (`layout`, `robots.js`, `sitemap.js`)
- `app/components/` – Reusable UI (Navbar, FractalGlassHero, Services, etc.)
- `public/` – Static assets (`og.jpg`, `favicon.svg`, hero exports, project images)
- `app/icon.svg` – Source for favicons/manifest icons

## SEO & Sharing

- `app/layout.js` defines canonical URLs, OpenGraph + Twitter cards referencing `/og.jpg`.
- `app/robots.js` and `app/sitemap.js` are served automatically by Next.js (no manual files needed).
- `public/og.jpg` is a lightweight placeholder OG asset (replace with branded artwork when ready).
- `public/favicon.svg` & `app/icon.svg` share the custom logomark.

## Deployment Notes

- Vercel configuration lives in `vercel.json` (Next.js framework, build command, dev command, region).
- Every push to the default branch can be auto-deployed via Vercel; preview deployments inherit the same SEO/meta setup.
- Remember to update the OG image/favicons if brand assets change.

## Contributing / TODOs

- Keep hero WebGL + fallback sections in sync when editing `FractalGlassHero`.
- Update sitemap routes if new pages are added.
- Replace the placeholder OG image with a designed export before production marketing pushes.
