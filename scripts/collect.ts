/**
 * 수집 스크립트: 스크래퍼 어댑터를 실행해 결과를 data/robots.collected.json 에 저장한다.
 *
 * 실행: pnpm collect
 *
 * - 기존 collected.json 의 항목(특히 Claude Code 가 큐레이션 시점에 직접 추가한
 *   AI 조사 항목)을 보존하면서, 스크래퍼가 다시 수집한 항목만 id 기준으로 갱신한다.
 * - 모든 수집/AI 항목의 출처는 verified=false 로 표기된다(사람 승인 전).
 *
 * 스크래핑 대상은 robots.txt 를 존중하고 rate limit 을 적용한다(scraper.ts 참고).
 * 기본 targets 는 비어 있으므로, 실제 대상은 아래 SCRAPERS 에 추가한다.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { RobotArray, type Robot } from "@/lib/robots/types";
import { mergeRobots } from "@/lib/robots/store";
import type { RobotSource } from "@/lib/sources/types";
// 실제 스크래핑 대상을 추가할 때 사용한다:
// import { createScraperSource } from "@/lib/sources/scraper";

const COLLECTED_PATH = path.join(process.cwd(), "data", "robots.collected.json");

// 실제 스크래핑 대상을 여기에 등록한다. (예시 — 대상이 정해지면 targets/extract 작성)
const SCRAPERS: RobotSource[] = [
  // createScraperSource({
  //   name: "wikipedia",
  //   targets: ["https://en.wikipedia.org/wiki/..."],
  //   rateLimitMs: 1500,
  //   extract: (html, url) => { ... },
  // }),
];

async function readExisting(): Promise<Robot[]> {
  try {
    const raw = await readFile(COLLECTED_PATH, "utf-8");
    return RobotArray.parse(JSON.parse(raw));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function main() {
  const existing = await readExisting();
  const scraped = (await Promise.all(SCRAPERS.map((s) => s.load()))).flat();

  // 기존(AI 큐레이션 포함) + 새 스크래핑 결과를 머지한다.
  const merged = mergeRobots([existing, scraped]);

  await mkdir(path.dirname(COLLECTED_PATH), { recursive: true });
  await writeFile(COLLECTED_PATH, JSON.stringify(merged, null, 2) + "\n", "utf-8");

  console.log(
    `collected ${merged.length} robots (${scraped.length} scraped, ${existing.length} existing) → ${COLLECTED_PATH}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
