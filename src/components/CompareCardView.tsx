import { statusLabel, countryMeta, type HumanoidSpec } from "@/data/compare";

// 값 옆에 표시할 상대 비교 막대: 지금 화면에 보이는 specs 중 최댓값 대비 비율.
function SpecRow({
  label,
  value,
  unit,
  max,
}: {
  label: string;
  value: number | null;
  unit: string;
  max: number;
}) {
  const pct = value !== null && max > 0 ? Math.max((value / max) * 100, 4) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-16 shrink-0 text-zinc-500 dark:text-zinc-400">{label}</span>
      {value === null ? (
        <span className="text-zinc-400 dark:text-zinc-600">—</span>
      ) : (
        <>
          <span className="w-16 shrink-0 text-right font-mono tabular-nums text-zinc-700 dark:text-zinc-300">
            {value}
            <span className="ml-0.5 text-xs text-zinc-500">{unit}</span>
          </span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <span
              className="block h-full rounded-full bg-zinc-400 dark:bg-zinc-500"
              style={{ width: `${pct}%` }}
            />
          </span>
        </>
      )}
    </div>
  );
}

type SpecField = "heightCm" | "weightKg" | "dof" | "payloadKg" | "maxSpeedMs" | "batteryHours";

const ROWS: { field: SpecField; label: string; unit: string }[] = [
  { field: "heightCm", label: "키", unit: "cm" },
  { field: "weightKg", label: "무게", unit: "kg" },
  { field: "dof", label: "자유도", unit: "DoF" },
  { field: "payloadKg", label: "최대 하중", unit: "kg" },
  { field: "maxSpeedMs", label: "최고 속도", unit: "m/s" },
  { field: "batteryHours", label: "배터리", unit: "h" },
];

function CompareCard({
  spec,
  maxByField,
}: {
  spec: HumanoidSpec;
  maxByField: Record<SpecField, number>;
}) {
  const { ko, color } = statusLabel[spec.status];
  const { flag, name: countryName } = countryMeta[spec.country];

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
      <header className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{spec.name}</h3>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {spec.maker} · {flag} {countryName} · {spec.year}
          </p>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs ${color}`}>
          {ko}
        </span>
      </header>

      <div className="space-y-1.5">
        {ROWS.map((row) => (
          <SpecRow
            key={row.field}
            label={row.label}
            value={spec[row.field]}
            unit={row.unit}
            max={maxByField[row.field]}
          />
        ))}
      </div>

      <footer className="flex flex-wrap gap-1.5">
        {spec.useCase.map((u) => (
          <span
            key={u}
            className="rounded-md border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
          >
            {u}
          </span>
        ))}
      </footer>

      <p className="border-t border-zinc-100 pt-3 text-xs leading-relaxed text-zinc-500 dark:border-zinc-800">
        {spec.notes}
      </p>
    </article>
  );
}

export function CompareCardView({ specs }: { specs: HumanoidSpec[] }) {
  const maxByField = ROWS.reduce(
    (acc, { field }) => {
      acc[field] = specs.reduce((m, s) => Math.max(m, s[field] ?? 0), 0);
      return acc;
    },
    {} as Record<SpecField, number>,
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {specs.map((spec) => (
        <CompareCard key={spec.id} spec={spec} maxByField={maxByField} />
      ))}
    </div>
  );
}
