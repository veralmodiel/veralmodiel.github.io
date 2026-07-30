"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarCheck, Minus, Plus, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export const BookingForm: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [guests, setGuests] = useState(2)
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({})
  const [submitted, setSubmitted] = useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const nameValid = name.trim().length > 1
  const canSubmit = emailValid && nameValid

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true })
    if (!canSubmit) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setName("")
      setEmail("")
      setGuests(2)
      setTouched({})
    }, 2000)
  }

  return (
    <div className="glass glow-border p-8 rounded-[32px] h-full flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-bg-subtle/50 rounded-xl">
          <CalendarCheck size={20} className="text-amber-400" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Booking Enquiry</h3>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Real-time validation for the enquiry and booking forms that hospitality and events sites run on.
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Check size={24} />
            </div>
            <p className="font-bold">Enquiry sent</p>
            <p className="text-xs text-text-muted mt-1">We&apos;ll be in touch shortly.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-4"
          >
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                className={cn(
                  "w-full px-4 py-3 rounded-xl bg-bg-subtle/50 border text-sm outline-none transition-colors",
                  touched.name && !nameValid ? "border-accent/60" : "border-border-subtle focus:border-primary/40"
                )}
              />
              {touched.name && !nameValid && (
                <p className="text-[11px] text-accent mt-1">Enter your name.</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={cn(
                  "w-full px-4 py-3 rounded-xl bg-bg-subtle/50 border text-sm outline-none transition-colors",
                  touched.email && !emailValid ? "border-accent/60" : "border-border-subtle focus:border-primary/40"
                )}
              />
              {touched.email && !emailValid && (
                <p className="text-[11px] text-accent mt-1">Enter a valid email.</p>
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-bg-subtle/50 border border-border-subtle">
              <span className="text-sm text-text-muted">Guests</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-7 h-7 rounded-full bg-bg-base border border-border-subtle flex items-center justify-center"
                  aria-label="Decrease guests"
                >
                  <Minus size={12} />
                </button>
                <span className="w-5 text-center text-sm font-mono">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => g + 1)}
                  className="w-7 h-7 rounded-full bg-bg-base border border-border-subtle flex items-center justify-center"
                  aria-label="Increase guests"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-auto w-full py-3 bg-text-base text-bg-base font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Send enquiry
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
