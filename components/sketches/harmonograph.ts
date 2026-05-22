import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramSpeed, paramScale } from '@/lib/paramGenerator'

// Different frequency combos produce wildly different figure shapes
const FREQ_PRESETS = [
  [2.001, 3, 0.0004, 0.0006, 0],
  [3, 4.001, 0.0005, 0.0004, Math.PI / 4],
  [5, 6.001, 0.0003, 0.0005, Math.PI / 6],
  [3, 5.001, 0.0004, 0.0003, Math.PI / 3],
  [4, 7.001, 0.0003, 0.0004, Math.PI / 5],
  [2, 5.001, 0.0005, 0.0006, 0],
]

export function createHarmonographSketch(params: SketchParams): SketchFn {
  return (p) => {
    const SPD = paramSpeed(params.speed, 0.012, 0.04)
    const SZ = paramScale(params.scale, 0.28, 0.46)
    const preset = FREQ_PRESETS[Math.floor(params.complexity * (FREQ_PRESETS.length - 0.01))]
    const [f1, f2, d1, d2, ph] = preset
    const alphas = [0.55, 0.32, 0.16]
    const extras = [
      [f1 * 1.5, f2 * 1.33, d1 * 1.2, d2 * 0.9, ph + Math.PI / 4],
      [f1 * 2.5, f2 * 2.0, d1 * 0.8, d2 * 1.1, ph + Math.PI / 3],
    ]
    let t = 0

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.background(7, 18, 32)
      p.noFill()
    }

    p.draw = () => {
      p.background(7, 18, 32, 7)
      const cx = p.width / 2, cy = p.height / 2
      const sz = Math.min(p.width, p.height) * SZ
      const configs = [[f1, f2, d1, d2, ph], ...extras]
      configs.forEach(([cf1, cf2, cd1, cd2, cp1], i) => {
        p.stroke(0, 180, 216, alphas[i] * 255); p.strokeWeight(0.65)
        p.beginShape()
        for (let k = 0; k <= 4000; k++) {
          const ti = (k / 4000) * Math.PI * 180 + t * 0.25 * (i + 1)
          p.vertex(
            cx + sz * Math.sin(cf1 * ti + cp1) * Math.exp(-cd1 * k) * Math.cos(0.4 * ti),
            cy + sz * Math.sin(cf2 * ti) * Math.exp(-cd2 * k)
          )
        }
        p.endShape()
      })
      t += SPD
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); p.background(7, 18, 32) }
  }
}

export const harmonographSketch: SketchFn = createHarmonographSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
