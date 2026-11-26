"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Code, Server, Wand2, Globe, BrainCircuit, ShoppingCart, Users, MapPin, Zap, Gauge, Layers, LucideIcon } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { SectionMarker } from "@/components/ui/section-marker"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { TagFilter } from "@/components/skills/tag-filter"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Skill {
  name: string
  badge?: string
  tags: string[]
}

interface SkillGroup {
  title: string
  Icon: LucideIcon
  iconColor: string
  skills: Skill[]
  size: "small" | "medium" | "large"
}

const skillGroups: SkillGroup[] = [
  {
    title: "Core Infrastructure",
    Icon: Server,
    iconColor: "text-blue-400",
    skills: [
      { name: "PHP", tags: ["backend"] },
      { name: "MySQL", tags: ["backend"] },
      { name: "JavaScript", tags: ["frontend", "backend"] },
      { name: "REST APIs", tags: ["backend"] },
    ],
    size: "large"
  },
  {
    title: "Platforms & CMS",
    Icon: Globe,
    iconColor: "text-sky-400",
    skills: [
      { name: "WordPress", tags: ["platform"] },
      { name: "Shopify", tags: ["platform", "ecommerce"] },
      { name: "Webflow", tags: ["platform"] },
      { name: "WooCommerce", tags: ["platform", "ecommerce"] },
    ],
    size: "large"
  },
  {
    title: "Design-to-Code",
    Icon: Wand2,
    iconColor: "text-amber-400",
    skills: [
      { name: "Figma", tags: ["design"] },
      { name: "Photoshop", tags: ["design"] },
      { name: "Illustrator", tags: ["design"] },
      { name: "Adobe XD", tags: ["design"] },
    ],
    size: "small"
  },
  {
    title: "Modern Stack",
    Icon: Code,
    iconColor: "text-emerald-400",
    skills: [
      { name: "Next.js", badge: "RECENT", tags: ["frontend"] },
      { name: "Tailwind CSS", tags: ["frontend"] },
      { name: "TypeScript", tags: ["frontend"] },
    ],
    size: "medium"
  },
  {
    title: "AI Proactive",
    Icon: BrainCircuit,
    iconColor: "text-orange-400",
    skills: [
      { name: "Gemini", tags: ["ai"] },
      { name: "Claude", tags: ["ai"] },
      { name: "ChatGPT", tags: ["ai"] },
      { name: "Antigravity", tags: ["ai"] },
    ],
    size: "medium"
  },
  {
    title: "Ecommerce & Checkout",
    Icon: ShoppingCart,
    iconColor: "text-teal-400",
    skills: [
      { name: "Shopify", tags: ["ecommerce", "platform"] },
      { name: "WooCommerce", tags: ["ecommerce", "platform"] },
      { name: "Payment Gateways", tags: ["ecommerce"] },
      { name: "Cart & Checkout UX", tags: ["ecommerce"] },
    ],
    size: "medium"
  },
  {
    title: "Delivery & Collaboration",
    Icon: Users,
    iconColor: "text-cyan-400",
    skills: [
      { name: "Git Workflows", tags: ["workflow"] },
      { name: "Multi-Dev Builds", tags: ["workflow"] },
      { name: "Design Handoff", tags: ["workflow"] },
      { name: "Client Enablement", tags: ["workflow"] },
    ],
    size: "medium"
  },
  {
    title: "Multi-Region Builds",
    Icon: MapPin,
    iconColor: "text-lime-400",
    skills: [
      { name: "AU & Singapore Clients", tags: ["localization"] },
      { name: "Localisation", tags: ["localization"] },
      { name: "Multi-Currency", tags: ["localization"] },
      { name: "Timezone-Aware Content", tags: ["localization"] },
    ],
    size: "medium"
  },
  {
    title: "Integrations & Automation",
    Icon: Zap,
    iconColor: "text-slate-400",
    skills: [
      { name: "Zapier", tags: ["ecommerce"] },
      { name: "Mailchimp", tags: ["ecommerce"] },
      { name: "Klaviyo", tags: ["ecommerce"] },
      { name: "ActiveCampaign", tags: ["ecommerce"] },
    ],
    size: "medium"
  },
  {
    title: "Performance & SEO",
    Icon: Gauge,
    iconColor: "text-yellow-400",
    skills: [
      { name: "Page Speed Optimisation", tags: ["performance"] },
      { name: "Technical SEO", tags: ["performance"] },
      { name: "Core Web Vitals", tags: ["performance"] },
    ],
    size: "medium"
  },
  {
    title: "Frontend Craft",
    Icon: Layers,
    iconColor: "text-zinc-400",
    skills: [
      { name: "SCSS", tags: ["frontend"] },
      { name: "jQuery", tags: ["frontend"] },
      { name: "GSAP", tags: ["frontend"] },
      { name: "Alpine.js", tags: ["frontend"] },
      { name: "Bootstrap", tags: ["frontend"] },
    ],
    size: "medium"
  }
]

