import { getTranslations } from "next-intl/server";
import { getAllRobots } from "@/lib/robots/store";
import Link from "next/link";
import {
  tally,
  decadeBucket,
  maxCount,
  statFilterHref,
  statQueryHref,
  commercialShare,
  type Tally,
} from "@/lib/robots/stats";
import { StatBar } from "@/components/StatBar";
import { countryWithFlag } from "@/lib/robots/country";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "카탈로그 통계 | 휴머노이드 로봇",
  description:
    "수집된 휴머노이드 로봇 카탈로그를 국가·용도·상태·연대별로 집계해 한눈에 보여줍니다. 데이터가 늘어나면 통계도 자동으로 갱신됩니다.",
  path: "/stats",
});

// 한 집계 섹션(제목 + 막대 목록)을 렌더한다.
function StatSection({
  title,
  tallies,
  label,
  href,
}: {
  title: string;
  tallies: Tally[];
  label: (key: string) => string;
  // 선택: 집계 항목을 필터링된 카탈로그로 연결하는 URL. 없으면 정적 막대.
  href?: (key: string) => string;
}) {
  if (tallies.length === 0) return null;
  const max = maxCount(tallies);
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {tallies.map((t) => (
          <StatBar
            key={t.key}
            label={label(t.key)}
            count={t.count}
            max={max}
            href={href?.(t.key)}
          />
        ))}
      </div>
    </section>
  );
}

export default async function StatsPage() {
  const t = await getTranslations();
  const robots = await getAllRobots();

  const byCountry = tally(robots, (r) => r.country);
  const byManufacturer = tally(robots, (r) => r.manufacturer);
  const byCategory = tally(robots, (r) => r.category);
  const byStatus = tally(robots, (r) => r.status);
  const byDecade = tally(robots, (r) => decadeBucket(r.year));
  const share = commercialShare(robots);

  const decadeLabel = (key: string) => (key === "unknown" ? "미상" : key);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          카탈로그 통계
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          현재 카탈로그에 담긴 로봇{" "}
          <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
            {robots.length}
          </strong>
          종을 국가·용도·상태·연대별로 집계했습니다. 데이터가 늘어나면 이 통계도
          자동으로 갱신됩니다.
        </p>
        {/* 시장 성숙도 한눈에: 지금 구매·배치 가능한(상용) 비중. 클릭 시 해당 목록으로. */}
        <Link
          href="/?status=commercial"
          className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm transition-colors hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70"
        >
          <span className="text-zinc-500 dark:text-zinc-400">지금 구매·배치 가능(상용)</span>
          <span className="font-semibold text-emerald-700 dark:text-emerald-300">
            {share.commercial} / {share.total}종 ({share.pct}%)
          </span>
        </Link>
      </header>

      <div className="space-y-10">
        <StatSection
          title="국가별"
          tallies={byCountry}
          label={(k) => countryWithFlag(k)}
          href={(k) => statFilterHref("country", k)}
        />
        {/* 제조사별 — 시장 주요 플레이어 파악용. 전용 필터가 없어 검색(?q=)으로 연결한다. */}
        <StatSection
          title="제조사별"
          tallies={byManufacturer}
          label={(k) => k}
          href={(k) => statQueryHref(k)}
        />
        <StatSection
          title="용도별"
          tallies={byCategory}
          label={(k) => t(`category.${k}`)}
          href={(k) => statFilterHref("category", k)}
        />
        <StatSection
          title="상태별"
          tallies={byStatus}
          label={(k) => t(`status.${k}`)}
          href={(k) => statFilterHref("status", k)}
        />
        {/* 연대(decade)는 홈 카탈로그에 대응 필터가 없어 링크 없이 둔다. */}
        <StatSection title="연대별" tallies={byDecade} label={decadeLabel} />
      </div>
    </main>
  );
}
