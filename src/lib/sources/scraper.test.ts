import { describe, it, expect } from "vitest";
import {
  parseDisallows,
  isPathAllowed,
  ruleMatches,
  RateLimiter,
  normalizeScraped,
  parseInfobox,
  createScraperSource,
} from "./scraper";

describe("robots.txt 파싱", () => {
  const txt = `
User-agent: *
Disallow: /private
Disallow: /tmp

User-agent: BadBot
Disallow: /
`;

  it("* 에 대한 Disallow 규칙을 모은다", () => {
    expect(parseDisallows(txt)).toEqual(["/private", "/tmp"]);
  });

  it("허용/금지 경로를 판단한다", () => {
    expect(isPathAllowed(txt, "/robots/atlas")).toBe(true);
    expect(isPathAllowed(txt, "/private/x")).toBe(false);
  });

  it("특정 user-agent 규칙을 적용한다", () => {
    expect(isPathAllowed(txt, "/anything", "BadBot")).toBe(false);
  });
});

describe("isPathAllowed — Allow 규칙", () => {
  it("Disallow:/ + Allow:/robots/ → /robots/ 하위는 허용", () => {
    const txt = "User-agent: *\nDisallow: /\nAllow: /robots/\n";
    expect(isPathAllowed(txt, "/robots/atlas-info")).toBe(true);
    expect(isPathAllowed(txt, "/private/page")).toBe(false);
  });

  it("더 긴 Disallow 규칙이 짧은 Allow보다 우선", () => {
    const txt = "User-agent: *\nAllow: /public/\nDisallow: /public/secret/\n";
    expect(isPathAllowed(txt, "/public/open")).toBe(true);
    expect(isPathAllowed(txt, "/public/secret/doc")).toBe(false);
  });

  it("매칭 규칙이 없으면 허용", () => {
    const txt = "User-agent: *\nDisallow: /admin/\n";
    expect(isPathAllowed(txt, "/robots/index")).toBe(true);
  });

  it("동점 시 Allow 우선 (Google 스펙)", () => {
    const txt = "User-agent: *\nDisallow: /page\nAllow: /page\n";
    expect(isPathAllowed(txt, "/page")).toBe(true);
  });
});

describe("ruleMatches — 와일드카드/앵커 (Google 스펙)", () => {
  it("와일드카드가 없으면 리터럴 접두 일치(기존 동작)", () => {
    expect(ruleMatches("/private/x", "/private")).toBe(true);
    expect(ruleMatches("/public", "/private")).toBe(false);
  });

  it("'*' 는 임의의 문자열(빈 문자열 포함)에 매칭된다", () => {
    expect(ruleMatches("/files/report.pdf", "/*.pdf")).toBe(true);
    expect(ruleMatches("/report.pdf", "/*.pdf")).toBe(true);
    expect(ruleMatches("/files/report.html", "/*.pdf")).toBe(false);
    expect(ruleMatches("/ab", "/a*b")).toBe(true); // '*' 는 빈 문자열에도 매칭
  });

  it("끝의 '$' 는 경로의 끝에 고정한다", () => {
    expect(ruleMatches("/index.php", "/*.php$")).toBe(true);
    // 쿼리스트링이 붙으면 '.php' 로 끝나지 않으므로 매칭 안 됨
    expect(ruleMatches("/index.php?id=1", "/*.php$")).toBe(false);
  });

  it("정규식 특수문자는 리터럴로 이스케이프된다", () => {
    expect(ruleMatches("/a.b/c", "/a.b*")).toBe(true);
    // '.' 가 임의 문자가 아니라 리터럴이어야 한다
    expect(ruleMatches("/axb/c", "/a.b*")).toBe(false);
  });
});

describe("isPathAllowed — 와일드카드 규칙", () => {
  it("Disallow 와일드카드로 특정 확장자를 차단한다", () => {
    const txt = "User-agent: *\nDisallow: /*.pdf$\n";
    expect(isPathAllowed(txt, "/docs/manual.pdf")).toBe(false);
    expect(isPathAllowed(txt, "/docs/manual.html")).toBe(true);
  });

  it("더 구체적인(긴) Allow 와일드카드가 Disallow 를 이긴다", () => {
    const txt = "User-agent: *\nDisallow: /assets/\nAllow: /assets/*.css\n";
    expect(isPathAllowed(txt, "/assets/app.css")).toBe(true);
    expect(isPathAllowed(txt, "/assets/secret.key")).toBe(false);
  });
});

describe("RateLimiter", () => {
  it("최소 간격만큼 대기한다", async () => {
    let clock = 0;
    const sleeps: number[] = [];
    const limiter = new RateLimiter(
      1000,
      () => clock,
      async (ms) => {
        sleeps.push(ms);
        clock += ms; // 잠든 만큼 시간 경과
      },
    );

    await limiter.wait(); // 첫 호출은 대기 없음
    clock += 200; // 200ms 만 경과
    await limiter.wait(); // 800ms 더 대기해야 함
    expect(sleeps).toEqual([800]);
  });
});

describe("normalizeScraped", () => {
  it("부분 데이터를 Robot 으로 정규화하고 verified=false 로 표기한다", () => {
    const robot = normalizeScraped({
      id: "x",
      name: "X",
      manufacturer: "Acme",
      country: "US",
      sourceUrl: "https://example.com/x",
    });
    expect(robot.category).toBe("general");
    expect(robot.status).toBe("concept");
    expect(robot.sources).toHaveLength(1);
    expect(robot.sources[0].verified).toBe(false);
  });
});

describe("parseInfobox (cheerio)", () => {
  it("infobox 표에서 키-값을 추출한다", () => {
    const html = `
      <table class="infobox">
        <tr><th>Manufacturer</th><td>Boston Dynamics</td></tr>
        <tr><th>Country</th><td>United States</td></tr>
      </table>`;
    const data = parseInfobox(html);
    expect(data["manufacturer"]).toBe("Boston Dynamics");
    expect(data["country"]).toBe("United States");
  });
});

describe("createScraperSource", () => {
  it("robots.txt 를 존중하고 허용된 페이지만 수집한다", async () => {
    const fetchImpl = (async (input: string | URL | Request) => {
      const url = String(input);
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: *\nDisallow: /blocked");
      }
      if (url.includes("/blocked")) {
        return new Response("<html>should not be fetched</html>");
      }
      return new Response(`<html><h1>Robot</h1></html>`);
    }) as typeof fetch;

    const source = createScraperSource({
      name: "test",
      targets: ["https://site.test/robots/ok", "https://site.test/blocked/x"],
      rateLimitMs: 0,
      fetchImpl,
      extract: (_html, url) => ({
        id: url.split("/").pop()!,
        name: "Robot",
        manufacturer: "M",
        country: "US",
        sourceUrl: url,
      }),
    });

    const robots = await source.load();
    // /blocked 경로는 robots.txt 로 제외되어 1개만 수집
    expect(robots).toHaveLength(1);
    expect(robots[0].id).toBe("ok");
    expect(robots[0].sources[0].verified).toBe(false);
  });
});
