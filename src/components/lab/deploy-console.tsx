"use client"

import React, { useEffect, useRef, useState } from "react"
import { RotateCcw, Terminal as TerminalIcon } from "lucide-react"

const commands: { text: string; kind: "cmd" | "out" }[] = [
  { text: "git commit -m \"ship: refreshed checkout flow\"", kind: "cmd" },
  { text: "git push origin main", kind: "cmd" },
  { text: "Running build...", kind: "out" },
  { text: "✓ Compiled successfully in 4.2s", kind: "out" },
  { text: "✓ Lighthouse performance 98/100", kind: "out" },
  { text: "npm run deploy", kind: "cmd" },
  { text: "✓ Deployed to production", kind: "out" },
]

export const DeployConsole: React.FC = () => {
  const [lines, setLines] = useState<string[]>([])
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [runId, setRunId] = useState(0)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lineIndex >= commands.length) return
    const current = commands[lineIndex].text

    if (charIndex < current.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => {
          const next = [...prev]
          next[lineIndex] = current.slice(0, charIndex + 1)
          return next
        })
        setCharIndex((c) => c + 1)
        if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
      }, 20)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      setLineIndex((i) => i + 1)
      setCharIndex(0)
    }, 350)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, lineIndex, runId])

  const replay = () => {
    setLines([])
    setLineIndex(0)
    setCharIndex(0)
    setRunId((r) => r + 1)
  }

  return (
    <div className="glass glow-border p-8 rounded-[32px] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-bg-subtle/50 rounded-xl">
            <TerminalIcon size={20} className="text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">Deploy Console</h3>
        </div>
        <button
          onClick={replay}
          className="text-text-muted hover:text-primary transition-colors"
          aria-label="Replay animation"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="rounded-2xl bg-bg-subtle/60 border border-border-subtle overflow-hidden flex-1">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border-subtle">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-[11px] text-text-muted font-mono">ver@production — deploy</span>
        </div>
        <div ref={outputRef} className="p-4 font-mono text-xs md:text-sm leading-relaxed h-[180px] overflow-y-auto">
          {lines.map((line, i) => {
            const isCmd = commands[i]?.kind === "cmd"
            return (
              <p key={i} className={isCmd ? "text-text-base mb-1" : "text-emerald-400 mb-1"}>
                {isCmd && <span className="text-primary">$ </span>}
                {line}
                {i === lineIndex && (
                  <span className="inline-block w-1.5 h-3.5 ml-1 align-middle animate-pulse bg-primary" />
                )}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
