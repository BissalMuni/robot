import Link from "next/link";
import { PartCategory } from "@/data/parts";

const COUNTRY_EMOJI: Record<string, string> = {
  KR: "🇰🇷",
  US: "🇺🇸",
  CN: "🇨🇳",
  JP: "🇯🇵",
  DE: "🇩🇪",
  NL: "🇳🇱",
  CH: "🇨🇭",
  GLOBAL: "🌐",
};

export function PartsListView({ categories }: { categories: PartCategory[] }) {
  return (
    <div className="space-y-6">
      {categories.map((part) => (
        <section
          key={part.id}
          id={part.id}
          className="scroll-mt-16 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
        >
          {/* 헤더 */}
          <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <span className="text-2xl">{part.icon}</span>
            <div>
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {part.nameKo}
                <span className="ml-2 text-sm font-normal text-zinc-500">{part.name}</span>
              </h2>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{part.description}</p>
            </div>
          </div>

          <div className="grid divide-y divide-zinc-100 dark:divide-zinc-800 md:grid-cols-2 md:divide-x md:divide-y-0">
            {/* 주요 스펙 */}
            <div className="px-5 py-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                주요 스펙
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {part.keySpecs.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <h3 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                주요 업체
              </h3>
              <ul className="space-y-2">
                {part.vendors.map((vendor) => (
                  <li key={vendor.name} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-base">{COUNTRY_EMOJI[vendor.country] ?? "🌐"}</span>
                    <div className="min-w-0">
                      <Link
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-zinc-800 underline-offset-2 hover:underline dark:text-zinc-200"
                      >
                        {vendor.name}
                      </Link>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{vendor.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 구매처 */}
            <div className="px-5 py-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                구매처
              </h3>
              <ul className="divide-y divide-zinc-100 overflow-hidden rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                {part.purchaseSites.map((site) => (
                  <li
                    key={site.name}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                  >
                    <span className="shrink-0 text-base">{COUNTRY_EMOJI[site.country] ?? "🌐"}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{site.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{site.description}</p>
                    </div>
                    <Link
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                    >
                      방문
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
