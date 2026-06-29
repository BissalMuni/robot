import Link from "next/link";
import { TimelineEvent, categoryLabels } from "@/data/timeline";

export function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const { icon, color } = categoryLabels[event.category];

  return (
    <div
      className={`relative flex flex-col gap-2 rounded-lg border p-4 transition-shadow hover:shadow-md ${
        event.milestone
          ? "border-amber-300 bg-amber-50/60 dark:border-zinc-500 dark:bg-zinc-800/60"
          : "border-zinc-200 bg-white/60 dark:border-zinc-700 dark:bg-zinc-900/60"
      }`}
    >
      {event.milestone && (
        <span className="absolute -top-2.5 left-4 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-zinc-600 dark:text-zinc-200">
          ★ 이정표
        </span>
      )}

      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold leading-snug text-zinc-900 dark:text-zinc-100">{event.title}</p>
          {event.subtitle && (
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{event.subtitle}</p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${color}`}
        >
          {icon} {categoryLabels[event.category].ko}
        </span>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">{event.description}</p>

      <div className="flex flex-wrap gap-1">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {event.link && (
        <Link
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          자세히 →
        </Link>
      )}
    </div>
  );
}
