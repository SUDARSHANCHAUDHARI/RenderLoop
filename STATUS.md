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

## File-by-file checklist

### App shell
- [x] `app/layout.tsx`, `app/page.tsx`, `app/globals.css` — gallery shell

### Components
- [x] `components/Gallery.tsx` — grid + sort + filter + search
- [x] `components/PlaylistPanel.tsx` — playlist queue with auto-advance / shuffle
- [x] `components/SketchCard.tsx` — thumbnail card
- [x] `components/Viewer.tsx` — fullscreen viewer with auto-hide UI
- [x] `components/sketches/SketchRunner.tsx` — p5 host

### Hooks
- [x] `hooks/useGallery.ts`, `useViewer.ts`, `useKeyboard.ts`, `useFavorites.ts`, `usePlaylist.ts`

### Lib
- [x] `lib/seededRandom.ts` — deterministic RNG (LCG) + djb2 hash + mapRange
- [x] `lib/paramGenerator.ts` — deterministic params per (algorithm, variation)
- [x] `lib/sketches.ts` — sketch registry
- [x] `lib/variants.ts` — 22 algorithm definitions × 12 variations = 264 specs

### Sketches (`components/sketches/*.ts`) — all 22 implemented
- [x] flowField, mandala, metaballs, waveInterference, constellation, fractalTree, strangeAttractor, boids, lissajous, truchetTiles, gameOfLife, spirograph, lSystem, perlinMarble, orbitTrails, sandSimulation, stringArt, harmonograph, kaleidoscope, plasma, epicycles, noiseWorms

### Tests
- [x] `lib/seededRandom.test.ts` — 9 tests (determinism, range, hash stability)
- [x] `lib/paramGenerator.test.ts` — 9 tests (determinism, clamping, factor mapping)

### Quality + scaffolding
- [x] ESLint flat config (Next 16 removed `next lint`) — 0 errors
- [x] `react-hooks/set-state-in-effect` downgraded to warn (intentional SSR-safe `localStorage` hydration in `useFavorites`, intentional auto-hide UI timer in `Viewer`)
- [x] `typecheck` + `test` scripts
- [x] Build + lint + typecheck green

### Not done (nice-to-have only)
- [ ] Live deployment (no env needed when ready)
- [ ] More algorithms if you want a bigger gallery
- [ ] Persistence of user favorites beyond `localStorage`

## Categorized work remaining

| Item | Effort | Bucket | Blocker | Priority |
|------|--------|--------|---------|----------|
| Live deploy to your domain | ~30m | 🔑 Needs hosting | hosting access only — no env vars, no API keys | P1 |
| More algorithms | open-ended | 🟦 Pure code | none — add more files under `components/sketches/` and register in `lib/variants.ts` | P3 |
| Server-side persistence for favorites | ~half day | 🟦 Pure code (+🔑 if hosted DB) | depends on your backend choice | P3 |

## Release plan

1. **Deploy:**
   - `pnpm build` → produces `.next/` (Next runtime) or `pnpm next build && pnpm next export` if you want pure static
   - Drop on your host (rsync to VPS, push to your static-site host, etc.)
   - Confirm gallery loads + a sketch renders + playlist queue works
2. **Tag release:** `gh release create v1.0.0 --title "RenderLoop v1.0.0 — 264 generative art specs"`

### Deploy prerequisites
**None.** Zero env vars. Fully client-side. Just need your hosting flow.
