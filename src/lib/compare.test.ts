import { describe, it, expect } from "vitest";
import { nullLast, sortSpecs, STATUS_ORDER } from "./compare";
import type { HumanoidSpec } from "@/data/compare";

function spec(p: Partial<HumanoidSpec> & Pick<HumanoidSpec, "id">): HumanoidSpec {
  return {
    name: p.id,
    maker: "M",
    country: "US",
    year: 2024,
    status: "prototype",
    heightCm: null,
    weightKg: null,
    dof: null,
    payloadKg: null,
    maxSpeedMs: null,
    batteryHours: null,
    useCase: [],
    notes: "",
    ...p,
  };
}

describe("nullLast", () => {
  it("오름차순 정렬하고 null 은 뒤로 보낸다", () => {
    expect(nullLast(1, 2)).toBeLessThan(0);
    expect(nullLast(null, 2)).toBe(1); // null 이 뒤
    expect(nullLast(1, null)).toBe(-1); // null 이 뒤
    expect(nullLast(null, null)).toBe(0);
  });

  it("desc=true 면 큰 값이 앞으로, null 은 여전히 뒤", () => {
    expect(nullLast(1, 2, true)).toBeGreaterThan(0);
    expect(nullLast(null, 2, true)).toBe(1);
    expect(nullLast(1, null, true)).toBe(-1);
  });
});

describe("sortSpecs", () => {
  const specs: HumanoidSpec[] = [
    spec({ id: "a", weightKg: 50, year: 2022 }),
    spec({ id: "b", weightKg: null, year: 2024 }),
    spec({ id: "c", weightKg: 80, year: 2023 }),
  ];

  it("원본을 변형하지 않는다(복사본 반환)", () => {
    const before = specs.map((s) => s.id);
    sortSpecs(specs, "weight_desc");
    expect(specs.map((s) => s.id)).toEqual(before);
  });

  it("weight_asc 는 오름차순 + null 뒤", () => {
    expect(sortSpecs(specs, "weight_asc").map((s) => s.id)).toEqual([
      "a",
      "c",
      "b",
    ]);
  });

  it("weight_desc 는 내림차순 + null 뒤", () => {
    expect(sortSpecs(specs, "weight_desc").map((s) => s.id)).toEqual([
      "c",
      "a",
      "b",
    ]);
  });

  it("year_asc / year_desc 로 연도 정렬한다", () => {
    expect(sortSpecs(specs, "year_asc").map((s) => s.id)).toEqual([
      "a",
      "c",
      "b",
    ]);
    expect(sortSpecs(specs, "year_desc").map((s) => s.id)).toEqual([
      "b",
      "c",
      "a",
    ]);
  });

  it("알 수 없는 sort 는 기본 정렬(상태 우선순위 → 제조사명)로 떨어진다", () => {
    const mixed: HumanoidSpec[] = [
      spec({ id: "proto", status: "prototype", maker: "Z" }),
      spec({ id: "prod", status: "production", maker: "A" }),
      spec({ id: "pilot", status: "pilot", maker: "B" }),
    ];
    expect(sortSpecs(mixed, "nonsense").map((s) => s.status)).toEqual([
      "production",
      "pilot",
      "prototype",
    ]);
  });

  it("STATUS_ORDER 는 양산 우선이다", () => {
    expect(STATUS_ORDER[0]).toBe("production");
  });
});
