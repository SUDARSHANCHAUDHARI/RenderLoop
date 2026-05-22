import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramScale } from '@/lib/paramGenerator'

export function createTruchetSketch(params: SketchParams): SketchFn {
  return (p) => {
    const TILE = Math.round(paramScale(params.scale, 32, 90))
    let tiles: boolean[][] = []
    let t = 0

    function makeGrid() {
      p.randomSeed(params.seed)
      const cols = Math.ceil(p.width / TILE) + 2
      const rows = Math.ceil(p.height / TILE) + 2
      tiles = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => p.random() > 0.5)
      )
    }

    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.noFill(); makeGrid() }

    p.draw = () => {
      p.background(7, 18, 32)
      t += 0.004
      if (p.frameCount % Math.round(8 + (1 - params.speed) * 20) === 0) {
        const r = Math.floor(p.random(tiles.length))
        const c = Math.floor(p.random(tiles[0]?.length ?? 1))
        if (tiles[r]) tiles[r][c] = !tiles[r][c]
      }
      for (let row = 0; row < tiles.length; row++) {
        for (let col = 0; col < (tiles[row]?.length ?? 0); col++) {
          const x = (col - 1) * TILE, y = (row - 1) * TILE
          const alpha = 30 + Math.sin(t + row * 0.4 + col * 0.3) * 14
          p.stroke(0, 180, 216, alpha); p.strokeWeight(0.9)
          if (tiles[row][col]) {
            p.arc(x, y, TILE * 2, TILE * 2, 0, p.HALF_PI)
            p.arc(x + TILE, y + TILE, TILE * 2, TILE * 2, p.PI, p.PI + p.HALF_PI)
          } else {
            p.arc(x + TILE, y, TILE * 2, TILE * 2, p.HALF_PI, p.PI)
            p.arc(x, y + TILE, TILE * 2, TILE * 2, p.PI + p.HALF_PI, p.TWO_PI)
          }
        }
      }
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); makeGrid() }
  }
}

export const truchetSketch: SketchFn = createTruchetSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
