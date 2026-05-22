'use client'

import type { SketchMeta } from '@/types'
import { createRng } from '@/lib/seededRandom'

interface Props {
  sketch: SketchMeta
  index: number
  onOpen: (sketch: SketchMeta) => void
  onAddToPlaylist: (sketch: SketchMeta) => void
}

const C = 'rgba(0,180,216,'

// ─── Parametric Thumbnail Components ─────────────────────────────────────────

function FlowFieldThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const positions: [number, number, number][] = Array.from({ length: 14 }, () => [
    rng() * 240 + 20, rng() * 128 + 14, rng() * 360,
  ])
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {positions.map(([cx, cy, deg], i) => {
        const L = 14, r = (deg * Math.PI) / 180
        return (
          <g key={i}>
            <line x1={cx - Math.cos(r) * L} y1={cy - Math.sin(r) * L}
                  x2={cx + Math.cos(r) * L} y2={cy + Math.sin(r) * L}
                  stroke={`${C}0.22)`} strokeWidth="1" />
            <circle cx={cx + Math.cos(r) * L} cy={cy + Math.sin(r) * L} r="1.8" fill={`${C}0.35)`} />
          </g>
        )
      })}
    </svg>
  )
}

function MandalaThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const cx = 140, cy = 79
  const rings = [20 + rng() * 14, 44 + rng() * 14, 66 + rng() * 14]
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {rings.map((r, li) => {
        const ticks = (li + 1) * 6 + Math.round(rng() * 4)
        return (
          <g key={r}>
            <circle cx={cx} cy={cy} r={r} stroke={`${C}${0.18 + li * 0.07})`} strokeWidth="0.8" />
            {Array.from({ length: ticks }).map((_, ti) => {
              const a = (ti / ticks) * Math.PI * 2
              return (
                <line key={ti}
                  x1={cx + Math.cos(a) * (r - 5)} y1={cy + Math.sin(a) * (r - 5)}
                  x2={cx + Math.cos(a) * (r + 5)} y2={cy + Math.sin(a) * (r + 5)}
                  stroke={`${C}0.2)`} strokeWidth="0.7" />
              )
            })}
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r="3.5" stroke={`${C}0.4)`} strokeWidth="0.8" />
    </svg>
  )
}

function MetaballsThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const balls = Array.from({ length: 3 }, () => ({
    cx: 70 + rng() * 140, cy: 35 + rng() * 88, r: 24 + rng() * 24,
  }))
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {balls.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} stroke={`${C}0.22)`} strokeWidth="0.8" strokeDasharray="4 3" />
      ))}
      {balls.map((b, i) => <circle key={`c${i}`} cx={b.cx} cy={b.cy} r="3" fill={`${C}0.35)`} />)}
    </svg>
  )
}

function WaveThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const waveCount = 4 + Math.round(rng() * 3)
  const paths = Array.from({ length: waveCount }, (_, i) => {
    const baseY = 16 + i * (128 / waveCount)
    const amp = 5 + rng() * 12
    const freq = 2 + rng() * 4
    const phase = rng() * Math.PI * 2
    let d = `M 0 ${baseY}`
    for (let x = 0; x <= 280; x += 7) {
      d += ` L ${x} ${baseY + Math.sin((x / 280) * Math.PI * freq + phase + i * 0.9) * amp}`
    }
    return { d, alpha: 0.1 + i * 0.04 }
  })
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {paths.map(({ d, alpha }, i) => (
        <path key={i} d={d} stroke={`${C}${alpha.toFixed(2)})`} strokeWidth="0.85" />
      ))}
    </svg>
  )
}

function ConstellationThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const dotCount = 8 + Math.round(rng() * 4)
  const dots: [number, number][] = Array.from({ length: dotCount }, () => [
    20 + rng() * 240, 16 + rng() * 126,
  ])
  const edges: [number, number][] = []
  for (let a = 0; a < dots.length; a++) {
    for (let b = a + 1; b < dots.length; b++) {
      const dx = dots[a][0] - dots[b][0], dy = dots[a][1] - dots[b][1]
      if (dx * dx + dy * dy < 7200) edges.push([a, b])
    }
  }
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {edges.map(([a, b], i) => (
        <line key={i} x1={dots[a][0]} y1={dots[a][1]}
              x2={dots[b][0]} y2={dots[b][1]} stroke={`${C}0.18)`} strokeWidth="0.7" />
      ))}
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill={`${C}0.4)`} />)}
    </svg>
  )
}

function FractalTreeThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const branchAngle = 0.36 + rng() * 0.22
  const lenFactor = 0.62 + rng() * 0.12
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; depth: number }> = []
  function build(x1: number, y1: number, len: number, angle: number, depth: number) {
    const x2 = x1 + Math.cos(angle) * len, y2 = y1 + Math.sin(angle) * len
    lines.push({ x1, y1, x2, y2, depth })
    if (depth === 0 || len < 4) return
    build(x2, y2, len * lenFactor, angle - branchAngle, depth - 1)
    build(x2, y2, len * lenFactor, angle + branchAngle, depth - 1)
  }
  build(140, 154, 44, -Math.PI / 2, 4)
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {lines.map(({ x1, y1, x2, y2, depth }, i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={`${C}${Math.max(0.08, 0.32 - i * 0.006).toFixed(2)})`}
          strokeWidth={Math.max(0.4, 1.6 - i * 0.04)} />
      ))}
    </svg>
  )
}

function StrangeAttractorThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const A = -1.2 - rng() * 0.8, B = 1.2 + rng() * 0.8
  const C2 = 0.6 + rng() * 0.8, D = 0.4 + rng() * 0.6
  let x = 0.1, y = 0.1
  const pts: [number, number][] = []
  for (let i = 0; i < 900; i++) {
    const nx = Math.sin(A * y) + C2 * Math.cos(A * x)
    const ny = Math.sin(B * x) + D * Math.cos(B * y)
    x = nx; y = ny
    if (i > 80) pts.push([140 + x * 55, 79 + y * 32])
  }
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {pts.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r="0.8" fill={`${C}${(0.15 + (i / pts.length) * 0.2).toFixed(2)})`} />
      ))}
    </svg>
  )
}

function BoidsThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const tris: [number, number, number][] = Array.from({ length: 12 }, () => [
    40 + rng() * 200, 20 + rng() * 118, rng() * Math.PI * 2,
  ])
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {tris.map(([cx, cy, angle], i) => {
        const sz = 6, cos = Math.cos(angle), sin = Math.sin(angle)
        const pts = [
          `${cx + cos * sz},${cy + sin * sz}`,
          `${cx - cos * sz * 0.6 - sin * sz * 0.5},${cy - sin * sz * 0.6 + cos * sz * 0.5}`,
          `${cx - cos * sz * 0.6 + sin * sz * 0.5},${cy - sin * sz * 0.6 - cos * sz * 0.5}`,
        ].join(' ')
        return <polygon key={i} points={pts} fill={`${C}0.32)`} />
      })}
    </svg>
  )
}

function LissajousThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const freqPairs: [number, number, number][] = [
    [Math.round(2 + rng() * 4), Math.round(2 + rng() * 4), rng() * Math.PI],
    [Math.round(2 + rng() * 5), Math.round(2 + rng() * 5), rng() * Math.PI],
  ]
  const paths = freqPairs.map(([fa, fb, ph]) => {
    const pts: string[] = []
    for (let i = 0; i <= 400; i++) {
      const theta = (i / 400) * Math.PI * 2
      const x = (140 + Math.sin(fa * theta + ph) * 90).toFixed(1)
      const y = (79 + Math.sin(fb * theta) * 46).toFixed(1)
      pts.push(`${i === 0 ? 'M' : 'L'}${x},${y}`)
    }
    return pts.join(' ') + 'Z'
  })
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      <path d={paths[0]} stroke={`${C}0.38)`} strokeWidth="0.85" />
      <path d={paths[1]} stroke={`${C}0.2)`} strokeWidth="0.65" />
    </svg>
  )
}

function TruchetThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const T = 40, cols = 7, rows = 4
  const tiles = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      x: 4 + c * T, y: 7 + r * T, T, flip: rng() > 0.5,
    }))
  ).flat()
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {tiles.map(({ x, y, T: t, flip }, i) => (
        <g key={i}>
          {flip ? (
            <>
              <path d={`M ${x} ${y + t} Q ${x} ${y} ${x + t} ${y}`} stroke={`${C}0.28)`} strokeWidth="0.85" fill="none" />
              <path d={`M ${x + t} ${y} Q ${x + t} ${y + t} ${x} ${y + t}`} stroke={`${C}0.28)`} strokeWidth="0.85" fill="none" />
            </>
          ) : (
            <>
              <path d={`M ${x} ${y} Q ${x + t} ${y} ${x + t} ${y + t}`} stroke={`${C}0.28)`} strokeWidth="0.85" fill="none" />
              <path d={`M ${x + t} ${y + t} Q ${x} ${y + t} ${x} ${y}`} stroke={`${C}0.28)`} strokeWidth="0.85" fill="none" />
            </>
          )}
        </g>
      ))}
    </svg>
  )
}

function GameOfLifeThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const CELL = 10, cols = 28, rows = 15
  const alive: [number, number][] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rng() < 0.22) alive.push([c, r])
    }
  }
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {Array.from({ length: cols }, (_, i) => (
        <line key={`v${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={158} stroke={`${C}0.05)`} strokeWidth="0.4" />
      ))}
      {Array.from({ length: rows }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * CELL} x2={280} y2={i * CELL} stroke={`${C}0.05)`} strokeWidth="0.4" />
      ))}
      {alive.map(([c, r], i) => (
        <rect key={i} x={c * CELL + 1} y={r * CELL + 1} width={CELL - 2} height={CELL - 2} fill={`${C}0.38)`} />
      ))}
    </svg>
  )
}

function SpirographThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const R = 0.3 + rng() * 0.25, r = 0.15 + rng() * 0.2, d = 0.2 + rng() * 0.25, sz = 56
  const pts: string[] = []
  for (let i = 0; i <= 1200; i++) {
    const theta = (i / 1200) * Math.PI * 2 * 14
    const x = (140 + sz * ((R - r) * Math.cos(theta) + d * Math.cos(((R - r) / Math.max(0.01, r)) * theta))).toFixed(1)
    const y = (79 + sz * ((R - r) * Math.sin(theta) - d * Math.sin(((R - r) / Math.max(0.01, r)) * theta))).toFixed(1)
    pts.push(`${i === 0 ? 'M' : 'L'}${x},${y}`)
  }
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      <path d={pts.join(' ')} stroke={`${C}0.35)`} strokeWidth="0.75" />
    </svg>
  )
}

function LSystemThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const axioms: Array<{ axiom: string; rules: Record<string, string>; angle: number; iters: number }> = [
    { axiom: 'X', rules: { 'X': 'F+[[X]-X]-F[-FX]+X', 'F': 'FF' }, angle: 0.44, iters: 3 },
    { axiom: 'F', rules: { 'F': 'F[+F]F[-F]F' }, angle: 0.45, iters: 3 },
    { axiom: 'X', rules: { 'X': 'F[+X][-X]FX', 'F': 'FF' }, angle: 0.4, iters: 4 },
    { axiom: 'F', rules: { 'F': 'FF-[-F+F+F]+[+F-F-F]' }, angle: 0.38, iters: 2 },
  ]
  const cfg = axioms[Math.floor(rng() * axioms.length)]
  let s = cfg.axiom
  for (let i = 0; i < cfg.iters; i++) s = s.split('').map(c => cfg.rules[c] ?? c).join('')
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; d: number }> = []
  const stack: { x: number; y: number; a: number; d: number }[] = []
  let x = 140, y = 150, a = -Math.PI / 2, depth = 0
  const len = 10
  for (const c of s) {
    if (c === 'F') {
      const nx = x + Math.cos(a) * len, ny = y + Math.sin(a) * len
      if (lines.length < 400) lines.push({ x1: x, y1: y, x2: nx, y2: ny, d: depth })
      x = nx; y = ny
    } else if (c === '+') { a += cfg.angle }
    else if (c === '-') { a -= cfg.angle }
    else if (c === '[') { stack.push({ x, y, a, d: depth }); depth++ }
    else if (c === ']') { const t = stack.pop(); if (t) { x = t.x; y = t.y; a = t.a; depth = t.d } }
  }
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {lines.map(({ x1, y1, x2, y2, d }, i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={`${C}${Math.max(0.07, 0.28 - d * 0.05).toFixed(2)})`}
          strokeWidth={Math.max(0.4, 1.2 - d * 0.16)} />
      ))}
    </svg>
  )
}

function PerlinMarbleThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const lineCount = 6 + Math.round(rng() * 4)
  const scale1 = 0.018 + rng() * 0.02, scale2 = 0.008 + rng() * 0.012
  const amp1 = 12 + rng() * 14, amp2 = 6 + rng() * 8
  const offset = rng() * 4
  const paths = Array.from({ length: lineCount }, (_, i) => {
    const baseY = 10 + i * (136 / lineCount)
    let d = `M 0 ${baseY}`
    for (let x = 0; x <= 280; x += 5) {
      const dy = Math.sin(x * scale1 + i * 1.1 + offset) * amp1
              + Math.sin(x * scale2 + i * 0.7 + offset) * amp2
      d += ` L ${x} ${(baseY + dy).toFixed(1)}`
    }
    return { d, alpha: 0.07 + i * 0.035 }
  })
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {paths.map(({ d, alpha }, i) => (
        <path key={i} d={d} stroke={`${C}${Math.min(0.45, alpha).toFixed(2)})`} strokeWidth="0.8" />
      ))}
    </svg>
  )
}

function OrbitTrailsThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const cx = 140, cy = 79
  const orbits = Array.from({ length: 3 }, (_, i) => ({
    rx: 48 + i * 30 + rng() * 20,
    ry: 20 + i * 18 + rng() * 14,
    dotAngle: rng() * Math.PI * 2,
    dotR: 4 - i * 0.7,
  }))
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      <circle cx={cx} cy={cy} r="5" fill={`${C}0.45)`} />
      {orbits.map(({ rx, ry, dotAngle, dotR }, i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={`${C}0.18)`} strokeWidth="0.5" />
          <circle cx={cx + Math.cos(dotAngle) * rx} cy={cy + Math.sin(dotAngle) * ry}
                  r={dotR} fill={`${C}0.45)`} />
        </g>
      ))}
    </svg>
  )
}

function SandSimulationThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const dropX = 80 + rng() * 120
  const dots = Array.from({ length: 80 }, (_, i) => ({
    x: 14 + rng() * 252,
    y: 72 + rng() * 72 * (0.5 + rng() * 0.8),
  }))
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={`s${i}`} cx={dropX + (i % 3 - 1) * 4} cy={8 + i * 9} r="1.5" fill={`${C}0.18)`} />
      ))}
      {dots.map(({ x, y }, i) => (
        <circle key={i} cx={x} cy={y} r="1.8"
          fill={`${C}${(0.15 + (y / 158) * 0.28).toFixed(2)})`} />
      ))}
    </svg>
  )
}

function StringArtThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const mult = 2 + Math.round(rng() * 5)
  const N = 80, r = 56, cx = 140, cy = 79
  const lines = Array.from({ length: N }, (_, i) => {
    const a1 = (i / N) * Math.PI * 2
    const a2 = ((i * mult) % N / N) * Math.PI * 2
    return {
      x1: cx + Math.cos(a1) * r, y1: cy + Math.sin(a1) * r,
      x2: cx + Math.cos(a2) * r, y2: cy + Math.sin(a2) * r,
    }
  })
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      <circle cx={cx} cy={cy} r={r} stroke={`${C}0.18)`} strokeWidth="0.5" />
      {lines.map(({ x1, y1, x2, y2 }, i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`${C}0.14)`} strokeWidth="0.5" />
      ))}
    </svg>
  )
}

function HarmonographThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const presets: [number, number, number, number][] = [
    [2.001, 3, 0.0005, 0.0007],
    [3, 4.001, 0.0005, 0.0004],
    [5, 6.001, 0.0003, 0.0005],
    [3, 5.001, 0.0004, 0.0003],
  ]
  const [f1, f2, d1, d2] = presets[Math.floor(rng() * presets.length)]
  const sz = 50 + rng() * 16
  const pts: string[] = []
  for (let i = 0; i <= 2500; i++) {
    const ti = (i / 2500) * Math.PI * 160
    const x = (140 + sz * Math.sin(f1 * ti) * Math.exp(-d1 * i) * Math.cos(0.4 * ti)).toFixed(1)
    const y = (79 + sz * Math.sin(f2 * ti) * Math.exp(-d2 * i)).toFixed(1)
    pts.push(`${i === 0 ? 'M' : 'L'}${x},${y}`)
  }
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      <path d={pts.join(' ')} stroke={`${C}0.35)`} strokeWidth="0.75" />
    </svg>
  )
}

function KaleidoscopeThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const SEGS = 8 + Math.round(rng() * 4), cx = 140, cy = 79, sz = 56
  const lineCount = 3 + Math.round(rng() * 2)
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; alpha: number }> = []
  for (let seg = 0; seg < SEGS; seg++) {
    const base = (seg / SEGS) * Math.PI * 2
    for (let i = 0; i < lineCount; i++) {
      const r1 = sz * (0.2 + i * (0.7 / lineCount))
      const r2 = sz * (0.14 + i * (0.7 / lineCount))
      const a1 = base + 0.4 * (i + 1) + rng() * 0.3
      const a2 = base + 0.3 * (i + 2) + Math.PI / 3 + rng() * 0.3
      lines.push({
        x1: cx + Math.cos(a1) * r1, y1: cy + Math.sin(a1) * r1,
        x2: cx + Math.cos(a2) * r2, y2: cy + Math.sin(a2) * r2,
        alpha: 0.26 - i * 0.04,
      })
    }
  }
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {lines.map(({ x1, y1, x2, y2, alpha }, i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={`${C}${alpha.toFixed(2)})`} strokeWidth="0.7" />
      ))}
    </svg>
  )
}

function PlasmaThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const f1 = 4 + rng() * 8, f2 = 3 + rng() * 8, f3 = 5 + rng() * 7, f4 = 7 + rng() * 9
  const t = rng() * 3
  const cells = Array.from({ length: 7 }, (_, r) =>
    Array.from({ length: 14 }, (_, c) => {
      const nx = c / 13, ny = r / 6
      const v = (Math.sin(nx * f1 + t) + Math.sin(ny * f2 + t * 1.3)
               + Math.sin((nx + ny) * f3 + t * 0.7)
               + Math.sin(Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2) * f4 + t)) / 4
      return { x: c * 20, y: r * 22, a: ((v + 1) / 2) * 0.45 + 0.04 }
    })
  ).flat()
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {cells.map(({ x, y, a }, i) => (
        <rect key={i} x={x} y={y} width="19" height="21" fill={`${C}${a.toFixed(2)})`} />
      ))}
    </svg>
  )
}

function EpicyclesThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const cx = 76, cy = 79
  const radii = [38 + rng() * 10, 14 + rng() * 8, 6 + rng() * 4, 3 + rng() * 2]
  const phases = Array.from({ length: 4 }, () => rng() * Math.PI * 2)
  let x = cx, y = cy
  const arms: Array<{ x1: number; y1: number; x2: number; y2: number; r: number }> = []
  radii.forEach((r, i) => {
    const nx = x + Math.cos(phases[i]) * r, ny = y + Math.sin(phases[i]) * r
    arms.push({ x1: x, y1: y, x2: nx, y2: ny, r })
    x = nx; y = ny
  })
  const traceX = 150
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {arms.map(({ x1, y1, r }, i) => (
        <circle key={i} cx={x1} cy={y1} r={r} stroke={`${C}0.18)`} strokeWidth="0.5" />
      ))}
      {arms.map(({ x1, y1, x2, y2 }, i) => (
        <line key={`a${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`${C}0.45)`} strokeWidth="0.7" />
      ))}
      <line x1={x} y1={y} x2={traceX} y2={y} stroke={`${C}0.25)`} strokeWidth="0.5" strokeDasharray="3 2" />
      {Array.from({ length: 52 }, (_, i) => {
        const px = traceX + i * 2.5
        const py = cy + Math.sin(i * 0.3 + phases[0]) * radii[0] * 0.7 + Math.sin(i * 0.9 + phases[1]) * radii[1] * 0.7
        return <circle key={`t${i}`} cx={px} cy={py} r="0.8" fill={`${C}${(0.5 - i * 0.008).toFixed(2)})`} />
      })}
      <circle cx={x} cy={y} r="3" fill={`${C}0.55)`} />
    </svg>
  )
}

