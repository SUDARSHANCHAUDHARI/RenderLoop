# Status — RenderLoop

**Last updated:** 2026-06-21
**Maturity:** 🟢 `status-production-ready`

## What's done

- 22 generative-art algorithms × 12 seeded variations = **264 parametric specs**
- Algorithm coverage: Noise Flow Field, Geometric Mandala, Metaballs, Wave Interference, Constellation, Fractal Tree, Strange Attractor, Boids, Lissajous, Truchet Tiles, Game of Life, Spirograph, L-System, Perlin Marble, Orbit Trails, Sand Simulation, String Art, Harmonograph, Kaleidoscope, Sine Plasma, Epicycles, Noise Worms
- Sort by Date / Views / A→Z / Z→A
- Tag filtering + search
- "Surprise Me" — random spec
- Fullscreen viewer
- Playlist queue with auto-advance and shuffle
- Keyboard shortcuts: `P` playlist, `Esc` close, arrow keys to skip
- Pure seeded RNG (`lib/seededRandom.ts`) used in SVG thumbnails where p5 isn't available
- Deterministic parameter generator (`lib/paramGenerator.ts`)
- ESLint flat config (Next 16 removed `next lint`) with `set-state-in-effect` downgraded to warn (intentional SSR-safe localStorage hydration in `useFavorites`, intentional auto-hide UI timer in `Viewer`)
- 18 tests across 2 suites — RNG determinism + range + djb2 hash stability, parameter generator determinism + clamping + factor mapping
- Build, lint (0 errors), typecheck, tests all green

## What's left

Nothing essential.

Optional:
- Live deploy (zero-config — fully client-side, no API keys or env needed)
- More algorithms if you want a bigger gallery
- Persistence of user favorites beyond `localStorage`

## Quality gates

| Gate | Status |
|---|---|
| Build | ✅ |
| Lint | ✅ 0 errors |
| Typecheck (strict) | ✅ |
| Tests | ✅ 18 / 2 suites |

## Deployment

Not yet deployed. Self-hosted on your own domain. Stock Next.js with no env vars — deploy via the same flow you use for your other apps.
