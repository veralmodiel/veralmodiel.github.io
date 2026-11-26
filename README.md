# Ver Almodiel — Portfolio

Personal portfolio of a full-stack web developer. Instead of screenshots of NDA-covered client work, the **Lab** section runs small interactive demos in the browser, and the **Toolkit** section shows the stack behind them.

Live at [veralmodiel.github.io](https://veralmodiel.github.io/).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, static export) and React 19
- Tailwind CSS 4
- [GSAP](https://gsap.com) + ScrollTrigger for scroll reveals and the cursor/chip motion
- [Framer Motion](https://motion.dev) for the drag-to-reorder demo and small transitions
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [Geist and Geist Mono](https://vercel.com/font) via `next/font`
- [lucide-react](https://lucide.dev) icons and [simple-icons](https://simpleicons.org) brand logos (bundled, tree-shaken)
- [Web3Forms](https://web3forms.com) for the contact form (no backend)
- [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (cookie-free)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run build` before merging to `main` to catch anything that only fails in a production build.

## Project structure

```
src/
  app/
    page.tsx               Home page: assembles the sections, background and cursor
    layout.tsx             Fonts, theme provider, SEO metadata, JSON-LD, analytics
    globals.css            Design tokens and shared utilities (see "Design system")
    icon.svg, favicon.ico, apple-icon.png
    opengraph-image.png    Social share preview (also twitter-image.png)
  components/
    sections/              Hero, Results (stats), Skills (Toolkit), Lab, Contact
    lab/                   One file per Lab demo, plus lab-card.tsx (the row layout)
    hero/                  Interactive dot-wave canvas, word stack
    skills/                Tag filter and the logo chip that follows the cursor
    stats/                 Animated stat figures
    ui/                    Section label and figure caption
    navigation.tsx         Fixed top bar; active section via IntersectionObserver
    starfield.tsx          Faint galaxy background (dark mode only)
    cursor-follower.tsx    Trailing square cursor ring
  hooks/                   useSectionReveal, useCountUp
  lib/
    site.ts                Site URL, title/description, analytics + verification codes
    lab-items.tsx          Registry of Lab demos rendered by sections/lab.tsx
    skill-glyphs.tsx       Logo/icon/text badge for each Toolkit skill
    sections.ts            Nav sections
public/
  robots.txt, sitemap.xml
```

## Design system

Everything lives in `src/app/globals.css`:

- **Colours:** `--bg-base`, `--text-base`, `--text-muted`, `--primary` (the orange accent) and friends, defined in `:root` (dark) and `.light`. Change them there and the whole site follows, including the canvas, logos and charts.
- **Type:** Geist for headings, Geist Mono for everything else.
- **Utilities:** `.shell` (full-width content column with fluid side padding, centred past 1920px), `.label` (small uppercase mono text), `.figure-frame` (hairline box for visuals).
- **Flat by default:** a few unlayered rules at the bottom of the file remove border radius, shadows and backdrop blur site-wide, and normalise heading weight, so stray utility classes can't reintroduce rounded or glowing styles.

Motion respects `prefers-reduced-motion`, and cursor effects only run on mouse/trackpad devices.

## Common edits

### Add a Lab demo

1. Create a component in `src/components/lab/`. Use the shared tokens (`border-border-hairline`, `text-primary`, `label`, `bg-bg-subtle`) rather than fixed colours, so it matches both themes.
2. Add it to `labItems` in `src/lib/lab-items.tsx` (id, index, title, blurb, node). `LabCard` handles the row layout, frame and caption.

### Add a Toolkit skill

Add it to the relevant group in `src/components/sections/skills.tsx`, then map its hover icon in `src/lib/skill-glyphs.tsx`: a brand logo from `simple-icons`, a lucide icon, or a short text badge. Unmapped skills fall back to their initials.

### Change SEO text, analytics or verification

Edit `src/lib/site.ts`. The share image is a static file at `src/app/opengraph-image.png` (1200×630).

## Contact form

The form posts directly to Web3Forms from the browser and reads the access key from `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` at build time. Only name and email are required.

For local testing, create `.env.local` (gitignored):

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key-here
```

In production it's injected from the `WEB3FORMS_ACCESS_KEY` GitHub Actions secret. If the key's allowed origins are restricted in the Web3Forms dashboard, keep the production domain on the list or submissions will fail with a CORS error.

## Deployment

Pushing to `main` triggers `.github/workflows/nextjs.yml`, which builds the static export (`output: 'export'` in `next.config.js`) and publishes it to GitHub Pages.
