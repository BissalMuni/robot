import { describe, it, expect } from "vitest";
import { latestFetchedAt } from "./freshness";
import type { Robot, RobotSource } from "./types";

function source(fetchedAt: string, verified = true): RobotSource {
  return { url: "https://example.com", fetchedAt, verified };
}

function robot(sources: RobotSource[]): Robot {
  return {
    id: "r",
    name: "R",
    manufacturer: "M",
    country: "US",
    category: "general",
    status: "concept",
    description: "",
    images: [],
    sources,
  };
}

describe("latestFetchedAt", () => {
  it("출처가 없으면 undefined", () => {
    expect(latestFetchedAt(robot([]))).toBeUndefined();
  });

  it("여러 출처 중 가장 최근 시각을 고른다", () => {
    const r = robot([
      source("2026-01-01T00:00:00.000Z"),
      source("2026-05-20T00:00:00.000Z"),
      source("2026-03-10T00:00:00.000Z"),
    ]);
    expect(latestFetchedAt(r)?.toISOString()).toBe("2026-05-20T00:00:00.000Z");
  });

  it("단일 출처면 그 시각을 반환한다", () => {
    const r = robot([source("2026-07-15T12:00:00.000Z")]);
    expect(latestFetchedAt(r)?.toISOString()).toBe("2026-07-15T12:00:00.000Z");
  });

  it("유효하지 않은 날짜는 무시한다", () => {
    const r = robot([source("not-a-date"), source("2026-02-02T00:00:00.000Z")]);
    expect(latestFetchedAt(r)?.toISOString()).toBe("2026-02-02T00:00:00.000Z");
  });

  it("유효한 날짜가 하나도 없으면 undefined", () => {
    expect(latestFetchedAt(robot([source("nope")]))).toBeUndefined();
  });
});
