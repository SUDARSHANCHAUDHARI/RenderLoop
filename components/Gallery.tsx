'use client'

import { ALL_TAGS } from '@/lib/sketches'
import type { SketchMeta, SortOption } from '@/types'
import SketchCard from './SketchCard'

interface Props {
  sketches: SketchMeta[]
  sort: SortOption
  search: string
  activeTag: string | null
  totalCount: number
  onSort: (s: SortOption) => void
  onSearch: (q: string) => void
  onTagToggle: (tag: string) => void
  onOpen: (sketch: SketchMeta) => void
  onAddToPlaylist: (sketch: SketchMeta) => void
  onSurprise: () => void
  onTogglePlaylist: () => void
  playlistCount: number
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Date' },
  { value: 'popular', label: 'Views' },
  { value: 'a-z', label: 'A→Z' },
  { value: 'z-a', label: 'Z→A' },
]

function today() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`
}

export default function Gallery({
  sketches, sort, search, activeTag, totalCount,
  onSort, onSearch, onTagToggle, onOpen, onAddToPlaylist,
  onSurprise, onTogglePlaylist, playlistCount,
}: Props) {
  return (
    <div className="min-h-screen">

      {/* ── Header ────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#071220]/96 backdrop-blur-sm border-b border-[#1a3a5c]">

        {/* Title block */}
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold tracking-[0.4em] text-[#c8dfe8] uppercase leading-none">
              RenderLoop
            </h1>
            <p className="text-[9px] tracking-[0.3em] text-[#2a5070] uppercase mt-1">
              Generative Art Specifications
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[9px] tracking-[0.2em] text-[#1a3a5c] uppercase">Rev·01 / {today()}</p>
            <p className="text-[9px] tracking-[0.2em] text-[#1a3a5c] uppercase mt-0.5">
              {String(totalCount).padStart(3, '0')} Specs
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#1a3a5c]" />
        </div>

        {/* Controls row */}
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3 flex-wrap">

          {/* Search */}
          <div className="flex items-center gap-2 border border-[#1a3a5c] focus-within:border-[#235080] transition-colors px-3 py-1.5">
            <span className="text-[9px] tracking-[0.2em] text-[#2a5070] uppercase">Search</span>
            <span className="text-[#1a3a5c]">·</span>
            <input
              type="text"
              value={search}
              onChange={e => onSearch(e.target.value)}
              placeholder="query..."
              className="bg-transparent text-[#c8dfe8] placeholder-[#1a3a5c] text-[11px] w-28 focus:outline-none"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center border border-[#1a3a5c]">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => onSort(opt.value)}
                className={`text-[10px] tracking-[0.1em] px-3 py-1.5 uppercase transition-colors ${
                  sort === opt.value
                    ? 'bg-[#00b4d8]/10 text-[#00b4d8] border-r border-[#1a3a5c] last:border-r-0'
                    : 'text-[#2a5070] hover:text-[#5a8ca8] border-r border-[#1a3a5c] last:border-r-0'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-[#1a3a5c] hidden sm:block" />

          {/* Surprise */}
          <button
            onClick={onSurprise}
            title="Random Spec — S"
            className="text-[10px] tracking-[0.12em] px-3 py-1.5 border border-[#1a3a5c] text-[#2a5070] hover:border-[#00b4d8]/40 hover:text-[#00b4d8] transition-colors uppercase"
          >
            ⚡ Random
          </button>

          {/* Queue */}
          <button
            onClick={onTogglePlaylist}
            title="Render Queue — P"
            className="relative text-[10px] tracking-[0.12em] px-3 py-1.5 border border-[#1a3a5c] text-[#2a5070] hover:border-[#00b4d8]/40 hover:text-[#00b4d8] transition-colors uppercase"
          >
            ⊞ Queue
            {playlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#00b4d8] text-[#071220] text-[8px] w-3.5 h-3.5 flex items-center justify-center font-bold rounded-full">
                {playlistCount}
              </span>
            )}
          </button>
        </div>

        {/* Tag divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#1a3a5c]" />
        </div>

        {/* Tag filters */}
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-2 flex-wrap">
          <span className="text-[9px] tracking-[0.25em] text-[#1a3a5c] uppercase mr-1">Filter ▸</span>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`text-[9px] tracking-[0.08em] px-2 py-0.5 border transition-colors ${
                activeTag === tag
                  ? 'border-[#00b4d8]/60 text-[#00b4d8] bg-[#00b4d8]/5'
                  : 'border-[#1a3a5c] text-[#2a5070] hover:border-[#235080] hover:text-[#5a8ca8]'
              }`}
            >
              #{tag}
            </button>
          ))}
          {activeTag && (
            <button
              onClick={() => onTagToggle(activeTag)}
              className="text-[9px] text-[#2a5070] hover:text-[#5a8ca8] transition-colors ml-1"
            >
              ✕ clear
            </button>
          )}
        </div>
      </header>

      {/* ── Grid ──────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {sketches.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[10px] tracking-[0.25em] text-[#1a3a5c] uppercase">
              No Specifications Found
            </p>
            <p className="text-[9px] text-[#0f2440] mt-2">
              Try adjusting search or filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#1a3a5c]">
            {sketches.map((sketch, i) => (
              <div key={sketch.id} className="bg-[#071220]">
                <SketchCard
                  sketch={sketch}
                  index={i}
                  onOpen={onOpen}
                  onAddToPlaylist={onAddToPlaylist}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-6 py-5 border-t border-[#1a3a5c] mt-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] tracking-[0.2em] text-[#1a3a5c] uppercase">
            RenderLoop — Generative Art Gallery
          </span>
          <span className="text-[9px] tracking-[0.12em] text-[#0f2440] uppercase hidden sm:block">
            S: Random · P: Queue · Esc: Close · ←→: Navigate
          </span>
        </div>
      </footer>
    </div>
  )
}
