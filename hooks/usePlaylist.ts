'use client'

import { useCallback, useState } from 'react'
import type { SketchMeta } from '@/types'

export const PLAYLIST_DURATION_MS = 12000

export function usePlaylist() {
  const [items, setItems] = useState<SketchMeta[]>([])
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)

  const add = useCallback((sketch: SketchMeta) => {
    setItems(prev => (prev.some(s => s.id === sketch.id) ? prev : [...prev, sketch]))
  }, [])

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(s => s.id !== id))
    setIndex(prev => Math.max(0, prev - 1))
  }, [])

  const clear = useCallback(() => {
    setItems([])
    setIndex(0)
    setIsPlaying(false)
  }, [])

  const next = useCallback((count: number) => {
    setIndex(prev =>
      isShuffled
        ? Math.floor(Math.random() * count)
        : (prev + 1) % count
    )
  }, [isShuffled])

  const prev = useCallback((count: number) => {
    setIndex(prev => (prev - 1 + count) % count)
  }, [])

  const togglePlay = useCallback(() => setIsPlaying(p => !p), [])
  const toggleShuffle = useCallback(() => setIsShuffled(s => !s), [])

  return {
    items,
    index,
    currentSketch: items[index] ?? null,
    isPlaying,
    isShuffled,
    add,
    remove,
    clear,
    next,
    prev,
    togglePlay,
    toggleShuffle,
    setIsPlaying,
    setIndex,
  }
}
