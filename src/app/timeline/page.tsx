import type { Metadata } from "next";
import { timelineEvents, categoryLabels, TimelineCategory } from "@/data/timeline";
import { TimelineEventCard } from "@/components/TimelineEvent";

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

export default function TimelinePage() {
  const decades = groupByDecade(timelineEvents);
  const milestoneCount = timelineEvents.filter((e) => e.milestone).length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-100">개발 연표</h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          1973년 세계 최초 휴머노이드 WABOT-1부터 2025년 글로벌 양산 경쟁까지,
          50여 년의 핵심 이정표 {milestoneCount}개를 시대순으로 정리했습니다.
          ★ 이정표는 기술·산업 흐름을 바꾼 주요 사건입니다.
        </p>
      </header>

      {/* 카테고리 범례 */}
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

      {/* 연대별 타임라인 */}
      <div className="space-y-14">
        {decades.map(([decade, events]) => (
          <section key={decade} id={`d${decade}`} className="scroll-mt-16">
            {/* 연대 헤더 */}
            <div className="mb-6 flex items-center gap-4">
              <h2 className="text-2xl font-bold text-zinc-100">{decade}년대</h2>
              <div className="h-px flex-1 bg-zinc-700" />
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
                          event.milestone ? "text-zinc-200" : "text-zinc-500"
                        }`}
                      >
                        {event.year}
                        {event.month ? `.${String(event.month).padStart(2, "0")}` : ""}
                      </span>
                      {idx < events.length - 1 && (
                        <div className="mt-1 flex-1 w-px bg-zinc-700" />
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
    </main>
  );
}
