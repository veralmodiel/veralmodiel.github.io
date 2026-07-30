import React from "react"
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
  node: React.ReactNode
}

export const labItems: LabItem[] = [
  { id: "live-repos", node: <LiveRepos /> },
  { id: "block-builder", node: <BlockBuilder /> },
  { id: "deploy-console", node: <DeployConsole /> },
  { id: "cart-calculator", node: <CartCalculator /> },
  { id: "campaign-themer", node: <CampaignThemer /> },
  { id: "locale-switcher", node: <LocaleSwitcher /> },
  { id: "design-handoff", node: <DesignHandoff /> },
  { id: "booking-form", node: <BookingForm /> },
]
