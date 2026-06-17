import Link from "next/link";
import { CommunityItem } from "@/data/community";

export function CommunityCard({ item }: { item: CommunityItem }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-300 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {item.name}
        </span>
        {item.featured && (
          <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            ★ 추천
          </span>
        )}
      </div>

      {item.members && (
        <p className="text-xs text-zinc-400">{item.members} 멤버</p>
      )}

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-1">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={item.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        바로가기 →
      </Link>
    </div>
  );
}
