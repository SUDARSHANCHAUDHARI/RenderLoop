import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createConstellationSketch(params: SketchParams): SketchFn {
  return (p) => {
    const NUM = paramCount(110, params.density, 50, 220)
    const SPD = paramSpeed(params.speed, 0.18, 0.85)
    const MAX_DIST = paramScale(params.scale, 80, 220)
    interface Particle { x: number; y: number; vx: number; vy: number; size: number }
    const particles: Particle[] = []

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.randomSeed(params.seed)
      for (let i = 0; i < NUM; i++) {
        particles.push({
          x: p.random(p.width), y: p.random(p.height),
          vx: p.random(-SPD, SPD), vy: p.random(-SPD, SPD),
          size: p.random(1.5, 3.5),
        })
      }
    }

    p.draw = () => {
      p.background(7, 18, 32)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            p.stroke(0, 180, 216, p.map(dist, 0, MAX_DIST, 120, 0))
            p.strokeWeight(0.4)
            p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
          }
        }
      }
      for (const pt of particles) {
        p.noStroke(); p.fill(0, 180, 216, 200)
        p.ellipse(pt.x, pt.y, pt.size, pt.size)
        pt.x += pt.vx; pt.y += pt.vy
        if (pt.x < 0) pt.x = p.width
        if (pt.x > p.width) pt.x = 0
        if (pt.y < 0) pt.y = p.height
        if (pt.y > p.height) pt.y = 0
      }
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const constellationSketch: SketchFn = createConstellationSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
