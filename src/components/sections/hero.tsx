"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/lib/motion"
import { FigCaption } from "@/components/ui/fig-caption"
import { StatFigure } from "@/components/stats/stat-figure"

const HeroCanvas = dynamic(() => import("@/components/hero/hero-canvas").then((m) => m.HeroCanvas), {
  ssr: false,
})

const words = ["Storefronts", "Backends", "Integrations", "Design systems", "Deploys", "Performance", "Features"]

/** Vertical word index; one word lit at a time. */
function WordIndex() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setActive((i) => (i + 1) % words.length), 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <ul className="flex flex-col gap-1" aria-label="What I build">
      {words.map((word, i) => (
        <li
          key={word}
          className={cn(
            "label transition-colors duration-500",
            i === active ? "text-primary" : "text-text-muted/50"
          )}
        >
          {word}
        </li>
      ))}
    </ul>
  )
}

export const Hero: React.FC = () => {
  return (
    <section id="about" className="shell relative min-h-screen flex flex-col justify-between pt-36 md:pt-28 pb-10">
      {/* Top: headline + word index */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8">
          <p className="label mb-8 flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 bg-primary motion-safe:animate-pulse" />
            Open to the right opportunity
          </p>
          <h1 className="text-[clamp(2.5rem,6.4vw,6rem)] leading-[0.98]">
            I build the working parts of the&nbsp;web.
          </h1>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10 md:pt-16">
          <WordIndex />
        </div>
      </div>

      {/* Middle: three small framed figures */}
      <div className="grid grid-cols-3 grid-rows-[1fr_auto] gap-x-3 md:gap-x-10 my-16 md:my-20 max-w-3xl mx-auto w-full">
        <figure className="row-span-2 grid grid-rows-subgrid grid-cols-1 min-w-0">
          <div className="figure-frame min-h-36 md:aspect-square flex items-end p-3 md:p-4">
            <StatFigure kind="count" target={9} padLength={2} suffix="+" label="Years shipping" />
          </div>
          <FigCaption index={1}>experience</FigCaption>
        </figure>
        <figure className="row-span-2 grid grid-rows-subgrid grid-cols-1 min-w-0">
          <div className="figure-frame min-h-36 md:aspect-square flex items-end p-3 md:p-4">
            <StatFigure kind="count" target={4} padLength={2} label="Ecosystems" />
          </div>
          <FigCaption index={2}>range</FigCaption>
        </figure>
        <figure className="row-span-2 grid grid-rows-subgrid grid-cols-1 min-w-0">
          <div className="figure-frame min-h-36 md:aspect-square overflow-hidden">
            <HeroCanvas />
          </div>
          <FigCaption index={3}>
            <span className="hidden md:inline">Live canvas — move your cursor</span>
            <span className="md:hidden">Live canvas — tap it</span>
          </FigCaption>
        </figure>
      </div>

      {/* Bottom: intro copy + plain text links */}
      <div className="grid grid-cols-12 gap-6 items-end">
        <p className="col-span-12 md:col-span-5 text-text-muted max-w-md">
          Full-stack developer shipping across WordPress, Shopify, Webflow and Next.js, with an
          AI-assisted build process. Scroll to see the skills at work instead of reading about them.
        </p>
        <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col gap-2">
          <a href="#lab" className="label text-text-base hover:text-primary transition-colors">→ See it in action</a>
          <a href="#contact" className="label text-text-base hover:text-primary transition-colors">→ Let&apos;s talk</a>
        </div>
      </div>
    </section>
  )
}
