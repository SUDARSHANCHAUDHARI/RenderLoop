import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramScale } from '@/lib/paramGenerator'

export function createSandSimulationSketch(params: SketchParams): SketchFn {
  return (p) => {
    const GW = Math.round(paramScale(params.scale, 80, 180))
    const GH = Math.round(GW * 0.67)
    const NOISE_SPD = 0.008 + params.speed * 0.022
    let grid: number[][]

    function makeGrid() { grid = Array.from({ length: GH }, () => new Array(GW).fill(0)) }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.noiseSeed(params.seed)
      makeGrid(); p.noStroke()
    }

    p.draw = () => {
      const drops = Math.round(1 + params.density * 3)
      for (let d = 0; d < drops; d++) {
        const sx = Math.floor(p.noise(p.frameCount * NOISE_SPD + d * 10) * (GW - 2)) + 1
        if (grid[0][sx] === 0) grid[0][sx] = 1
      }
      for (let y = GH - 2; y >= 0; y--) {
        for (let x = 0; x < GW; x++) {
          if (!grid[y][x]) continue
          if (!grid[y+1][x]) { grid[y+1][x] = 1; grid[y][x] = 0 }
          else {
            const dir = Math.random() < 0.5 ? -1 : 1
            const nx = x + dir
            if (nx >= 0 && nx < GW && !grid[y+1][nx]) { grid[y+1][nx] = 1; grid[y][x] = 0 }
          }
        }
      }
      p.background(7, 18, 32)
      const cw = p.width / GW, ch = p.height / GH
      for (let y = 0; y < GH; y++)
        for (let x = 0; x < GW; x++)
          if (grid[y][x]) { p.fill(0, 180, 216, 100 + (y / GH) * 130); p.rect(x * cw, y * ch, cw, ch) }
    }

    p.mousePressed = () => makeGrid()
    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); makeGrid() }
  }
}

export const sandSimulationSketch: SketchFn = createSandSimulationSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
