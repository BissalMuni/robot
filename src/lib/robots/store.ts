import { cache } from "react";
import type { Robot } from "./types";
import type { RobotSource } from "@/lib/sources/types";
import { seedSource } from "@/lib/sources/seed";
import { collectedSource } from "@/lib/sources/collected";

// 저장소가 머지하는 소스 목록. 새 소스를 추가해도 UI는 바뀌지 않는다.
const sources: RobotSource[] = [seedSource, collectedSource];

// 여러 소스의 Robot[] 을 id 기준으로 머지한다.
// 같은 id 가 여러 소스에 있으면 뒤 소스가 앞 소스를 덮어쓰되, sources[] 는 합친다.
export function mergeRobots(lists: Robot[][]): Robot[] {
  const byId = new Map<string, Robot>();
  for (const list of lists) {
    for (const robot of list) {
      const existing = byId.get(robot.id);
      if (existing) {
        byId.set(robot.id, {
          ...existing,
          ...robot,
          sources: [...existing.sources, ...robot.sources],
        });
      } else {
        byId.set(robot.id, robot);
      }
    }
  }
  // 이름 순 안정 정렬로 일관된 목록 제공
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// 모든 소스를 로드·머지한다. 요청 단위로 메모이즈한다.
export const getAllRobots = cache(async (): Promise<Robot[]> => {
  const lists = await Promise.all(sources.map((s) => s.load()));
  return mergeRobots(lists);
});

// id 로 단일 로봇 조회. 없으면 null.
export async function getRobotById(id: string): Promise<Robot | null> {
  const all = await getAllRobots();
  return all.find((r) => r.id === id) ?? null;
}

// 정적 생성을 위한 전체 id 목록
export async function getAllRobotIds(): Promise<string[]> {
  const all = await getAllRobots();
  return all.map((r) => r.id);
}
