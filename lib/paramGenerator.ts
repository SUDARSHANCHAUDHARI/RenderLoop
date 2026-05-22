import type { SketchParams } from '@/types'
import { createRng, hashString, mapRange } from './seededRandom'

// Deterministic: same algorithmId + variationIndex always → same params.
// Uses the algorithm name hash so params don't correlate across algorithms.
export function generateParams(algorithmId: string, variationIndex: number): SketchParams {
  const baseSeed = (hashString(algorithmId) + variationIndex * 6364136223846793005) >>> 0
  const rng = createRng(baseSeed)

  return {
    seed: baseSeed,
    density: mapRange(rng(), 0.18, 0.92),
    speed: mapRange(rng(), 0.12, 0.88),
    scale: mapRange(rng(), 0.18, 0.92),
    complexity: mapRange(rng(), 0.18, 0.92),
  }
}

// Derive an integer count from a base count scaled by density.
export function paramCount(base: number, density: number, min: number, max: number): number {
  return Math.round(Math.max(min, Math.min(max, base * (0.4 + density * 1.2))))
}

// Derive a speed multiplier: returns a value in [minFactor, maxFactor] based on speed param.
export function paramSpeed(speed: number, minFactor: number, maxFactor: number): number {
  return mapRange(speed, minFactor, maxFactor)
}

// Derive a scale multiplier.
export function paramScale(scale: number, minFactor: number, maxFactor: number): number {
  return mapRange(scale, minFactor, maxFactor)
}
