import type { Robot } from "./types";

// 그룹별 집계 한 줄.
export type Tally = { key: string; count: number };

// 주어진 셀렉터로 그룹별 개수를 세고, 많은 순 → 키 순으로 정렬해 반환한다 (순수 함수).
export function tally(robots: Robot[], select: (r: Robot) => string): Tally[] {
  const counts = new Map<string, number>();
  for (const robot of robots) {
    const key = select(robot);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

// 연도를 10년 단위 버킷 키로 변환한다. year 가 없으면 "unknown".
export function decadeBucket(year: number | undefined): string {
  if (year === undefined) return "unknown";
  return `${Math.floor(year / 10) * 10}s`;
}

// 집계 목록에서 가장 큰 count (막대 폭 정규화용). 비어 있으면 0.
export function maxCount(tallies: Tally[]): number {
  return tallies.reduce((m, t) => (t.count > m ? t.count : m), 0);
}
