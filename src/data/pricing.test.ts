import { describe, it, expect } from "vitest";
import { pricingEntries, basisLabel } from "./pricing";

describe("pricing 데이터 정합성", () => {
  it("id 는 중복이 없다", () => {
    const ids = pricingEntries.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("핵심 문자열 필드는 비어 있지 않다", () => {
    for (const e of pricingEntries) {
      for (const key of ["model", "maker", "country", "priceLabel", "availability"] as const) {
        expect(e[key].trim().length, `${e.id}.${key}`).toBeGreaterThan(0);
      }
    }
  });

  it("basis 는 라벨이 정의된 값이어야 한다", () => {
    for (const e of pricingEntries) {
      expect(basisLabel[e.basis], e.id).toBeDefined();
    }
  });

  it("모든 항목은 최소 1개의 유효한(http) 출처를 가진다", () => {
    for (const e of pricingEntries) {
      expect(e.sources.length, e.id).toBeGreaterThan(0);
      for (const s of e.sources) {
        expect(() => new URL(s.url), `${e.id} url`).not.toThrow();
        expect(s.url.startsWith("http"), `${e.id} url`).toBe(true);
        expect(typeof s.verified).toBe("boolean");
      }
    }
  });

  it("출처 중 최소 하나는 직접 확인(verified)된 것이어야 한다", () => {
    for (const e of pricingEntries) {
      expect(e.sources.some((s) => s.verified), e.id).toBe(true);
    }
  });
});
