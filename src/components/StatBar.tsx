import Link from "next/link";

// 집계 한 줄을 순수 CSS 막대로 렌더한다(zinc 테마, 의존성 없음).
// count/max 비율로 막대 폭을 정한다.
// href 가 주어지면 행 전체를 링크로 감싸 해당 필터가 적용된 카탈로그로 이동한다.
// href 가 없으면 기존과 동일한 정적 행을 렌더한다(동작 보존).
export function StatBar({
  label,
  count,
  max,
  href,
}: {
  label: string;
  count: number;
  max: number;
  href?: string;
}) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;

  // 막대·라벨·수치는 링크 여부와 무관하게 동일하다.
  const row = (
    <>
      <span className="w-32 shrink-0 truncate text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <div className="relative h-5 flex-1 overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
        <div
          className="absolute inset-y-0 left-0 rounded bg-zinc-800 transition-colors group-hover:bg-zinc-900 dark:bg-zinc-200 dark:group-hover:bg-white"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right tabular-nums text-zinc-500 dark:text-zinc-400">
        {count}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group -mx-1 flex items-center gap-3 rounded px-1 text-sm transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-500"
      >
        {row}
      </Link>
    );
  }

  return <div className="flex items-center gap-3 text-sm">{row}</div>;
}
