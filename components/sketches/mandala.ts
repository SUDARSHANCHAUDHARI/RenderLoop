import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createMandalaSketch(params: SketchParams): SketchFn {
  return (p) => {
    const LAYERS = paramCount(8, params.complexity, 4, 14)
    const SPD = paramSpeed(params.speed, 0.003, 0.02)
    const BASE_R = paramScale(params.scale, 28, 70)

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.randomSeed(params.seed)
      p.noFill()
    }

    p.draw = () => {
      p.background(7, 18, 32)
      const cx = p.width / 2, cy = p.height / 2
      const t = p.frameCount * SPD
      p.translate(cx, cy)
      for (let li = 0; li < LAYERS; li++) {
        const r = BASE_R + li * (BASE_R * 0.72)
        const ticks = (li + 1) * 6
        const dir = li % 2 === 0 ? 1 : -1
        const alpha = 0.15 + (li / LAYERS) * 0.25
        p.stroke(0, 180, 216, alpha * 255)
        p.strokeWeight(0.7)
        p.push()
        p.rotate(t * dir * (1 + li * 0.15))
        p.ellipse(0, 0, r * 2, r * 2)
        for (let ti = 0; ti < ticks; ti++) {
          const a = (ti / ticks) * p.TWO_PI
          const shapeIdx = (li + ti) % 3
          p.push()
          p.translate(Math.cos(a) * r, Math.sin(a) * r)
          p.rotate(a + t * dir * 2)
          const ns = (r / ticks) * 2.8
          if (shapeIdx === 0) p.line(-ns * 0.5, 0, ns * 0.5, 0)
          else if (shapeIdx === 1) p.rect(-ns / 2, -ns / 2, ns, ns)
          else p.ellipse(0, 0, ns, ns)
          p.pop()
        }
        p.pop()
      }
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const mandalaSketch: SketchFn = createMandalaSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
