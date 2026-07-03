import type { Metadata } from "next";
import { brands } from "@/data/brands";
import { BrandCard } from "@/components/BrandCard";

export const metadata: Metadata = {
  title: "브랜드 디렉토리",
  description:
    "주요 휴머노이드 로봇 브랜드 12개사의 공식 웹사이트 링크, 대표 제품, 특징을 한눈에.",
};

export default function BrandsPage() {
  const domestic = brands.filter((b) => b.country === "KR");
  const global = brands.filter((b) => b.country !== "KR");

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-bold sm:text-3xl">휴머노이드 로봇 브랜드</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          2025~2026년 주목할 주요 제조사 {brands.length}개사
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">🇰🇷 국내 기업</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domestic.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">🌍 해외 기업</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {global.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>
    </div>
  );
}
