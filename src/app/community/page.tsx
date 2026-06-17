import type { Metadata } from "next";
import { communityItems, categoryLabels, CommunityCategory } from "@/data/community";
import { CommunityCard } from "@/components/CommunityCard";
import { CommunityNav } from "@/components/CommunityNav";

export const metadata: Metadata = {
  title: "커뮤니티 | 휴머노이드 로봇",
  description:
    "휴머노이드·로봇공학 커뮤니티 모음: 포럼, 디스코드, 깃허브 오픈소스, 유튜브 채널, 뉴스레터를 한 곳에서.",
};

const CATEGORY_ORDER: CommunityCategory[] = [
  "forums",
  "discord",
  "github",
  "youtube",
  "newsletters",
];

export default function CommunityPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-100">커뮤니티</h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          휴머노이드·로봇공학 관련 포럼, 디스코드/슬랙, 깃허브 오픈소스 프로젝트,
          유튜브 채널, 뉴스레터를 카테고리별로 정리했습니다.
          ★ 추천 항목은 입문자가 먼저 찾아볼 채널입니다.
        </p>
      </header>

      <CommunityNav />

      <div className="space-y-12">
        {CATEGORY_ORDER.map((category) => {
          const items = communityItems.filter((c) => c.category === category);
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
                  <CommunityCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
