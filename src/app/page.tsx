import Link from "next/link";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import RobotGrid from "@/components/RobotGrid";
import SearchFilters from "@/components/SearchFilters";
import { getAllRobots } from "@/lib/robots/store";
import {
  availableCountries,
  searchRobots,
  type RobotFilters,
} from "@/lib/robots/search";
import type { RobotCategory, RobotStatus } from "@/lib/robots/types";

export default async function Home({
  searchParams,
}: {
  // Next.js 16: searchParams 는 Promise 다.
  searchParams: Promise<{
    q?: string;
    country?: string;
    category?: string;
    status?: string;
  }>;
}) {
  const t = await getTranslations();
  const params = await searchParams;

  const all = await getAllRobots();
  const filters: RobotFilters = {
    query: params.q,
    country: params.country,
    category: params.category as RobotCategory | undefined,
    status: params.status as RobotStatus | undefined,
  };
  const robots = searchRobots(all, filters);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{t("site.title")}</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            {t("site.tagline")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/guide"
            className="rounded-lg border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            {t("nav.guide")}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <section className="mb-6 flex flex-col gap-3">
        <SearchFilters countries={availableCountries(all)} />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("search.results", { count: robots.length })}
        </p>
      </section>

      <RobotGrid robots={robots} />
    </div>
  );
}
