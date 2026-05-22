import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramScale } from '@/lib/paramGenerator'

// Clifford attractor — different param combos produce wildly different shapes
const PRESETS = [
  [-1.4, 1.6, 1.0, 0.7],
  [-1.7, 1.3, -0.1, -1.2],
  [-1.8, -2.0, -0.5, 0.9],
  [-1.3, 1.7, 0.5, -1.4],
  [-1.4, -1.6, 1.0, 0.7],
  [-1.5, 1.9, 0.2, -0.8],
]

export function createStrangeAttractorSketch(params: SketchParams): SketchFn {
  return (p) => {
    const preset = PRESETS[Math.floor(params.complexity * (PRESETS.length - 0.01))]
    const [A, B, C, D] = preset
    const SCALE = paramScale(params.scale, 0.22, 0.36)
    const PTS_PER_FRAME = Math.round(1500 + params.density * 2000)
    let lx = 0.1, ly = 0.1
    let cx: number, cy: number, sc: number

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.background(7, 18, 32)
      cx = p.width / 2; cy = p.height / 2
      sc = Math.min(p.width, p.height) * SCALE
      p.strokeWeight(0.6); p.noFill()
    }

    p.draw = () => {
      for (let i = 0; i < PTS_PER_FRAME; i++) {
        const nx = Math.sin(A * ly) + C * Math.cos(A * lx)
        const ny = Math.sin(B * lx) + D * Math.cos(B * ly)
        lx = nx; ly = ny
        const d = Math.sqrt(lx * lx + ly * ly)
        p.stroke(0, 180, 216, p.map(d, 0, 3.5, 28, 8))
        p.point(cx + lx * sc, cy + ly * sc)
      }
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      p.background(7, 18, 32)
      cx = p.width / 2; cy = p.height / 2
      sc = Math.min(p.width, p.height) * SCALE
      lx = 0.1; ly = 0.1
    }
  }
}

export const strangeAttractorSketch: SketchFn = createStrangeAttractorSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
