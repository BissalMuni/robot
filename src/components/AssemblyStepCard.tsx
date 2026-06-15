import { AssemblyStep } from "@/data/assembly";

export function AssemblyStepCard({ step }: { step: AssemblyStep }) {
  return (
    <article id={step.id} className="flex scroll-mt-16 flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      {/* 헤더 */}
      <div className="flex items-start gap-4">
        <span className="shrink-0 text-3xl" aria-hidden="true">
          {step.icon}
        </span>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-bold text-zinc-100 dark:bg-zinc-700">
              STEP {step.step}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{step.estimatedTime}</span>
          </div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{step.title}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{step.titleEn}</p>
        </div>
      </div>

      {/* 개요 */}
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{step.summary}</p>

      {/* 주요 작업 */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">주요 작업</h3>
        <ul className="space-y-1">
          {step.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="mt-0.5 shrink-0 text-zinc-400">•</span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 필요 도구 */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">필요 도구</h3>
        <div className="flex flex-wrap gap-1">
          {step.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="mt-auto">
        <h3 className="mb-2 text-xs font-semibold uppercase text-amber-600 dark:text-amber-400">⚠ 주의사항</h3>
        <ul className="space-y-1">
          {step.warnings.map((warn, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300">
              <span className="mt-0.5 shrink-0">!</span>
              <span>{warn}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
