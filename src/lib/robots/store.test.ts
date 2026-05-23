import { describe, it, expect } from "vitest";
import { mergeRobots } from "./store";
import type { Robot } from "./types";

function robot(partial: Partial<Robot> & Pick<Robot, "id" | "name">): Robot {
  return {
    manufacturer: "M",
    country: "US",
    category: "general",
    status: "concept",
    description: "",
    images: [],
    sources: [],
    ...partial,
  };
}

describe("mergeRobots", () => {
  it("여러 소스를 머지하고 이름 순으로 정렬한다", () => {
    const merged = mergeRobots([
      [robot({ id: "b", name: "Beta" })],
      [robot({ id: "a", name: "Alpha" })],
    ]);
    expect(merged.map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("같은 id 는 뒤 소스가 덮어쓰고 출처는 합친다", () => {
    const merged = mergeRobots([
      [
        robot({
          id: "a",
          name: "Alpha",
          description: "old",
          sources: [{ url: "https://a.com", fetchedAt: "2026-05-22T00:00:00.000Z", verified: true }],
        }),
      ],
      [
        robot({
          id: "a",
          name: "Alpha",
          description: "new",
          sources: [{ url: "https://b.com", fetchedAt: "2026-05-22T00:00:00.000Z", verified: false }],
        }),
      ],
    ]);
    expect(merged).toHaveLength(1);
    expect(merged[0].description).toBe("new");
    expect(merged[0].sources).toHaveLength(2);
  });
});
