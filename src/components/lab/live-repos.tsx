"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, GitFork, ExternalLink, Loader2 } from "lucide-react"

interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

const GITHUB_USERNAME = "veralmodiel"

const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-400",
  PHP: "bg-sky-400",
  CSS: "bg-teal-400",
  HTML: "bg-orange-400",
  Python: "bg-emerald-400",
}

function timeAgo(dateString: string) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
  const units: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ]
  for (const [unitSeconds, label] of units) {
    const value = Math.floor(seconds / unitSeconds)
    if (value >= 1) return `${value}${label} ago`
  }
  return "just now"
}

export const LiveRepos: React.FC = () => {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API error")
        return res.json()
      })
      .then((data: Repo[]) => {
        if (!cancelled) setRepos(data)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="glass glow-border p-8 rounded-[32px] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold tracking-tight">Live from GitHub</h3>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest text-text-muted hover:text-primary transition-colors flex items-center gap-1"
        >
          Profile <ExternalLink size={12} />
        </a>
      </div>

      {error && (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-text-muted py-10">
          <p className="mb-4">Couldn&apos;t reach the GitHub API right now.</p>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold hover:underline"
          >
            View repos directly on GitHub
          </a>
        </div>
      )}

      {!error && !repos && (
        <div className="flex-1 flex items-center justify-center text-text-muted py-10">
          <Loader2 className="animate-spin" size={24} />
        </div>
      )}

      {!error && repos && (
        <div className="space-y-3 flex-1">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="block p-4 rounded-2xl bg-bg-subtle/50 border border-border-subtle hover:border-primary/30 hover:bg-bg-subtle transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-1">
                <span className="font-bold text-sm group-hover:text-primary transition-colors truncate">
                  {repo.name}
                </span>
                <span className="text-[10px] text-text-muted whitespace-nowrap">{timeAgo(repo.updated_at)}</span>
              </div>
              {repo.description && (
                <p className="text-xs text-text-muted mb-3 line-clamp-1">{repo.description}</p>
              )}
              <div className="flex items-center gap-4 text-[11px] text-text-muted">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${languageColors[repo.language] ?? "bg-text-muted"}`} />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  )
}
