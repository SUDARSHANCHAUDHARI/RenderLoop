import type p5 from 'p5'
import type { SketchFn, SketchParams } from '@/types'
import { paramScale } from '@/lib/paramGenerator'

export function createGameOfLifeSketch(params: SketchParams): SketchFn {
  return (p) => {
    const CELL = Math.round(paramScale(params.scale, 5, 18))
    const THRESHOLD = 0.5 + params.density * 0.25
    const INTERVAL = Math.round(120 - params.speed * 100)
    let cols: number, rows: number, grid: boolean[][], timer = 0

    function makeGrid(): boolean[][] {
      p.randomSeed(params.seed)
      return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => p.random() > THRESHOLD)
      )
    }

    function step(g: boolean[][]): boolean[][] {
      return g.map((row, r) =>
        row.map((cell, c) => {
          let n = 0
          for (let dr = -1; dr <= 1; dr++)
            for (let dc = -1; dc <= 1; dc++)
              if ((dr || dc) && g[(r + dr + rows) % rows][(c + dc + cols) % cols]) n++
          return cell ? n === 2 || n === 3 : n === 3
        })
      )
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      cols = Math.ceil(p.width / CELL); rows = Math.ceil(p.height / CELL)
      grid = makeGrid(); p.noStroke()
    }

    p.draw = () => {
      p.background(7, 18, 32)
      timer += p.deltaTime
      if (timer > INTERVAL) { grid = step(grid); timer = 0 }
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          if (grid[r][c]) { p.fill(0, 180, 216, 210); p.rect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2) }
    }

    p.mousePressed = () => { grid = makeGrid() }
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      cols = Math.ceil(p.width / CELL); rows = Math.ceil(p.height / CELL); grid = makeGrid()
    }
  }
}

export const gameOfLifeSketch: SketchFn = createGameOfLifeSketch({ seed: 42, density: 0.5, speed: 0.5, scale: 0.5, complexity: 0.5 })
