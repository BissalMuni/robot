import { describe, it, expect } from "vitest";
import { marketForecasts } from "./market";

describe("market 데이터 정합성", () => {
  it("id 는 중복이 없다", () => {
    const ids = marketForecasts.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("핵심 문자열 필드는 비어 있지 않다", () => {
    for (const f of marketForecasts) {
      for (const key of ["source", "marketLabel", "unitsLabel", "summary"] as const) {
        expect(f[key].trim().length, `${f.id}.${key}`).toBeGreaterThan(0);
      }
      expect(f.targetYear).toBeGreaterThan(2024);
    }
  });

  it("모든 전망은 최소 1개의 유효한(http) 출처를 가진다", () => {
    for (const f of marketForecasts) {
      expect(f.sources.length, f.id).toBeGreaterThan(0);
      for (const s of f.sources) {
        expect(() => new URL(s.url), `${f.id} url`).not.toThrow();
        expect(s.url.startsWith("http"), `${f.id} url`).toBe(true);
        expect(typeof s.verified).toBe("boolean");
      }
    }
  });

  it("각 전망은 직접 확인(verified)된 출처를 최소 하나 가진다", () => {
    for (const f of marketForecasts) {
      expect(f.sources.some((s) => s.verified), f.id).toBe(true);
    }
  });
});
