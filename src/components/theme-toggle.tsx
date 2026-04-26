"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  // Avoid hydration mismatch
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => { setTimeout(() => setIsMounted(true), 0) }, [])

  if (!isMounted) return null

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ]

  const currentTheme = themes.find((t) => t.name === theme) || themes[2]

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-subtle border border-border-subtle hover:bg-bg-base transition-all text-text-muted hover:text-primary"
        aria-label="Toggle theme"
      >
        <currentTheme.icon size={20} />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsMenuOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-2 w-36 glass rounded-2xl p-2 z-50 overflow-hidden"
            >
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setTheme(t.name)
                    setIsMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                    theme === t.name 
                      ? "bg-primary/20 text-primary font-bold" 
                      : "text-text-muted hover:bg-bg-subtle hover:text-text-base"
                  }`}
                >
                  <t.icon size={16} />
                  {t.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
