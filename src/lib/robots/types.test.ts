import { describe, it, expect } from "vitest";
import { Robot, RobotArray } from "./types";

describe("Robot schema", () => {
  // 최소 필수 필드만으로 파싱되고 기본값이 채워지는지 검증한다.
  it("필수 필드만으로 파싱하고 기본값을 채운다", () => {
    const parsed = Robot.parse({
      id: "x",
      name: "X",
      manufacturer: "Acme",
      country: "United States",
      category: "general",
      status: "concept",
    });
    expect(parsed.description).toBe("");
    expect(parsed.images).toEqual([]);
    expect(parsed.sources).toEqual([]);
    expect(parsed.year).toBeUndefined();
  });

  it("잘못된 status 는 거부한다", () => {
    expect(() =>
      Robot.parse({
        id: "x",
        name: "X",
        manufacturer: "Acme",
        country: "US",
        category: "general",
        status: "invalid",
      }),
    ).toThrow();
  });

  it("source 의 url/fetchedAt/verified 를 검증한다", () => {
    const parsed = Robot.parse({
      id: "x",
      name: "X",
      manufacturer: "Acme",
      country: "US",
      category: "general",
      status: "research",
      sources: [
        { url: "https://example.com", fetchedAt: "2026-05-22T00:00:00.000Z", verified: false },
      ],
    });
    expect(parsed.sources[0].verified).toBe(false);

    expect(() =>
      Robot.parse({
        id: "x",
        name: "X",
        manufacturer: "Acme",
        country: "US",
        category: "general",
        status: "research",
        sources: [{ url: "not-a-url", fetchedAt: "2026-05-22T00:00:00.000Z", verified: true }],
      }),
    ).toThrow();
  });

  it("RobotArray 로 배열을 파싱한다", () => {
    const list = RobotArray.parse([
      {
        id: "a",
        name: "A",
        manufacturer: "M",
        country: "US",
        category: "service",
        status: "commercial",
      },
    ]);
    expect(list).toHaveLength(1);
  });
});
