'use client'

import { useMemo, useState } from 'react'
import { SKETCHES } from '@/lib/sketches'
import type { SketchMeta, SortOption, ViewMode } from '@/types'

export function useGallery(favorites: Set<string>) {
  const [sort, setSort] = useState<SortOption>('newest')
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [activeAlgorithm, setActiveAlgorithm] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('all')

  const sketches = useMemo<SketchMeta[]>(() => {
    let result = [...SKETCHES]

    if (viewMode === 'favorites') {
      result = result.filter(s => favorites.has(s.id))
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        s =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some(t => t.includes(q))
      )
    }

    if (activeTag) {
      result = result.filter(s => s.tags.includes(activeTag))
    }

    if (activeAlgorithm) {
      result = result.filter(s => s.algorithmId === activeAlgorithm)
    }

    switch (sort) {
      case 'a-z':
        return result.sort((a, b) => a.title.localeCompare(b.title))
      case 'z-a':
        return result.sort((a, b) => b.title.localeCompare(a.title))
      case 'popular':
        return result.sort((a, b) => b.views - a.views)
      case 'newest':
      default:
        return result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }
  }, [sort, search, activeTag, activeAlgorithm, viewMode, favorites])

  const toggleTag = (tag: string) => setActiveTag(prev => (prev === tag ? null : tag))
  const toggleAlgorithm = (id: string) => setActiveAlgorithm(prev => (prev === id ? null : id))

  return {
    sketches, sort, setSort, search, setSearch,
    activeTag, toggleTag,
    activeAlgorithm, toggleAlgorithm,
    viewMode, setViewMode,
  }
}
