import { RobotModel, maturityLabels } from "@/data/models";

// 로봇 AI 모델 하나를 카드로 렌더한다(zinc 테마). 이름·개발주체·연도·성숙도 배지·설명·요점·태그·링크.
export function ModelCard({ item }: { item: RobotModel }) {
  const maturity = maturityLabels[item.maturity];
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-300 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="leading-snug font-semibold text-zinc-900 dark:text-zinc-100">
            {item.name}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {item.developer} · {item.year}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs whitespace-nowrap ${maturity.badge}`}
        >
          {maturity.ko}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {item.summary}
      </p>

      <ul className="flex flex-col gap-1">
        {item.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex items-start gap-1.5 text-sm text-zinc-600 dark:text-zinc-400"
          >
            <span aria-hidden className="text-zinc-400 dark:text-zinc-600">
              ▪
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-1 pt-1">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
        >
          대표 자료 →<span className="sr-only"> (새 창에서 열림)</span>
        </a>
      )}
    </div>
  );
}
