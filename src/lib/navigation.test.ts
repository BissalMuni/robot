import { describe, it, expect } from "vitest";
import { NAV_ITEMS } from "./navigation";
import en from "@/i18n/messages/en.json";
import ko from "@/i18n/messages/ko.json";

// 중첩 객체의 모든 리프 키를 "a.b.c" 형태로 평탄화한다.
function flatKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    return v && typeof v === "object" && !Array.isArray(v)
      ? flatKeys(v as Record<string, unknown>, key)
      : [key];
  });
}

describe("NAV_ITEMS", () => {
  it("href 와 key 는 각각 중복이 없다", () => {
    const hrefs = NAV_ITEMS.map((i) => i.href);
    const keys = NAV_ITEMS.map((i) => i.key);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("모든 href 는 절대 경로이고 priority 는 0~1 이다", () => {
    for (const { href, priority } of NAV_ITEMS) {
      expect(href.startsWith("/")).toBe(true);
      expect(priority).toBeGreaterThanOrEqual(0);
      expect(priority).toBeLessThanOrEqual(1);
    }
  });

  it("모든 nav 항목의 라벨이 en/ko 양쪽에 존재한다", () => {
    for (const { key } of NAV_ITEMS) {
      expect(en.nav, `en.nav.${key}`).toHaveProperty(key);
      expect(ko.nav, `ko.nav.${key}`).toHaveProperty(key);
    }
  });
});

describe("i18n 메시지", () => {
  it("en 과 ko 의 키 집합이 완전히 일치한다", () => {
    const enKeys = flatKeys(en as Record<string, unknown>).sort();
    const koKeys = flatKeys(ko as Record<string, unknown>).sort();
    expect(enKeys).toEqual(koKeys);
  });
});
