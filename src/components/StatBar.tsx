// 집계 한 줄을 순수 CSS 막대로 렌더한다(zinc 테마, 의존성 없음).
// count/max 비율로 막대 폭을 정한다.
export function StatBar({
  label,
  count,
  max,
}: {
  label: string;
  count: number;
  max: number;
}) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-32 shrink-0 truncate text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <div className="relative h-5 flex-1 overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
        <div
          className="absolute inset-y-0 left-0 rounded bg-zinc-800 dark:bg-zinc-200"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right tabular-nums text-zinc-500 dark:text-zinc-400">
        {count}
      </span>
    </div>
  );
}
