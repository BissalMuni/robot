import Link from "next/link";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { business } from "@/lib/business/content";
import type { Locale } from "@/i18n/config";

// 조립 사업 페이지 메타데이터 — 로케일별 제목/설명으로 SEO 확보.
export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const c = business[locale] ?? business.ko;
  return {
    title: c.title,
    description: c.subtitle,
    openGraph: { title: c.title, description: c.subtitle, type: "article" },
  };
}

// 로봇 조립 사업 준비 분석 페이지 (산업 비유 · 부품 구조 · 차별화 전략).
export default async function BusinessPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const c = business[locale] ?? business.ko;

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
      <header className="mb-8 flex items-start justify-between gap-4">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
        >
          ← {t("nav.home")}
        </Link>
        <LanguageSwitcher />
      </header>

      <h1 className="text-3xl font-bold">{c.title}</h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">{c.subtitle}</p>

      {/* 목차 */}
      <nav className="mt-6 flex flex-wrap gap-2">
        {c.sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {s.heading}
          </a>
        ))}
      </nav>

      <div className="mt-8 flex flex-col gap-10">
        {c.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-20">
            <h2 className="mb-3 text-xl font-semibold">{s.heading}</h2>

            {s.body && (
              <div className="flex flex-col gap-3">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="leading-relaxed text-zinc-700 dark:text-zinc-300"
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* 비교/대응 표 */}
            {s.table && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800">
                      {s.table.headers.map((h) => (
                        <th
                          key={h}
                          className="px-4 py-2 text-left font-semibold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="border-t border-zinc-200 dark:border-zinc-800"
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-4 py-2 align-top text-zinc-700 dark:text-zinc-300"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 용어·단계 정의 목록 */}
            {s.terms && (
              <dl className="mt-4 flex flex-col gap-3">
                {s.terms.map((term) => (
                  <div
                    key={term.term}
                    className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <dt className="font-semibold">{term.term}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {term.desc}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {/* 핵심 메시지 강조 박스 */}
            {s.callout && (
              <p className="mt-4 rounded-xl border-l-4 border-blue-500 bg-blue-50 px-4 py-3 text-sm leading-relaxed text-zinc-800 dark:bg-blue-950/40 dark:text-zinc-100">
                {s.callout}
              </p>
            )}
          </section>
        ))}
      </div>

      <footer className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          {t("guide.browseRobots")} →
        </Link>
      </footer>
    </div>
  );
}
