'use client'

import type { SketchMeta } from '@/types'

interface Props {
  items: SketchMeta[]
  currentIndex: number
  isPlaying: boolean
  isShuffled: boolean
  isOpen: boolean
  onClose: () => void
  onRemove: (id: string) => void
  onClear: () => void
  onPlay: () => void
  onShuffle: () => void
  onSelect: (sketch: SketchMeta) => void
}

export default function PlaylistPanel({
  items, currentIndex, isPlaying, isShuffled, isOpen,
  onClose, onRemove, onClear, onPlay, onShuffle, onSelect,
}: Props) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/25" onClick={onClose} />
      )}

      <aside
        style={{ width: '272px' }}
        className={`fixed top-0 right-0 h-full z-50 flex flex-col bg-[#071220] border-l border-[#1a3a5c] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Title block */}
        <div className="flex items-end justify-between px-4 pt-4 pb-3 border-b border-[#1a3a5c]">
          <div>
            <p className="text-[8px] tracking-[0.35em] text-[#1a3a5c] uppercase">Render</p>
            <h2 className="text-[14px] font-bold tracking-[0.22em] text-[#c8dfe8] uppercase leading-tight">
              Queue
            </h2>
          </div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[8px] tracking-[0.15em] text-[#1a3a5c] border border-[#1a3a5c] px-1.5 py-0.5 uppercase">
              {String(items.length).padStart(2, '0')} Specs
            </span>
            <button onClick={onClose} className="text-[#2a5070] hover:text-[#5a8ca8] text-xs transition-colors">
              ✕
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1a3a5c]">
          <button
            onClick={onPlay}
            disabled={items.length === 0}
            className={`flex-1 text-[10px] tracking-[0.1em] py-1.5 border uppercase transition-colors ${
              items.length === 0
                ? 'border-[#1a3a5c] text-[#1a3a5c] cursor-not-allowed'
                : isPlaying
                ? 'border-[#00b4d8]/60 text-[#00b4d8] bg-[#00b4d8]/5'
                : 'border-[#235080] text-[#5a8ca8] hover:border-[#00b4d8]/50 hover:text-[#00b4d8]'
            }`}
          >
            {isPlaying ? '⏸ Pause' : '▷ Execute'}
          </button>
          <button
            onClick={onShuffle}
            title="Shuffle"
            className={`text-[11px] px-3 py-1.5 border transition-colors ${
              isShuffled
                ? 'border-[#00b4d8]/60 text-[#00b4d8] bg-[#00b4d8]/5'
                : 'border-[#235080] text-[#3a6680] hover:text-[#5a8ca8]'
            }`}
          >
            ⇄
          </button>
          <button
            onClick={onClear}
            disabled={items.length === 0}
            className="text-[10px] px-3 py-1.5 border border-[#1a3a5c] text-[#2a5070] hover:text-[#5a8ca8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ✕
          </button>
        </div>

        {/* Queue items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-[9px] tracking-[0.25em] text-[#1a3a5c] uppercase">Queue Empty</p>
              <p className="text-[9px] text-[#0f2440] mt-2 tracking-[0.1em]">
                Add specs via &quot;+ Queue&quot;
              </p>
            </div>
          ) : (
            <ul>
              {items.map((sketch, i) => (
                <li
                  key={sketch.id}
                  onClick={() => onSelect(sketch)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-[#0d1e35] transition-colors ${
                    i === currentIndex && isPlaying
                      ? 'bg-[#0d1e35] text-[#c8dfe8]'
                      : 'text-[#3a6680] hover:text-[#c8dfe8] hover:bg-[#0a1628]'
                  }`}
                >
                  <span className="text-[9px] tracking-[0.1em] text-[#1a3a5c] w-5 shrink-0 tabular-nums">
                    {i === currentIndex && isPlaying ? '▷' : String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.08em] uppercase truncate">{sketch.title}</p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); onRemove(sketch.id) }}
                    className="text-[9px] text-[#1a3a5c] hover:text-[#5a8ca8] transition-colors shrink-0"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#1a3a5c]">
          <p className="text-[8px] tracking-[0.15em] text-[#0f2440] uppercase">
            ← → Navigate · Esc Close · 12s/Spec
          </p>
        </div>
      </aside>
    </>
  )
}
