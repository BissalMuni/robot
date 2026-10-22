import { describe, it, expect } from "vitest";
import { adjacentRobots } from "./adjacent";
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

// 저장소가 이름순으로 머지한 상태를 가정한다.
const all: Robot[] = [
  robot({ id: "a", name: "Alpha" }),
  robot({ id: "b", name: "Beta" }),
  robot({ id: "c", name: "Gamma" }),
];

describe("adjacentRobots", () => {
  it("가운데 로봇은 앞/뒤 이웃을 모두 가진다", () => {
    const { prev, next } = adjacentRobots(all, all[1]);
    expect(prev?.id).toBe("a");
    expect(next?.id).toBe("c");
  });

  it("첫 로봇은 prev 가 null", () => {
    const { prev, next } = adjacentRobots(all, all[0]);
    expect(prev).toBeNull();
    expect(next?.id).toBe("b");
  });

  it("마지막 로봇은 next 가 null (순환하지 않음)", () => {
    const { prev, next } = adjacentRobots(all, all[2]);
    expect(prev?.id).toBe("b");
    expect(next).toBeNull();
  });

  it("목록에 없는 로봇이면 둘 다 null", () => {
    const { prev, next } = adjacentRobots(all, robot({ id: "z", name: "Zeta" }));
    expect(prev).toBeNull();
    expect(next).toBeNull();
  });

  it("단일 항목 목록이면 둘 다 null", () => {
    const only = robot({ id: "only", name: "Only" });
    expect(adjacentRobots([only], only)).toEqual({ prev: null, next: null });
  });
});
