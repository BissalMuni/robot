import { describe, it, expect } from "vitest";
import {
  jsonLdString,
  breadcrumbJsonLd,
  websiteJsonLd,
  organizationJsonLd,
  SITE_NAME,
} from "./jsonld";

describe("jsonLdString", () => {
  it("유효한 JSON 이며 '<' 를 이스케이프한다(script 조기 종료 방지)", () => {
    const str = jsonLdString({ a: "</script><b>" });
    expect(str).not.toContain("</script>");
    expect(str).toContain("\\u003c");
    expect(JSON.parse(str).a).toBe("</script><b>");
  });
});

describe("breadcrumbJsonLd", () => {
  const crumbs = [
    { name: "홈", path: "/" },
    { name: "Atlas", path: "/robots/atlas" },
  ];

  it("BreadcrumbList 구조와 1부터 매긴 position/절대 URL 을 만든다", () => {
    const ld = breadcrumbJsonLd(crumbs, "https://x.com");
    expect(ld["@type"]).toBe("BreadcrumbList");
    expect(ld.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "홈", item: "https://x.com/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Atlas",
        item: "https://x.com/robots/atlas",
      },
    ]);
  });

  it("baseUrl 끝 슬래시를 정리해 중복 슬래시를 막는다", () => {
    const ld = breadcrumbJsonLd([{ name: "홈", path: "/" }], "https://x.com/");
    const [first] = ld.itemListElement as { item: string }[];
    expect(first.item).toBe("https://x.com/");
  });
});

describe("websiteJsonLd", () => {
  it("WebSite + SearchAction 구조를 만들고 홈 검색(?q=)을 선언한다", () => {
    const ld = websiteJsonLd("https://x.com");
    expect(ld["@type"]).toBe("WebSite");
    expect(ld.name).toBe(SITE_NAME);
    expect(ld.url).toBe("https://x.com/");
    const action = ld.potentialAction as {
      "@type": string;
      target: { "@type": string; urlTemplate: string };
      "query-input": string;
    };
    expect(action["@type"]).toBe("SearchAction");
    expect(action.target.urlTemplate).toBe(
      "https://x.com/?q={search_term_string}",
    );
    // urlTemplate 의 플레이스홀더와 query-input 의 이름은 일치해야 한다(schema.org 규약).
    expect(action["query-input"]).toBe("required name=search_term_string");
  });

  it("baseUrl 끝 슬래시를 정리해 중복 슬래시를 막는다", () => {
    const ld = websiteJsonLd("https://x.com/");
    expect(ld.url).toBe("https://x.com/");
    const action = ld.potentialAction as {
      target: { urlTemplate: string };
    };
    expect(action.target.urlTemplate).toBe(
      "https://x.com/?q={search_term_string}",
    );
  });
});

describe("organizationJsonLd", () => {
  it("Organization 구조를 만든다", () => {
    const ld = organizationJsonLd("https://x.com/");
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Organization");
    expect(ld.name).toBe(SITE_NAME);
    expect(ld.url).toBe("https://x.com/");
  });
});
