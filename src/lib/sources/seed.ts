import { readFile } from "node:fs/promises";
import path from "node:path";
import { RobotArray, type Robot } from "@/lib/robots/types";
import type { RobotSource } from "./types";

// 수동 큐레이션 시드 JSON 경로
const SEED_PATH = path.join(process.cwd(), "data", "robots.seed.json");

// JSON 문자열을 파싱·검증해 Robot[] 으로 정규화한다. (테스트용으로 분리)
export function parseRobots(raw: string): Robot[] {
  return RobotArray.parse(JSON.parse(raw));
}

// 시드 소스 어댑터: data/robots.seed.json 을 로드하고 스키마로 검증한다.
export const seedSource: RobotSource = {
  name: "seed",
  async load(): Promise<Robot[]> {
    const raw = await readFile(SEED_PATH, "utf-8");
    return parseRobots(raw);
  },
};
