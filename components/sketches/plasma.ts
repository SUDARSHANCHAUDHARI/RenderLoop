import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramScale } from '@/lib/paramGenerator'

export function createPlasmaSketch(params: SketchParams): SketchFn {
  return (p) => {
    const STEP = Math.round(paramScale(params.scale, 8, 22))
    const SPD = 0.012 + params.speed * 0.022
    const F1 = 4 + params.complexity * 6
    const F2 = 3 + params.complexity * 7
    const F3 = 6 + params.complexity * 5
    const F4 = 8 + params.complexity * 8
    let t = 0

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.noStroke() }

    p.draw = () => {
      p.background(7, 18, 32)
      for (let y = 0; y < p.height; y += STEP) {
        for (let x = 0; x < p.width; x += STEP) {
          const nx = x / p.width, ny = y / p.height
          const v = (Math.sin(nx * F1 + t) + Math.sin(ny * F2 + t * 1.3)
                   + Math.sin((nx + ny) * F3 + t * 0.7)
                   + Math.sin(Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2) * F4 + t)) / 4
          p.fill(0, 180, 216, ((v + 1) / 2) * 115 + 5)
          p.rect(x, y, STEP, STEP)
        }
      }
      t += SPD
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const plasmaSketch: SketchFn = createPlasmaSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
