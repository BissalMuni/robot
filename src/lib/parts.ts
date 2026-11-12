import type { PartCategory } from "@/data/parts";

// 해당 부품 카테고리에 "국산 제조사"(country === "KR" 인 업체)가 몇 곳인지 센다 (순수 함수).
// 창업자가 어떤 부품을 국내에서 '제조'로 조달할 수 있는지 한눈에 보도록 돕는다
// (단순 구매처가 아니라 제조사 기준 — 공급망 내재화 관점).
export function koreanVendorCount(category: PartCategory): number {
  return category.vendors.filter((v) => v.country === "KR").length;
}
