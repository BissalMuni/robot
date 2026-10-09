import type { UseCase } from "@/data/use-cases";

// 활용 분야 하나를 카드로 렌더한다(zinc 테마). 아이콘·분야명·설명·대표 예시.
export function UseCaseCard({ item }: { item: UseCase }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-300 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-2xl">
          {item.icon}
        </span>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {item.title}
        </h2>
      </div>

      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {item.summary}
      </p>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {item.examples.map((example) => (
          <li
            key={example}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {example}
          </li>
        ))}
      </ul>
    </div>
  );
}
