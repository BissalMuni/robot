import { describe, it, expect } from "vitest";
import { brands, type Brand } from "./brands";

const MARKETS: Brand["market"][number][] = [
  "industrial",
  "service",
  "research",
  "consumer",
];

describe("brands 데이터 정합성", () => {
  it("비어 있지 않다", () => {
    expect(brands.length).toBeGreaterThan(0);
  });

  it("id 는 중복이 없다", () => {
    const ids = brands.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("name 은 비어 있지 않다", () => {
    for (const b of brands) {
      expect(b.name.trim().length, b.id).toBeGreaterThan(0);
    }
  });

  it("website 는 http(s) 절대 URL 이다(카드가 외부 링크로 렌더)", () => {
    for (const b of brands) {
      let url: URL | null = null;
      try {
        url = new URL(b.website);
      } catch {
        url = null;
      }
      expect(url, `${b.id} website=${b.website}`).not.toBeNull();
      expect(["http:", "https:"]).toContain(url!.protocol);
    }
  });

  it("robots 는 최소 1개이며 각 항목이 비어 있지 않다", () => {
    for (const b of brands) {
      expect(b.robots.length, b.id).toBeGreaterThan(0);
      for (const r of b.robots) {
        expect(r.trim().length, `${b.id} robot`).toBeGreaterThan(0);
      }
    }
  });

  it("market 은 최소 1개이며 허용된 값만 포함한다", () => {
    for (const b of brands) {
      expect(b.market.length, b.id).toBeGreaterThan(0);
      for (const m of b.market) {
        expect(MARKETS, `${b.id} market=${m}`).toContain(m);
      }
    }
  });

  it("founded 가 있으면 1900~2100 정수다", () => {
    for (const b of brands) {
      if (b.founded !== undefined) {
        expect(Number.isInteger(b.founded), b.id).toBe(true);
        expect(b.founded).toBeGreaterThanOrEqual(1900);
        expect(b.founded).toBeLessThanOrEqual(2100);
      }
    }
  });
});
