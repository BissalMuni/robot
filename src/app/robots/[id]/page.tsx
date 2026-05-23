import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getAllRobotIds, getRobotById } from "@/lib/robots/store";
import type { Robot } from "@/lib/robots/types";

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

  return (
    <article className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-zinc-500 hover:underline dark:text-zinc-400"
      >
        ← {t("robot.backToList")}
      </Link>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">{robot.name}</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          {robot.manufacturer} · {robot.country}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs dark:bg-zinc-800">
            {t(`category.${robot.category}`)}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs dark:bg-zinc-800">
            {t(`status.${robot.status}`)}
          </span>
          {hasUnverified && (
            <span className="rounded-full bg-amber-500/90 px-3 py-1 text-xs font-medium text-white">
              {t("robot.unverified")}
            </span>
          )}
        </div>
      </header>

      {/* 이미지 갤러리 */}
      {robot.images.length > 0 && (
        <section className="mb-8">
          <h2 className="sr-only">{t("robot.gallery")}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {robot.images.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
              >
                <Image
                  src={src}
                  alt={robot.name}
                  fill
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
              <span className="text-zinc-400">
                {t("robot.fetchedAt")}: {dateFmt.format(new Date(s.fetchedAt))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
