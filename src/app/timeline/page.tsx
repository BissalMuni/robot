import { Suspense } from "react";
import type { Metadata } from "next";
import { timelineEvents, categoryLabels, TimelineCategory } from "@/data/timeline";
import { TimelineEventCard } from "@/components/TimelineEvent";
import { TimelineCardView } from "@/components/TimelineCardView";
import { TimelineTableView } from "@/components/TimelineTableView";
import { ViewToggle } from "@/components/ViewToggle";

export const metadata: Metadata = {
  title: "개발 연표 | 휴머노이드 로봇",
  description:
    "1973년 WABOT-1부터 2025년 양산 경쟁까지, 휴머노이드 로봇 50년 이정표를 한눈에.",
};

function groupByDecade(events: typeof timelineEvents) {
  const map = new Map<number, typeof events>();
  for (const e of events) {
    const decade = Math.floor(e.year / 10) * 10;
    if (!map.has(decade)) map.set(decade, []);
    map.get(decade)!.push(e);
  }
  return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
}

const ALL_CATEGORIES: TimelineCategory[] = [
  "hardware",
  "software",
  "competition",
  "commercial",
  "research",
];

const VIEWS = [
  { key: "timeline", label: "연대기형" },
  { key: "card", label: "카드형" },
  { key: "table", label: "표형" },
];

export default async function TimelinePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "timeline" } = await searchParams;
  const decades = groupByDecade(timelineEvents);
  const milestoneCount = timelineEvents.filter((e) => e.milestone).length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">개발 연표</h1>
            <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
              1973년 세계 최초 휴머노이드 WABOT-1부터 2025년 글로벌 양산 경쟁까지,
              50여 년의 핵심 이정표 {milestoneCount}개를 시대순으로 정리했습니다.
              ★ 이정표는 기술·산업 흐름을 바꾼 주요 사건입니다.
            </p>
          </div>
          <Suspense fallback={null}>
            <ViewToggle views={VIEWS} />
          </Suspense>
        </div>
      </header>

      {/* 카테고리 범례 (타임라인·표형에만 표시) */}
      {view !== "card" && (
        <div className="mb-10 flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => {
            const { ko, en, icon, color } = categoryLabels[cat];
            return (
              <span
                key={cat}
                className={`rounded-full border px-3 py-1 text-xs ${color}`}
              >
                {icon} {ko} / {en}
              </span>
            );
          })}
        </div>
      )}

      {/* 뷰 렌더링 */}
      {view === "table" ? (
        <TimelineTableView events={timelineEvents} />
      ) : view === "card" ? (
        <TimelineCardView events={timelineEvents} />
      ) : (
        /* 타임라인형 (기본) */
        <div className="space-y-14">
          {decades.map(([decade, events]) => (
            <section key={decade} id={`d${decade}`} className="scroll-mt-16">
              {/* 연대 헤더 */}
              <div className="mb-6 flex items-center gap-4">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{decade}년대</h2>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                <span className="text-sm text-zinc-500">{events.length}건</span>
              </div>

              {/* 이벤트 목록 — 수직 타임라인 */}
              <div className="space-y-0">
                {events
                  .sort((a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0))
                  .map((event, idx) => (
                    <div key={event.id} className="flex gap-4">
                      {/* 왼쪽: 연도 + 세로선 */}
                      <div className="flex w-16 flex-col items-center shrink-0">
                        <span
                          className={`text-xs font-mono font-semibold tabular-nums ${
                            event.milestone ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-500"
                          }`}
                        >
                          {event.year}
                          {event.month ? `.${String(event.month).padStart(2, "0")}` : ""}
                        </span>
                        {idx < events.length - 1 && (
                          <div className="mt-1 flex-1 w-px bg-zinc-200 dark:bg-zinc-700" />
                        )}
                      </div>

                      {/* 오른쪽: 이벤트 카드 */}
                      <div className="mb-4 flex-1">
                        <TimelineEventCard event={event} />
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
