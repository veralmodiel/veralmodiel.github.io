import type { LucideIcon } from "lucide-react"
import {
  Activity, Braces, Clock, Coins, CreditCard, Gauge, GitBranch, Globe,
  GraduationCap, Languages, Layers, Orbit, Search, ShoppingCart,
} from "lucide-react"
import type { SimpleIcon } from "simple-icons"
import {
  siAlpinedotjs, siBootstrap, siClaude, siFigma, siGit, siGooglegemini, siGreensock,
  siJavascript, siJquery, siMailchimp, siMysql, siNextdotjs, siPhp, siSass, siShopify,
  siTailwindcss, siTypescript, siWebflow, siWoocommerce, siWordpress, siZapier,
} from "simple-icons"

/**
 * What shows in the Toolkit hover chip:
 * - brand: official logo path from simple-icons (bundled, tree-shaken)
 * - icon:  a lucide icon for skills that aren't a product (REST APIs, SEO…)
 * - text:  a short text badge for brands whose logos aren't freely available
 */
export type Glyph =
  | { kind: "brand"; icon: SimpleIcon }
  | { kind: "icon"; Icon: LucideIcon }
  | { kind: "text"; text: string }

const brand = (icon: SimpleIcon): Glyph => ({ kind: "brand", icon })
const icon = (Icon: LucideIcon): Glyph => ({ kind: "icon", Icon })
const text = (t: string): Glyph => ({ kind: "text", text: t })

export const skillGlyphs: Record<string, Glyph> = {
  // Core
  PHP: brand(siPhp),
  MySQL: brand(siMysql),
  JavaScript: brand(siJavascript),
  "REST APIs": icon(Braces),

  // Platforms & e-commerce
  WordPress: brand(siWordpress),
  Shopify: brand(siShopify),
  Webflow: brand(siWebflow),
  WooCommerce: brand(siWoocommerce),
  "Payment Gateways": icon(CreditCard),
  "Cart & Checkout UX": icon(ShoppingCart),

  // Design
  Figma: brand(siFigma),
  Photoshop: text("Ps"),
  Illustrator: text("Ai"),
  "Adobe XD": text("Xd"),

  // Modern stack
  "Next.js": brand(siNextdotjs),
  "Tailwind CSS": brand(siTailwindcss),
  TypeScript: brand(siTypescript),

  // AI
  Gemini: brand(siGooglegemini),
  Claude: brand(siClaude),
  ChatGPT: text("GPT"),
  Antigravity: icon(Orbit),

  // Workflow
  "Git Workflows": brand(siGit),
  "Multi-Dev Builds": icon(GitBranch),
  "Design Handoff": icon(Layers),
  "Client Enablement": icon(GraduationCap),

  // Multi-region
  "AU & Singapore Clients": icon(Globe),
  Localisation: icon(Languages),
  "Multi-Currency": icon(Coins),
  "Timezone-Aware Content": icon(Clock),

  // Integrations
  Zapier: brand(siZapier),
  Mailchimp: brand(siMailchimp),
  Klaviyo: text("Kl"),
  ActiveCampaign: text("AC"),

  // Performance & SEO
  "Page Speed Optimisation": icon(Gauge),
  "Technical SEO": icon(Search),
  "Core Web Vitals": icon(Activity),

  // Frontend craft
  SCSS: brand(siSass),
  jQuery: brand(siJquery),
  GSAP: brand(siGreensock),
  "Alpine.js": brand(siAlpinedotjs),
  Bootstrap: brand(siBootstrap),
}

/** Fallback for any skill not in the map: its initials as a text badge. */
export function glyphFor(name: string): Glyph {
  return (
    skillGlyphs[name] ??
    text(
      name
        .replace(/[^A-Za-z0-9 ]/g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    )
  )
}
