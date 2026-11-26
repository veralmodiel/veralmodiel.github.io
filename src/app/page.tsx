"use client"

import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/sections/hero"
import { Results } from "@/components/sections/results"
import { Skills } from "@/components/sections/skills"
import { Lab } from "@/components/sections/lab"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-base">
      <Navigation />

      <div className="relative z-10">
        <Hero />
        <Results />
        <Skills />
        <Lab />
        <Contact />

        <footer className="shell border-t border-border-hairline pt-10 pb-12">
          <div className="grid grid-cols-12 gap-6">
            <p className="label col-span-12 md:col-span-4">&copy; 2026 Ver Almodiel</p>
            <div className="col-span-12 md:col-span-4 flex gap-6">
              <a href="https://github.com/veralmodiel" target="_blank" className="label hover:text-text-base">GitHub</a>
              <a href="https://linkedin.com/in/veralmodiel" target="_blank" className="label hover:text-text-base">LinkedIn</a>
              <a href="https://drive.google.com/file/d/1MHM-fJmBDdN5H8YCWkCLjUu_o_79LyjR/view" target="_blank" className="label hover:text-text-base">Resume</a>
            </div>
            <p className="label col-span-12 md:col-span-4 md:text-right">Built by Ver × Claude.</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
