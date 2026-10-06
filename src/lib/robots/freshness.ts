import type { Robot } from "./types";

// 로봇의 출처(sources[]) 중 가장 최근 수집 시각을 Date 로 반환한다.
// 출처가 없거나 유효한 날짜가 하나도 없으면 undefined.
// 사이트맵의 lastModified 등 "데이터가 마지막으로 갱신된 시점"을 추정하는 데 쓴다.
export function latestFetchedAt(robot: Robot): Date | undefined {
  let latest: number | undefined;
  for (const source of robot.sources) {
    const t = Date.parse(source.fetchedAt);
    if (!Number.isNaN(t) && (latest === undefined || t > latest)) {
      latest = t;
    }
  }
  return latest === undefined ? undefined : new Date(latest);
}
