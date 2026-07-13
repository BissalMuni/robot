import Link from "next/link";
import { PartCategory } from "@/data/parts";

const COUNTRY_LABEL: Record<string, string> = {
  KR: "🇰🇷 국내",
  US: "🇺🇸 미국",
  CN: "🇨🇳 중국",
  JP: "🇯🇵 일본",
  DE: "🇩🇪 독일",
  NL: "🇳🇱 네덜란드",
  CH: "🇨🇭 스위스",
  GLOBAL: "🌐 글로벌",
};

export function PartCard({ part }: { part: PartCategory }) {
  return (
    <section id={part.id} className="flex scroll-mt-28 flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">
          {part.icon}
        </span>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{part.nameKo}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{part.name}</p>
        </div>
      </div>

      {/* 설명 */}
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{part.description}</p>

      {/* 핵심 선택 기준 */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">핵심 선택 기준</h3>
        <div className="flex flex-wrap gap-1">
          {part.keySpecs.map((spec) => (
            <span
              key={spec}
              className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* 주요 업체 */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">주요 업체</h3>
        <ul className="space-y-2">
          {part.vendors.map((vendor) => (
            <li key={vendor.name} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
                {COUNTRY_LABEL[vendor.country] ?? vendor.country}
              </span>
              <div>
                <Link
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-900 underline underline-offset-2 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
                >
                  {vendor.name}
                  <span className="sr-only"> (새 창에서 열림)</span>
                </Link>
                <span className="text-zinc-500 dark:text-zinc-400"> — {vendor.description}</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {vendor.products.map((p) => (
                    <span
                      key={p}
                      className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 구매처 */}
      <div className="mt-auto">
        <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">구매처</h3>
        <div className="flex flex-wrap gap-2">
          {part.purchaseSites.map((site) => (
            <Link
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              title={site.description}
              className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {COUNTRY_LABEL[site.country] ?? site.country} {site.name}
              <span className="sr-only"> (새 창에서 열림)</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
