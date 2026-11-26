"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "lenis/react"
import { cn } from "@/lib/utils"
import { sections } from "@/lib/sections"
import { prefersReducedMotion } from "@/lib/motion"
import { ThemeToggle } from "./theme-toggle"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export const Navigation: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [scrolled, setScrolled] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    setTimeout(() => setMounted(true), 0)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActiveSection(section.id)
        },
      })
    )
    return () => triggers.forEach((trigger) => trigger.kill())
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    if (lenis) {
      lenis.scrollTo(target, { offset: -16 })
    } else {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" })
    }
    setIsMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <>
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-[150] transition-all duration-500 w-[90%] max-w-2xl px-6 py-2 rounded-full border border-border-subtle",
          scrolled ? "bg-bg-base/80 backdrop-blur-xl shadow-2xl py-3 border-border-subtle" : "bg-transparent"
        )}
      >
        <div className="flex justify-between items-center text-text-base">
          <div className="text-sm font-bold tracking-tighter">
            VER<span className="text-primary">_ALMODIEL</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavClick(e, section.id)}
                className={cn(
                  "font-mono text-xs uppercase tracking-widest transition-all hover:text-primary flex items-center gap-1.5",
                  activeSection === section.id ? "text-primary" : "text-text-muted"
                )}
              >
                <span className="opacity-60">{"{"}{section.marker}{"}"}</span>
                {section.label}
              </a>
            ))}
            <div className="w-[1px] h-4 bg-border-subtle mx-2" />
            <ThemeToggle />
          </div>

          {/* Mobile Toggle Group */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-muted hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[140] bg-bg-base/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavClick(e, section.id)}
                className={cn(
                  "text-2xl font-bold tracking-tight transition-all flex items-center gap-3",
                  activeSection === section.id ? "text-primary" : "text-text-muted"
                )}
              >
                <span className="font-mono text-sm opacity-60">{"{"}{section.marker}{"}"}</span>
                {section.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
