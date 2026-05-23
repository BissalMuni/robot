import type { Robot } from "@/lib/robots/types";

// 모든 데이터 소스(seed/scraper/AI 큐레이션)는 이 인터페이스를 구현해
// 동일한 Robot[] 을 반환한다. 새 소스를 추가해도 UI/저장소는 바뀌지 않는다.
export interface RobotSource {
  // 소스 식별자 (예: "seed", "scraper")
  readonly name: string;
  // 정규화·검증된 Robot 목록을 반환한다.
  load(): Promise<Robot[]>;
}
