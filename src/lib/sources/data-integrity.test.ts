import { describe, it, expect } from "vitest";
import { seedSource } from "./seed";
import { collectedSource } from "./collected";
import { mergeRobots } from "@/lib/robots/store";
import { Robot } from "@/lib/robots/types";

// 실제 커밋된 데이터 파일(data/robots.*.json)을 "운영 코드 경로"로 로드해 검증한다.
// validate-data.mjs 는 별도 명령(pnpm validate:data)이라 `pnpm test`/CI 에서 돌지 않으므로,
// 핵심 불변식만 테스트로 끌어와 회귀를 자동으로 막는다.

// 중복 id 목록(에러 메시지용).
function duplicateIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const dups = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) dups.add(id);
    else seen.add(id);
  }
  return [...dups];
}

describe("실제 데이터 무결성", () => {
  it("seed 소스가 스키마를 통과해 로드되고 비어 있지 않다", async () => {
    // seedSource.load() 는 내부에서 RobotArray.parse 하므로, 성공 자체가 스키마 통과를 의미한다.
    const robots = await seedSource.load();
    expect(robots.length).toBeGreaterThan(0);
  });

  it("seed 파일 내 id 는 유일하다(파일 내 중복은 머지 시 조용히 유실됨)", async () => {
    const ids = (await seedSource.load()).map((r) => r.id);
    expect(duplicateIds(ids), `중복 id: ${duplicateIds(ids).join(", ")}`).toEqual(
      [],
    );
  });

  it("collected 소스가 로드되고(없으면 빈 배열) 파일 내 id 가 유일하다", async () => {
    const ids = (await collectedSource.load()).map((r) => r.id);
    expect(duplicateIds(ids), `중복 id: ${duplicateIds(ids).join(", ")}`).toEqual(
      [],
    );
  });

  it("머지된 카탈로그는 비어있지 않고, 모든 항목이 Robot 스키마를 만족하며 id 가 유일하다", async () => {
    const merged = mergeRobots([
      await seedSource.load(),
      await collectedSource.load(),
    ]);
    expect(merged.length).toBeGreaterThan(0);
    for (const robot of merged) {
      expect(() => Robot.parse(robot)).not.toThrow();
    }
    const ids = merged.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
