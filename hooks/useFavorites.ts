import { useState, useEffect, useCallback } from 'react'

const KEY = 'renderloop:favorites'

function load(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

function save(ids: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify([...ids]))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => { setFavorites(load()) }, [])

  const toggle = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      save(next)
      return next
    })
  }, [])

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites])

  return { favorites, toggle, isFavorite }
}
