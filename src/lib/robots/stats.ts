import type { Robot } from "./types";

// 그룹별 집계 한 줄.
export type Tally = { key: string; count: number };

// 시장 성숙도 지표: 전체 중 상용(commercial) 비중 (순수 함수).
// 창업자가 "지금 실제로 구매·배치 가능한 모델이 얼마나 되는가"를 한눈에 보도록 돕는다.
export function commercialShare(robots: Robot[]): {
  commercial: number;
  total: number;
  pct: number;
} {
  const total = robots.length;
  const commercial = robots.filter((r) => r.status === "commercial").length;
  const pct = total === 0 ? 0 : Math.round((commercial / total) * 100);
  return { commercial, total, pct };
}

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

// 집계 한 줄을 홈 카탈로그의 해당 필터로 연결하는 URL 을 만든다.
// 홈(page.tsx)의 parseRobotFilters 가 읽는 쿼리키(country/category/status)와 1:1 로 맞춘다.
// key 는 공백·특수문자가 있는 국가명(예: "United States")일 수 있어 인코딩한다.
export function statFilterHref(
  param: "country" | "category" | "status",
  key: string,
): string {
  return `/?${param}=${encodeURIComponent(key)}`;
}

// 집계 한 줄을 홈 카탈로그의 자유 텍스트 검색(?q=)으로 연결하는 URL 을 만든다.
// 제조사처럼 전용 필터 파라미터가 없는 차원에 쓴다(검색은 제조사도 매칭하므로 해당 제조사 로봇만 걸러진다).
export function statQueryHref(query: string): string {
  return `/?q=${encodeURIComponent(query)}`;
}
