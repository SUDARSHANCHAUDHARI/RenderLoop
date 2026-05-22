import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

interface Boid { x: number; y: number; vx: number; vy: number }

export function createBoidsSketch(params: SketchParams): SketchFn {
  return (p) => {
    const COUNT = paramCount(160, params.density, 60, 320)
    const PERCEPTION = paramScale(params.scale, 45, 120)
    const SEP_DIST = PERCEPTION * 0.38
    const MAX_SPD = paramSpeed(params.speed, 1.5, 4.0)
    const boids: Boid[] = []

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.randomSeed(params.seed)
      for (let i = 0; i < COUNT; i++) {
        const a = p.random(p.TWO_PI)
        boids.push({ x: p.random(p.width), y: p.random(p.height), vx: Math.cos(a) * 2, vy: Math.sin(a) * 2 })
      }
    }

    p.draw = () => {
      p.background(7, 18, 32, 38)
      for (const b of boids) {
        let sepX = 0, sepY = 0, alX = 0, alY = 0, cohX = 0, cohY = 0, n = 0
        for (const o of boids) {
          if (o === b) continue
          const dx = o.x - b.x, dy = o.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < PERCEPTION) {
            alX += o.vx; alY += o.vy; cohX += o.x; cohY += o.y; n++
            if (d < SEP_DIST) { sepX -= dx / (d + 0.001); sepY -= dy / (d + 0.001) }
          }
        }
        if (n > 0) {
          b.vx += (sepX * 1.5 + (alX / n) * 0.8 + (cohX / n - b.x) * 0.3) * 0.04
          b.vy += (sepY * 1.5 + (alY / n) * 0.8 + (cohY / n - b.y) * 0.3) * 0.04
        }
        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy)
        if (spd > MAX_SPD) { b.vx = b.vx / spd * MAX_SPD; b.vy = b.vy / spd * MAX_SPD }
        if (spd < 0.8 && spd > 0) { b.vx = b.vx / spd * 0.8; b.vy = b.vy / spd * 0.8 }
        b.x = (b.x + b.vx + p.width) % p.width
        b.y = (b.y + b.vy + p.height) % p.height
        const angle = Math.atan2(b.vy, b.vx), sz = 5
        p.fill(0, 180, 216, 190); p.noStroke()
        p.push(); p.translate(b.x, b.y); p.rotate(angle)
        p.triangle(sz, 0, -sz * 0.6, -sz * 0.5, -sz * 0.6, sz * 0.5)
        p.pop()
      }
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const boidsSketch: SketchFn = createBoidsSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
