import { describe, it, expect } from "vitest";
import { useCases } from "./use-cases";

describe("use-cases 데이터 정합성", () => {
  it("비어 있지 않다", () => {
    expect(useCases.length).toBeGreaterThan(0);
  });

  it("id 는 중복이 없다", () => {
    const ids = useCases.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("title·summary·icon 은 비어 있지 않다", () => {
    for (const u of useCases) {
      expect(u.title.trim().length, u.id).toBeGreaterThan(0);
      expect(u.summary.trim().length, u.id).toBeGreaterThan(0);
      expect(u.icon.trim().length, u.id).toBeGreaterThan(0);
    }
  });

  it("각 분야는 최소 1개의 예시를 가진다", () => {
    for (const u of useCases) {
      expect(u.examples.length, u.id).toBeGreaterThan(0);
      for (const e of u.examples) {
        expect(e.trim().length, `${u.id} example`).toBeGreaterThan(0);
      }
    }
  });
});
