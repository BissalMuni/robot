import type { Metadata } from "next";
import {
  glossaryTerms,
  categoryLabels,
  categoryOrder,
} from "@/data/glossary";
import { GlossaryCard } from "@/components/GlossaryCard";

export const metadata: Metadata = {
  title: "용어집 | 휴머노이드 로봇",
  description:
    "휴머노이드 로봇 분야에서 자주 쓰이는 용어를 한곳에 정리했습니다. 자유도(DoF)·액추에이터·ZMP·VLA·Sim-to-Real 등 기본 개념부터 하드웨어·제어·인식·안전까지 분류별로 찾아볼 수 있습니다.",
};

// id → 한국어 용어 이름(관련 용어 링크 라벨용).
const termNames: Record<string, string> = Object.fromEntries(
  glossaryTerms.map((t) => [t.id, t.term]),
);

export default function GlossaryPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          용어집
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          다른 페이지를 읽다 마주치는 낯선 용어를 한곳에서 찾아보세요. 특정 제품
          홍보가 아니라, 휴머노이드 로봇 분야에서 널리 쓰이는 개념을 기본·하드웨어·제어·인식·안전
          분류로 나누어 중립적으로 정의합니다.
        </p>
      </header>

      {/* 분류 앵커 내비 */}
      <nav aria-label="용어 분류" className="mb-10 flex flex-wrap gap-2">
        {categoryOrder.map((category) => {
          const { ko, icon } = categoryLabels[category];
          return (
            <a
              key={category}
              href={`#cat-${category}`}
              className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {icon} {ko}
            </a>
          );
        })}
      </nav>

      <div className="space-y-12">
        {categoryOrder.map((category) => {
          const items = glossaryTerms.filter((m) => m.category === category);
          if (items.length === 0) return null;
          const { ko, en, icon } = categoryLabels[category];
          return (
            <section key={category} id={`cat-${category}`} className="scroll-mt-20">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                <span>{icon}</span>
                <span>{ko}</span>
                <span className="text-sm font-normal text-zinc-500">/ {en}</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <GlossaryCard
                    key={item.id}
                    item={item}
                    termNames={termNames}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
