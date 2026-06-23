import { statusLabel, countryMeta, type HumanoidSpec } from "@/data/compare";

function SpecRow({ label, value, unit }: { label: string; value: number | null; unit: string }) {
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="text-zinc-500">{label}</span>
      {value === null ? (
        <span className="text-zinc-700">—</span>
      ) : (
        <span className="font-mono tabular-nums text-zinc-300">
          {value}
          <span className="ml-0.5 text-xs text-zinc-500">{unit}</span>
        </span>
      )}
    </div>
  );
}

function CompareCard({ spec }: { spec: HumanoidSpec }) {
  const { ko, color } = statusLabel[spec.status];
  const { flag, name: countryName } = countryMeta[spec.country];

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition-colors hover:border-zinc-700">
      <header className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-zinc-100">{spec.name}</h3>
          <p className="mt-0.5 text-sm text-zinc-400">
            {spec.maker} · {flag} {countryName} · {spec.year}
          </p>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs ${color}`}>
          {ko}
        </span>
      </header>

      <div className="space-y-1.5">
        <SpecRow label="키" value={spec.heightCm} unit="cm" />
        <SpecRow label="무게" value={spec.weightKg} unit="kg" />
        <SpecRow label="자유도" value={spec.dof} unit="DoF" />
        <SpecRow label="최대 하중" value={spec.payloadKg} unit="kg" />
        <SpecRow label="최고 속도" value={spec.maxSpeedMs} unit="m/s" />
        <SpecRow label="배터리" value={spec.batteryHours} unit="h" />
      </div>

      <footer className="flex flex-wrap gap-1.5">
        {spec.useCase.map((u) => (
          <span
            key={u}
            className="rounded-md border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400"
          >
            {u}
          </span>
        ))}
      </footer>

      <p className="border-t border-zinc-800 pt-3 text-xs leading-relaxed text-zinc-500">
        {spec.notes}
      </p>
    </article>
  );
}

export function CompareCardView({ specs }: { specs: HumanoidSpec[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {specs.map((spec) => (
        <CompareCard key={spec.id} spec={spec} />
      ))}
    </div>
  );
}
