import { RobotCategory, RobotStatus } from "./types";
import type { Robot } from "./types";

// 검색/필터 조건. 모두 선택적이며, 비어 있으면 해당 조건은 무시한다.
export interface RobotFilters {
  query?: string; // 이름·제조사·설명 텍스트 검색
  country?: string;
  category?: RobotCategory;
  status?: RobotStatus;
}

// URL 쿼리처럼 신뢰할 수 없는 문자열 입력을 안전하게 RobotFilters 로 정규화한다.
// category/status 는 zod enum 으로 검증해, 유효하지 않은 값은 조용히 무시한다
// (잘못된 값을 그대로 필터에 넣으면 "0건"이라는 오해를 주는 대신, 없는 조건으로 취급).
export function parseRobotFilters(raw: {
  q?: string;
  country?: string;
  category?: string;
  status?: string;
}): RobotFilters {
  const category = RobotCategory.safeParse(raw.category);
  const status = RobotStatus.safeParse(raw.status);
  const query = raw.q?.trim();
  const country = raw.country?.trim();
  return {
    query: query || undefined,
    country: country || undefined,
    category: category.success ? category.data : undefined,
    status: status.success ? status.data : undefined,
  };
}

// 활성 검색/필터/비기본 정렬이 하나라도 있는지 판단한다("초기화" 노출용).
// parse* 를 재사용하므로 잘못된 값(예: ?category=foo)은 활성으로 치지 않는다.
export function hasActiveFilters(raw: {
  q?: string;
  country?: string;
  category?: string;
  status?: string;
  sort?: string;
}): boolean {
  const f = parseRobotFilters(raw);
  const sortActive = parseRobotSort(raw.sort) !== DEFAULT_ROBOT_SORT;
  return Boolean(f.query || f.country || f.category || f.status) || sortActive;
}

// 로봇 목록에 검색/필터를 적용한다 (순수 함수).
export function searchRobots(robots: Robot[], filters: RobotFilters): Robot[] {
  const q = filters.query?.trim().toLowerCase();

  return robots.filter((robot) => {
    // 텍스트 검색: 이름·제조사·국가·설명에 부분 일치.
    // 카드가 "제조사 · 국가"를 노출하므로, 보이는 국가명(예: "United States")으로
    // 검색하면 자연히 걸리도록 국가도 포함한다(국가 드롭다운 필터와 별개로 보조).
    // description 은 zod default("") 보장이라 null 체크 불필요.
    if (q) {
      const haystack =
        `${robot.name} ${robot.manufacturer} ${robot.country} ${robot.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.country && robot.country !== filters.country) return false;
    if (filters.category && robot.category !== filters.category) return false;
    if (filters.status && robot.status !== filters.status) return false;
    return true;
  });
}

// 목록 정렬 옵션. name_asc 가 기본이며, 저장소가 이미 이름순으로 머지하므로
// 기본값은 기존 표시 순서를 그대로 보존한다(동작 보존).
export const ROBOT_SORTS = [
  "name_asc",
  "name_desc",
  "year_desc",
  "year_asc",
] as const;
export type RobotSort = (typeof ROBOT_SORTS)[number];
export const DEFAULT_ROBOT_SORT: RobotSort = "name_asc";

// 신뢰할 수 없는 sort 문자열을 안전하게 RobotSort 로 정규화한다(모르면 기본값).
export function parseRobotSort(raw?: string): RobotSort {
  return (ROBOT_SORTS as readonly string[]).includes(raw ?? "")
    ? (raw as RobotSort)
    : DEFAULT_ROBOT_SORT;
}

// 로봇 목록을 정렬한다 (순수 함수 — 원본 불변, 복사본 반환).
// 연도(year)는 선택 필드라 값이 없는 항목은 항상 뒤로 보내고 이름으로 보조 정렬한다.
export function sortRobots(
  robots: Robot[],
  sort: RobotSort = DEFAULT_ROBOT_SORT,
): Robot[] {
  const byName = (a: Robot, b: Robot) => a.name.localeCompare(b.name);
  const byYear = (a: Robot, b: Robot, desc: boolean) => {
    const ya = a.year ?? null;
    const yb = b.year ?? null;
    if (ya === null && yb === null) return 0;
    if (ya === null) return 1; // 연도 없음 → 뒤로
    if (yb === null) return -1;
    return desc ? yb - ya : ya - yb;
  };

  const arr = [...robots];
  switch (sort) {
    case "name_desc":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case "year_desc":
      return arr.sort((a, b) => byYear(a, b, true) || byName(a, b));
    case "year_asc":
      return arr.sort((a, b) => byYear(a, b, false) || byName(a, b));
    case "name_asc":
    default:
      return arr.sort(byName);
  }
}

// 필터 UI 옵션 생성: 데이터에 실제로 존재하는 국가 목록(정렬·중복 제거).
export function availableCountries(robots: Robot[]): string[] {
  return [...new Set(robots.map((r) => r.country))].sort((a, b) =>
    a.localeCompare(b),
  );
}
