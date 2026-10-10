// 지원 로케일 정의. i18n 라우팅 없이 쿠키로 로케일을 전환한다.
export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

// 쿠키 이름 (next-intl 관례)
export const LOCALE_COOKIE = "NEXT_LOCALE";

// 로케일 쿠키 유지 기간(초). 1년 — 세션이 아니라 장기 보존해 재방문 시 선택이 유지된다.
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// 값이 지원 로케일인지 좁혀 준다(타입 가드).
export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (locales as readonly string[]).includes(value)
  );
}

// 신뢰할 수 없는 값을 안전한 Locale 로 정규화한다. 아니면 기본 로케일.
export function normalizeLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}
