'use client'

import { useMemo, useState } from 'react'
import { SKETCHES } from '@/lib/sketches'
import type { SketchMeta, SortOption } from '@/types'

export function useGallery() {
  const [sort, setSort] = useState<SortOption>('newest')
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const sketches = useMemo<SketchMeta[]>(() => {
    let result = [...SKETCHES]

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
  }, [sort, search, activeTag])

  const toggleTag = (tag: string) => setActiveTag(prev => (prev === tag ? null : tag))

  return { sketches, sort, setSort, search, setSearch, activeTag, toggleTag }
}
