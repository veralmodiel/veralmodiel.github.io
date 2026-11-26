"use client"

import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/sections/hero"
import { Results } from "@/components/sections/results"
import { Skills } from "@/components/sections/skills"
import { Lab } from "@/components/sections/lab"
import { Contact } from "@/components/sections/contact"
import { Starfield } from "@/components/starfield"
import { CursorFollower } from "@/components/cursor-follower"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-base">
      <Starfield />
      <CursorFollower />
      <Navigation />

      <div className="relative z-10">
        <Hero />
        <Results />
        <Skills />
        <Lab />
        <Contact />

        <footer className="shell border-t border-border-hairline pt-10 pb-12">
          {/* Mobile: one centred stack (links, credit, ©). Desktop: © left, links centre, credit right. */}
          <div className="flex flex-col items-center gap-5 text-center md:grid md:grid-cols-3 md:items-center md:gap-6 md:text-left">
            <div className="flex justify-center gap-6 md:order-2">
              <a href="https://github.com/veralmodiel" target="_blank" rel="noopener noreferrer" className="label hover:text-text-base">GitHub</a>
              <a href="https://linkedin.com/in/veralmodiel" target="_blank" rel="noopener noreferrer" className="label hover:text-text-base">LinkedIn</a>
              <a href="https://drive.google.com/file/d/1MHM-fJmBDdN5H8YCWkCLjUu_o_79LyjR/view" target="_blank" rel="noopener noreferrer" className="label hover:text-text-base">Resume</a>
            </div>
            <p className="label md:order-3 md:text-right">Built by Ver × Claude.</p>
            <p className="label md:order-1">&copy; 2026 Ver Almodiel</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
