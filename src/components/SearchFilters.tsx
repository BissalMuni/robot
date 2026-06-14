"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

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

// 텍스트 입력 디바운스 간격(ms). 키 입력마다 URL 교체/서버 재렌더를 막는다.
const QUERY_DEBOUNCE_MS = 300;

// 검색/필터 UI. URL 쿼리스트링을 갱신해 서버 컴포넌트 목록을 재렌더한다.
export default function SearchFilters({ countries }: { countries: string[] }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // 텍스트 입력은 즉시 반응(타이핑 표시)을 위해 로컬 상태로 관리하고,
  // URL 갱신만 디바운스한다. 컨트롤드 입력에 디바운스를 직접 걸면 타이핑이 끊긴다.
  const queryParam = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(queryParam);
  const [prevParam, setPrevParam] = useState(queryParam);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // URL 의 q 가 바뀌면 입력값을 동기화한다(뒤로/앞으로·외부 링크 대응).
  // 렌더 중 setState 로 즉시 반영한다 — effect 를 쓰면 cascading render 가 발생한다.
  // 디바운스는 키 입력마다 타이머를 리셋해 항상 "최신값"만 push 하므로,
  // 자체 입력으로 q 가 갱신될 땐 이미 query 와 같아(no-op) 타이핑이 잘리지 않는다.
  if (queryParam !== prevParam) {
    setPrevParam(queryParam);
    setQuery(queryParam);
  }

  // 컴포넌트 언마운트 시 대기 중인 타이머 정리.
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

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

  // 텍스트 입력: 로컬 상태는 즉시 갱신, URL 교체는 300ms 디바운스.
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setParam("q", value), QUERY_DEBOUNCE_MS);
  };

  const selectClass =
    "rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      data-pending={isPending ? "" : undefined}
    >
      <input
        type="search"
        value={query}
        placeholder={t("search.placeholder")}
        onChange={handleQueryChange}
        className={`${selectClass} flex-1 sm:min-w-64`}
        aria-label={t("search.placeholder")}
      />

      <select
        value={searchParams.get("country") ?? ""}
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
        value={searchParams.get("category") ?? ""}
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
        value={searchParams.get("status") ?? ""}
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
