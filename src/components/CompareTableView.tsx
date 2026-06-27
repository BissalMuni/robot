"use client";

import { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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

type ColDef = {
  label: string;
  ascKey?: string;
  descKey?: string;
  defaultDesc?: boolean;
};

// ascKey === descKey → 단방향 정렬 (상태)
const COLUMNS: ColDef[] = [
  { label: "모델" },
  { label: "제조사" },
  { label: "국가" },
  { label: "연도", ascKey: "year_asc", descKey: "year_desc" },
  { label: "상태", ascKey: "status", descKey: "status" },
  { label: "키(cm)", ascKey: "height_asc", descKey: "height_desc", defaultDesc: true },
  { label: "무게(kg)", ascKey: "weight_asc", descKey: "weight_desc" },
  { label: "자유도", ascKey: "dof_asc", descKey: "dof_desc", defaultDesc: true },
  { label: "하중(kg)", ascKey: "payload_asc", descKey: "payload_desc", defaultDesc: true },
  { label: "속도(m/s)", ascKey: "speed_asc", descKey: "speed_desc", defaultDesc: true },
  { label: "배터리(h)", ascKey: "battery_asc", descKey: "battery_desc", defaultDesc: true },
  { label: "용도" },
];

const THEAD_ROW = "border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60";
const TH_BASE = "px-4 py-3 text-xs font-semibold uppercase tracking-wide";

function SortableTheadInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "status";

  const updateSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort === "status") {
      params.delete("sort");
    } else {
      params.set("sort", newSort);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <thead>
      <tr className={THEAD_ROW}>
        {COLUMNS.map((col) => {
          const sortable = Boolean(col.ascKey);
          const isSingleMode = col.ascKey === col.descKey;
          const isAsc = !isSingleMode && col.ascKey === currentSort;
          const isDesc = !isSingleMode && col.descKey === currentSort;
          const isSingle = isSingleMode && col.ascKey === currentSort;
          const isActive = isAsc || isDesc || isSingle;

          const handleClick = () => {
            if (!sortable) return;
            if (isSingleMode) {
              updateSort(col.ascKey!);
              return;
            }
            if (!isActive) {
              updateSort(col.defaultDesc ? col.descKey! : col.ascKey!);
            } else if (isDesc) {
              updateSort(col.ascKey!);
            } else {
              updateSort(col.descKey!);
            }
          };

          return (
            <th
              key={col.label}
              onClick={sortable ? handleClick : undefined}
              title={sortable ? `${col.label}로 정렬` : undefined}
              className={[
                TH_BASE,
                sortable
                  ? "cursor-pointer select-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  : "",
                isActive
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-600 dark:text-zinc-400",
              ].join(" ")}
            >
              <span className="inline-flex items-center gap-0.5">
                {col.label}
                {sortable && !isSingleMode && (
                  <span
                    className={`ml-0.5 text-[10px] ${
                      isActive
                        ? "text-zinc-700 dark:text-zinc-300"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    {isAsc ? "↑" : isDesc ? "↓" : "↕"}
                  </span>
                )}
                {isSingleMode && isActive && (
                  <span className="ml-0.5 text-[10px] text-zinc-700 dark:text-zinc-300">✓</span>
                )}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

function StaticThead() {
  return (
    <thead>
      <tr className={THEAD_ROW}>
        {COLUMNS.map((col) => (
          <th key={col.label} className={`${TH_BASE} text-zinc-600 dark:text-zinc-400`}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function CompareTableView({ specs }: { specs: HumanoidSpec[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <Suspense fallback={<StaticThead />}>
          <SortableTheadInner />
        </Suspense>
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
