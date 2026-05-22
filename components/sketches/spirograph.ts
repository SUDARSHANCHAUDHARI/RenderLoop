import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramSpeed } from '@/lib/paramGenerator'

// Different R/r ratios produce completely different petal counts
const RATIO_PRESETS = [
  [[0.42, 0.28, 0.38],[0.45, 0.15, 0.42],[0.38, 0.11, 0.35]],
  [[0.62, 0.38, 0.52],[0.55, 0.22, 0.48],[0.48, 0.16, 0.40]],
  [[0.75, 0.25, 0.60],[0.67, 0.33, 0.55],[0.58, 0.42, 0.48]],
  [[0.80, 0.20, 0.65],[0.70, 0.30, 0.58],[0.60, 0.40, 0.50]],
  [[0.83, 0.17, 0.70],[0.73, 0.27, 0.62],[0.63, 0.37, 0.52]],
]

export function createSpirographSketch(params: SketchParams): SketchFn {
  return (p) => {
    const SPD = paramSpeed(params.speed, 0.004, 0.018)
    const preset = RATIO_PRESETS[Math.floor(params.complexity * (RATIO_PRESETS.length - 0.01))]
    const alphas = [0.6, 0.35, 0.18]
    let t = 0

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.background(7, 18, 32); p.noFill() }

    p.draw = () => {
      p.background(7, 18, 32, 8)
      const cx = p.width / 2, cy = p.height / 2
      const sz = Math.min(p.width, p.height) * 0.44
      preset.forEach(([R, r, d], i) => {
        p.stroke(0, 180, 216, alphas[i] * 255); p.strokeWeight(0.7)
        p.beginShape()
        for (let k = 0; k <= 1200; k++) {
          const theta = (k / 1200) * p.TWO_PI * 24 + t * (1 - i * 0.35)
          p.vertex(
            cx + sz * ((R - r) * Math.cos(theta) + d * Math.cos(((R - r) / r) * theta)),
            cy + sz * ((R - r) * Math.sin(theta) - d * Math.sin(((R - r) / r) * theta))
          )
        }
        p.endShape(p.CLOSE)
      })
      t += SPD
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); p.background(7, 18, 32) }
  }
}

export const spirographSketch: SketchFn = createSpirographSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
