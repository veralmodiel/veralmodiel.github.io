"use client"

import React from "react"
import { motion } from "framer-motion"
const experiences = [
  {
    title: "Independent Senior Web Developer",
    period: "2024 — 2026",
    company: "AU Tech & Media Agency",
    description: "Modernizing corporate and e-commerce platforms using an AI-integrated workflow. Leveraging Gemini and Claude for rapid, high-quality delivery and optimization."
  },
  {
    title: "Senior Software Engineer",
    period: "2019 — 2024",
    company: "Cloudstaff",
    description: "Architected scalable WordPress solutions and bespoke WooCommerce experiences. Focused on performance tuning and custom plugin development for global clients."
  },
  {
    title: "Web Developer",
    period: "2018 — 2019",
    company: "OOm Philippines",
    description: "Transformed complex UI designs into robust WordPress themes, ensuring high-performance and pixel-perfect accuracy."
  },
  {
    title: "Webmaster / WordPress Developer",
    period: "2018",
    company: "VYomingo Jewellers",
    description: "In-house e-commerce catalog management and site enhancements for high-end jewelry platforms."
  },
  {
    title: "Web / WordPress Developer",
    period: "2016 — 2017",
    company: "BiteSize Concepts",
    description: "Custom theme creations, form integrations, and remote webmaster duties for diverse client portfolios."
  }
]

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            >
              The <span className="text-gradient">Professional Journey</span>
            </motion.h2>
            <p className="text-text-muted text-lg">
              A timeline of leadership and technical excellence across international agencies and enterprise platforms.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true, amount: 0.3, margin: "-100px" }}
              className="group relative glass p-8 md:p-12 rounded-[40px] border border-border-subtle hover:border-primary/20 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-primary font-mono text-xs font-bold tracking-tighter uppercase px-3 py-1 bg-primary/10 rounded-full">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">{exp.title}</h3>
                  </div>
                  <h4 className="text-lg text-text-muted font-medium mb-6">{exp.company}</h4>
                  <p className="text-text-muted leading-relaxed max-w-3xl">
                    {exp.description}
                  </p>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
