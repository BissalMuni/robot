import { GlossaryTerm } from "@/data/glossary";

// 용어 하나를 카드로 렌더한다(zinc 테마). 용어(약어)·원어·정의·관련 용어 앵커.
export function GlossaryCard({
  item,
  termNames,
}: {
  item: GlossaryTerm;
  // id → 한국어 용어 이름. 관련 용어 링크 라벨에 쓴다.
  termNames: Record<string, string>;
}) {
  return (
    <div
      id={item.id}
      className="flex scroll-mt-20 flex-col gap-2 rounded-lg border border-zinc-300 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
    >
      <div className="flex items-baseline gap-2">
        <h3 className="leading-snug font-semibold text-zinc-900 dark:text-zinc-100">
          {item.term}
        </h3>
        {item.abbr && (
          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {item.abbr}
          </span>
        )}
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.termEn}</p>

      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {item.definition}
      </p>

      {item.seeAlso && item.seeAlso.length > 0 && (
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="shrink-0">관련</span>
          {item.seeAlso
            .filter((id) => termNames[id])
            .map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-zinc-300 px-2 py-0.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {termNames[id]}
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
