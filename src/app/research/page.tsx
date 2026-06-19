import { Suspense } from "react";
import type { Metadata } from "next";
import { researchItems, categoryLabels, ResearchCategory } from "@/data/research";
import { ResearchCard } from "@/components/ResearchCard";
import { ResearchNav } from "@/components/ResearchNav";
import { ResearchListView } from "@/components/ResearchListView";
import { ViewToggle } from "@/components/ViewToggle";

export const metadata: Metadata = {
  title: "연구 자료 | 휴머노이드 로봇",
  description:
    "휴머노이드 로봇 연구의 핵심 자료: 주요 연구소, 학회, 공개 데이터셋, 핵심 논문을 한눈에 정리.",
};

const CATEGORY_ORDER: ResearchCategory[] = [
  "labs",
  "conferences",
  "datasets",
  "papers",
];

const VIEWS = [
  { key: "card", label: "카드형" },
  { key: "list", label: "목록형" },
];

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "card" } = await searchParams;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">연구 자료</h1>
            <p className="mt-2 max-w-2xl text-zinc-400">
              휴머노이드 로봇 연구의 주요 연구소·학회·데이터셋·핵심 논문을 카테고리별로 정리했습니다.
              ★ 추천 항목은 입문자가 먼저 살펴볼 자료입니다.
            </p>
          </div>
          <Suspense fallback={null}>
            <ViewToggle views={VIEWS} />
          </Suspense>
        </div>
      </header>

      <ResearchNav />

      {view === "list" ? (
        <ResearchListView items={researchItems} />
      ) : (
        <div className="space-y-12">
          {CATEGORY_ORDER.map((category) => {
            const items = researchItems.filter((r) => r.category === category);
            if (items.length === 0) return null;
            const { ko, en, icon } = categoryLabels[category];
            return (
              <section key={category} id={category} className="scroll-mt-16">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-200">
                  <span>{icon}</span>
                  <span>{ko}</span>
                  <span className="text-sm font-normal text-zinc-500">/ {en}</span>
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <ResearchCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
