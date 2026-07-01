"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";

const SORT_OPTIONS = [
  { value: "status", label: "상태순 (기본)" },
  { value: "year_desc", label: "최신순" },
  { value: "year_asc", label: "오래된 순" },
  { value: "speed_desc", label: "속도 빠른 순" },
  { value: "weight_asc", label: "무게 가벼운 순" },
  { value: "weight_desc", label: "무게 무거운 순" },
  { value: "height_asc", label: "키 작은 순" },
  { value: "height_desc", label: "키 큰 순" },
  { value: "payload_desc", label: "하중 큰 순" },
  { value: "dof_desc", label: "자유도 많은 순" },
] as const;

export function CompareControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSort = searchParams.get("sort") ?? "status";
  const currentQ = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(currentQ);
  const [syncedQ, setSyncedQ] = useState(currentQ);
  if (currentQ !== syncedQ) {
    setSyncedQ(currentQ);
    setInputValue(currentQ);
  }

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: inputValue.trim() });
  };

  const handleClear = () => {
    setInputValue("");
    updateParams({ q: "" });
  };

  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
      {/* 검색 */}
      <form onSubmit={handleSearch} className="flex flex-1 gap-2">
        <input
          type="search"
          placeholder="모델명·제조사 검색..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder-zinc-500"
        />
        <button
          type="submit"
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-300"
        >
          검색
        </button>
        {currentQ && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:text-zinc-400"
          >
            초기화
          </button>
        )}
      </form>

      {/* 정렬 */}
      <select
        value={currentSort}
        onChange={(e) => updateParams({ sort: e.target.value })}
        aria-label="정렬 기준"
        className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
