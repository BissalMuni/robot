// 지원 로케일 정의. i18n 라우팅 없이 쿠키로 로케일을 전환한다.
export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

// 쿠키 이름 (next-intl 관례)
export const LOCALE_COOKIE = "NEXT_LOCALE";
