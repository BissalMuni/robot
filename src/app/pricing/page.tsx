import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { jsonLdString } from "@/lib/jsonld";
import {
  pricingEntries,
  basisLabel,
  cheapestEntry,
  filterByBasis,
  pricingItemListJsonLd,
  type PricingBasis,
} from "@/data/pricing";

// sitemap.ts·layout.ts 와 동일한 사이트 출처.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata = pageMetadata({
  title: "가격·구매 가이드 | 휴머노이드 로봇",
  description:
    "지금 실제로 구매·리스·구독할 수 있는 휴머노이드 로봇의 가격과 구매 방식을 출처와 함께 정리했습니다. Unitree R1·G1·H1, 1X NEO, Figure 03 등 공개 가격을 한눈에 비교하세요.",
  path: "/pricing",
});

// 구매 형태 배지 색상(zinc 테마 + 형태별 강조).
const basisClass: Record<string, string> = {
  purchase:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  lease: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  subscription:
    "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  contact: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

const TH = "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400";
const TD = "px-4 py-3 align-top text-sm text-zinc-700 dark:text-zinc-300";

// 구매 형태 필터 칩 순서.
const BASIS_ORDER: PricingBasis[] = ["purchase", "lease", "subscription", "contact"];

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ basis?: string }>;
}) {
  const { basis } = await searchParams;
  const entries = filterByBasis(pricingEntries, basis);
  const activeBasis = basis && basis in basisLabel ? basis : undefined;
  const cheapest = cheapestEntry(entries);
  const chipBase =
    "rounded-full border px-3 py-1 text-sm transition-colors";
  const chipInactive =
    "border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-300";
  const chipActive =
    "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100";
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">
      {/* 검색엔진 리치 결과용 구조화 데이터(schema.org ItemList) — 전체 목록 기준. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(pricingItemListJsonLd(pricingEntries, BASE_URL)),
        }}
      />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          가격·구매 가이드
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          휴머노이드 로봇을 &ldquo;지금 얼마에, 어떻게&rdquo; 확보할 수 있는지 공개 가격과
          구매 방식을 출처와 함께 모았습니다. 진입 가격이 낮은 순으로 정렬했습니다.
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          ※ 가격은 구성·지역·환율·시점에 따라 크게 달라지며, 각 수치는 표기된 출처의 확인 시점 기준입니다.
          본 사이트는 제휴 관계가 없습니다.
        </p>
        {cheapest && (
          <div className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm dark:border-emerald-900 dark:bg-emerald-950/40">
            <span className="text-zinc-500 dark:text-zinc-400">최저 진입가</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              {cheapest.model} · {cheapest.priceLabel}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500">
              ({entries.length}종)
            </span>
          </div>
        )}

        {/* 구매 형태 필터 — 창업자가 "바로 살 수 있는(구매)" 모델만 추리기 좋게. */}
        <nav aria-label="구매 형태 필터" className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/pricing"
            className={`${chipBase} ${activeBasis ? chipInactive : chipActive}`}
          >
            전체 <span className="ml-1 text-xs opacity-70">{pricingEntries.length}</span>
          </Link>
          {BASIS_ORDER.map((b) => {
            const count = pricingEntries.filter((e) => e.basis === b).length;
            if (count === 0) return null;
            return (
              <Link
                key={b}
                href={`/pricing?basis=${b}`}
                className={`${chipBase} ${activeBasis === b ? chipActive : chipInactive}`}
              >
                {basisLabel[b]} <span className="ml-1 text-xs opacity-70">{count}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60">
              <th scope="col" className={TH}>모델</th>
              <th scope="col" className={TH}>제조사 · 국가</th>
              <th scope="col" className={TH}>가격</th>
              <th scope="col" className={TH}>형태</th>
              <th scope="col" className={TH}>가용성</th>
              <th scope="col" className={TH}>출처</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, idx) => (
              <tr
                key={e.id}
                id={e.id}
                className={`scroll-mt-20 border-b border-zinc-100 dark:border-zinc-800/60 ${
                  idx % 2 === 0 ? "" : "bg-zinc-50/50 dark:bg-zinc-900/20"
                }`}
              >
                <td className={TD}>
                  {e.robotId ? (
                    <Link
                      href={`/robots/${e.robotId}`}
                      className="font-semibold text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                    >
                      {e.model}
                    </Link>
                  ) : (
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {e.model}
                    </div>
                  )}
                  {e.note && (
                    <p className="mt-1 max-w-xs text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {e.note}
                    </p>
                  )}
                </td>
                <td className={TD}>
                  {e.maker}
                  <span className="block text-xs text-zinc-400 dark:text-zinc-500">
                    {e.country}
                  </span>
                </td>
                <td className={`${TD} font-mono tabular-nums whitespace-nowrap`}>
                  {e.priceLabel}
                </td>
                <td className={TD}>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${basisClass[e.basis]}`}
                  >
                    {basisLabel[e.basis]}
                  </span>
                </td>
                <td className={`${TD} text-zinc-500 dark:text-zinc-400`}>
                  {e.availability}
                </td>
                <td className={TD}>
                  <ul className="flex flex-col gap-1">
                    {e.sources.map((s, i) => (
                      <li key={s.url}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                          title={s.url}
                        >
                          출처 {i + 1}
                          {s.verified ? " ✓" : ""}
                          <span className="sr-only"> (새 창에서 열림)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-600">
        ✓ 표시는 작성 시 출처 페이지를 직접 확인한 항목입니다. 구매 전 반드시 각 제조사 공식 채널에서 최신 가격·조건을 확인하세요.
      </p>
    </main>
  );
}
