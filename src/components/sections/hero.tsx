"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface HeroProps {
  isLoaded?: boolean
}

const stats = [
  { value: "09+", label: "Years shipping production code" },
  { value: "04", label: "Ecosystems mastered end to end" },
]

export const Hero: React.FC<HeroProps> = ({ isLoaded = true }) => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4">
      <div className="max-w-5xl w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass glow-btn text-primary text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Open to full-time roles
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05]"
        >
          I build the <span className="text-gradient">working parts</span> of the web.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Full-stack developer who ships across WordPress, Shopify, Webflow and Next.js, and pairs that with an AI-assisted build process. Scroll down to see the skills at work instead of reading about them.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <a
            href="#lab"
            className="group relative px-8 py-4 bg-text-base text-bg-base font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative z-10 flex items-center gap-2">
              See it in action <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
          </a>

          <a
            href="#contact"
            className="group px-8 py-4 bg-bg-subtle text-text-base font-bold rounded-full border border-border-subtle hover:bg-bg-base transition-all active:scale-95 flex items-center gap-2"
          >
            Let&apos;s talk <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Stat Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 max-w-md mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-3xl px-6 py-6">
              <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1 font-mono">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
