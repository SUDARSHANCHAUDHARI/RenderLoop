import { describe, it, expect } from "vitest";
import { createRng, mapRange, hashString } from "./seededRandom";

describe("createRng", () => {
  it("is deterministic: same seed produces the same sequence", () => {
    const a = createRng(12345);
    const b = createRng(12345);
    const seqA = [a(), a(), a(), a()];
    const seqB = [b(), b(), b(), b()];
    expect(seqA).toEqual(seqB);
  });

  it("produces different sequences for different seeds", () => {
    const a = createRng(1);
    const b = createRng(2);
    expect(a()).not.toEqual(b());
  });

  it("returns values in the [0, 1) range", () => {
    const rng = createRng(99);
    for (let i = 0; i < 100; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("mapRange", () => {
  it("maps 0 to the minimum", () => {
    expect(mapRange(0, 5, 10)).toBe(5);
  });

  it("maps 1 to the maximum", () => {
    expect(mapRange(1, 5, 10)).toBe(10);
  });

  it("maps 0.5 to the midpoint", () => {
    expect(mapRange(0.5, 0, 10)).toBe(5);
  });
});

describe("hashString", () => {
  it("is stable for the same input", () => {
    expect(hashString("flowField")).toBe(hashString("flowField"));
  });

  it("differs for different inputs", () => {
    expect(hashString("boids")).not.toBe(hashString("plasma"));
  });

  it("returns a non-negative 32-bit integer", () => {
    const h = hashString("metaballs");
    expect(Number.isInteger(h)).toBe(true);
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThanOrEqual(0xffffffff);
  });
});
