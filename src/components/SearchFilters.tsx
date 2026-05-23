"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

const CATEGORIES = [
  "general",
  "industrial",
  "service",
  "research",
  "entertainment",
  "logistics",
  "healthcare",
] as const;

const STATUSES = ["research", "commercial", "concept"] as const;

// 검색/필터 UI. URL 쿼리스트링을 갱신해 서버 컴포넌트 목록을 재렌더한다.
export default function SearchFilters({ countries }: { countries: string[] }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // 단일 파라미터를 갱신/삭제하고 URL 을 교체한다.
  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams],
  );

  const selectClass =
    "rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      data-pending={isPending ? "" : undefined}
    >
      <input
        type="search"
        defaultValue={searchParams.get("q") ?? ""}
        placeholder={t("search.placeholder")}
        onChange={(e) => setParam("q", e.target.value)}
        className={`${selectClass} flex-1 sm:min-w-64`}
        aria-label={t("search.placeholder")}
      />

      <select
        defaultValue={searchParams.get("country") ?? ""}
        onChange={(e) => setParam("country", e.target.value)}
        className={selectClass}
        aria-label={t("search.country")}
      >
        <option value="">{`${t("search.country")}: ${t("search.all")}`}</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("category") ?? ""}
        onChange={(e) => setParam("category", e.target.value)}
        className={selectClass}
        aria-label={t("search.category")}
      >
        <option value="">{`${t("search.category")}: ${t("search.all")}`}</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {t(`category.${c}`)}
          </option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("status") ?? ""}
        onChange={(e) => setParam("status", e.target.value)}
        className={selectClass}
        aria-label={t("search.status")}
      >
        <option value="">{`${t("search.status")}: ${t("search.all")}`}</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {t(`status.${s}`)}
          </option>
        ))}
      </select>
    </div>
  );
}