const industries = [
  "Hospitality & Tourism",
  "Property & Real Estate",
  "Wellness & Events",
  "Ecommerce & Retail",
  "Aviation & Logistics",
  "Finance & Wealth",
  "Manufacturing & Industrial",
]

export const Skills: React.FC = () => {
  const headerRef = useSectionReveal<HTMLDivElement>()
  const gridRef = useSectionReveal<HTMLDivElement>({ selector: ".reveal-card", stagger: 0.08 })
  const industriesRef = useSectionReveal<HTMLDivElement>()

  const [activeTags, setActiveTags] = useState<string[]>([])

  const allTags = useMemo(
    () => Array.from(new Set(skillGroups.flatMap((g) => g.skills.flatMap((s) => s.tags)))).sort(),
    []
  )

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const skillMatches = (skill: Skill) => activeTags.length === 0 || skill.tags.some((t) => activeTags.includes(t))

  // Collapsing/dimming changes document height, so GSAP's cached trigger
  // positions (nav section tracking, card reveals) need recalculating.
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [activeTags])

  return (
    <section id="skills" className="py-20 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-xl">
            <SectionMarker marker="B" label="Toolkit" className="mb-4" />
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              The Toolkit, in practice
            </h2>
            <p className="text-text-muted text-lg">
              The stack behind everything below. Keep scrolling to the Lab to see a few of these running live rather than just listed.
            </p>
          </div>
        </div>

        <TagFilter tags={allTags} active={activeTags} onToggle={toggleTag} />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-10">
          {skillGroups.map((group) => {
            const hasMatch = group.skills.some(skillMatches)
            if (!hasMatch) return null

            return (
              <div
                key={group.title}
                className={cn(
                  "reveal-card panel p-8 group transition-colors duration-500",
                  group.size === "large" ? "md:col-span-6" : "md:col-span-6 lg:col-span-4"
                )}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-bg-subtle/50 rounded-2xl group-hover:bg-bg-subtle transition-colors">
                    <group.Icon size={24} className={group.iconColor} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{group.title}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => {
                    const matches = skillMatches(skill)
                    return (
                      <div
                        key={skill.name}
                        className={cn(
                          "px-4 py-2 bg-bg-subtle/50 rounded-xl text-sm font-medium text-text-muted border border-border-subtle hover:border-primary/20 hover:bg-bg-subtle transition-all cursor-default flex items-center gap-2",
                          !matches && "opacity-30"
                        )}
                      >
                        {skill.name}
                        {skill.badge && (
                          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-md font-bold tracking-tighter">
                            {skill.badge}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div ref={industriesRef} className="mt-6 panel p-8">
          <h3 className="text-xs uppercase tracking-widest text-text-muted mb-4">Shipped across</h3>
          <div className="flex flex-wrap gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-4 py-2 bg-bg-subtle/50 rounded-xl text-sm font-medium text-text-muted border border-border-subtle"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
