"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setUserLocale } from "@/i18n/locale";
import { locales, type Locale } from "@/i18n/config";

// 언어 전환 UI. 쿠키에 로케일을 저장하고 페이지를 갱신한다.
export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={locale}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as Locale;
        startTransition(() => {
          setUserLocale(next);
        });
      }}
      aria-label={t("language.label")}
      className="rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {t(`language.${l}`)}
        </option>
      ))}
    </select>
  );
}
