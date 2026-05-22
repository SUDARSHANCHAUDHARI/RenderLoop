'use client'

import { useCallback, useState } from 'react'
import type { SketchMeta } from '@/types'

export function useViewer() {
  const [current, setCurrent] = useState<SketchMeta | null>(null)

  const open = useCallback((sketch: SketchMeta) => setCurrent(sketch), [])
  const close = useCallback(() => setCurrent(null), [])

  return { current, isOpen: current !== null, open, close }
}
