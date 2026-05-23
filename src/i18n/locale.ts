"use server";

import { cookies } from "next/headers";
import { defaultLocale, locales, LOCALE_COOKIE, type Locale } from "./config";

// 쿠키에서 사용자 로케일을 읽는다. 없거나 잘못된 값이면 기본 로케일.
export async function getUserLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

// 언어 전환 시 쿠키에 로케일을 저장한다.
export async function setUserLocale(locale: Locale): Promise<void> {
  const store = await cookies();
  store.set(LOCALE_COOKIE, locale);
}
