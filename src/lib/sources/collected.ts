import { readFile } from "node:fs/promises";
import path from "node:path";
import { RobotArray, type Robot } from "@/lib/robots/types";
import type { RobotSource } from "./types";

// 스크래핑 + Claude Code 조사 결과 (커밋되는 JSON). 아직 없으면 빈 배열.
const COLLECTED_PATH = path.join(process.cwd(), "data", "robots.collected.json");

// 수집 결과 소스 어댑터. 파일이 없으면 빈 목록을 반환한다(선택적 소스).
export const collectedSource: RobotSource = {
  name: "collected",
  async load(): Promise<Robot[]> {
    try {
      const raw = await readFile(COLLECTED_PATH, "utf-8");
      return RobotArray.parse(JSON.parse(raw));
    } catch (err) {
      // 파일이 아직 없으면 정상 — 빈 목록
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw err;
    }
  },
};
