import type { Metadata } from "next";
import {
  faqItems,
  faqJsonLd,
  categoryLabels,
  categoryOrder,
} from "@/data/faq";
import { FaqItem } from "@/components/FaqItem";
import { jsonLdString } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "자주 묻는 질문 | 휴머노이드 로봇",
  description:
    "휴머노이드 로봇에 대해 자주 묻는 질문을 기본·구매/비용·기술·안전/윤리 분류로 정리했습니다. 무엇인지, 살 수 있는지, 어떻게 걷고 판단하는지, 사람 곁에서 안전한지를 중립적으로 설명합니다.",
};

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {/* 검색엔진 리치 결과용 구조화 데이터(schema.org FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd(faqItems)) }}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          자주 묻는 질문
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          휴머노이드 로봇에 대해 많이 궁금해하는 내용을 모았습니다. 특정 제품
          홍보가 아니라 분야 전반에 대한 일반적·중립적 설명입니다.
        </p>
      </header>

      {/* 분류 앵커 내비 */}
      <nav aria-label="질문 분류" className="mb-10 flex flex-wrap gap-2">
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

      <div className="space-y-10">
        {categoryOrder.map((category) => {
          const items = faqItems.filter((f) => f.category === category);
          if (items.length === 0) return null;
          const { ko, en, icon } = categoryLabels[category];
          return (
            <section key={category} id={`cat-${category}`} className="scroll-mt-20">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                <span>{icon}</span>
                <span>{ko}</span>
                <span className="text-sm font-normal text-zinc-500">/ {en}</span>
              </h2>
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <FaqItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
