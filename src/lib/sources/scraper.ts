import * as cheerio from "cheerio";
import { Robot } from "@/lib/robots/types";
import type { RobotSource } from "./types";

// ── robots.txt 처리 ────────────────────────────────────────────────
// 매우 단순한 robots.txt 파서. 우리 user-agent(또는 *)에 대한 지정 지시어 규칙을 모은다.
function parseRules(
  robotsTxt: string,
  directive: "disallow" | "allow",
  userAgent = "*",
): string[] {
  const lines = robotsTxt.split(/\r?\n/);
  const rules: string[] = [];
  let appliesToUs = false;

  for (const rawLine of lines) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const [field, ...rest] = line.split(":");
    const key = field.trim().toLowerCase();
    const value = rest.join(":").trim();

    if (key === "user-agent") {
      appliesToUs = value === "*" || value.toLowerCase() === userAgent.toLowerCase();
    } else if (key === directive && appliesToUs && value) {
      rules.push(value);
    }
  }
  return rules;
}

// 우리 user-agent(또는 *)에 대한 Disallow 규칙을 모은다.
export function parseDisallows(robotsTxt: string, userAgent = "*"): string[] {
  return parseRules(robotsTxt, "disallow", userAgent);
}

// 우리 user-agent(또는 *)에 대한 Allow 규칙을 모은다.
export function parseAllows(robotsTxt: string, userAgent = "*"): string[] {
  return parseRules(robotsTxt, "allow", userAgent);
}

// 경로가 robots.txt 규칙상 허용되는지 검사한다.
// Disallow 와 Allow 를 모두 보고, 더 긴(= 더 구체적인) 규칙을 우선한다(Google 스펙).
// 동점이면 Allow 우선, 매칭 규칙이 없으면 허용이 기본값이다.
export function isPathAllowed(
  robotsTxt: string,
  path: string,
  userAgent = "*",
): boolean {
  const disallows = parseDisallows(robotsTxt, userAgent);
  const allows = parseAllows(robotsTxt, userAgent);

  const longestMatch = (rules: string[]) =>
    rules
      .filter((rule) => path.startsWith(rule))
      .reduce((max, rule) => Math.max(max, rule.length), 0);

  const allowLen = longestMatch(allows);
  const disallowLen = longestMatch(disallows);

  if (allowLen === 0 && disallowLen === 0) return true;
  return allowLen >= disallowLen;
}

// ── rate limit ─────────────────────────────────────────────────────
// 연속 요청 사이에 최소 간격을 보장하는 단순 rate limiter.
export class RateLimiter {
  // 첫 호출은 대기하지 않도록 음의 무한대로 시작한다.
  private last = Number.NEGATIVE_INFINITY;
  constructor(
    private readonly minIntervalMs: number,
    // 테스트를 위해 시계/대기 함수를 주입 가능하게 한다.
    private readonly now: () => number = () => Date.now(),
    private readonly sleep: (ms: number) => Promise<void> = (ms) =>
      new Promise((r) => setTimeout(r, ms)),
  ) {}

  async wait(): Promise<void> {
    const elapsed = this.now() - this.last;
    const remaining = this.minIntervalMs - elapsed;
    if (remaining > 0) await this.sleep(remaining);
    this.last = this.now();
  }
}

// ── 정규화 ─────────────────────────────────────────────────────────
// 스크래핑 원본(부분 데이터)을 Robot 스키마로 정규화한다.
// 스크래핑/AI 수집분이므로 출처는 verified=false 로 표기한다.
export interface ScrapedRobot {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  year?: number;
  category?: Robot["category"];
  status?: Robot["status"];
  height?: number;
  weight?: number;
  dof?: number;
  description?: string;
  images?: string[];
  sourceUrl: string;
  fetchedAt?: string;
}

export function normalizeScraped(raw: ScrapedRobot): Robot {
  return Robot.parse({
    id: raw.id,
    name: raw.name,
    manufacturer: raw.manufacturer,
    country: raw.country,
    year: raw.year,
    category: raw.category ?? "general",
    status: raw.status ?? "concept",
    height: raw.height,
    weight: raw.weight,
    dof: raw.dof,
    description: raw.description ?? "",
    images: raw.images ?? [],
    sources: [
      {
        url: raw.sourceUrl,
        fetchedAt: raw.fetchedAt ?? new Date().toISOString(),
        // 스크래핑/AI 수집 결과는 사람이 승인하기 전까지 미검증
        verified: false,
      },
    ],
  });
}

// 위키피디아 infobox 스타일 HTML 에서 키-값을 추출하는 예시 파서.
// 실제 대상 사이트에 맞춰 확장한다. (cheerio 사용)
export function parseInfobox(html: string): Record<string, string> {
  const $ = cheerio.load(html);
  const result: Record<string, string> = {};
  $("table.infobox tr").each((_, tr) => {
    const key = $(tr).find("th").first().text().trim();
    const value = $(tr).find("td").first().text().trim();
    if (key && value) result[key.toLowerCase()] = value;
  });
  return result;
}

// ── 스크래퍼 소스 ───────────────────────────────────────────────────
export interface ScraperConfig {
  name: string;
  // 수집 대상 페이지 URL 목록
  targets: string[];
  // 각 페이지 HTML 을 ScrapedRobot 으로 변환하는 함수
  extract: (html: string, url: string) => ScrapedRobot | null;
  // 요청 사이 최소 간격(ms)
  rateLimitMs?: number;
  userAgent?: string;
  // 테스트를 위해 fetch 를 주입 가능
  fetchImpl?: typeof fetch;
}

// robots.txt 존중 + rate limit 을 적용해 대상들을 스크래핑하는 RobotSource.
export function createScraperSource(config: ScraperConfig): RobotSource {
  const fetchImpl = config.fetchImpl ?? fetch;
  const userAgent = config.userAgent ?? "HumanoidRobotDirectoryBot";
  const limiter = new RateLimiter(config.rateLimitMs ?? 1000);

  return {
    name: config.name,
    async load(): Promise<Robot[]> {
      const robots: Robot[] = [];
      // 호스트별 robots.txt 캐시
      const robotsCache = new Map<string, string>();

      for (const target of config.targets) {
        const url = new URL(target);
        const origin = url.origin;

        // robots.txt 확인
        if (!robotsCache.has(origin)) {
          try {
            await limiter.wait();
            const res = await fetchImpl(`${origin}/robots.txt`, {
              headers: { "user-agent": userAgent },
            });
            robotsCache.set(origin, res.ok ? await res.text() : "");
          } catch {
            robotsCache.set(origin, "");
          }
        }
        const robotsTxt = robotsCache.get(origin) ?? "";
        if (!isPathAllowed(robotsTxt, url.pathname, userAgent)) {
          // robots.txt 가 금지한 경로는 건너뛴다
          continue;
        }

        await limiter.wait();
        const res = await fetchImpl(target, {
          headers: { "user-agent": userAgent },
        });
        if (!res.ok) continue;
        const html = await res.text();
        const scraped = config.extract(html, target);
        if (scraped) robots.push(normalizeScraped(scraped));
      }

      return robots;
    },
  };
}
