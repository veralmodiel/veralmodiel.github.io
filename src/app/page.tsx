"use client"

import { Navigation } from "@/components/navigation"
import { ModernBackground } from "@/components/modern-background"
import { Hero } from "@/components/sections/hero"
import { Results } from "@/components/sections/results"
import { Skills } from "@/components/sections/skills"
import { Lab } from "@/components/sections/lab"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-base overflow-x-hidden">
      <ModernBackground />
      <Navigation />

      <div className="relative z-10">
        <Hero />
        <Results />
        <Skills />
        <Lab />
        <Contact />
        
        <footer className="pt-10 pb-8 border-t border-border-subtle">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-text-muted text-sm pb-8">
              <p>&copy; 2026 Ver Almodiel. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="https://github.com/veralmodiel" target="_blank" className="hover:text-text-base transition-colors">GitHub</a>
                <a href="https://linkedin.com/in/veralmodiel" target="_blank" className="hover:text-text-base transition-colors">LinkedIn</a>
                <a href="https://drive.google.com/file/d/1MHM-fJmBDdN5H8YCWkCLjUu_o_79LyjR/view" target="_blank" className="hover:text-text-base transition-colors">Resume</a>
              </div>
            </div>
            <p className="text-center font-mono text-xs text-text-muted/60 pt-8 border-t border-border-subtle">
              I built this with some AI assistance, because why not.
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
