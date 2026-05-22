import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createMetaballsSketch(params: SketchParams): SketchFn {
  return (p) => {
    const COUNT = paramCount(7, params.density, 4, 14)
    const SPD = paramSpeed(params.speed, 0.4, 2.4)
    const SIZE = paramScale(params.scale, 40, 140)
    interface Ball { x: number; y: number; vx: number; vy: number; r: number }
    let balls: Ball[] = []

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.randomSeed(params.seed)
      balls = Array.from({ length: COUNT }, () => ({
        x: p.random(p.width), y: p.random(p.height),
        vx: p.random(-SPD, SPD), vy: p.random(-SPD, SPD),
        r: p.random(SIZE * 0.55, SIZE),
      }))
    }

    p.draw = () => {
      p.blendMode(p.BLEND)
      p.background(7, 18, 32)
      p.blendMode(p.ADD)
      p.noStroke()
      for (const b of balls) {
        p.fill(0, 55, 80, 140)
        p.ellipse(b.x, b.y, b.r * 2, b.r * 2)
        b.x += b.vx; b.y += b.vy
        if (b.x < b.r || b.x > p.width - b.r) b.vx *= -1
        if (b.y < b.r || b.y > p.height - b.r) b.vy *= -1
      }
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      balls.forEach(b => { b.x = p.random(p.width); b.y = p.random(p.height) })
    }
  }
}

export const metaballsSketch: SketchFn = createMetaballsSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
