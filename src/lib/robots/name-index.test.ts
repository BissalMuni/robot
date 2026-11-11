import { describe, it, expect } from "vitest";
import { robotNameIndex, robotIdByName } from "./name-index";
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

const robots: Robot[] = [
  robot({ id: "atlas", name: "Atlas" }),
  robot({ id: "figure-02", name: "Figure 02" }),
  robot({ id: "neo", name: "NEO" }),
];

describe("robotNameIndex / robotIdByName", () => {
  it("이름(소문자)→id 색인을 만든다", () => {
    const idx = robotNameIndex(robots);
    expect(idx["atlas"]).toBe("atlas");
    expect(idx["figure 02"]).toBe("figure-02");
  });

  it("대소문자·공백을 무시하고 조회한다", () => {
    const idx = robotNameIndex(robots);
    expect(robotIdByName(idx, "  figure 02 ")).toBe("figure-02");
    expect(robotIdByName(idx, "NEO")).toBe("neo");
  });

  it("없는 이름은 undefined", () => {
    const idx = robotNameIndex(robots);
    expect(robotIdByName(idx, "Spot")).toBeUndefined();
  });

  it("같은 이름이 중복되면 먼저 등장한 id 를 유지한다", () => {
    const idx = robotNameIndex([
      robot({ id: "a", name: "Dup" }),
      robot({ id: "b", name: "Dup" }),
    ]);
    expect(idx["dup"]).toBe("a");
  });
});
