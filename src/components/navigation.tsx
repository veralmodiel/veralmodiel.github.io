"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { sections } from "@/lib/sections"
import { prefersReducedMotion } from "@/lib/motion"
import { ThemeToggle } from "./theme-toggle"

/**
 * Fixed top bar. Desktop: name left, section links centred, location + theme right.
 * Mobile: only four links, so they stay visible as a second row instead of hiding behind a menu.
 */
export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id)

  // Highlight whichever section crosses the middle of the viewport. An
  // IntersectionObserver follows the live layout, so it stays correct when
  // sections grow after load (Lab demos, fonts, images).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )
    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }

  const links = () =>
    sections.map((section) => {
      const active = activeSection === section.id
      return (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => handleNavClick(e, section.id)}
          aria-current={active ? "true" : undefined}
          className={cn(
            "label relative transition-colors hover:text-text-base",
            active && "text-text-base"
          )}
        >
          {section.label}
          <span
            className={cn(
              "absolute -bottom-1.5 left-0 h-px bg-primary transition-all duration-300",
              active ? "w-full" : "w-0"
            )}
            aria-hidden="true"
          />
        </a>
      )
    })

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[150] bg-bg-base border-b border-border-hairline">
        <div className="shell grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
            className="justify-self-start h-14 flex items-center text-[13px] uppercase tracking-[0.18em] text-text-base"
          >
            Ver Almodiel<span className="text-primary">.</span>
          </a>

          <nav
            aria-label="Sections"
            className="order-last md:order-none col-span-2 md:col-span-1 flex items-center justify-between md:justify-center md:gap-8 h-11 md:h-14 border-t md:border-t-0 border-border-hairline"
          >
            {links()}
          </nav>

          <div className="justify-self-end flex items-center gap-6">
            <span className="label hidden lg:inline">Bacolod City — Remote</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

    </>
  )
}
