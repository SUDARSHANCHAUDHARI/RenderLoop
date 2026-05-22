import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createPerlinMarbleSketch(params: SketchParams): SketchFn {
  return (p) => {
    const LINES = paramCount(72, params.density, 30, 160)
    const SPD = paramSpeed(params.speed, 0.002, 0.01)
    const DISP = paramScale(params.scale, 40, 140)
    const NOISE_SCALE = 0.003 + params.complexity * 0.005
    let t = 0

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.noiseSeed(params.seed)
      p.noFill()
    }

    p.draw = () => {
      p.background(7, 18, 32)
      for (let i = 0; i < LINES; i++) {
        const baseY = (i / LINES) * p.height
        const alpha = 0.07 + 0.14 * Math.sin((i / LINES) * Math.PI)
        p.stroke(0, 180, 216, alpha * 255)
        p.strokeWeight(0.75)
        p.beginShape()
        for (let x = 0; x <= p.width; x += 5) {
          const disp = p.noise(x * NOISE_SCALE, i * 0.18, t) * DISP * 2 - DISP
          p.vertex(x, baseY + disp)
        }
        p.endShape()
      }
      t += SPD
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const perlinMarbleSketch: SketchFn = createPerlinMarbleSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
