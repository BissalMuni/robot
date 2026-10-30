import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getAllRobotIds, getAllRobots, getRobotById } from "@/lib/robots/store";
import { robotJsonLdString } from "@/lib/robots/jsonld";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/jsonld";
import { relatedRobots } from "@/lib/robots/related";
import { adjacentRobots } from "@/lib/robots/adjacent";
import { pricingEntryFor } from "@/data/pricing";
import RobotCard from "@/components/RobotCard";
import type { Robot } from "@/lib/robots/types";

// sitemap.ts·layout.ts 와 동일한 사이트 출처.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// 빌드 시 모든 로봇 상세 페이지를 정적 생성한다 (SEO).
export async function generateStaticParams() {
  const ids = await getAllRobotIds();
  return ids.map((id) => ({ id }));
}

// 상세 페이지 메타데이터 — 로봇별 title/description/og 로 검색 노출 확보.
export async function generateMetadata({
  params,
}: PageProps<"/robots/[id]">): Promise<Metadata> {
  const { id } = await params;
  const robot = await getRobotById(id);
  if (!robot) return { title: "Not found" };

  const description =
    robot.description ||
    `${robot.name} — ${robot.manufacturer}, ${robot.country}`;
  return {
    title: robot.name,
    description,
    alternates: { canonical: `/robots/${id}` },
    openGraph: {
      title: robot.name,
      description,
      images: robot.images.length ? [robot.images[0]] : undefined,
      type: "article",
    },
  };
}

// 사양 한 줄을 표시한다. 값이 없으면 렌더하지 않는다.
function SpecRow({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex justify-between gap-4 border-b border-zinc-100 py-2 text-sm dark:border-zinc-800">
      <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

export default async function RobotDetail({
  params,
}: PageProps<"/robots/[id]">) {
  const { id } = await params;
  const robot: Robot | null = await getRobotById(id);
  if (!robot) notFound();

  const t = await getTranslations();
  const locale = await getLocale();
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const hasUnverified = robot.sources.some((s) => !s.verified);
  // 가격·구매 가이드(/pricing)에 이 로봇이 있으면 가격 배지를 보여준다(창업 관점 가격 노출).
  const priced = pricingEntryFor(robot.id);
  // 관련 로봇(같은 제조사 → 같은 용도)·순차 이웃(이전/다음)은 같은 목록에서 파생한다.
  // getAllRobots 는 react cache 로 메모이즈되고 이름순으로 정렬돼 있다.
  const all = await getAllRobots();
  const related = relatedRobots(all, robot);
  const { prev, next } = adjacentRobots(all, robot);

  // 빵부스러기: 홈 › 현재 로봇. 방향 안내(UX) + BreadcrumbList 구조화 데이터(SEO).
  const crumbs = [
    { name: t("nav.home"), path: "/" },
    { name: robot.name, path: `/robots/${robot.id}` },
  ];

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
      {/* 검색엔진 리치 결과용 구조화 데이터(schema.org Product) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: robotJsonLdString(robot) }}
      />
      {/* 빵부스러기 구조화 데이터(schema.org BreadcrumbList) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(breadcrumbJsonLd(crumbs, BASE_URL)),
        }}
      />

      {/* 빵부스러기 내비 — 마지막(현재 로봇)은 링크가 아닌 현재 위치로 표시한다. */}
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <li>
            <Link href="/" className="hover:underline">
              {t("nav.home")}
            </Link>
          </li>
          <li aria-hidden className="text-zinc-400 dark:text-zinc-600">
            /
          </li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            {robot.name}
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">{robot.name}</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          {robot.manufacturer} · {robot.country}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {/* 용도·상태 배지는 홈 카탈로그의 해당 필터로 연결해 비슷한 로봇 탐색을 잇는다. */}
          <Link
            href={`/?category=${robot.category}`}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            {t(`category.${robot.category}`)}
          </Link>
          <Link
            href={`/?status=${robot.status}`}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            {t(`status.${robot.status}`)}
          </Link>
          {hasUnverified && (
            <span className="rounded-full bg-amber-500/90 px-3 py-1 text-xs font-medium text-white">
              {t("robot.unverified")}
            </span>
          )}
          {/* 가격 배지 — /pricing 가이드의 해당 모델로 연결한다(출처 포함 상세 가격). */}
          {priced && (
            <Link
              href={`/pricing#${priced.id}`}
              title={t("nav.pricing")}
              className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900"
            >
              💰 {priced.priceLabel}
            </Link>
          )}
        </div>
      </header>

      {/* 이미지 갤러리 */}
      {robot.images.length > 0 && (
        <section className="mb-8">
          <h2 className="sr-only">{t("robot.gallery")}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {robot.images.map((src, idx) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
              >
                <Image
                  src={src}
                  alt={idx === 0 ? robot.name : `${robot.name} – photo ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {robot.description && (
        <section className="mb-8">
          <h2 className="mb-2 text-lg font-semibold">{t("robot.description")}</h2>
          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            {robot.description}
          </p>
        </section>
      )}

      {/* 사양 */}
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">{t("robot.specs")}</h2>
        <dl>
          <SpecRow label={t("robot.manufacturer")} value={robot.manufacturer} />
          <SpecRow label={t("robot.country")} value={robot.country} />
          <SpecRow label={t("robot.year")} value={robot.year} />
          <SpecRow
            label={t("robot.height")}
            value={robot.height ? `${robot.height} ${t("units.cm")}` : undefined}
          />
          <SpecRow
            label={t("robot.weight")}
            value={robot.weight ? `${robot.weight} ${t("units.kg")}` : undefined}
          />
          <SpecRow label={t("robot.dof")} value={robot.dof} />
        </dl>
      </section>

      {/* 출처: URL + 수집 시각 + 검증 여부 */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">{t("robot.sources")}</h2>
        {hasUnverified && (
          <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            {t("robot.unverifiedNote")}
          </p>
        )}
        <ul className="flex flex-col gap-2">
          {robot.sources.map((s) => (
            <li
              key={s.url}
              className="flex flex-wrap items-center gap-2 text-sm"
            >
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline dark:text-blue-400"
              >
                {s.url}
                <span className="sr-only"> (새 창에서 열림)</span>
              </a>
              <span
                className={
                  s.verified
                    ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                }
              >
                {s.verified ? t("robot.verified") : t("robot.unverified")}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">
                {t("robot.fetchedAt")}: {dateFmt.format(new Date(s.fetchedAt))}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 관련 로봇 — 같은 제조사·용도로 탐색을 이어간다(내부 링크). */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">{t("robot.related")}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RobotCard key={r.id} robot={r} />
            ))}
          </div>
        </section>
      )}

      {/* 순차 탐색 — 카탈로그(이름순)에서 이전/다음 로봇으로 이동한다. */}
      {(prev || next) && (
        <nav
          aria-label="Robot navigation"
          className="mt-10 flex items-stretch justify-between gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800"
        >
          {prev ? (
            <Link
              href={`/robots/${prev.id}`}
              rel="prev"
              className="flex max-w-[48%] flex-col gap-0.5 rounded-lg border border-zinc-200 px-4 py-3 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                ← {t("robot.prevRobot")}
              </span>
              <span className="truncate font-medium">{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/robots/${next.id}`}
              rel="next"
              className="ml-auto flex max-w-[48%] flex-col gap-0.5 rounded-lg border border-zinc-200 px-4 py-3 text-right transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {t("robot.nextRobot")} →
              </span>
              <span className="truncate font-medium">{next.name}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </main>
  );
}
