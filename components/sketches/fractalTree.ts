import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createFractalTreeSketch(params: SketchParams): SketchFn {
  return (p) => {
    const SPD = paramSpeed(params.speed, 0.006, 0.022)
    const SPREAD = paramScale(params.scale, 0.32, 0.58)
    const RATIO = 0.62 + params.complexity * 0.14
    const MAX_DEPTH = Math.round(8 + params.complexity * 4)

    function drawBranch(len: number, depth: number, t: number): void {
      if (len < 3 || depth > MAX_DEPTH) return
      const weight = p.map(len, 3, 180, 0.3, 1.8)
      const alpha = p.map(len, 3, 180, 25, 200)
      p.stroke(0, 180, 216, alpha)
      p.strokeWeight(weight)
      p.line(0, 0, 0, -len)
      p.translate(0, -len)
      const wind = Math.sin(t + depth * 0.65) * 0.13
      p.push(); p.rotate(-SPREAD + wind); drawBranch(len * RATIO, depth + 1, t); p.pop()
      p.push(); p.rotate(SPREAD + wind); drawBranch(len * RATIO, depth + 1, t); p.pop()
    }

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight) }

    p.draw = () => {
      p.background(7, 18, 32)
      const t = p.frameCount * SPD
      p.translate(p.width / 2, p.height)
      drawBranch(Math.min(p.height * 0.22, 175), 0, t)
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const fractalTreeSketch: SketchFn = createFractalTreeSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
