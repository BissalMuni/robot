import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { pricingEntries, basisLabel } from "./pricing";

// 카탈로그(seed + collected)의 로봇 id 집합. robotId 참조 무결성 검증용.
function catalogIds(): Set<string> {
  const ids = new Set<string>();
  for (const file of ["data/robots.seed.json", "data/robots.collected.json"]) {
    try {
      const list = JSON.parse(readFileSync(file, "utf-8")) as { id: string }[];
      for (const r of list) ids.add(r.id);
    } catch {
      // collected 는 선택적 — 없으면 건너뛴다.
    }
  }
  return ids;
}

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

  it("robotId 는 카탈로그에 실제 존재하는 로봇을 가리킨다(상세 링크 무결성)", () => {
    const ids = catalogIds();
    for (const e of pricingEntries) {
      if (e.robotId) expect(ids.has(e.robotId), `${e.id} → ${e.robotId}`).toBe(true);
    }
  });
});
