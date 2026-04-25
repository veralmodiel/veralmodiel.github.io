"use client"

import React, { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

interface TerminalLine {
  text: string
  type: "command" | "output" | "error"
}

const modernText = [
  "git init almodiel-portfolio",
  "git remote add origin https://github.com/veralmodiel/portfolio.git",
  "git pull origin production",
  "git status --short",
  "M assets/css/modern-v2.css",
  "M assets/js/main.js",
  "git log --oneline -n 1",
  "df4e21a [Senior-Dev] Establish Modern Interface"
]

const oldSchoolText = [
  "Initializing boot sequence...",
  "Loading Ver_Almodiel.sys...",
  "Activating Developer Mode [██████████] 100%",
  "Welcome to my portfolio."
]

export const Terminal: React.FC = () => {
  const { theme } = useTheme()
  const isModern = theme === "modern"
  const [lines, setLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const outputRef = useRef<HTMLDivElement>(null)

  const activeText = isModern ? modernText : oldSchoolText

  useEffect(() => {
    // Reset when theme changes
    setLines([])
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
  }, [theme])

  useEffect(() => {
    if (currentLineIndex < activeText.length) {
      const currentString = activeText[currentLineIndex]
      
      if (currentCharIndex < currentString.length) {
        const timeout = setTimeout(() => {
          const newLines = [...lines]
          if (currentCharIndex === 0) {
            newLines.push(currentString[0])
          } else {
            newLines[currentLineIndex] = currentString.substring(0, currentCharIndex + 1)
          }
          setLines(newLines)
          setCurrentCharIndex(currentCharIndex + 1)
          
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
          }
        }, isModern ? 25 : 40)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex(currentLineIndex + 1)
          setCurrentCharIndex(0)
        }, isModern ? 300 : 500)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentCharIndex, currentLineIndex, activeText, isModern, lines])

  return (
    <div className={`terminal-box overflow-hidden relative ${isModern ? 'h-[280px]' : 'h-[280px]'}`}>
      <div className="terminal-header">
        <div className="dots flex gap-1.5">
          <div className="dot w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="dot w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="dot w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <span className="ml-4 text-gray-400 font-sans text-xs">
          {isModern ? "git-deploy — ~/Portfolio" : "bash — 80x24"}
        </span>
      </div>
      
      <div 
        ref={outputRef}
        className="mt-8 mb-4 text-sm md:text-base leading-relaxed tracking-wider overflow-y-auto max-h-[200px] scroll-smooth"
      >
        {lines.map((line, i) => (
          <p key={i} className={isModern ? "text-blue-300 font-mono mb-1" : "text-green-400 font-mono mb-1"}>
            {line}
            {i === currentLineIndex && (
              <span className={`inline-block w-2 h-4 ml-1 align-middle animate-pulse ${isModern ? "bg-blue-400" : "bg-green-400"}`}></span>
            )}
          </p>
        ))}
        {currentLineIndex >= activeText.length && (
           <p><span className={`inline-block w-2 h-4 ml-1 align-middle animate-pulse ${isModern ? "bg-blue-400" : "bg-green-400"}`}></span></p>
        )}
      </div>
    </div>
  )
}
