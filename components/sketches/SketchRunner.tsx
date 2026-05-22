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

    import('p5').then(({ default: P5 }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      instance = new (P5 as any)(sketchFn, containerRef.current)
    })

    return () => {
      instance?.remove()
    }
  }, [sketchFn])

  return <div ref={containerRef} className={className} />
}
