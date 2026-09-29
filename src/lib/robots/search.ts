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

// 로봇 목록에 검색/필터를 적용한다 (순수 함수).
export function searchRobots(robots: Robot[], filters: RobotFilters): Robot[] {
  const q = filters.query?.trim().toLowerCase();

  return robots.filter((robot) => {
    // 텍스트 검색: 이름·제조사·설명에 부분 일치
    // description 은 zod default("") 보장이라 null 체크 불필요.
    if (q) {
      const haystack =
        `${robot.name} ${robot.manufacturer} ${robot.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.country && robot.country !== filters.country) return false;
    if (filters.category && robot.category !== filters.category) return false;
    if (filters.status && robot.status !== filters.status) return false;
    return true;
  });
}

// 필터 UI 옵션 생성: 데이터에 실제로 존재하는 국가 목록(정렬·중복 제거).
export function availableCountries(robots: Robot[]): string[] {
  return [...new Set(robots.map((r) => r.country))].sort((a, b) =>
    a.localeCompare(b),
  );
}
