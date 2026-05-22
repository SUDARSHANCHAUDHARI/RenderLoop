import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramSpeed, paramScale } from '@/lib/paramGenerator'

const AXIOMS: { axiom: string; rules: Record<string, string>; angle: number; iters: number }[] = [
  { axiom: 'X', rules: { 'X': 'F+[[X]-X]-F[-FX]+X', 'F': 'FF' }, angle: 0.44, iters: 4 },
  { axiom: 'F', rules: { 'F': 'F[+F]F[-F]F' }, angle: 0.45, iters: 4 },
  { axiom: 'X', rules: { 'X': 'F[+X][-X]FX', 'F': 'FF' }, angle: 0.4, iters: 5 },
  { axiom: 'F', rules: { 'F': 'FF-[-F+F+F]+[+F-F-F]' }, angle: 0.38, iters: 3 },
]

export function createLSystemSketch(params: SketchParams): SketchFn {
  return (p) => {
    const SPD = paramSpeed(params.speed, 0.006, 0.025)
    const LEN = paramScale(params.scale, 0.016, 0.032)
    const cfg = AXIOMS[Math.floor(params.complexity * (AXIOMS.length - 0.01))]
    let t = 0
    let system = ''

    function generate() {
      let s = cfg.axiom
      for (let i = 0; i < cfg.iters; i++) s = s.split('').map(c => cfg.rules[c] ?? c).join('')
      system = s
    }

    function drawPlant() {
      const stack: { x: number; y: number; a: number }[] = []
      let x = p.width / 2, y = p.height * 0.94, a = -p.HALF_PI
      const len = Math.min(p.width, p.height) * LEN
      p.strokeWeight(0.7)
      for (const c of system) {
        if (c === 'F') {
          const wa = a + Math.sin(t + stack.length * 0.5) * 0.12
          const nx = x + Math.cos(wa) * len, ny = y + Math.sin(wa) * len
          p.stroke(0, 180, 216, Math.max(22, 85 - stack.length * 8))
          p.line(x, y, nx, ny); x = nx; y = ny
        } else if (c === '+') a += cfg.angle
        else if (c === '-') a -= cfg.angle
        else if (c === '[') stack.push({ x, y, a })
        else if (c === ']') { const top = stack.pop(); if (top) { x = top.x; y = top.y; a = top.a } }
      }
    }

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.noFill(); generate() }
    p.draw = () => { p.background(7, 18, 32); drawPlant(); t += SPD }
    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight) }
  }
}

export const lSystemSketch: SketchFn = createLSystemSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
