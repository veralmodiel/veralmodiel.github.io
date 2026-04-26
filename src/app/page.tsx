"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { ModernBackground } from "@/components/modern-background"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen bg-bg-base overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-bg-base flex flex-col items-center justify-center p-4"
          >
            <div className="relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 240 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 rounded-full mb-6"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs font-bold tracking-[0.6em] text-center text-text-muted uppercase flex items-center justify-center gap-3"
              >
                Initializing <span className="w-1 h-1 bg-primary rounded-full animate-pulse" /> Platform
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModernBackground />
      <Navigation />
      
      <div className="relative z-10">
        <Hero isLoaded={!isLoading} />
        <Skills />
        <Experience />
        <Education />
        <Contact />
        
        <footer className="py-10 border-t border-border-subtle text-center">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-text-muted text-sm">
            <p>&copy; 2026 Ver Almodiel. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="https://github.com/veralmodiel" target="_blank" className="hover:text-text-base transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/veralmodiel" target="_blank" className="hover:text-text-base transition-colors">LinkedIn</a>
              <a href="https://drive.google.com/file/d/1MHM-fJmBDdN5H8YCWkCLjUu_o_79LyjR/view" target="_blank" className="hover:text-text-base transition-colors">Resume</a>
            </div>
            <p className="font-mono">Built with Next.js 16 & Framer Motion</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
