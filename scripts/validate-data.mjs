/**
 * 데이터 검증 워크플로우: data/robots.seed.json 과 data/robots.collected.json 이
 * Robot 스키마 불변식(src/lib/robots/types.ts)을 만족하는지 의존성 없이 검증한다.
 *
 * 실행: node scripts/validate-data.mjs
 *
 * pnpm/zod 없이도 CI·오프라인에서 데이터 무결성을 빠르게 점검하기 위한 순수 Node 스크립트.
 * 스키마를 바꾸면 아래 규칙도 함께 갱신할 것.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const FILES = [
  path.join(ROOT, "data", "robots.seed.json"),
  path.join(ROOT, "data", "robots.collected.json"),
];

const CATEGORIES = new Set([
  "general",
  "industrial",
  "service",
  "research",
  "entertainment",
  "logistics",
  "healthcare",
]);
const STATUSES = new Set(["research", "commercial", "concept"]);

const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

const isNonEmptyString = (v) => typeof v === "string" && v.length > 0;
const isValidUrl = (v) => {
  if (typeof v !== "string") return false;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
};
// ISO 8601 datetime (zod .datetime() 은 오프셋 없는 UTC 형식을 기대)
const isIsoDatetime = (v) =>
  typeof v === "string" && !Number.isNaN(Date.parse(v)) && /\d{4}-\d{2}-\d{2}T/.test(v);
const isPositiveNumber = (v) => typeof v === "number" && Number.isFinite(v) && v > 0;
const isIntInRange = (v, min, max) =>
  typeof v === "number" && Number.isInteger(v) && v >= min && v <= max;

function validateRobot(robot, where) {
  for (const key of ["id", "name", "manufacturer", "country"]) {
    if (!isNonEmptyString(robot[key])) err(where, `${key} 는 비어있지 않은 문자열이어야 함`);
  }
  if (robot.year !== undefined && !isIntInRange(robot.year, 1900, 2100))
    err(where, `year 는 1900~2100 정수여야 함 (got ${robot.year})`);
  if (!CATEGORIES.has(robot.category)) err(where, `category 값이 유효하지 않음 (${robot.category})`);
  if (!STATUSES.has(robot.status)) err(where, `status 값이 유효하지 않음 (${robot.status})`);
  if (robot.height !== undefined && !isPositiveNumber(robot.height))
    err(where, `height 는 양수여야 함 (${robot.height})`);
  if (robot.weight !== undefined && !isPositiveNumber(robot.weight))
    err(where, `weight 는 양수여야 함 (${robot.weight})`);
  if (robot.dof !== undefined && !(isPositiveNumber(robot.dof) && Number.isInteger(robot.dof)))
    err(where, `dof 는 양의 정수여야 함 (${robot.dof})`);
  if (robot.description !== undefined && typeof robot.description !== "string")
    err(where, `description 은 문자열이어야 함`);
  if (robot.images !== undefined) {
    if (!Array.isArray(robot.images)) err(where, `images 는 배열이어야 함`);
    else robot.images.forEach((u, i) => !isValidUrl(u) && err(where, `images[${i}] 가 유효한 URL 아님 (${u})`));
  }
  if (robot.sources !== undefined) {
    if (!Array.isArray(robot.sources)) err(where, `sources 는 배열이어야 함`);
    else
      robot.sources.forEach((s, i) => {
        if (!s || typeof s !== "object") return err(where, `sources[${i}] 가 객체 아님`);
        if (!isValidUrl(s.url)) err(where, `sources[${i}].url 이 유효한 URL 아님 (${s.url})`);
        if (!isIsoDatetime(s.fetchedAt))
          err(where, `sources[${i}].fetchedAt 이 ISO 8601 아님 (${s.fetchedAt})`);
        if (typeof s.verified !== "boolean")
          err(where, `sources[${i}].verified 가 boolean 아님 (${s.verified})`);
      });
  }
}

async function main() {
  const seenIds = new Map(); // id -> 최초 파일
  let total = 0;

  for (const file of FILES) {
    const rel = path.relative(ROOT, file);
    let data;
    try {
      data = JSON.parse(await readFile(file, "utf-8"));
    } catch (e) {
      err(rel, `읽기/파싱 실패: ${e.message}`);
      continue;
    }
    if (!Array.isArray(data)) {
      err(rel, "최상위가 배열이 아님");
      continue;
    }
    data.forEach((robot, i) => {
      const where = `${rel}[${i}]${robot?.id ? ` id=${robot.id}` : ""}`;
      validateRobot(robot, where);
      // 파일 간 id 중복은 mergeRobots 가 덮어쓰므로 경고로만 표기
      if (robot?.id) {
        if (seenIds.has(robot.id))
          err(where, `id 중복 (이미 ${seenIds.get(robot.id)} 에 존재 — 머지 시 덮어써짐)`);
        else seenIds.set(robot.id, rel);
      }
      total++;
    });
  }

  console.log(`검증 대상: ${total} robots (unique id ${seenIds.size})`);
  if (errors.length === 0) {
    console.log("✅ 모든 데이터가 Robot 스키마를 만족합니다.");
    process.exit(0);
  }
  console.error(`❌ ${errors.length} 건의 문제 발견:`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

main();
