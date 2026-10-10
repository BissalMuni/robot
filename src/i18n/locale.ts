"use server";

import { cookies } from "next/headers";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  normalizeLocale,
  type Locale,
} from "./config";

// 쿠키에서 사용자 로케일을 읽는다. 없거나 잘못된 값이면 기본 로케일.
export async function getUserLocale(): Promise<Locale> {
  const store = await cookies();
  return normalizeLocale(store.get(LOCALE_COOKIE)?.value);
}

// 언어 전환 시 쿠키에 로케일을 저장한다.
// 세션 쿠키가 아니라 1년 유지(maxAge) + 전체 경로로 저장해, 재방문·재시작 후에도 선택이 유지된다.
export async function setUserLocale(locale: Locale): Promise<void> {
  const store = await cookies();
  store.set(LOCALE_COOKIE, normalizeLocale(locale), {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}
