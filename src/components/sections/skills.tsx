"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Code, Server, Wand2, Globe, BrainCircuit, ShoppingCart, Users, MapPin, Zap, Gauge, Layers, LucideIcon } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { SectionMarker } from "@/components/ui/section-marker"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { TagFilter } from "@/components/skills/tag-filter"
import { LogoCursor } from "@/components/skills/logo-cursor"

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
  const [hovered, setHovered] = useState<Skill | null>(null)

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
    <section id="skills" className="shell py-24 md:py-40 relative z-10">
      <div>
        <div ref={headerRef} className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <SectionMarker label="Toolkit" className="col-span-12 md:col-span-4" />
          <div className="col-span-12 md:col-span-6 md:col-start-6">
            <h2 className="text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.05] mb-6">
              The Toolkit, in practice
            </h2>
            <p className="text-text-muted max-w-md">
              The stack behind everything below. Keep scrolling to the Lab to see a few of these running live rather than just listed.
            </p>
          </div>
        </div>

        <TagFilter tags={allTags} active={activeTags} onToggle={toggleTag} />

        <div ref={gridRef} data-cursor="hide" className="mt-12 border-b border-border-hairline">
          {skillGroups.map((group) => {
            const hasMatch = group.skills.some(skillMatches)
            if (!hasMatch) return null

            return (
              <div
                key={group.title}
                className="reveal-card grid grid-cols-12 gap-6 border-t border-border-hairline py-6"
              >
                <h3 className="col-span-12 md:col-span-4 text-sm leading-snug">{group.title}</h3>

                <div className="col-span-12 md:col-span-7 md:col-start-6 flex flex-wrap gap-x-5 gap-y-2">
                  {group.skills.map((skill) => {
                    const matches = skillMatches(skill)
                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setHovered(skill)}
                        onMouseLeave={() => setHovered(null)}
                        className={cn(
                          "text-text-muted hover:text-primary transition-colors cursor-default flex items-center gap-2",
                          !matches && "opacity-30"
                        )}
                      >
                        {skill.name}
                        {skill.badge && (
                          <span className="label text-[10px] border border-border-hairline px-1">
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

        <div ref={industriesRef} className="mt-16">
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
      <LogoCursor name={hovered?.name ?? null} />
    </section>
  )
}
