"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export type ViewOption = { key: string; label: string };

export function ViewToggle({
  views,
  paramName = "view",
}: {
  views: ViewOption[];
  paramName?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const current = searchParams.get(paramName) ?? views[0].key;

  const setView = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, key);
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div
      role="group"
      aria-label="보기 방식 전환"
      className="flex gap-1 rounded-lg border border-zinc-200 p-1 dark:border-zinc-700"
    >
      {views.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setView(key)}
          aria-pressed={current === key}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            current === key
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
