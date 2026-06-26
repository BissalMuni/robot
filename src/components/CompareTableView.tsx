import { humanoidSpecs, statusLabel, countryMeta, type HumanoidSpec } from "@/data/compare";

function Cell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`whitespace-nowrap px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 ${className}`}>
      {children}
    </td>
  );
}

function Num({ value, unit }: { value: number | null; unit: string }) {
  if (value === null) return <span className="text-zinc-400 dark:text-zinc-600">—</span>;
  return (
    <>
      <span className="font-mono tabular-nums">{value}</span>
      <span className="ml-0.5 text-xs text-zinc-500">{unit}</span>
    </>
  );
}

export function CompareTableView({ specs }: { specs: HumanoidSpec[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60">
            {[
              "모델", "제조사", "국가", "연도", "상태",
              "키(cm)", "무게(kg)", "자유도", "하중(kg)",
              "속도(m/s)", "배터리(h)", "용도",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, idx) => {
            const { ko, color } = statusLabel[spec.status];
            const { flag, name: countryName } = countryMeta[spec.country];
            return (
              <tr
                key={spec.id}
                className={`border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-800/60 dark:hover:bg-zinc-800/30 ${
                  idx % 2 === 0 ? "" : "bg-zinc-50/50 dark:bg-zinc-900/20"
                }`}
              >
                <Cell className="font-semibold text-zinc-900 dark:text-zinc-100">{spec.name}</Cell>
                <Cell>{spec.maker}</Cell>
                <Cell>
                  <span title={countryName}>{flag} {countryName}</span>
                </Cell>
                <Cell className="font-mono tabular-nums">{spec.year}</Cell>
                <Cell>
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${color}`}>
                    {ko}
                  </span>
                </Cell>
                <Cell><Num value={spec.heightCm} unit="cm" /></Cell>
                <Cell><Num value={spec.weightKg} unit="kg" /></Cell>
                <Cell><Num value={spec.dof} unit="DoF" /></Cell>
                <Cell><Num value={spec.payloadKg} unit="kg" /></Cell>
                <Cell><Num value={spec.maxSpeedMs} unit="m/s" /></Cell>
                <Cell><Num value={spec.batteryHours} unit="h" /></Cell>
                <Cell>
                  <span className="text-zinc-500 dark:text-zinc-400">{spec.useCase.join(" · ")}</span>
                </Cell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function CompareTableViewWrapper() {
  return <CompareTableView specs={humanoidSpecs} />;
}
