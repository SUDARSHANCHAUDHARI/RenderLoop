import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramCount, paramSpeed, paramScale } from '@/lib/paramGenerator'

export function createEpicyclesSketch(params: SketchParams): SketchFn {
  return (p) => {
    const N = paramCount(9, params.complexity, 4, 18)
    const SPD = paramSpeed(params.speed, 0.014, 0.05)
    const SZ = paramScale(params.scale, 0.22, 0.38)
    const TRAIL = Math.round(200 + params.density * 300)
    const cycles = Array.from({ length: N }, (_, i) => ({ freq: i * 2 + 1, amp: 1 / (i * 2 + 1) }))
    const path: { x: number; y: number }[] = []
    let t = 0

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.noFill() }

    p.draw = () => {
      p.background(7, 18, 32, 28)
      const cx = p.width * 0.34, cy = p.height / 2
      const sz = Math.min(p.width, p.height) * SZ
      let x = cx, y = cy
      for (const { freq, amp } of cycles) {
        const nx = x + Math.cos(freq * t) * amp * sz
        const ny = y + Math.sin(freq * t) * amp * sz
        p.stroke(0, 180, 216, 35); p.strokeWeight(0.5); p.ellipse(x, y, amp * sz * 2, amp * sz * 2)
        p.stroke(0, 180, 216, 70); p.strokeWeight(0.6); p.line(x, y, nx, ny)
        x = nx; y = ny
      }
      path.unshift({ x, y })
      if (path.length > TRAIL) path.pop()
      const traceX = p.width * 0.68
      p.stroke(0, 180, 216, 40); p.strokeWeight(0.4); p.line(x, y, traceX, path[0]?.y ?? y)
      p.stroke(0, 180, 216, 160); p.strokeWeight(0.8)
      p.beginShape()
      for (let i = 0; i < path.length; i++) p.vertex(traceX + (i / path.length) * p.width * 0.28, path[i].y)
      p.endShape()
      p.fill(0, 180, 216, 200); p.noStroke(); p.ellipse(x, y, 5, 5); p.noFill()
      t += SPD
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); path.length = 0 }
  }
}

export const epicyclesSketch: SketchFn = createEpicyclesSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
