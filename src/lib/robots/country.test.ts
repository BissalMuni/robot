import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { countryFlag, countryWithFlag } from "./country";

describe("countryFlag", () => {
  it("알려진 국가는 국기 이모지를 반환한다", () => {
    expect(countryFlag("South Korea")).toBe("🇰🇷");
    expect(countryFlag("United States")).toBe("🇺🇸");
  });

  it("모르는 국가는 빈 문자열", () => {
    expect(countryFlag("Atlantis")).toBe("");
  });
});

describe("countryWithFlag", () => {
  it("국기 + 국가명을 합친다", () => {
    expect(countryWithFlag("China")).toBe("🇨🇳 China");
  });

  it("국기가 없으면 국가명만", () => {
    expect(countryWithFlag("Atlantis")).toBe("Atlantis");
  });
});

describe("국기 매핑 완전성", () => {
  it("카탈로그(seed + collected)의 모든 국가에 국기가 정의돼 있다", () => {
    const countries = new Set<string>();
    for (const file of ["data/robots.seed.json", "data/robots.collected.json"]) {
      try {
        const list = JSON.parse(readFileSync(file, "utf-8")) as { country: string }[];
        for (const r of list) countries.add(r.country);
      } catch {
        // collected 는 선택적
      }
    }
    for (const c of countries) {
      expect(countryFlag(c), `국기 누락: ${c}`).not.toBe("");
    }
  });
});
