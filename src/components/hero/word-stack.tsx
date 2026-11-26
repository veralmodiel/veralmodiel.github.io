"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/lib/motion"

interface WordStackProps {
  words: string[]
  intervalMs?: number
  className?: string
}

export const WordStack: React.FC<WordStackProps> = ({ words, intervalMs = 2200, className }) => {
  const [index, setIndex] = useState(0)
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), words[0])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [words.length, intervalMs])

  return (
    <span className={cn("relative inline-block align-top whitespace-nowrap", className)} aria-label={words[0]}>
      <span className="invisible" aria-hidden="true">
        {longest}
      </span>
      {words.map((word, i) => (
        <motion.span
          key={word}
          aria-hidden={i !== index}
          className="absolute inset-0 whitespace-nowrap"
          animate={{
            opacity: i === index ? 1 : 0,
            y: i === index ? 0 : i < index ? -16 : 16,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
