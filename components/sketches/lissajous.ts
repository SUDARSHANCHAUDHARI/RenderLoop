import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramSpeed } from '@/lib/paramGenerator'

// Different frequency pairs produce very different figures
const FREQ_PAIRS = [
  [[3,2],[5,4],[7,6]],
  [[2,3],[4,5],[6,7]],
  [[3,4],[5,6],[7,8]],
  [[4,3],[6,5],[8,7]],
  [[5,3],[7,4],[9,5]],
  [[2,5],[3,7],[4,9]],
]

export function createLissajousSketch(params: SketchParams): SketchFn {
  return (p) => {
    const SPD = paramSpeed(params.speed, 0.003, 0.016)
    const pairs = FREQ_PAIRS[Math.floor(params.complexity * (FREQ_PAIRS.length - 0.01))]
    const alphas = [0.55, 0.32, 0.16]
    let t = 0

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.background(7, 18, 32)
      p.noFill()
    }

    p.draw = () => {
      p.background(7, 18, 32, 10)
      const cx = p.width / 2, cy = p.height / 2
      const rx = p.width * 0.36, ry = p.height * 0.38
      pairs.forEach(([a, b], i) => {
        p.stroke(0, 180, 216, alphas[i] * 255)
        p.strokeWeight(0.85)
        p.beginShape()
        for (let k = 0; k <= 800; k++) {
          const theta = (k / 800) * p.TWO_PI
          p.vertex(cx + Math.sin(a * theta + t * (1 - i * 0.3)) * rx * 0.82,
                   cy + Math.sin(b * theta) * ry * 0.82)
        }
        p.endShape(p.CLOSE)
      })
      t += SPD
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); p.background(7, 18, 32) }
  }
}

export const lissajousSketch: SketchFn = createLissajousSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
