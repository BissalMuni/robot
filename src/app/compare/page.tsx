import { Suspense } from "react";
import type { Metadata } from "next";
import { humanoidSpecs, statusLabel, type RobotStatus, type HumanoidSpec } from "@/data/compare";
import { CompareTableView } from "@/components/CompareTableView";
import { CompareCardView } from "@/components/CompareCardView";
import { ViewToggle } from "@/components/ViewToggle";
import { CompareControls } from "@/components/CompareControls";

export const metadata: Metadata = {
  title: "스펙 비교 | 휴머노이드 로봇",
  description:
    "Tesla Optimus·Figure 02·Unitree H1 등 주요 휴머노이드 로봇 12종의 키·무게·자유도·속도·하중을 한눈에 비교합니다.",
};

const VIEWS = [
  { key: "table", label: "표형" },
  { key: "card", label: "카드형" },
];

const STATUS_ORDER: RobotStatus[] = ["production", "pilot", "prototype"];

function nullLast(a: number | null, b: number | null, desc = false): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return desc ? b - a : a - b;
}

function sortSpecs(specs: HumanoidSpec[], sort: string): HumanoidSpec[] {
  const arr = [...specs];
  switch (sort) {
    case "speed_desc":
      return arr.sort((a, b) => nullLast(a.maxSpeedMs, b.maxSpeedMs, true));
    case "weight_asc":
      return arr.sort((a, b) => nullLast(a.weightKg, b.weightKg));
    case "weight_desc":
      return arr.sort((a, b) => nullLast(a.weightKg, b.weightKg, true));
    case "height_asc":
      return arr.sort((a, b) => nullLast(a.heightCm, b.heightCm));
    case "height_desc":
      return arr.sort((a, b) => nullLast(a.heightCm, b.heightCm, true));
    case "payload_desc":
      return arr.sort((a, b) => nullLast(a.payloadKg, b.payloadKg, true));
    case "dof_desc":
      return arr.sort((a, b) => nullLast(a.dof, b.dof, true));
    default:
      return arr.sort(
        (a, b) =>
          STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status) ||
          a.maker.localeCompare(b.maker),
      );
  }
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; status?: string; sort?: string; q?: string }>;
}) {
  const { view = "table", status, sort = "status", q } = await searchParams;

  // 이름·제조사 검색
  const searched = q
    ? humanoidSpecs.filter((s) => {
        const needle = q.toLowerCase();
        return (
          s.name.toLowerCase().includes(needle) ||
          s.maker.toLowerCase().includes(needle)
        );
      })
    : humanoidSpecs;

  // 상태 필터
  const filtered = status ? searched.filter((s) => s.status === status) : searched;

  // 정렬
  const sorted = sortSpecs(filtered, sort);

  const counts = humanoidSpecs.reduce<Record<string, number>>((acc, s) => {
    acc[s.status] = (acc[s.status] ?? 0) + 1;
    return acc;
  }, {});

  // 상태 필터 링크 — q·sort·view 보존
  const buildStatusHref = (s?: string) => {
    const params = new URLSearchParams();
    if (s) params.set("status", s);
    if (sort !== "status") params.set("sort", sort);
    if (q) params.set("q", q);
    if (view !== "table") params.set("view", view);
    const qs = params.toString();
    return `/compare${qs ? `?${qs}` : ""}`;
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6">
      <header className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">스펙 비교</h1>
            <p className="mt-2 max-w-2xl text-zinc-500 dark:text-zinc-400">
              주요 휴머노이드 로봇 {humanoidSpecs.length}종 — 키·무게·자유도·속도·하중·배터리를
              한눈에 비교합니다. 숫자 없음(—)은 미공개 스펙입니다.
            </p>
          </div>
          <Suspense fallback={null}>
            <ViewToggle views={VIEWS} />
          </Suspense>
        </div>
      </header>

      {/* 검색·정렬 컨트롤 */}
      <Suspense fallback={null}>
        <CompareControls />
      </Suspense>

      {/* 상태 필터 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href={buildStatusHref()}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            !status
              ? "border-zinc-600 bg-zinc-800 text-zinc-100"
              : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
          }`}
        >
          전체 <span className="ml-1 text-xs text-zinc-500">{humanoidSpecs.length}</span>
        </a>
        {(["production", "pilot", "prototype"] as RobotStatus[]).map((s) => {
          const { ko, color } = statusLabel[s];
          const active = status === s;
          return (
            <a
              key={s}
              href={buildStatusHref(s)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                active
                  ? color
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {ko} <span className="ml-1 text-xs opacity-70">{counts[s] ?? 0}</span>
            </a>
          );
        })}
      </div>

      {/* 검색 결과 안내 */}
      {q && (
        <p className="mb-4 text-sm text-zinc-500">
          &ldquo;{q}&rdquo; 검색 결과: {sorted.length}건
        </p>
      )}

      {sorted.length === 0 ? (
        <p className="py-16 text-center text-zinc-500">해당하는 로봇이 없습니다.</p>
      ) : view === "card" ? (
        <CompareCardView specs={sorted} />
      ) : (
        <CompareTableView specs={sorted} />
      )}

      <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-600">
        ※ 스펙은 각 제조사 공개 자료·발표 기준이며 최종 양산 스펙과 다를 수 있습니다.
      </p>
    </main>
  );
}
