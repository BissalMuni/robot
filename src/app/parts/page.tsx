import type { Metadata } from "next";
import { partCategories } from "@/data/parts";
import { PartCard } from "@/components/PartCard";

export const metadata: Metadata = {
  title: "부품 가이드 | 휴머노이드 로봇",
  description:
    "휴머노이드 로봇 제작에 필요한 핵심 부품 6종(액추에이터·감속기·힘토크센서·IMU·제어컴퓨터·배터리)의 선택 기준, 주요 업체, 국내외 구매처.",
};

export default function PartsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">부품 가이드</h1>
        <p className="mt-2 max-w-2xl text-zinc-500 dark:text-zinc-400">
          휴머노이드 로봇 제작을 위한 핵심 부품 {partCategories.length}종 — 선택 기준, 주요 업체, 구매처를 정리했습니다.
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          ※ 업체·구매처 링크는 정보 제공 목적이며, 본 사이트는 제휴 관계가 없습니다.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {partCategories.map((part) => (
          <PartCard key={part.id} part={part} />
        ))}
      </div>
    </main>
  );
}
