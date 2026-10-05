import { describe, it, expect } from "vitest";
import { jsonLdString, breadcrumbJsonLd } from "./jsonld";

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
