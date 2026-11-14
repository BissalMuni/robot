import { describe, it, expect } from "vitest";
import { robotSpecSummary } from "./spec-summary";
import type { Robot } from "./types";

function robot(p: Partial<Robot> & Pick<Robot, "id" | "name">): Robot {
  return {
    manufacturer: "M",
    country: "US",
    category: "general",
    status: "concept",
    description: "",
    images: [],
    sources: [],
    ...p,
  };
}

describe("robotSpecSummary", () => {
  it("있는 스펙만 cm·kg·DoF 순서로 합친다", () => {
    expect(
      robotSpecSummary(robot({ id: "1", name: "A", height: 175, weight: 63, dof: 53 })),
    ).toBe("175cm · 63kg · 53 DoF");
  });

  it("없는 항목은 생략한다", () => {
    expect(robotSpecSummary(robot({ id: "2", name: "B", height: 167, dof: 62 }))).toBe(
      "167cm · 62 DoF",
    );
  });

  it("스펙이 하나도 없으면 빈 문자열", () => {
    expect(robotSpecSummary(robot({ id: "3", name: "C" }))).toBe("");
  });
});
