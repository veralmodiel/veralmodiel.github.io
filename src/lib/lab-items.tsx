import React from "react"
import { GitBranch, LayoutTemplate, Terminal, ShoppingCart, Palette, Globe2, Layers, CalendarCheck, LucideIcon } from "lucide-react"
import { LiveRepos } from "@/components/lab/live-repos"
import { BlockBuilder } from "@/components/lab/block-builder"
import { DeployConsole } from "@/components/lab/deploy-console"
import { CartCalculator } from "@/components/lab/cart-calculator"
import { CampaignThemer } from "@/components/lab/campaign-themer"
import { LocaleSwitcher } from "@/components/lab/locale-switcher"
import { DesignHandoff } from "@/components/lab/design-handoff"
import { BookingForm } from "@/components/lab/booking-form"

export interface LabItem {
  id: string
  index: number
  title: string
  blurb: string
  Icon: LucideIcon
  iconColor: string
  node: React.ReactNode
}

export const labItems: LabItem[] = [
  {
    id: "live-repos",
    index: 1,
    title: "Live from GitHub",
    blurb: "Pulls my public repos straight from the GitHub API on render, no cached screenshots.",
    Icon: GitBranch,
    iconColor: "text-slate-300",
    node: <LiveRepos />,
  },
  {
    id: "block-builder",
    index: 2,
    title: "Page Builder",
    blurb: "Drag to reorder sections, the same block-based thinking behind every WordPress, Shopify and Webflow page.",
    Icon: LayoutTemplate,
    iconColor: "text-sky-400",
    node: <BlockBuilder />,
  },
  {
    id: "deploy-console",
    index: 3,
    title: "Deploy Console",
    blurb: "A typed-out log of a typical ship: commit, build, Lighthouse check, deploy.",
    Icon: Terminal,
    iconColor: "text-emerald-400",
    node: <DeployConsole />,
  },
  {
    id: "cart-calculator",
    index: 4,
    title: "Cart & Checkout",
    blurb: "Live quantity and pricing logic, the everyday plumbing behind Shopify and WooCommerce storefronts.",
    Icon: ShoppingCart,
    iconColor: "text-teal-400",
    node: <CartCalculator />,
  },
  {
    id: "campaign-themer",
    index: 5,
    title: "Campaign Themer",
    blurb: "One layout, four brands. Built for teams that need a fresh event or campaign page every few weeks.",
    Icon: Palette,
    iconColor: "text-amber-400",
    node: <CampaignThemer />,
  },
  {
    id: "locale-switcher",
    index: 6,
    title: "Multi-Region Storefront",
    blurb: "Same product, localised currency, date format and timezone. Built for clients running AU and Singapore storefronts side by side.",
    Icon: Globe2,
    iconColor: "text-lime-400",
    node: <LocaleSwitcher />,
  },
  {
    id: "design-handoff",
    index: 7,
    title: "Design Handoff",
    blurb: "Drag the divider. Most of my solo builds start as a designer's file and end up pixel-matched in the browser.",
    Icon: Layers,
    iconColor: "text-slate-400",
    node: <DesignHandoff />,
  },
  {
    id: "booking-form",
    index: 8,
    title: "Booking Enquiry",
    blurb: "Real-time validation for the enquiry and booking forms that hospitality and events sites run on.",
    Icon: CalendarCheck,
    iconColor: "text-amber-400",
    node: <BookingForm />,
  },
]
