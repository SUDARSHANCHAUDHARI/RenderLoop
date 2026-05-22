import type { SketchFn, SketchParams } from '@/types'
import { createFlowFieldSketch } from '@/components/sketches/flowField'
import { createMandalaSketch } from '@/components/sketches/mandala'
import { createMetaballsSketch } from '@/components/sketches/metaballs'
import { createWaveInterferenceSketch } from '@/components/sketches/waveInterference'
import { createConstellationSketch } from '@/components/sketches/constellation'
import { createFractalTreeSketch } from '@/components/sketches/fractalTree'
import { createStrangeAttractorSketch } from '@/components/sketches/strangeAttractor'
import { createBoidsSketch } from '@/components/sketches/boids'
import { createLissajousSketch } from '@/components/sketches/lissajous'
import { createTruchetSketch } from '@/components/sketches/truchetTiles'
import { createGameOfLifeSketch } from '@/components/sketches/gameOfLife'
import { createSpirographSketch } from '@/components/sketches/spirograph'
import { createLSystemSketch } from '@/components/sketches/lSystem'
import { createPerlinMarbleSketch } from '@/components/sketches/perlinMarble'
import { createOrbitTrailsSketch } from '@/components/sketches/orbitTrails'
import { createSandSimulationSketch } from '@/components/sketches/sandSimulation'
import { createStringArtSketch } from '@/components/sketches/stringArt'
import { createHarmonographSketch } from '@/components/sketches/harmonograph'
import { createKaleidoscopeSketch } from '@/components/sketches/kaleidoscope'
import { createPlasmaSketch } from '@/components/sketches/plasma'
import { createEpicyclesSketch } from '@/components/sketches/epicycles'
import { createNoiseWormsSketch } from '@/components/sketches/noiseWorms'

export interface AlgorithmDef {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: string
  baseViews: number
  variationCount: number
  factory: (params: SketchParams) => SketchFn
}

