# Ver Almodiel — Portfolio

Personal portfolio site built as a Web3-style showcase rather than a resume rehash: the Skills section lists the toolkit, and the Lab section runs a handful of small interactive demos in the browser instead of screenshots of NDA-covered client work.

Live at [veralmodiel.github.io](https://veralmodiel.github.io/).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, static export)
- React 19
- Tailwind CSS 4
- [Framer Motion](https://motion.dev) for animation and the drag-to-reorder Lab demo
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [lucide-react](https://lucide.dev) for icons
- [Web3Forms](https://web3forms.com) for the contact form (no backend required)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    page.tsx            Home page, assembles all sections
    globals.css          Design tokens: colours, glass/glow utilities, grid overlay
    layout.tsx            Fonts, theme provider, root layout
  components/
    sections/            Hero, Results, Skills, Lab, Contact
    lab/                  Individual Lab demos (one file each)
    navigation.tsx, theme-toggle.tsx, modern-background.tsx, mouse-tracker.tsx
  lib/
    lab-items.tsx         Registry of Lab demos rendered by sections/lab.tsx
    utils.ts               cn() class-merging helper
```

### Adding a new Lab demo

1. Create a component in `src/components/lab/`, following the existing demos for styling (`glass glow-border p-8 rounded-[32px]` card shell).
2. Add it to the `labItems` array in `src/lib/lab-items.tsx`. The Lab section renders that array directly, so no other wiring is needed.

### Editing the colour palette

`src/app/globals.css` defines `--primary`, `--secondary`, `--accent` for light and dark mode (in `:root`, the `prefers-color-scheme: dark` block, and the `.dark`/`.light` override classes — all four need updating together). Everything else (gradient text, glow borders, background blobs) reads from those three variables. Individual Skills/Lab card icon colours are set per-item and are independent of the palette.

## Contact form

The contact form posts directly to Web3Forms from the browser (no server, works fine on a static export). It reads the access key from `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` at build time.

For local testing, create `.env.local` (gitignored) in this directory:

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key-here
```

In production it's injected from the `WEB3FORMS_ACCESS_KEY` GitHub Actions secret (see workflow below). If the key's origin allowlist is restricted in the Web3Forms dashboard, make sure the production domain is on it or submissions will fail with a CORS error.

## Deployment

Pushing to `main` triggers `.github/workflows/nextjs.yml`, which builds the static export (`next build`, `output: 'export'` in `next.config.js`) and publishes it to GitHub Pages.
