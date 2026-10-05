import { describe, it, expect } from "vitest";
import { relatedRobots } from "./related";
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

const current = robot({
  id: "cur",
  name: "Current",
  manufacturer: "Acme",
  category: "service",
});

const all: Robot[] = [
  current,
  robot({ id: "m1", name: "Acme Two", manufacturer: "Acme", category: "general" }),
  robot({ id: "m2", name: "Acme Three", manufacturer: "Acme", category: "service" }),
  robot({ id: "c1", name: "Other Service", manufacturer: "Other", category: "service" }),
  robot({ id: "x1", name: "Unrelated", manufacturer: "Other", category: "logistics" }),
];

describe("relatedRobots", () => {
  it("현재 로봇은 결과에서 제외한다", () => {
    expect(relatedRobots(all, current).map((r) => r.id)).not.toContain("cur");
  });

  it("같은 제조사를 같은 용도보다 먼저 보여준다", () => {
    const ids = relatedRobots(all, current).map((r) => r.id);
    // 제조사(Acme): m1,m2 → 그다음 같은 용도(service, 다른 제조사): c1
    expect(ids).toEqual(["m1", "m2", "c1"]);
  });

  it("관련 없는 로봇(제조사·용도 모두 다름)은 제외한다", () => {
    expect(relatedRobots(all, current).map((r) => r.id)).not.toContain("x1");
  });

  it("limit 개수를 넘지 않는다", () => {
    expect(relatedRobots(all, current, 2).map((r) => r.id)).toEqual(["m1", "m2"]);
  });

  it("limit 이 0 이하이면 빈 배열", () => {
    expect(relatedRobots(all, current, 0)).toEqual([]);
  });

  it("관련 로봇이 없으면 빈 배열", () => {
    const lonely = robot({ id: "lonely", name: "Lonely", manufacturer: "Z", category: "healthcare" });
    expect(relatedRobots([current, lonely], lonely)).toEqual([]);
  });
});
