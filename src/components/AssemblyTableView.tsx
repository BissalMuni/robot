import { AssemblyStep } from "@/data/assembly";

export function AssemblyTableView({ steps }: { steps: AssemblyStep[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50 text-left dark:border-zinc-800 dark:bg-zinc-900/60">
            <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">단계</th>
            <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">작업명</th>
            <th className="hidden px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400 md:table-cell">
              주요 작업
            </th>
            <th className="hidden px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400 lg:table-cell">
              필요 도구
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">예상 시간</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {steps.map((step) => (
            <tr
              key={step.id}
              id={step.id}
              className="scroll-mt-16 hover:bg-zinc-50 dark:hover:bg-zinc-900/30"
            >
              <td className="px-4 py-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Step {step.step}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{step.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{step.titleEn}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 md:hidden">
                  {step.summary}
                </p>
                {step.warnings.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1 md:hidden">
                    {step.warnings.map((w, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                      >
                        ⚠ {w.substring(0, 30)}…
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td className="hidden px-4 py-4 md:table-cell">
                <ul className="space-y-1">
                  {step.tasks.slice(0, 3).map((task, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <span className="mt-0.5 shrink-0 text-zinc-400">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                  {step.tasks.length > 3 && (
                    <li className="text-xs text-zinc-500 dark:text-zinc-400">+{step.tasks.length - 3}개 더...</li>
                  )}
                </ul>
              </td>
              <td className="hidden px-4 py-4 lg:table-cell">
                <div className="flex flex-wrap gap-1">
                  {step.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="whitespace-nowrap text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {step.estimatedTime.split(" ")[0]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
