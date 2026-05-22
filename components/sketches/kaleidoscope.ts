import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createKaleidoscopeSketch(params: SketchParams): SketchFn {
  return (p) => {
    const SEGS = paramCount(8, params.complexity, 4, 16)
    const SPD = paramSpeed(params.speed, 0.006, 0.028)
    const LAYERS = paramCount(6, params.density, 3, 10)
    const SZ = paramScale(params.scale, 0.32, 0.52)
    let t = 0

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.noFill() }

    p.draw = () => {
      p.background(7, 18, 32, 28)
      const cx = p.width / 2, cy = p.height / 2
      const sz = Math.min(p.width, p.height) * SZ
      const segAngle = p.TWO_PI / SEGS
      for (let seg = 0; seg < SEGS; seg++) {
        p.push()
        p.translate(cx, cy); p.rotate(seg * segAngle + t * 0.08)
        if (seg % 2 === 0) p.scale(1, -1)
        for (let i = 0; i < LAYERS; i++) {
          const r = sz * (0.15 + i * (0.8 / LAYERS))
          const a1 = t * (i + 1) * 0.18, a2 = t * (i + 2) * 0.13 + Math.PI / 3
          p.stroke(0, 180, 216, (0.28 - i * (0.2 / LAYERS)) * 255); p.strokeWeight(0.65)
          p.line(Math.cos(a1) * r, Math.sin(a1) * r, Math.cos(a2) * r * 0.72, Math.sin(a2) * r * 0.72)
          p.fill(0, 180, 216, 60); p.noStroke()
          p.ellipse(Math.cos(a1) * r, Math.sin(a1) * r, 3, 3)
          p.noFill()
        }
        p.pop()
      }
      t += SPD
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const kaleidoscopeSketch: SketchFn = createKaleidoscopeSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
