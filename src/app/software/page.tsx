import type { Metadata } from "next";
import { softwareTools, categoryLabels, SoftwareCategory } from "@/data/software";
import { SoftwareToolCard } from "@/components/SoftwareToolCard";
import { SoftwareNav } from "@/components/SoftwareNav";

export const metadata: Metadata = {
  title: "소프트웨어 스택 | 휴머노이드 로봇",
  description:
    "휴머노이드 로봇 개발에 필요한 소프트웨어 생태계: OS, ROS2 미들웨어, 시뮬레이션, 모션 플래닝, AI/강화학습, SLAM, 컴퓨터 비전, 임베디드 도구를 한눈에.",
};

const CATEGORY_ORDER: SoftwareCategory[] = [
  "os",
  "middleware",
  "simulation",
  "planning",
  "ai-ml",
  "slam-nav",
  "computer-vision",
  "embedded",
  "devtools",
];

export default function SoftwarePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">소프트웨어 스택</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-2xl">
          휴머노이드 로봇 개발에 필요한 9개 카테고리별 핵심 소프트웨어 도구를 정리했습니다.
          ★ 추천 마크는 입문/중급 팀이 우선 도입할 도구입니다.
        </p>
      </header>

      <SoftwareNav />

      <div className="space-y-12">
        {CATEGORY_ORDER.map((category) => {
          const tools = softwareTools.filter((t) => t.category === category);
          if (tools.length === 0) return null;
          const { ko, en, icon } = categoryLabels[category];
          return (
            <section key={category} id={category} className="scroll-mt-16">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                <span>{icon}</span>
                <span>{ko}</span>
                <span className="text-sm font-normal text-zinc-500">/ {en}</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <SoftwareToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
