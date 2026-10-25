import { cache } from "react";
import type { Robot } from "./types";
import type { RobotSource } from "@/lib/sources/types";
import { seedSource } from "@/lib/sources/seed";
import { collectedSource } from "@/lib/sources/collected";

// 저장소가 머지하는 소스 목록. 새 소스를 추가해도 UI는 바뀌지 않는다.
const sources: RobotSource[] = [seedSource, collectedSource];

// 출처 목록에서 같은 url 의 중복을 제거한다.
// 첫 등장 위치는 유지하되, "뒤 소스가 앞을 덮어쓴다"는 머지 철학에 맞춰 메타데이터(verified·fetchedAt)는
// 마지막 값을 쓴다(Map.set 은 기존 키의 삽입 순서를 유지한 채 값만 갱신).
// 상세 페이지가 key={s.url} 로 렌더하므로, 중복 제거는 React key 충돌·중복 행 노출도 막는다.
export function dedupeSources(sources: Robot["sources"]): Robot["sources"] {
  const byUrl = new Map<string, Robot["sources"][number]>();
  for (const s of sources) byUrl.set(s.url, s);
  return [...byUrl.values()];
}

// 여러 소스의 Robot[] 을 id 기준으로 머지한다.
// 같은 id 가 여러 소스에 있으면 뒤 소스가 앞 소스를 덮어쓰되, sources[] 는 합친다(url 중복 제거).
export function mergeRobots(lists: Robot[][]): Robot[] {
  const byId = new Map<string, Robot>();
  for (const list of lists) {
    for (const robot of list) {
      const existing = byId.get(robot.id);
      if (existing) {
        byId.set(robot.id, {
          ...existing,
          ...robot,
          sources: dedupeSources([...existing.sources, ...robot.sources]),
        });
      } else {
        byId.set(robot.id, { ...robot, sources: dedupeSources(robot.sources) });
      }
    }
  }
  // 이름 순 안정 정렬로 일관된 목록 제공
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// 한 소스를 안전하게 로드한다. 실패하면 경고를 남기고 빈 목록으로 격리한다.
// 한 소스(예: 깨진 JSON·네트워크 오류)의 실패가 전체 카탈로그를 중단시키지 않도록,
// 나머지 소스만으로 최대한 서비스를 이어간다(graceful degradation).
export async function loadSourceSafely(source: RobotSource): Promise<Robot[]> {
  try {
    return await source.load();
  } catch (err) {
    console.warn(
      `[robots] 소스 "${source.name}" 로드 실패 — 건너뜁니다:`,
      err,
    );
    return [];
  }
}

// 모든 소스를 로드·머지한다. 요청 단위로 메모이즈한다.
export const getAllRobots = cache(async (): Promise<Robot[]> => {
  const lists = await Promise.all(sources.map(loadSourceSafely));
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
