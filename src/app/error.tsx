"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

// 사이트 전역 에러 경계 — error.tsx는 클라이언트 컴포넌트여야 한다(Next.js 요구사항).
// 루트 레이아웃(SiteHeader 등)은 이 경계 바깥이라 계속 유지된다.
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-3 px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Error
      </p>
      <h1 className="text-2xl font-bold sm:text-3xl">
        {t("errorPage.title")}
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        {t("errorPage.description")}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {t("errorPage.retry")}
      </button>
    </div>
  );
}
