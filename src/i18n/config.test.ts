import { describe, it, expect } from "vitest";
import {
  isLocale,
  normalizeLocale,
  defaultLocale,
  locales,
  LOCALE_COOKIE_MAX_AGE,
} from "./config";

describe("isLocale", () => {
  it("지원 로케일은 true", () => {
    for (const l of locales) expect(isLocale(l)).toBe(true);
  });

  it("비지원 값·비문자열은 false", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale(123)).toBe(false);
  });
});

describe("normalizeLocale", () => {
  it("유효한 로케일은 그대로 통과", () => {
    expect(normalizeLocale("en")).toBe("en");
    expect(normalizeLocale("ko")).toBe("ko");
  });

  it("없거나 잘못된 값은 기본 로케일", () => {
    expect(normalizeLocale(undefined)).toBe(defaultLocale);
    expect(normalizeLocale(null)).toBe(defaultLocale);
    expect(normalizeLocale("fr")).toBe(defaultLocale);
    expect(normalizeLocale("")).toBe(defaultLocale);
  });
});

describe("LOCALE_COOKIE_MAX_AGE", () => {
  it("세션이 아닌 장기 보존(약 1년)", () => {
    expect(LOCALE_COOKIE_MAX_AGE).toBe(60 * 60 * 24 * 365);
  });
});
