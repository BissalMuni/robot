import type { Robot } from "./types";

// 상세 페이지의 순차 탐색(이전/다음)용 결과.
export type AdjacentRobots = { prev: Robot | null; next: Robot | null };

// 카탈로그 정렬 순서에서 현재 로봇의 바로 앞/뒤 로봇을 고른다 (순수 함수).
// 저장소(store.getAllRobots)가 이름순으로 머지하므로, 이 순서는 홈 목록의 기본 정렬과 일치한다.
// 입력 배열의 순서를 그대로 쓰며(이미 정렬됐다고 가정), 결과는 결정적이다.
// 현재 로봇이 목록에 없으면 prev·next 모두 null. 양 끝에서는 해당 방향이 null(순환하지 않음).
export function adjacentRobots(all: Robot[], current: Robot): AdjacentRobots {
  const idx = all.findIndex((r) => r.id === current.id);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
