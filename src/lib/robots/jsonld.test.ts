import { describe, it, expect } from "vitest";
import {
  robotJsonLd,
  robotJsonLdString,
  robotListJsonLd,
  robotListJsonLdString,
} from "./jsonld";
import type { Robot } from "./types";

function robot(p: Partial<Robot> & Pick<Robot, "id" | "name">): Robot {
  return {
    manufacturer: "M",
    country: "US",
    category: "general",
    status: "concept",
    description: "",
    images: [],
    sources: [],
    ...p,
  };
}

describe("robotJsonLd", () => {
  it("기본 schema.org Product 구조를 만든다", () => {
    const ld = robotJsonLd(robot({ id: "1", name: "Atlas", manufacturer: "BD" }));
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Product");
    expect(ld.name).toBe("Atlas");
    expect(ld.brand).toEqual({ "@type": "Brand", name: "BD" });
    expect(ld.countryOfOrigin).toBe("US");
  });

  it("스펙이 있으면 additionalProperty 로 단위와 함께 담는다", () => {
    const ld = robotJsonLd(
      robot({ id: "1", name: "Atlas", height: 150, weight: 89, dof: 28, year: 2024 }),
    );
    const props = ld.additionalProperty as {
      name: string;
      value: number;
      unitCode?: string;
    }[];
    expect(props).toContainEqual({
      "@type": "PropertyValue",
      name: "Height",
      value: 150,
      unitCode: "CMT",
    });
    expect(props).toContainEqual({
      "@type": "PropertyValue",
      name: "Weight",
      value: 89,
      unitCode: "KGM",
    });
    expect(props.map((p) => p.name)).toEqual(
      expect.arrayContaining(["Year", "Degrees of freedom"]),
    );
  });

  it("선택 필드가 없으면 해당 키를 생략한다", () => {
    const ld = robotJsonLd(robot({ id: "1", name: "X" }));
    expect(ld).not.toHaveProperty("description"); // 빈 문자열
    expect(ld).not.toHaveProperty("image"); // 이미지 없음
    expect(ld).not.toHaveProperty("additionalProperty"); // 스펙 없음
  });

  it("이미지가 있으면 image 배열을 담는다", () => {
    const ld = robotJsonLd(
      robot({ id: "1", name: "X", images: ["https://x.com/a.jpg"] }),
    );
    expect(ld.image).toEqual(["https://x.com/a.jpg"]);
  });
});

describe("robotListJsonLd", () => {
  const list = [
    robot({ id: "a", name: "Alpha" }),
    robot({ id: "b", name: "Beta" }),
  ];

  it("ItemList 구조와 1부터 매긴 position 을 만든다", () => {
    const ld = robotListJsonLd(list, "https://x.com");
    expect(ld["@type"]).toBe("ItemList");
    expect(ld.numberOfItems).toBe(2);
    expect(ld.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        url: "https://x.com/robots/a",
        name: "Alpha",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://x.com/robots/b",
        name: "Beta",
      },
    ]);
  });

  it("baseUrl 끝 슬래시를 정리해 중복 슬래시를 막는다", () => {
    const ld = robotListJsonLd([robot({ id: "a", name: "A" })], "https://x.com/");
    const [first] = ld.itemListElement as { url: string }[];
    expect(first.url).toBe("https://x.com/robots/a");
  });

  it("빈 목록이면 numberOfItems 0 과 빈 배열", () => {
    const ld = robotListJsonLd([], "https://x.com");
    expect(ld.numberOfItems).toBe(0);
    expect(ld.itemListElement).toEqual([]);
  });
});

describe("robotListJsonLdString", () => {
  it("유효한 JSON 이며 '<' 를 이스케이프한다", () => {
    const str = robotListJsonLdString(
      [robot({ id: "a", name: "</script>" })],
      "https://x.com",
    );
    expect(str).not.toContain("</script>");
    expect(str).toContain("\\u003c");
    expect(JSON.parse(str)["@type"]).toBe("ItemList");
  });
});

describe("robotJsonLdString", () => {
  it("유효한 JSON 이며 '<' 를 이스케이프한다(script 조기 종료 방지)", () => {
    const str = robotJsonLdString(
      robot({ id: "1", name: "</script><b>hax", manufacturer: "M" }),
    );
    expect(str).not.toContain("</script>");
    expect(str).toContain("\\u003c");
    // 이스케이프해도 여전히 파싱 가능한 JSON 이어야 한다.
    expect(JSON.parse(str).name).toBe("</script><b>hax");
  });
});
