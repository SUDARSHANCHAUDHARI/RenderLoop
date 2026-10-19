'use client'

import { useEffect, useRef } from 'react'
import type { SketchFn } from '@/types'

interface Props {
  sketchFn: SketchFn
  className?: string
}

export default function SketchRunner({ sketchFn, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let instance: { remove(): void } | undefined
    // The p5 import can resolve after unmount or a sketch change; never create a canvas then.
    let cancelled = false

    import('p5').then(({ default: P5 }) => {
      if (cancelled) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      instance = new (P5 as any)(sketchFn, containerRef.current)
    })

    return () => {
      cancelled = true
      instance?.remove()
    }
  }, [sketchFn])

  return <div ref={containerRef} className={className} />
}
