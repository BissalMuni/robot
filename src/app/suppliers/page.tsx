import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { partCategories } from "@/data/parts";
import { aggregateSuppliers, type Supplier } from "@/lib/suppliers";

export const metadata = pageMetadata({
  title: "부품 공급사 디렉토리 | 휴머노이드 로봇",
  description:
    "휴머노이드 로봇 부품 공급사를 업체 기준으로 모았습니다. 각 공급사가 어떤 부품(액추에이터·감속기·센서·배터리·핸드 등)을 만드는지 국내·해외로 나눠 한눈에 비교하세요.",
  path: "/suppliers",
});

// 부품 데이터의 국가 코드 → 국기·라벨(공급망 스캔용).
const COUNTRY_LABEL: Record<string, string> = {
  KR: "🇰🇷 국내",
  US: "🇺🇸 미국",
  CN: "🇨🇳 중국",
  JP: "🇯🇵 일본",
  DE: "🇩🇪 독일",
  NL: "🇳🇱 네덜란드",
  CH: "🇨🇭 스위스",
};

function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-300 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
          {supplier.name}
        </span>
        <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
          {COUNTRY_LABEL[supplier.country] ?? supplier.country}
        </span>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {supplier.description}
      </p>
      {/* 어떤 부품을 공급하는가 */}
      <div className="flex flex-wrap gap-1">
        {supplier.parts.map((p) => (
          <span
            key={p}
            className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
          >
            {p}
          </span>
        ))}
      </div>
      {supplier.products.length > 0 && (
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          {supplier.products.join(" · ")}
        </p>
      )}
      <Link
        href={supplier.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        공식 홈페이지 →<span className="sr-only"> (새 창에서 열림)</span>
      </Link>
    </div>
  );
}

export default function SuppliersPage() {
  const suppliers = aggregateSuppliers(partCategories);
  const domestic = suppliers.filter((s) => s.country === "KR");
  const global = suppliers.filter((s) => s.country !== "KR");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          부품 공급사 디렉토리
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          부품 가이드의 공급사를 업체 기준으로 뒤집어 정리했습니다. 각 업체가 어떤 부품을
          만드는지 보고 공급망을 설계하세요. 부품별 상세는{" "}
          <Link href="/parts" className="text-blue-600 hover:underline dark:text-blue-400">
            부품 가이드
          </Link>
          에서 볼 수 있습니다.
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          ※ 정보 제공 목적이며 본 사이트는 제휴 관계가 없습니다.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">🇰🇷 국내 공급사 ({domestic.length})</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domestic.map((s) => (
            <SupplierCard key={s.name} supplier={s} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">🌍 해외 공급사 ({global.length})</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {global.map((s) => (
            <SupplierCard key={s.name} supplier={s} />
          ))}
        </div>
      </section>
    </main>
  );
}
