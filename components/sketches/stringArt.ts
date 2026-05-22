import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createStringArtSketch(params: SketchParams): SketchFn {
  return (p) => {
    const N = paramCount(140, params.density, 80, 240)
    const SPD = paramSpeed(params.speed, 0.006, 0.028)
    const R_SCALE = paramScale(params.scale, 0.28, 0.46)
    const MULT_BASE = 2 + params.complexity * 2  // 2..4 base multiplier
    let t = 0

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.noFill() }

    p.draw = () => {
      p.background(7, 18, 32, 22)
      const cx = p.width / 2, cy = p.height / 2
      const r = Math.min(p.width, p.height) * R_SCALE
      p.stroke(0, 180, 216, 22); p.strokeWeight(0.5); p.ellipse(cx, cy, r * 2, r * 2)
      const mult = MULT_BASE + Math.sin(t * 0.28) * 0.95
      p.stroke(0, 180, 216, 18); p.strokeWeight(0.5)
      for (let i = 0; i < N; i++) {
        const a1 = (i / N) * p.TWO_PI
        const a2 = ((i * mult) % N / N) * p.TWO_PI
        p.line(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, cx + Math.cos(a2) * r, cy + Math.sin(a2) * r)
      }
      p.fill(0, 180, 216, 55); p.noStroke()
      for (let i = 0; i < N; i += 7) {
        const a = (i / N) * p.TWO_PI
        p.ellipse(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2.5, 2.5)
      }
      p.noFill()
      t += SPD
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const stringArtSketch: SketchFn = createStringArtSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
