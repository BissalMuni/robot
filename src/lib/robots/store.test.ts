import { describe, it, expect, vi } from "vitest";
import { mergeRobots, loadSourceSafely, dedupeSources } from "./store";
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

  it("같은 url 이 여러 소스에 중복되면 출처를 한 번만 유지한다", () => {
    const merged = mergeRobots([
      [
        robot({
          id: "a",
          name: "Alpha",
          sources: [{ url: "https://dup.com", fetchedAt: "2026-05-22T00:00:00.000Z", verified: false }],
        }),
      ],
      [
        robot({
          id: "a",
          name: "Alpha",
          sources: [{ url: "https://dup.com", fetchedAt: "2026-06-01T00:00:00.000Z", verified: true }],
        }),
      ],
    ]);
    expect(merged[0].sources).toHaveLength(1);
    // 뒤 소스가 덮어쓴다 — 마지막 메타데이터(verified·fetchedAt)를 유지한다.
    expect(merged[0].sources[0]).toEqual({
      url: "https://dup.com",
      fetchedAt: "2026-06-01T00:00:00.000Z",
      verified: true,
    });
  });
});

describe("dedupeSources", () => {
  const s = (url: string, verified = true) => ({
    url,
    fetchedAt: "2026-05-22T00:00:00.000Z",
    verified,
  });

  it("중복 url 을 제거하되 첫 등장 순서를 유지한다", () => {
    const out = dedupeSources([s("https://a.com"), s("https://b.com"), s("https://a.com")]);
    expect(out.map((x) => x.url)).toEqual(["https://a.com", "https://b.com"]);
  });

  it("중복 url 의 메타데이터는 마지막 값으로 갱신한다(뒤가 덮어쓴다)", () => {
    const out = dedupeSources([s("https://a.com", false), s("https://a.com", true)]);
    expect(out).toHaveLength(1);
    expect(out[0].verified).toBe(true);
  });

  it("중복이 없으면 입력을 그대로(순서·내용) 반환한다", () => {
    const input = [s("https://a.com"), s("https://b.com")];
    expect(dedupeSources(input)).toEqual(input);
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
