import Link from "next/link";
import { getTranslations } from "next-intl/server";

// 사이트 전역 404 — notFound() 또는 존재하지 않는 경로 접근 시 SiteHeader가 유지된 채 렌더된다.
export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-3 px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        404
      </p>
      <h1 className="text-2xl font-bold sm:text-3xl">
        {t("notFoundPage.title")}
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        {t("notFoundPage.description")}
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {t("notFoundPage.backHome")}
      </Link>
    </div>
  );
}
