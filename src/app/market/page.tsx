import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { marketForecasts, type MarketForecast } from "@/data/market";

// 창업 리서치 동선: 시장 전망 → 가격 → 공급사 → 통계로 이어지는 관련 페이지.
const RELATED = [
  { href: "/pricing", label: "가격·구매" },
  { href: "/suppliers", label: "부품 공급사" },
  { href: "/parts", label: "부품 가이드" },
  { href: "/stats", label: "카탈로그 통계" },
];

export const metadata = pageMetadata({
  title: "시장 전망 | 휴머노이드 로봇",
  description:
    "주요 금융기관이 내놓은 휴머노이드 로봇 시장 규모·대수 전망을 출처와 함께 정리했습니다. Goldman Sachs(2035년 ~US$138B), Morgan Stanley(2050년 ~US$5조) 등 창업·투자 판단에 필요한 숫자를 한눈에.",
  path: "/market",
});

function ForecastCard({ forecast }: { forecast: MarketForecast }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {forecast.source}
        </h2>
        <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {forecast.targetYear}년
        </span>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">시장 규모</p>
          <p className="font-mono text-lg font-semibold text-emerald-700 dark:text-emerald-300">
            {forecast.marketLabel}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">대수</p>
          <p className="font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {forecast.unitsLabel}
          </p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {forecast.summary}
      </p>
      <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1">
        {forecast.sources.map((s, i) => (
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
    </div>
  );
}

export default function MarketPage() {
  const forecasts = [...marketForecasts].sort(
    (a, b) => a.targetYear - b.targetYear,
  );

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          시장 전망
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          휴머노이드 로봇 시장이 얼마나 커질지에 대한 주요 금융기관의 공개 전망을 모았습니다.
          창업·투자 타이밍과 규모 감을 잡는 참고 자료입니다.
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          ※ 전망치는 기관·시장 정의·시점에 따라 편차가 큽니다. ✓ 는 작성 시 출처를 직접 확인한 항목입니다.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {forecasts.map((f) => (
          <ForecastCard key={f.id} forecast={f} />
        ))}
      </div>

      {/* 창업 리서치 동선 — 관련 자료로 이어가기. */}
      <nav aria-label="관련 자료" className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          관련 자료
        </h2>
        <div className="flex flex-wrap gap-2">
          {RELATED.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {r.label} →
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
