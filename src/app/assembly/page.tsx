import type { Metadata } from "next";
import { assemblySteps, roadmapPhases } from "@/data/assembly";
import { AssemblyStepCard } from "@/components/AssemblyStepCard";
import { AssemblyNav } from "@/components/AssemblyNav";
import { RoadmapPhaseCard } from "@/components/RoadmapPhaseCard";

export const metadata: Metadata = {
  title: "조립 방법 | 휴머노이드 로봇",
  description:
    "휴머노이드 로봇 조립 7단계(프레임→액추에이터→센서→제어기→배터리→캘리브레이션→통합테스트)와 Phase 1~3 양산 로드맵.",
};

export default function AssemblyPage() {
  const totalTime = "30~66시간";

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">조립 방법</h1>
        <p className="mt-2 max-w-2xl text-zinc-500 dark:text-zinc-400">
          휴머노이드 로봇 제작 {assemblySteps.length}단계 조립 흐름 — 각 단계별 작업·도구·주의사항
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          총 예상 시간: <strong className="text-zinc-600 dark:text-zinc-300">{totalTime}</strong> (1유닛 기준, 숙련도에 따라 변동)
        </p>
      </header>

      <AssemblyNav />

      {/* 진행 표시 */}
      <div className="mb-10 flex items-center gap-1 overflow-x-auto pb-2">
        {assemblySteps.map((step, idx) => (
          <div key={step.id} className="flex shrink-0 items-center gap-1">
            <div className="flex flex-col items-center">
              <span className="text-lg">{step.icon}</span>
              <span className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{step.step}</span>
            </div>
            {idx < assemblySteps.length - 1 && <span className="mx-1 text-zinc-400">→</span>}
          </div>
        ))}
      </div>

      {/* 조립 단계 카드 */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">조립 단계</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {assemblySteps.map((step) => (
            <AssemblyStepCard key={step.id} step={step} />
          ))}
        </div>
      </section>

      {/* 양산 로드맵 */}
      <section>
        <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">양산 로드맵</h2>
        <p className="mb-6 text-zinc-500 dark:text-zinc-400">
          프로토타입 검증에서 자동화 양산 라인 구축까지 {roadmapPhases.length}단계 로드맵
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {roadmapPhases.map((phase) => (
            <RoadmapPhaseCard key={phase.phase} phase={phase} />
          ))}
        </div>
      </section>
    </main>
  );
}
