"use client"

import React from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, ArrowUpRight } from "lucide-react"

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3, margin: "-100px" }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
            >
              Ready to <br /><span className="text-gradient">Collaborate</span>?
            </motion.h2>
            <p className="text-text-muted text-lg mb-12 max-w-md leading-relaxed">
              I am currently open to high-impact projects and senior roles within forward-thinking organizations.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:veralmodiel@gmail.com" className="flex items-center gap-4 text-text-muted hover:text-primary transition-colors group">
                <div className="p-3 bg-bg-subtle/50 rounded-2xl group-hover:bg-primary/10 transition-colors">
                  <Mail size={24} className="text-primary" />
                </div>
                <span className="text-xl font-bold">veralmodiel@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-text-muted">
                <div className="p-3 bg-bg-subtle/50 rounded-2xl">
                  <MapPin size={24} className="text-secondary" />
                </div>
                <span className="text-xl font-bold">Bacolod City, Philippines</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3, margin: "-100px" }}
              className="glass p-12 rounded-[60px] border border-border-subtle flex flex-col items-center text-center group transition-all hover:border-primary/30"
            >
              <h3 className="text-3xl font-bold mb-6">Start a Project</h3>
              <p className="text-text-muted mb-10">
                Whether you have a specific brief or just an idea, let&apos;s turn it into a high-performance reality.
              </p>
              
              <a 
                href="mailto:veralmodiel@gmail.com"
                className="w-full py-6 bg-text-base text-bg-base font-bold rounded-3xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Send a Message <ArrowUpRight size={20} />
              </a>
              
              <p className="mt-8 text-xs font-bold text-text-muted uppercase tracking-widest">
                Typical reply in 12-24 hours
              </p>
            </motion.div>
            
            {/* Visual Flare */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[80px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
