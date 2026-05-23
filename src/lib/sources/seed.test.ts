import { describe, it, expect } from "vitest";
import { parseRobots, seedSource } from "./seed";

describe("seed source", () => {
  it("실제 시드 JSON 을 스키마에 맞게 로드한다", async () => {
    const robots = await seedSource.load();
    expect(robots.length).toBeGreaterThanOrEqual(10);
    // 모든 항목은 출처를 하나 이상 가진다
    for (const r of robots) {
      expect(r.sources.length).toBeGreaterThan(0);
      expect(r.id).toBeTruthy();
    }
  });

  it("잘못된 JSON 은 거부한다", () => {
    expect(() => parseRobots('[{"id":"x"}]')).toThrow();
  });
});
