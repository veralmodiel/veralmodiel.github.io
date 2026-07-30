"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, ArrowUpRight, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""

type Status = "idle" | "loading" | "success" | "error"

export const Contact: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canSubmit = name.trim().length > 1 && emailValid && message.trim().length > 4

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    if (!canSubmit) return

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error")
      return
    }

    setStatus("loading")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio enquiry from ${name}`,
          name,
          email,
          message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              className="glass p-10 md:p-12 rounded-[60px] border border-border-subtle transition-colors hover:border-primary/30"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                      <Check size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message sent</h3>
                    <p className="text-text-muted">Thanks for reaching out, I&apos;ll reply as soon as possible.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="text-center"
                  >
                    <h3 className="text-3xl font-bold mb-6">Start a Project</h3>
                    <p className="text-text-muted mb-8">
                      Whether you have a specific brief or just an idea, let&apos;s turn it into a high-performance reality.
                    </p>

                    <div className="space-y-4 text-left mb-6">
                      <input
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute left-[-9999px] w-px h-px"
                      />
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-bg-subtle/50 border border-border-subtle text-sm outline-none focus:border-primary/40 transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-bg-subtle/50 border border-border-subtle text-sm outline-none focus:border-primary/40 transition-colors"
                      />
                      <textarea
                        placeholder="What are you building?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-5 py-4 rounded-2xl bg-bg-subtle/50 border border-border-subtle text-sm outline-none focus:border-primary/40 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit || status === "loading"}
                      className="w-full py-6 bg-text-base text-bg-base font-bold rounded-3xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> Sending
                        </>
                      ) : (
                        <>
                          Send a Message <ArrowUpRight size={20} />
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <p className="mt-4 text-xs font-bold text-accent">
                        Couldn&apos;t send that. Email me directly at veralmodiel@gmail.com instead.
                      </p>
                    )}

                    <p className={cn("mt-8 text-xs font-bold text-text-muted uppercase tracking-widest", status === "error" && "hidden")}>
                      Will reply as soon as possible.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Visual Flare */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 blur-[80px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
