import { z } from "zod";

// 로봇 상태: 연구용 / 상용 / 콘셉트
export const RobotStatus = z.enum(["research", "commercial", "concept"]);
export type RobotStatus = z.infer<typeof RobotStatus>;

// 로봇 용도/카테고리
export const RobotCategory = z.enum([
  "general", // 범용
  "industrial", // 산업용
  "service", // 서비스
  "research", // 연구
  "entertainment", // 엔터테인먼트
  "logistics", // 물류
  "healthcare", // 헬스케어
]);
export type RobotCategory = z.infer<typeof RobotCategory>;

// 출처: 모든 데이터는 URL과 수집 시각을 보관하고, AI 수집분은 verified=false 로 표기한다.
export const RobotSource = z.object({
  url: z.string().url(),
  fetchedAt: z.string().datetime(), // ISO 8601
  verified: z.boolean(),
});
export type RobotSource = z.infer<typeof RobotSource>;

// 통합 Robot 스키마. 출처가 달라도 이 스키마로 정규화된다.
export const Robot = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  manufacturer: z.string().min(1),
  country: z.string().min(1), // ISO 국가명 또는 코드 (영문 원문 유지)
  year: z.number().int().min(1900).max(2100).optional(),
  category: RobotCategory,
  status: RobotStatus,
  height: z.number().positive().optional(), // cm
  weight: z.number().positive().optional(), // kg
  dof: z.number().int().positive().optional(), // 자유도(degrees of freedom)
  description: z.string().default(""),
  images: z.array(z.string().url()).default([]),
  sources: z.array(RobotSource).default([]),
});
export type Robot = z.infer<typeof Robot>;

// 배열 파싱 헬퍼 — 소스 어댑터에서 사용한다.
export const RobotArray = z.array(Robot);
