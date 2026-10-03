import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RobotGrid from "@/components/RobotGrid";
import SearchFilters from "@/components/SearchFilters";
import { getAllRobots } from "@/lib/robots/store";
import {
  availableCountries,
  parseRobotFilters,
  searchRobots,
} from "@/lib/robots/search";
import { robotListJsonLdString } from "@/lib/robots/jsonld";

// sitemap.ts·layout.ts 와 동일한 사이트 출처를 사용한다.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// 검색·필터는 ?q=·?category= 등 수많은 URL 변형을 만든다.
// 모두 루트(/)로 canonical 을 고정해 중복 콘텐츠 색인을 막는다.
// (제목·설명은 루트 레이아웃 기본값을 상속한다.)
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
  const filters = parseRobotFilters(params);
  const robots = searchRobots(all, filters);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      {/* 검색엔진이 카탈로그 목록을 이해하도록 돕는 구조화 데이터(schema.org ItemList) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: robotListJsonLdString(robots, BASE_URL),
        }}
      />
      <header className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">{t("site.title")}</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          {t("site.tagline")}
        </p>
      </header>

      <section className="mb-6 flex flex-col gap-3">
        <SearchFilters countries={availableCountries(all)} />
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-zinc-500 dark:text-zinc-400"
        >
          {t("search.results", { count: robots.length })}
        </p>
      </section>

      <RobotGrid robots={robots} />
    </div>
  );
}
