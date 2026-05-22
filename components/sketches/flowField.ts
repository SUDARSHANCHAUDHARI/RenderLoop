import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createFlowFieldSketch(params: SketchParams): SketchFn {
  return (p) => {
    const NUM = paramCount(700, params.density, 150, 1400)
    const SCALE = paramScale(params.scale, 14, 38)
    const SPD = paramSpeed(params.speed, 0.7, 3.2)
    const NOISE_Z = paramSpeed(params.speed, 0.0015, 0.006)
    interface Particle { x: number; y: number; px: number; py: number }
    const particles: Particle[] = []
    let t = 0

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.randomSeed(params.seed)
      p.noiseSeed(params.seed)
      p.background(7, 18, 32)
      p.strokeWeight(0.55)
      for (let i = 0; i < NUM; i++) {
        const x = p.random(p.width), y = p.random(p.height)
        particles.push({ x, y, px: x, py: y })
      }
    }

    p.draw = () => {
      p.background(7, 18, 32, 18)
      for (const pt of particles) {
        pt.px = pt.x; pt.py = pt.y
        const angle = p.noise(Math.floor(pt.x / SCALE) * 0.12, Math.floor(pt.y / SCALE) * 0.12, t) * p.TWO_PI * 4
        pt.x += Math.cos(angle) * SPD
        pt.y += Math.sin(angle) * SPD
        if (pt.x < 0 || pt.x > p.width || pt.y < 0 || pt.y > p.height) {
          pt.x = p.random(p.width); pt.y = p.random(p.height)
          pt.px = pt.x; pt.py = pt.y
        }
        p.stroke(0, 180, 216, 55)
        p.line(pt.px, pt.py, pt.x, pt.y)
      }
      t += NOISE_Z
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); p.background(7, 18, 32) }
  }
}

export const flowFieldSketch: SketchFn = createFlowFieldSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
