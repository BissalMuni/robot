import { describe, it, expect } from "vitest";
import { pageMetadata } from "./seo";

describe("pageMetadata", () => {
  const meta = pageMetadata({
    title: "용어집 | 휴머노이드 로봇",
    description: "설명",
    path: "/glossary",
  });

  it("title·description 을 그대로 전달한다", () => {
    expect(meta.title).toBe("용어집 | 휴머노이드 로봇");
    expect(meta.description).toBe("설명");
  });

  it("canonical 을 path 로 설정한다", () => {
    expect(meta.alternates?.canonical).toBe("/glossary");
  });

  it("OpenGraph 에 title·description·url·type 을 채운다", () => {
    expect(meta.openGraph?.title).toBe("용어집 | 휴머노이드 로봇");
    expect(meta.openGraph?.description).toBe("설명");
    expect(meta.openGraph).toMatchObject({ url: "/glossary", type: "website" });
  });
});
