import Link from "next/link";
import { TimelineEvent, categoryLabels } from "@/data/timeline";

export function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const { icon, color } = categoryLabels[event.category];

  return (
    <div
      className={`relative flex flex-col gap-2 rounded-lg border p-4 transition-shadow hover:shadow-md ${
        event.milestone
          ? "border-zinc-500 bg-zinc-800/60"
          : "border-zinc-700 bg-zinc-900/60"
      }`}
    >
      {event.milestone && (
        <span className="absolute -top-2.5 left-4 rounded-full bg-zinc-600 px-2 py-0.5 text-xs font-semibold text-zinc-200">
          ★ 이정표
        </span>
      )}

      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold leading-snug text-zinc-100">{event.title}</p>
          {event.subtitle && (
            <p className="text-xs text-zinc-400">{event.subtitle}</p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${color}`}
        >
          {icon} {categoryLabels[event.category].ko}
        </span>
      </div>

      <p className="text-sm text-zinc-400">{event.description}</p>

      <div className="flex flex-wrap gap-1">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
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
          className="mt-auto text-sm text-blue-400 hover:underline"
        >
          자세히 →
        </Link>
      )}
    </div>
  );
}
