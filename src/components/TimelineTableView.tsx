import Link from "next/link";
import { TimelineEvent, categoryLabels } from "@/data/timeline";

export function TimelineTableView({ events }: { events: TimelineEvent[] }) {
  const sorted = [...events].sort(
    (a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0)
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900/60 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 text-left font-medium whitespace-nowrap">연도</th>
            <th className="px-4 py-3 text-left font-medium whitespace-nowrap">분류</th>
            <th className="px-4 py-3 text-left font-medium">제목 / 기관</th>
            <th className="px-4 py-3 text-left font-medium hidden md:table-cell">설명</th>
            <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">태그</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700/60">
          {sorted.map((event) => {
            const { icon, ko, color } = categoryLabels[event.category];
            return (
              <tr
                key={event.id}
                className={`transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${
                  event.milestone ? "bg-amber-50/60 dark:bg-zinc-800/30" : ""
                }`}
              >
                {/* 연도 */}
                <td className="px-4 py-3 font-mono text-xs tabular-nums whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                  {event.year}
                  {event.month ? `.${String(event.month).padStart(2, "0")}` : ""}
                  {event.milestone && (
                    <span className="ml-1 text-amber-600 dark:text-zinc-300">★</span>
                  )}
                </td>

                {/* 분류 */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs whitespace-nowrap ${color}`}
                  >
                    {icon} {ko}
                  </span>
                </td>

                {/* 제목 / 기관 */}
                <td className="px-4 py-3">
                  <div className="font-semibold text-zinc-900 leading-snug dark:text-zinc-100">
                    {event.link ? (
                      <Link
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {event.title}
                      </Link>
                    ) : (
                      event.title
                    )}
                  </div>
                  {event.subtitle && (
                    <div className="text-xs text-zinc-500 mt-0.5">{event.subtitle}</div>
                  )}
                </td>

                {/* 설명 (md+) */}
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden md:table-cell max-w-xs">
                  <p className="line-clamp-2">{event.description}</p>
                </td>

                {/* 태그 (lg+) */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {event.tags.length > 3 && (
                      <span className="text-xs text-zinc-600">
                        +{event.tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