function NoiseWormsThumb({ seed }: { seed: number }) {
  const rng = createRng(seed)
  const wormCount = 3 + Math.round(rng() * 2)
  const paths = Array.from({ length: wormCount }, () => {
    let x = 20 + rng() * 240, y = 20 + rng() * 118
    const s = rng() * 5
    let d = `M${x.toFixed(1)},${y.toFixed(1)}`
    for (let i = 0; i < 36; i++) {
      const angle = Math.sin(x * 0.038 + s) * Math.cos(y * 0.035 + s) * Math.PI * 3.5
      x = Math.max(8, Math.min(272, x + Math.cos(angle) * 5.5))
      y = Math.max(8, Math.min(150, y + Math.sin(angle) * 5.5))
      d += ` L${x.toFixed(1)},${y.toFixed(1)}`
    }
    return d
  })
  return (
    <svg viewBox="0 0 280 158" fill="none" className="absolute inset-0 w-full h-full">
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={`${C}${(0.32 - i * 0.04).toFixed(2)})`} strokeWidth="1.2" fill="none" />
      ))}
    </svg>
  )
}

// ─── Thumbnail Registry ───────────────────────────────────────────────────────

type ThumbComponent = React.ComponentType<{ seed: number }>

const THUMB_MAP: Record<string, ThumbComponent> = {
  'flow-field': FlowFieldThumb,
  'mandala': MandalaThumb,
  'metaballs': MetaballsThumb,
  'wave-interference': WaveThumb,
  'constellation': ConstellationThumb,
  'fractal-tree': FractalTreeThumb,
  'strange-attractor': StrangeAttractorThumb,
  'boids': BoidsThumb,
  'lissajous': LissajousThumb,
  'truchet': TruchetThumb,
  'game-of-life': GameOfLifeThumb,
  'spirograph': SpirographThumb,
  'l-system': LSystemThumb,
  'perlin-marble': PerlinMarbleThumb,
  'orbit-trails': OrbitTrailsThumb,
  'sand-simulation': SandSimulationThumb,
  'string-art': StringArtThumb,
  'harmonograph': HarmonographThumb,
  'kaleidoscope': KaleidoscopeThumb,
  'plasma': PlasmaThumb,
  'epicycles': EpicyclesThumb,
  'noise-worms': NoiseWormsThumb,
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function fmtViews(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export default function SketchCard({ sketch, index, onOpen, onAddToPlaylist }: Props) {
  const algorithmId = sketch.algorithmId ?? sketch.id
  const Thumb = THUMB_MAP[algorithmId]
  const seed = sketch.params?.seed ?? (sketch.variationIndex ?? index) * 7919 + 42
  const ref = String(index + 1).padStart(3, '0')

  return (
    <article
      onClick={() => onOpen(sketch)}
      className="group relative cursor-pointer bg-[#0a1628] hover:bg-[#0d1f38] transition-colors duration-200"
    >
      {/* Corner brackets */}
      <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#00b4d8]/20 group-hover:border-[#00b4d8]/65 transition-colors z-10 pointer-events-none" />
      <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#00b4d8]/20 group-hover:border-[#00b4d8]/65 transition-colors z-10 pointer-events-none" />
      <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#00b4d8]/20 group-hover:border-[#00b4d8]/65 transition-colors z-10 pointer-events-none" />
      <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#00b4d8]/20 group-hover:border-[#00b4d8]/65 transition-colors z-10 pointer-events-none" />

      {/* Thumbnail */}
      <div className="aspect-video w-full relative overflow-hidden bg-[#071220]">
        {Thumb && <Thumb seed={seed} />}

        <span className="absolute top-2.5 left-3 text-[9px] tracking-[0.22em] text-[#1a3a5c] group-hover:text-[#00b4d8]/50 transition-colors select-none z-10">
          SPEC·{ref}
        </span>
        <span className="absolute bottom-2.5 right-3 text-[9px] tracking-[0.15em] text-[#1a3a5c] select-none z-10 tabular-nums">
          {fmtViews(sketch.views)}
        </span>

        <div className="absolute inset-0 bg-[#071220]/82 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 z-20">
          <button
            onClick={e => { e.stopPropagation(); onOpen(sketch) }}
            className="text-[10px] tracking-[0.18em] px-4 py-1.5 border border-[#00b4d8]/60 text-[#00b4d8] hover:bg-[#00b4d8]/10 transition-colors uppercase"
          >
            ▷ Open
          </button>
          <button
            onClick={e => { e.stopPropagation(); onAddToPlaylist(sketch) }}
            className="text-[10px] tracking-[0.12em] px-4 py-1.5 border border-[#235080] text-[#5a8ca8] hover:border-[#00b4d8]/40 hover:text-[#00b4d8]/80 transition-colors uppercase"
          >
            + Queue
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-3 pt-2.5 pb-3">
        <h3 className="text-[11px] font-bold tracking-[0.14em] text-[#c8dfe8] uppercase mb-2 truncate">
          {sketch.title}
        </h3>
        <div className="h-px bg-[#1a3a5c] mb-2" />
        <p className="text-[10px] text-[#3a6680] mb-2.5 line-clamp-2 leading-relaxed">
          {sketch.description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {sketch.tags.map(tag => (
            <span key={tag} className="text-[9px] tracking-[0.06em] text-[#00b4d8]/40 group-hover:text-[#00b4d8]/65 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
