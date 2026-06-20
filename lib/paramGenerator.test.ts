import { describe, it, expect } from "vitest";
import {
  generateParams,
  paramCount,
  paramSpeed,
  paramScale,
} from "./paramGenerator";

describe("generateParams", () => {
  it("is deterministic for the same algorithm + variation", () => {
    expect(generateParams("flowField", 3)).toEqual(generateParams("flowField", 3));
  });

  it("varies across variation indices", () => {
    expect(generateParams("flowField", 0)).not.toEqual(generateParams("flowField", 1));
  });

  it("varies across algorithms", () => {
    expect(generateParams("boids", 0)).not.toEqual(generateParams("plasma", 0));
  });

  it("keeps density/speed/scale/complexity within their ranges", () => {
    const p = generateParams("mandala", 7);
    for (const key of ["density", "speed", "scale", "complexity"] as const) {
      expect(p[key]).toBeGreaterThanOrEqual(0.12);
      expect(p[key]).toBeLessThanOrEqual(0.92);
    }
  });
});

describe("paramCount", () => {
  it("clamps below the minimum", () => {
    expect(paramCount(0, 0, 10, 100)).toBe(10);
  });

  it("clamps above the maximum", () => {
    expect(paramCount(1000, 1, 10, 100)).toBe(100);
  });

  it("returns an integer", () => {
    expect(Number.isInteger(paramCount(50, 0.5, 1, 200))).toBe(true);
  });
});

describe("paramSpeed / paramScale", () => {
  it("paramSpeed maps within the factor range", () => {
    expect(paramSpeed(0, 0.5, 2)).toBe(0.5);
    expect(paramSpeed(1, 0.5, 2)).toBe(2);
  });

  it("paramScale maps within the factor range", () => {
    expect(paramScale(0.5, 0, 4)).toBe(2);
  });
});
