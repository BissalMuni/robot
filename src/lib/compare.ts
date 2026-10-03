import type { HumanoidSpec, RobotStatus } from "@/data/compare";

// 상태 정렬 우선순위(양산 → 파일럿 → 프로토타입 순으로 먼저 보이게).
export const STATUS_ORDER: RobotStatus[] = ["production", "pilot", "prototype"];

// 숫자 비교 시 null(미공개 스펙)을 항상 뒤로 보낸다.
// desc=true 면 큰 값이 앞으로(내림차순), 그래도 null 은 뒤에 남는다.
export function nullLast(
  a: number | null,
  b: number | null,
  desc = false,
): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return desc ? b - a : a - b;
}

// 정렬 키 → 비교 함수. 각 함수는 [...specs] 복사본에 적용된다.
const comparators: Record<
  string,
  (a: HumanoidSpec, b: HumanoidSpec) => number
> = {
  year_asc: (a, b) => a.year - b.year,
  year_desc: (a, b) => b.year - a.year,
  speed_asc: (a, b) => nullLast(a.maxSpeedMs, b.maxSpeedMs),
  speed_desc: (a, b) => nullLast(a.maxSpeedMs, b.maxSpeedMs, true),
  weight_asc: (a, b) => nullLast(a.weightKg, b.weightKg),
  weight_desc: (a, b) => nullLast(a.weightKg, b.weightKg, true),
  height_asc: (a, b) => nullLast(a.heightCm, b.heightCm),
  height_desc: (a, b) => nullLast(a.heightCm, b.heightCm, true),
  payload_asc: (a, b) => nullLast(a.payloadKg, b.payloadKg),
  payload_desc: (a, b) => nullLast(a.payloadKg, b.payloadKg, true),
  dof_asc: (a, b) => nullLast(a.dof, b.dof),
  dof_desc: (a, b) => nullLast(a.dof, b.dof, true),
  battery_asc: (a, b) => nullLast(a.batteryHours, b.batteryHours),
  battery_desc: (a, b) => nullLast(a.batteryHours, b.batteryHours, true),
};

// 알 수 없는 sort 값이면 기본 정렬(상태 우선순위 → 제조사명)로 떨어진다.
function defaultCompare(a: HumanoidSpec, b: HumanoidSpec): number {
  return (
    STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status) ||
    a.maker.localeCompare(b.maker)
  );
}

// 스펙 목록을 정렬한다(원본 불변 — 복사본을 반환).
export function sortSpecs(specs: HumanoidSpec[], sort: string): HumanoidSpec[] {
  const compare = comparators[sort] ?? defaultCompare;
  return [...specs].sort(compare);
}
