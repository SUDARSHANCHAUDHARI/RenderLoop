import type p5 from 'p5'

export type SketchFn = (p: p5) => void

export interface SketchParams {
  seed: number
  density: number   // 0–1: affects particle count, grid resolution, line count
  speed: number     // 0–1: affects animation velocity
  scale: number     // 0–1: affects feature size / zoom
  complexity: number // 0–1: affects branch depth, iteration count, subdivision
}

export interface SketchMeta {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: string
  views: number
  sketchFn: SketchFn
  algorithmId?: string   // parent algorithm (e.g. 'flow-field')
  variationIndex?: number // 0-based index within the algorithm family
  params?: SketchParams
}

export type SortOption = 'a-z' | 'z-a' | 'newest' | 'popular'
