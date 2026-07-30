"use client"

import React from "react"
import { motion } from "framer-motion"
import { Code, Server, Wand2, Globe, BrainCircuit, ShoppingCart, Users, MapPin, Zap, Gauge, Layers, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Skill {
  name: string
  badge?: string
}

interface SkillGroup {
  title: string
  Icon: LucideIcon
  iconColor: string
  skills: (string | Skill)[]
  size: "small" | "medium" | "large"
}

const skillGroups: SkillGroup[] = [
  {
    title: "Core Infrastructure",
    Icon: Server,
    iconColor: "text-blue-400",
    skills: ["PHP", "MySQL", "JavaScript", "REST APIs"],
    size: "large"
  },
  {
    title: "Platforms & CMS",
    Icon: Globe,
    iconColor: "text-sky-400",
    skills: ["WordPress", "Shopify", "Webflow", "WooCommerce"],
    size: "large"
  },
  {
    title: "Design-to-Code",
    Icon: Wand2,
    iconColor: "text-amber-400",
    skills: ["Figma", "Photoshop", "Illustrator", "Adobe XD"],
    size: "small"
  },
  {
    title: "Modern Stack",
    Icon: Code,
    iconColor: "text-emerald-400",
    skills: [
      { name: "Next.js", badge: "RECENT" },
      "Tailwind CSS",
      "TypeScript"
    ],
    size: "medium"
  },
  {
    title: "AI Proactive",
    Icon: BrainCircuit,
    iconColor: "text-orange-400",
    skills: ["Gemini", "Claude", "ChatGPT", "Antigravity"],
    size: "medium"
  },
  {
    title: "Ecommerce & Checkout",
    Icon: ShoppingCart,
    iconColor: "text-teal-400",
    skills: ["Shopify", "WooCommerce", "Payment Gateways", "Cart & Checkout UX"],
    size: "medium"
  },
  {
    title: "Delivery & Collaboration",
    Icon: Users,
    iconColor: "text-cyan-400",
    skills: ["Git Workflows", "Multi-Dev Builds", "Design Handoff", "Client Enablement"],
    size: "medium"
  },
  {
    title: "Multi-Region Builds",
    Icon: MapPin,
    iconColor: "text-lime-400",
    skills: ["AU & Singapore Clients", "Localisation", "Multi-Currency", "Timezone-Aware Content"],
    size: "medium"
  },
  {
    title: "Integrations & Automation",
    Icon: Zap,
    iconColor: "text-slate-400",
    skills: ["Zapier", "Mailchimp", "Klaviyo", "ActiveCampaign"],
    size: "medium"
  },
  {
    title: "Performance & SEO",
    Icon: Gauge,
    iconColor: "text-yellow-400",
    skills: ["Page Speed Optimisation", "Technical SEO", "Core Web Vitals"],
    size: "medium"
  },
  {
    title: "Frontend Craft",
    Icon: Layers,
    iconColor: "text-zinc-400",
    skills: ["SCSS", "jQuery", "GSAP", "Alpine.js", "Bootstrap"],
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
  return (
    <section id="skills" className="py-20 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            >
              The <span className="text-gradient">Toolkit</span>, in practice
            </motion.h2>
            <p className="text-text-muted text-lg">
              The stack behind everything below. Keep scrolling to the Lab to see a few of these running live rather than just listed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true, amount: 0.3, margin: "-100px" }}
              className={cn(
                "glass glow-border p-8 rounded-[32px] group transition-colors duration-500",
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
                {group.skills.map((skill, sIdx) => {
                  const isObject = typeof skill !== "string"
                  const name = isObject ? (skill as Skill).name : (skill as string)
                  const badge = isObject ? (skill as Skill).badge : null

                  return (
                    <div 
                      key={sIdx}
                      className="px-4 py-2 bg-bg-subtle/50 rounded-xl text-sm font-medium text-text-muted border border-border-subtle hover:border-primary/20 hover:bg-bg-subtle transition-all cursor-default flex items-center gap-2 group/skill"
                    >
                      {name}
                      {badge && (
                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-md font-bold tracking-tighter">
                          {badge}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          className="mt-6 glass p-8 rounded-[32px]"
        >
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
        </motion.div>
      </div>
    </section>
  )
}
