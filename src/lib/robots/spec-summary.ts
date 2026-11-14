import type { Robot } from "./types";

// 카드·목록에서 빠르게 훑을 수 있는 한 줄 스펙 요약을 만든다 (순수 함수).
// 예: "175cm · 63kg · 53 DoF". 값이 없는 항목은 생략하며, 아무 것도 없으면 빈 문자열.
// 단위는 비교표(/compare)와 동일하게 cm·kg·DoF 로 고정한다.
export function robotSpecSummary(robot: Robot): string {
  const parts: string[] = [];
  if (robot.height !== undefined) parts.push(`${robot.height}cm`);
  if (robot.weight !== undefined) parts.push(`${robot.weight}kg`);
  if (robot.dof !== undefined) parts.push(`${robot.dof} DoF`);
  return parts.join(" · ");
}
