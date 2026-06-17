import Link from "next/link";
import { categoryLabels, CommunityCategory } from "@/data/community";

const CATEGORY_ORDER: CommunityCategory[] = [
  "forums",
  "discord",
  "github",
  "youtube",
  "newsletters",
];

export function CommunityNav() {
  return (
    <nav
      aria-label="커뮤니티 카테고리 네비게이션"
      className="sticky top-0 z-10 -mx-4 mb-8 border-b border-zinc-100 bg-white/90 px-4 py-3 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/90 sm:-mx-6 sm:px-6"
    >
      <ul className="flex flex-wrap gap-2" role="list">
        {CATEGORY_ORDER.map((category) => {
          const { ko, icon } = categoryLabels[category];
          return (
            <li key={category}>
              <Link
                href={`#${category}`}
                className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/60"
              >
                <span aria-hidden="true">{icon}</span>
                {ko}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
