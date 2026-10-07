import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllRobots } from "@/lib/robots/store";
import { tally, decadeBucket, maxCount, type Tally } from "@/lib/robots/stats";
import { StatBar } from "@/components/StatBar";

export const metadata: Metadata = {
  title: "카탈로그 통계 | 휴머노이드 로봇",
  description:
    "수집된 휴머노이드 로봇 카탈로그를 국가·용도·상태·연대별로 집계해 한눈에 보여줍니다. 데이터가 늘어나면 통계도 자동으로 갱신됩니다.",
};

// 한 집계 섹션(제목 + 막대 목록)을 렌더한다.
function StatSection({
  title,
  tallies,
  label,
}: {
  title: string;
  tallies: Tally[];
  label: (key: string) => string;
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
          <StatBar key={t.key} label={label(t.key)} count={t.count} max={max} />
        ))}
      </div>
    </section>
  );
}

export default async function StatsPage() {
  const t = await getTranslations();
  const robots = await getAllRobots();

  const byCountry = tally(robots, (r) => r.country);
  const byCategory = tally(robots, (r) => r.category);
  const byStatus = tally(robots, (r) => r.status);
  const byDecade = tally(robots, (r) => decadeBucket(r.year));

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
      </header>

      <div className="space-y-10">
        <StatSection
          title="국가별"
          tallies={byCountry}
          label={(k) => k}
        />
        <StatSection
          title="용도별"
          tallies={byCategory}
          label={(k) => t(`category.${k}`)}
        />
        <StatSection
          title="상태별"
          tallies={byStatus}
          label={(k) => t(`status.${k}`)}
        />
        <StatSection title="연대별" tallies={byDecade} label={decadeLabel} />
      </div>
    </main>
  );
}
