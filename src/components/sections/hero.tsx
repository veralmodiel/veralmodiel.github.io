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
    <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-1" aria-label="What I build">
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
    <section id="about" className="shell relative min-h-svh flex flex-col justify-between pt-[clamp(7rem,17svh,9rem)] md:pt-[clamp(5rem,12svh,7rem)] pb-[clamp(1.5rem,4svh,2.5rem)]">
      {/* Top: headline + word index */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8">
          <p className="label mb-[clamp(1rem,3svh,2rem)] flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 bg-primary motion-safe:animate-pulse" />
            Open to the right opportunity
          </p>
          <h1 className="text-[clamp(2.5rem,min(6.4vw,9svh),6rem)] leading-[0.98]">
            I build the working parts of the&nbsp;web.
          </h1>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10 md:pt-16 max-md:[@media(max-height:760px)]:hidden">
          <WordIndex />
        </div>
      </div>

      {/* Middle: three small framed figures */}
      <div className="grid grid-cols-3 grid-rows-[1fr_auto] gap-x-3 md:gap-x-10 my-[clamp(1.5rem,5svh,4rem)] md:my-[clamp(1.5rem,5svh,5rem)] max-w-3xl md:max-w-[min(48rem,calc(60svh_+_5rem))] mx-auto w-full">
        <figure className="row-span-2 grid grid-rows-subgrid grid-cols-1 min-w-0">
          <div className="figure-frame min-h-[clamp(7rem,18svh,9rem)] md:min-h-0 md:aspect-square flex items-start p-3 md:p-4">
            <StatFigure kind="count" target={9} padLength={2} suffix="+" label="Years shipping" />
          </div>
          <FigCaption index={1}>experience</FigCaption>
        </figure>
        <figure className="row-span-2 grid grid-rows-subgrid grid-cols-1 min-w-0">
          <div className="figure-frame min-h-[clamp(7rem,18svh,9rem)] md:min-h-0 md:aspect-square flex items-start p-3 md:p-4">
            <StatFigure kind="count" target={4} padLength={2} label="Ecosystems" />
          </div>
          <FigCaption index={2}>range</FigCaption>
        </figure>
        <figure className="row-span-2 grid grid-rows-subgrid grid-cols-1 min-w-0">
          <div className="figure-frame min-h-[clamp(7rem,18svh,9rem)] md:min-h-0 md:aspect-square overflow-hidden">
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
        <p className="col-span-12 md:col-span-5 text-[13px] md:text-sm text-text-muted max-w-md">
          Full-stack developer shipping across WordPress, Shopify, Webflow and Next.js, with an
          AI-assisted build process. Scroll to see the skills at work instead of reading about them.
        </p>
        <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-row gap-6 md:flex-col md:gap-2">
          <a href="#lab" className="label text-text-base hover:text-primary transition-colors">→ See it in action</a>
          <a href="#contact" className="label text-text-base hover:text-primary transition-colors">→ Let&apos;s talk</a>
        </div>
      </div>
    </section>
  )
}
