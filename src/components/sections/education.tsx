"use client"

import React from "react"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3, margin: "-100px" }}
        className="glass p-12 md:p-20 rounded-[60px] relative overflow-hidden border border-border-subtle"
        >
          {/* Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            <div className="w-32 h-32 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <GraduationCap size={64} strokeWidth={1.5} />
            </div>
            
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                Academic <span className="text-gradient">Foundation</span>
              </h2>
              <h3 className="text-xl md:text-2xl font-bold text-text-base mb-2">Bachelor of Science in Information Technology</h3>
              <p className="text-text-muted text-lg mb-6">University of St. La Salle • Class of 2015</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-bg-subtle/50 rounded-full text-xs font-bold uppercase tracking-widest text-text-muted border border-border-subtle">
                  Best IT Capstone Project
                </span>
                <span className="px-4 py-2 bg-bg-subtle/50 rounded-full text-xs font-bold uppercase tracking-widest text-text-muted border border-border-subtle">
                  Startup Weekend Participant
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
