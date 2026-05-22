'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import SketchRunner from './sketches/SketchRunner'
import type { SketchMeta } from '@/types'

interface Props {
  sketch: SketchMeta
  onClose: () => void
  onAddToPlaylist: (sketch: SketchMeta) => void
}

export default function Viewer({ sketch, onClose, onAddToPlaylist }: Props) {
  const [showUI, setShowUI] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetTimer = useCallback(() => {
    setShowUI(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowUI(false), 3500)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [resetTimer])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const uiCls = `transition-opacity duration-500 pointer-events-none ${showUI ? 'opacity-100' : 'opacity-0'}`

  return (
    <div
      className="fixed inset-0 z-50 bg-[#071220]"
      onMouseMove={resetTimer}
      onClick={resetTimer}
    >
      {/* Canvas */}
      <SketchRunner sketchFn={sketch.sketchFn} className="absolute inset-0 w-full h-full" />

      {/* Blueprint corner brackets — screen edges */}
      <div className={`absolute inset-0 ${uiCls}`}>
        <span className="absolute top-5 left-5 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-[#00b4d8]/45" />
        <span className="absolute top-5 right-5 w-8 h-8 border-t-[1.5px] border-r-[1.5px] border-[#00b4d8]/45" />
        <span className="absolute bottom-5 left-5 w-8 h-8 border-b-[1.5px] border-l-[1.5px] border-[#00b4d8]/45" />
        <span className="absolute bottom-5 right-5 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-[#00b4d8]/45" />
      </div>

      {/* Top bar */}
      <div className={`absolute top-0 left-0 right-0 ${uiCls}`}>
        <div className="flex items-start justify-between px-6 pt-5 pb-8 bg-gradient-to-b from-[#071220]/80 to-transparent pointer-events-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-[10px] tracking-[0.25em] text-[#2a5070] hover:text-[#00b4d8] uppercase transition-colors"
            >
              ← RL·Gallery
            </button>
            <span className="text-[#1a3a5c] text-xs">|</span>
            <span className="text-[9px] tracking-[0.2em] text-[#1a3a5c] uppercase">
              Rendering
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToPlaylist(sketch)}
              className="text-[10px] tracking-[0.12em] px-3 py-1.5 border border-[#1a3a5c] text-[#3a6680] hover:border-[#00b4d8]/50 hover:text-[#00b4d8] uppercase transition-colors"
            >
              + Queue
            </button>
            <button
              onClick={() => {
                const canvas = document.querySelector('canvas')
                if (!canvas) return
                const a = document.createElement('a')
                a.download = `${sketch.id}.png`
                a.href = canvas.toDataURL('image/png')
                a.click()
              }}
              title="Export frame as PNG"
              className="text-[10px] tracking-[0.12em] px-3 py-1.5 border border-[#1a3a5c] text-[#3a6680] hover:border-[#00b4d8]/50 hover:text-[#00b4d8] uppercase transition-colors"
            >
              ↓ PNG
            </button>
            <button
              onClick={onClose}
              className="text-[10px] px-3 py-1.5 border border-[#1a3a5c] text-[#2a5070] hover:text-[#5a8ca8] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className={`absolute bottom-0 left-0 right-0 ${uiCls}`}>
        <div className="px-6 pb-6 pt-10 bg-gradient-to-t from-[#071220]/85 to-transparent pointer-events-auto">
          <p className="text-[9px] tracking-[0.3em] text-[#2a5070] uppercase mb-1.5">
            Active Specification
          </p>
          <h2 className="text-[15px] font-bold tracking-[0.15em] text-[#c8dfe8] uppercase mb-1.5">
            {sketch.title}
          </h2>
          <p className="text-[10px] text-[#3a6680] mb-3 max-w-md leading-relaxed">
            {sketch.description}
          </p>
          <div className="flex items-center gap-3">
            {sketch.tags.map(tag => (
              <span key={tag} className="text-[9px] tracking-[0.08em] text-[#00b4d8]/45">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
