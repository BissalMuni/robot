import { RoadmapPhase } from "@/data/assembly";

const AUTOMATION_COLORS: Record<RoadmapPhase["automationLevel"], string> = {
  수작업: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  반자동: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  자동화: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
};

export function RoadmapPhaseCard({ phase }: { phase: RoadmapPhase }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{phase.name}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{phase.subtitle}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${AUTOMATION_COLORS[phase.automationLevel]}`}
        >
          {phase.automationLevel}
        </span>
      </div>

      {/* 메타 */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div>
          <span className="block text-xs text-zinc-500 dark:text-zinc-400">기간</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{phase.duration}</span>
        </div>
        <div>
          <span className="block text-xs text-zinc-500 dark:text-zinc-400">목표 생산량</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{phase.targetUnits}</span>
        </div>
      </div>

      {/* 단계 목표 */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">단계 목표</h3>
        <ul className="space-y-1">
          {phase.goals.map((goal, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="mt-0.5 shrink-0 text-zinc-400">→</span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 완료 기준 */}
      <div className="mt-auto">
        <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">완료 기준</h3>
        <ul className="space-y-1">
          {phase.milestones.map((ms, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="mt-0.5 shrink-0 text-green-500">✓</span>
              <span>{ms}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
