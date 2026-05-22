// LCG seeded RNG — used in SVG thumbnails where p5 isn't available.
// Same seed always produces the same sequence.
export function createRng(seed: number) {
  let s = seed >>> 0
  return function next(): number {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 0x100000000
  }
}

// Map a 0–1 value to a range [min, max]
export function mapRange(v: number, min: number, max: number): number {
  return min + v * (max - min)
}

// Stable hash of a string → integer (djb2)
export function hashString(str: string): number {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(h, 33) ^ str.charCodeAt(i)) >>> 0
  }
  return h
}
