import { describe, it, expect } from "vitest";
import {
  humanoidSpecs,
  statusLabel,
  countryMeta,
  type HumanoidSpec,
} from "./compare";

// /compare 데이터의 정합성·참조 무결성을 가드한다.
// status/country 가 라벨 맵(statusLabel/countryMeta)에 없으면 표/카드에서
// 빈 배지·국기 없는 행이 조용히 렌더되므로, 여기서 미리 잡는다.

const NULLABLE_NUMERIC: (keyof HumanoidSpec)[] = [
  "heightCm",
  "weightKg",
  "dof",
  "payloadKg",
  "maxSpeedMs",
  "batteryHours",
];

describe("humanoidSpecs 정합성", () => {
  it("비어 있지 않다", () => {
    expect(humanoidSpecs.length).toBeGreaterThan(0);
  });

  it("id 는 중복이 없다", () => {
    const ids = humanoidSpecs.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("모든 status 는 statusLabel 에 정의돼 있다(참조 무결성)", () => {
    for (const s of humanoidSpecs) {
      expect(statusLabel[s.status], `${s.id} status=${s.status}`).toBeDefined();
    }
  });

  it("모든 country 는 countryMeta 에 정의돼 있다(국기/이름 누락 방지)", () => {
    for (const s of humanoidSpecs) {
      expect(countryMeta[s.country], `${s.id} country=${s.country}`).toBeDefined();
    }
  });

  it("year 는 1900~2100 정수다", () => {
    for (const s of humanoidSpecs) {
      expect(Number.isInteger(s.year), `${s.id} year=${s.year}`).toBe(true);
      expect(s.year).toBeGreaterThanOrEqual(1900);
      expect(s.year).toBeLessThanOrEqual(2100);
    }
  });

  it("수치 스펙은 number 또는 null 이며, 숫자면 음수가 아니다", () => {
    for (const s of humanoidSpecs) {
      for (const key of NULLABLE_NUMERIC) {
        const v = s[key] as number | null;
        expect(v === null || typeof v === "number", `${s.id}.${key}`).toBe(true);
        if (typeof v === "number") {
          expect(v, `${s.id}.${key}`).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  it("name·maker 는 비어 있지 않다", () => {
    for (const s of humanoidSpecs) {
      expect(s.name.trim().length).toBeGreaterThan(0);
      expect(s.maker.trim().length).toBeGreaterThan(0);
    }
  });
});
