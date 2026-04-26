"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export const Hero: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Available for full-time employment
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
        >
          Architecting <span className="text-gradient">Digital Experiences</span> with Precision.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Senior Full-Stack Web Developer with 9+ years of expertise. Specializing in WordPress ecosystems, Shopify, and Webflow—with a <span className="text-text-base font-bold">proactive recent focus on Next.js since April 20, 2026.</span>
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="mailto:veralmodiel@gmail.com"
            className="group relative px-8 py-4 bg-text-base text-bg-base font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative z-10 flex items-center gap-2">
              Let&apos;s Connect <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
          </a>
          
          <a
            href="https://github.com/veralmodiel"
            target="_blank"
            className="px-8 py-4 bg-bg-subtle text-text-base font-bold rounded-full border border-border-subtle hover:bg-bg-base transition-all active:scale-95 flex items-center gap-2"
          >
            GitHub
          </a>
        </motion.div>

        {/* Social Links / Industry Badges */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="mt-16 flex flex-wrap gap-8 justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
        >
          <a href="https://linkedin.com/in/veralmodiel" target="_blank" className="text-xs uppercase tracking-widest font-bold hover:text-blue-400 transition-colors">LinkedIn</a>
          <a href="https://github.com/veralmodiel" target="_blank" className="text-xs uppercase tracking-widest font-bold hover:text-white transition-colors">GitHub</a>
          <a href="https://drive.google.com/file/d/1MHM-fJmBDdN5H8YCWkCLjUu_o_79LyjR/view" target="_blank" className="text-xs uppercase tracking-widest font-bold hover:text-rose-400 transition-colors">Full Resume</a>
        </motion.div>
      </div>
    </section>
  )
}
