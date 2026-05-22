import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

interface Worm { x: number; y: number; trail: { x: number; y: number }[] }

export function createNoiseWormsSketch(params: SketchParams): SketchFn {
  return (p) => {
    const COUNT = paramCount(38, params.density, 12, 80)
    const SPD = paramSpeed(params.speed, 1.2, 4.0)
    const TRAIL = Math.round(50 + params.complexity * 100)
    const NOISE_SCALE = 0.002 + params.scale * 0.004
    const worms: Worm[] = []
    let t = 0

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.randomSeed(params.seed)
      p.noiseSeed(params.seed)
      for (let i = 0; i < COUNT; i++)
        worms.push({ x: p.random(p.width), y: p.random(p.height), trail: [] })
      p.noFill()
    }

    p.draw = () => {
      p.background(7, 18, 32, 14)
      for (const w of worms) {
        const angle = p.noise(w.x * NOISE_SCALE, w.y * NOISE_SCALE, t) * p.TWO_PI * 4
        w.x += Math.cos(angle) * SPD; w.y += Math.sin(angle) * SPD
        if (w.x < -20 || w.x > p.width + 20 || w.y < -20 || w.y > p.height + 20) {
          w.x = p.random(p.width); w.y = p.random(p.height); w.trail = []
        }
        w.trail.push({ x: w.x, y: w.y })
        if (w.trail.length > TRAIL) w.trail.shift()
        if (w.trail.length < 2) continue
        for (let j = 0; j < w.trail.length - 1; j++) {
          p.stroke(0, 180, 216, (j / w.trail.length) * 110)
          p.strokeWeight(0.8)
          p.line(w.trail[j].x, w.trail[j].y, w.trail[j+1].x, w.trail[j+1].y)
        }
      }
      t += 0.0045
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); worms.forEach(w => { w.trail = [] }) }
  }
}

export const noiseWormsSketch: SketchFn = createNoiseWormsSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
