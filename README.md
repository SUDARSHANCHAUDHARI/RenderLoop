# RenderLoop

A generative art gallery with 264 parametric specs — 22 algorithms, each with 12 seeded variations.

Built as a creative coding study inspired by motionlab.cc, using an original Blueprint design system.

## Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **p5.js 2.2.3** — canvas sketches
- **Vitest** — unit tests for the seeded RNG and parameter generators
- **pnpm**

## Features

- 264 generative art specs (22 algorithms × 12 parametric variations)
- Sorting: Date, Views, A→Z, Z→A
- Tag filtering + search
- Surprise Me — opens a random spec
- Fullscreen viewer/player
- Playlist queue with auto-advance and shuffle
- Keyboard shortcuts: `P` playlist, `Esc` close, arrow keys skip

## Algorithms

Noise Flow Field · Geometric Mandala · Metaballs · Wave Interference · Constellation · Fractal Tree · Strange Attractor · Boids · Lissajous Curves · Truchet Tiles · Game of Life · Spirograph · L-System Plant · Perlin Marble · Orbit Trails · Sand Simulation · String Art · Harmonograph · Kaleidoscope · Sine Plasma · Epicycles · Noise Worms

## Dev

```bash
pnpm install
pnpm dev --turbopack
```

## Scripts

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm lint         # ESLint (flat config, next/core-web-vitals)
pnpm typecheck    # tsc --noEmit (strict)
pnpm test         # Vitest unit tests
```

## Deployment

RenderLoop is fully client-side — it renders generative art in the browser and
needs **no API keys, backend, or environment variables**.

Deploy via `pnpm build` and serve the static `out/` (or the `.next/` Next runtime
output) from your own domain — the same hosting flow you use for the rest of
your portfolio. No platform-specific config required.

## Author

**SudarshanTechLabs** — [sunny.sudarshan@gmail.com](mailto:sunny.sudarshan@gmail.com)

## License

MIT
