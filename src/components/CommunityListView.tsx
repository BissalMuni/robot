import Link from "next/link";
import { CommunityItem, CommunityCategory, categoryLabels } from "@/data/community";

const CATEGORY_ORDER: CommunityCategory[] = [
  "forums",
  "discord",
  "github",
  "youtube",
  "newsletters",
];

export function CommunityListView({ items }: { items: CommunityItem[] }) {
  return (
    <div className="space-y-8">
      {CATEGORY_ORDER.map((category) => {
        const categoryItems = items.filter((c) => c.category === category);
        if (categoryItems.length === 0) return null;
        const { ko, en, icon } = categoryLabels[category];
        return (
          <section key={category} id={category} className="scroll-mt-28">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-200">
              <span>{icon}</span>
              <span>{ko}</span>
              <span className="text-sm font-normal text-zinc-500">/ {en}</span>
              <span className="ml-auto text-xs font-normal text-zinc-600">
                {categoryItems.length}개
              </span>
            </h2>
            <ul className="divide-y divide-zinc-100 overflow-hidden rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
              {categoryItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-4 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </span>
                      {item.featured && (
                        <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                          ★ 추천
                        </span>
                      )}
                      {item.members && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.members} 멤버</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {item.description}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 shrink-0 rounded border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                  >
                    바로가기<span className="sr-only"> (새 창에서 열림)</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
