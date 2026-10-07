import { describe, it, expect } from "vitest";
import { tally, decadeBucket, maxCount } from "./stats";
import type { Robot } from "./types";

function robot(p: Partial<Robot> & Pick<Robot, "id">): Robot {
  return {
    name: p.id,
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

describe("tally", () => {
  const robots: Robot[] = [
    robot({ id: "1", country: "US" }),
    robot({ id: "2", country: "US" }),
    robot({ id: "3", country: "Japan" }),
    robot({ id: "4", country: "Korea" }),
  ];

  it("그룹별 개수를 센다", () => {
    const result = tally(robots, (r) => r.country);
    expect(result).toContainEqual({ key: "US", count: 2 });
    expect(result).toContainEqual({ key: "Japan", count: 1 });
  });

  it("많은 순 → 키 순으로 정렬한다", () => {
    // Japan·Korea 는 동률(1) 이므로 키 알파벳순
    expect(tally(robots, (r) => r.country)).toEqual([
      { key: "US", count: 2 },
      { key: "Japan", count: 1 },
      { key: "Korea", count: 1 },
    ]);
  });

  it("빈 목록이면 빈 배열", () => {
    expect(tally([], (r) => r.country)).toEqual([]);
  });
});

describe("decadeBucket", () => {
  it("연도를 10년 단위 버킷으로 만든다", () => {
    expect(decadeBucket(2024)).toBe("2020s");
    expect(decadeBucket(2019)).toBe("2010s");
    expect(decadeBucket(2000)).toBe("2000s");
  });

  it("연도가 없으면 unknown", () => {
    expect(decadeBucket(undefined)).toBe("unknown");
  });
});

describe("maxCount", () => {
  it("가장 큰 count 를 반환한다", () => {
    expect(
      maxCount([
        { key: "a", count: 3 },
        { key: "b", count: 7 },
        { key: "c", count: 1 },
      ]),
    ).toBe(7);
  });

  it("빈 배열이면 0", () => {
    expect(maxCount([])).toBe(0);
  });
});
