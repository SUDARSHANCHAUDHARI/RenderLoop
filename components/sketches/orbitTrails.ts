import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed } from '@/lib/paramGenerator'

interface Body { speed: number; phase: number; rx: number; ry: number; radius: number; trail: {x:number;y:number}[] }

export function createOrbitTrailsSketch(params: SketchParams): SketchFn {
  return (p) => {
    const COUNT = paramCount(4, params.complexity, 2, 7)
    const SPD_MULT = paramSpeed(params.speed, 0.5, 2.2)
    const TRAIL = Math.round(80 + params.density * 120)
    let bodies: Body[] = []
    let t = 0

    function makeBodies() {
      p.randomSeed(params.seed)
      bodies = Array.from({ length: COUNT }, (_, i) => ({
        speed: (0.8 - i * 0.15) * SPD_MULT,
        phase: p.random(p.TWO_PI),
        rx: 0.18 + i * (0.14 + params.scale * 0.04),
        ry: 0.09 + i * (0.07 + params.scale * 0.02),
        radius: Math.max(2, 5 - i),
        trail: [],
      }))
    }

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.noFill(); makeBodies() }

    p.draw = () => {
      p.background(7, 18, 32, 28)
      const cx = p.width / 2, cy = p.height / 2
      const sz = Math.min(p.width, p.height)
      for (const b of bodies) {
        p.stroke(0, 180, 216, 18); p.strokeWeight(0.4)
        p.ellipse(cx, cy, sz * b.rx * 2, sz * b.ry * 2)
      }
      p.fill(0, 180, 216, 130); p.noStroke(); p.ellipse(cx, cy, 14, 14); p.noFill()
      for (const b of bodies) {
        const angle = b.phase + t * b.speed
        const x = cx + Math.cos(angle) * sz * b.rx * 0.5
        const y = cy + Math.sin(angle) * sz * b.ry * 0.5
        b.trail.push({ x, y })
        if (b.trail.length > TRAIL) b.trail.shift()
        for (let j = 0; j < b.trail.length - 1; j++) {
          p.stroke(0, 180, 216, (j / b.trail.length) * 90 * 0.6); p.strokeWeight(0.6)
          p.line(b.trail[j].x, b.trail[j].y, b.trail[j+1].x, b.trail[j+1].y)
        }
        p.fill(0, 180, 216, 210); p.noStroke(); p.ellipse(x, y, b.radius * 2, b.radius * 2); p.noFill()
      }
      t += 0.018
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); bodies.forEach(b => { b.trail = [] }) }
  }
}

export const orbitTrailsSketch: SketchFn = createOrbitTrailsSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
