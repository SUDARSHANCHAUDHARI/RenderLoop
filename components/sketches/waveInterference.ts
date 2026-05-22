import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createWaveInterferenceSketch(params: SketchParams): SketchFn {
  return (p) => {
    const LINES = paramCount(88, params.density, 40, 180)
    const SPD = paramSpeed(params.speed, 0.01, 0.07)
    const AMP = paramScale(params.scale, 5, 26)
    const F1 = 2 + params.complexity * 3
    const F2 = 3 + params.complexity * 4
    const F3 = 5 + params.complexity * 2

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.noFill() }

    p.draw = () => {
      p.background(7, 18, 32)
      const t = p.frameCount * SPD
      for (let li = 0; li < LINES; li++) {
        const y = (li / LINES) * p.height
        const baseAlpha = 0.08 + 0.14 * Math.sin((li / LINES) * Math.PI)
        p.stroke(0, 180, 216, baseAlpha * 255)
        p.strokeWeight(0.7)
        p.beginShape()
        for (let x = 0; x <= p.width; x += 4) {
          const nx = x / p.width
          const dy = Math.sin(nx * 11 * F1 / 5 + t) * AMP
                   + Math.sin(nx * 7.5 * F2 / 5 - t * 0.7) * AMP * 0.6
                   + Math.sin(nx * 4.8 * F3 / 5 + t * 0.3 + li * 0.08) * AMP * 0.35
          p.vertex(x, y + dy)
        }
        p.endShape()
      }
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const waveInterferenceSketch: SketchFn = createWaveInterferenceSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
