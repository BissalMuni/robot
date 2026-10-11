import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import {
  robotModels,
  categoryLabels,
  categoryOrder,
  maturityLabels,
} from "@/data/models";
import { ModelCard } from "@/components/ModelCard";

export const metadata = pageMetadata({
  title: "AI 모델 | 휴머노이드 로봇",
  description:
    "휴머노이드·로봇을 실제로 움직이는 AI 모델을 정리했습니다. 시각-언어-행동(VLA), 휴머노이드 범용 모델, 조작 정책, 크로스-임바디먼트 파운데이션까지 분야에 큰 영향을 준 대표 모델을 개념 중심으로 봅니다.",
  path: "/models",
});

export default function ModelsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          AI 모델
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          로봇의 &ldquo;몸&rdquo;이 하드웨어라면, &ldquo;머리&rdquo;는 학습된 AI
          모델입니다. 이 페이지는 개발 도구(소프트웨어)나 연구 생태계(연구 자료)와
          달리, 실제 로봇의 인식·판단·동작을 담당하는 모델 자체를 정리합니다. 도구는{" "}
          <Link
            href="/software"
            className="font-medium text-zinc-900 underline hover:no-underline dark:text-zinc-100"
          >
            소프트웨어
          </Link>
          , 연구소·논문은{" "}
          <Link
            href="/research"
            className="font-medium text-zinc-900 underline hover:no-underline dark:text-zinc-100"
          >
            연구 자료
          </Link>{" "}
          페이지를 참고하세요.
        </p>
      </header>

      {/* 성숙도 범례 */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(maturityLabels) as (keyof typeof maturityLabels)[]).map(
          (key) => (
            <span
              key={key}
              className={`rounded-full border px-2 py-0.5 text-xs ${maturityLabels[key].badge}`}
            >
              {maturityLabels[key].ko}
            </span>
          ),
        )}
      </div>

      {/* 분류 앵커 내비 */}
      <nav aria-label="모델 분류" className="mb-10 flex flex-wrap gap-2">
        {categoryOrder.map((category) => {
          const { ko, icon } = categoryLabels[category];
          return (
            <a
              key={category}
              href={`#${category}`}
              className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {icon} {ko}
            </a>
          );
        })}
      </nav>

      <div className="space-y-12">
        {categoryOrder.map((category) => {
          const items = robotModels.filter((m) => m.category === category);
          if (items.length === 0) return null;
          const { ko, en, icon } = categoryLabels[category];
          return (
            <section key={category} id={category} className="scroll-mt-20">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                <span>{icon}</span>
                <span>{ko}</span>
                <span className="text-sm font-normal text-zinc-500">
                  / {en}
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <ModelCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
