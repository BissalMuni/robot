import type { Metadata } from "next";
import { useCases } from "@/data/use-cases";
import { UseCaseCard } from "@/components/UseCaseCard";

export const metadata: Metadata = {
  title: "활용 분야 | 휴머노이드 로봇",
  description:
    "휴머노이드 로봇이 실제로 투입되는 분야를 제조·물류·의료·가정·연구·재난·소매·극한환경으로 나누어 정리했습니다. 각 분야의 대표 작업과 기대 역할을 중립적으로 설명합니다.",
};

export default function UseCasesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          활용 분야
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          휴머노이드 로봇은 사람이 쓰던 환경과 도구를 그대로 활용하는 것을
          목표로 합니다. 어떤 분야에서 어떤 일을 맡게 되는지, 대표적인 활용처를
          분야별로 모았습니다. 특정 제품이 아니라 분야 전반의 일반적 설명입니다.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((item) => (
          <UseCaseCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
