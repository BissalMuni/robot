import type { Robot } from "./types";

// 로봇 이름(trim·소문자) → 카탈로그 id 색인 (순수 함수).
// 브랜드 디렉토리 등에서 "제품 이름"만 있을 때 카탈로그 상세 페이지로 연결하기 위한 조회용.
// 같은 이름이 여러 개면 먼저 등장한 것을 유지한다(저장소가 이름순으로 정렬돼 결정적).
export function robotNameIndex(robots: Robot[]): Record<string, string> {
  const index: Record<string, string> = {};
  for (const r of robots) {
    const key = r.name.trim().toLowerCase();
    if (!(key in index)) index[key] = r.id;
  }
  return index;
}

// 이름으로 카탈로그 id 를 찾는다. 대소문자·앞뒤 공백을 무시한다. 없으면 undefined.
export function robotIdByName(
  index: Record<string, string>,
  name: string,
): string | undefined {
  return index[name.trim().toLowerCase()];
}
