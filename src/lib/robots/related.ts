import type { Robot } from "./types";

// 상세 페이지에서 보여줄 "관련 로봇"을 고른다 (순수 함수).
// 우선순위: ① 같은 제조사 → ② 같은 용도(category). 현재 로봇은 제외하고 중복 없이 limit 개까지.
// 입력 배열의 순서를 보존하므로(저장소는 이름순), 결과도 결정적이다.
export function relatedRobots(
  all: Robot[],
  current: Robot,
  limit = 4,
): Robot[] {
  if (limit <= 0) return [];
  const others = all.filter((r) => r.id !== current.id);

  const sameMaker = others.filter(
    (r) => r.manufacturer === current.manufacturer,
  );
  const sameCategory = others.filter(
    (r) =>
      r.manufacturer !== current.manufacturer &&
      r.category === current.category,
  );

  return [...sameMaker, ...sameCategory].slice(0, limit);
}
