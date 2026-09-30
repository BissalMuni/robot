import { describe, it, expect, vi } from "vitest";
import { mergeRobots, loadSourceSafely } from "./store";
import type { Robot } from "./types";
import type { RobotSource } from "@/lib/sources/types";

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

describe("loadSourceSafely", () => {
  it("성공한 소스는 그 목록을 그대로 반환한다", async () => {
    const list = [robot({ id: "a", name: "Alpha" })];
    const source: RobotSource = { name: "ok", load: async () => list };
    await expect(loadSourceSafely(source)).resolves.toEqual(list);
  });

  it("실패한 소스는 빈 목록으로 격리하고 경고를 남긴다", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const source: RobotSource = {
      name: "broken",
      load: async () => {
        throw new Error("boom");
      },
    };
    await expect(loadSourceSafely(source)).resolves.toEqual([]);
    expect(warn).toHaveBeenCalledOnce();
    expect(warn.mock.calls[0][0]).toContain("broken");
    warn.mockRestore();
  });
});
