"use client"

import React from "react"
import { motion } from "framer-motion"
import { labItems } from "@/lib/lab-items"

export const Lab: React.FC = () => {
  return (
    <section id="lab" className="py-20 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-xl mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            The <span className="text-gradient">Lab</span>
          </motion.h2>
          <p className="text-text-muted text-lg mb-4">
            Most of my client work sits behind agency NDAs, so instead of screenshots, here are a few small builds you can actually touch.
          </p>
          <p className="text-text-muted text-sm">
            Happy to share a few live client sites privately on request, just ask.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              viewport={{ once: true, amount: 0.3, margin: "-100px" }}
            >
              {item.node}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
