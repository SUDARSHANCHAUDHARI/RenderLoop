import type { SketchMeta } from '@/types'
import { generateParams } from '@/lib/paramGenerator'
import { ALGORITHMS } from '@/lib/variants'

const PAD = (n: number) => String(n + 1).padStart(3, '0')

export const SKETCHES: SketchMeta[] = ALGORITHMS.flatMap((alg) =>
  Array.from({ length: alg.variationCount }, (_, i) => {
    const params = generateParams(alg.id, i)
    return {
      id: `${alg.id}-${PAD(i)}`,
      title: `${alg.title} · ${PAD(i)}`,
      description: alg.description,
      tags: alg.tags,
      createdAt: alg.createdAt,
      views: Math.round(alg.baseViews * (0.4 + Math.sin(i * 2.3 + 1) * 0.3 + 0.3)),
      sketchFn: alg.factory(params),
      algorithmId: alg.id,
      variationIndex: i,
      params,
    } satisfies SketchMeta
  })
)

export const ALL_TAGS = [...new Set(SKETCHES.flatMap((s) => s.tags))].sort()