export const ALGORITHMS: AlgorithmDef[] = [
  {
    id: 'flow-field',
    title: 'Noise Flow Field',
    description: 'Particles drift through a vector field shaped by Perlin noise, leaving ephemeral trails.',
    tags: ['particles', 'noise', 'generative'],
    createdAt: '2024-03-15',
    baseViews: 3420,
    variationCount: 24,
    factory: createFlowFieldSketch,
  },
  {
    id: 'mandala',
    title: 'Geometric Mandala',
    description: 'Nested geometric layers rotate in opposing directions, forming hypnotic radial symmetry.',
    tags: ['geometry', 'symmetry', 'rotation'],
    createdAt: '2024-05-22',
    baseViews: 2184,
    variationCount: 24,
    factory: createMandalaSketch,
  },
  {
    id: 'metaballs',
    title: 'Metaballs',
    description: 'Organic blobs drift and merge through additive light blending.',
    tags: ['organic', 'blobs', 'blending'],
    createdAt: '2024-01-08',
    baseViews: 4052,
    variationCount: 24,
    factory: createMetaballsSketch,
  },
  {
    id: 'wave-interference',
    title: 'Wave Interference',
    description: 'Overlapping sine waves at different frequencies create emergent interference patterns.',
    tags: ['waves', 'mathematics', 'oscillation'],
    createdAt: '2024-07-30',
    baseViews: 1876,
    variationCount: 24,
    factory: createWaveInterferenceSketch,
  },
  {
    id: 'constellation',
    title: 'Constellation',
    description: 'Particles drift slowly, connecting to nearby neighbors like stars in a night sky.',
    tags: ['particles', 'minimal', 'network'],
    createdAt: '2024-09-14',
    baseViews: 2943,
    variationCount: 24,
    factory: createConstellationSketch,
  },
  {
    id: 'fractal-tree',
    title: 'Fractal Tree',
    description: 'A recursive branching structure sways in a simulated wind, rendered depth by depth.',
    tags: ['fractal', 'recursion', 'nature'],
    createdAt: '2023-12-01',
    baseViews: 5210,
    variationCount: 24,
    factory: createFractalTreeSketch,
  },
  {
    id: 'strange-attractor',
    title: 'Strange Attractor',
    description: 'A Clifford attractor traced point by point — infinite paths through bounded chaos.',
    tags: ['chaos', 'mathematics', 'attractor'],
    createdAt: '2024-02-14',
    baseViews: 3881,
    variationCount: 24,
    factory: createStrangeAttractorSketch,
  },
  {
    id: 'boids',
    title: 'Boids',
    description: 'Two hundred agents follow three rules — separation, alignment, cohesion — and form emergent flocks.',
    tags: ['simulation', 'agents', 'emergent'],
    createdAt: '2024-04-11',
    baseViews: 2760,
    variationCount: 24,
    factory: createBoidsSketch,
  },
  {
    id: 'lissajous',
    title: 'Lissajous Curves',
    description: 'Parametric sine curves with shifting phase ratios trace closed loops of ordered beauty.',
    tags: ['mathematics', 'oscillation', 'waves'],
    createdAt: '2024-06-03',
    baseViews: 1940,
    variationCount: 24,
    factory: createLissajousSketch,
  },
  {
    id: 'truchet',
    title: 'Truchet Tiles',
    description: 'Quarter-circle arcs placed randomly on a grid form continuous flowing paths.',
    tags: ['geometry', 'tiling', 'generative'],
    createdAt: '2024-08-19',
    baseViews: 1588,
    variationCount: 24,
    factory: createTruchetSketch,
  },
  {
    id: 'game-of-life',
    title: 'Game of Life',
    description: "Conway's four rules applied to a grid — gliders, oscillators, and still lifes emerge from noise.",
    tags: ['cellular', 'simulation', 'emergent'],
    createdAt: '2024-01-25',
    baseViews: 4320,
    variationCount: 24,
    factory: createGameOfLifeSketch,
  },
  {
    id: 'spirograph',
    title: 'Spirograph',
    description: 'Hypotrochoid curves layer over each other as inner radii slowly drift.',
    tags: ['geometry', 'mathematics', 'rotation'],
    createdAt: '2024-03-30',
    baseViews: 2115,
    variationCount: 24,
    factory: createSpirographSketch,
  },
  {
    id: 'l-system',
    title: 'L-System Plant',
    description: 'A Lindenmayer grammar rewrites itself four times, drawing a windswept fractal plant.',
    tags: ['fractal', 'nature', 'recursion'],
    createdAt: '2024-05-07',
    baseViews: 1730,
    variationCount: 24,
    factory: createLSystemSketch,
  },
  {
    id: 'perlin-marble',
    title: 'Perlin Marble',
    description: 'Horizontal lines displaced by layered Perlin noise simulate veins of flowing marble.',
    tags: ['noise', 'generative', 'organic'],
    createdAt: '2024-07-12',
    baseViews: 2290,
    variationCount: 24,
    factory: createPerlinMarbleSketch,
  },
  {
    id: 'orbit-trails',
    title: 'Orbit Trails',
    description: 'Four bodies trace elliptical paths around a central mass, leaving fading luminous trails.',
    tags: ['simulation', 'physics', 'minimal'],
    createdAt: '2024-09-28',
    baseViews: 1650,
    variationCount: 24,
    factory: createOrbitTrailsSketch,
  },
  {
    id: 'sand-simulation',
    title: 'Sand Simulation',
    description: 'A cellular automaton of falling grains — each particle obeying simple gravity rules.',
    tags: ['simulation', 'cellular', 'particles'],
    createdAt: '2024-11-05',
    baseViews: 3140,
    variationCount: 24,
    factory: createSandSimulationSketch,
  },
  {
    id: 'string-art',
    title: 'String Art',
    description: 'Lines connecting equally spaced points on a circle at a shifting multiplier trace a cardioid.',
    tags: ['geometry', 'mathematics', 'minimal'],
    createdAt: '2024-02-28',
    baseViews: 2470,
    variationCount: 24,
    factory: createStringArtSketch,
  },
  {
    id: 'harmonograph',
    title: 'Harmonograph',
    description: 'Three damped pendulums draw overlapping Lissajous figures that fade into stillness.',
    tags: ['oscillation', 'mathematics', 'physics'],
    createdAt: '2024-04-22',
    baseViews: 1980,
    variationCount: 24,
    factory: createHarmonographSketch,
  },
  {
    id: 'kaleidoscope',
    title: 'Kaleidoscope',
    description: 'Ten mirror segments reflect animated line segments, building radially symmetric patterns.',
    tags: ['symmetry', 'geometry', 'rotation'],
    createdAt: '2024-06-15',
    baseViews: 2830,
    variationCount: 24,
    factory: createKaleidoscopeSketch,
  },
  {
    id: 'plasma',
    title: 'Sine Plasma',
    description: 'Four overlapping sine fields modulate a grid of luminance — a classic demo scene technique.',
    tags: ['waves', 'noise', 'oscillation'],
    createdAt: '2024-08-03',
    baseViews: 1420,
    variationCount: 24,
    factory: createPlasmaSketch,
  },
  {
    id: 'epicycles',
    title: 'Epicycles',
    description: 'Nine rotating circles of decreasing radius trace a Fourier approximation in real time.',
    tags: ['mathematics', 'waves', 'simulation'],
    createdAt: '2024-10-18',
    baseViews: 3560,
    variationCount: 24,
    factory: createEpicyclesSketch,
  },
  {
    id: 'noise-worms',
    title: 'Noise Worms',
    description: 'Long-trail agents navigate a Perlin vector field, leaving slow serpentine traces.',
    tags: ['noise', 'particles', 'organic'],
    createdAt: '2024-12-01',
    baseViews: 2080,
    variationCount: 24,
    factory: createNoiseWormsSketch,
  },
]
