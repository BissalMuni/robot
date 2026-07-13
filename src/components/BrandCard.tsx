import Link from "next/link";
import { Brand } from "@/data/brands";

const COUNTRY_FLAG: Record<Brand["country"], string> = {
  KR: "🇰🇷",
  US: "🇺🇸",
  CN: "🇨🇳",
  NO: "🇳🇴",
  UK: "🇬🇧",
};

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-300 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{brand.name}</span>
        <span className="text-xl" title={brand.country}>
          {COUNTRY_FLAG[brand.country]}
        </span>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {brand.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {brand.robots.map((robot) => (
          <span
            key={robot}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
          >
            {robot}
          </span>
        ))}
      </div>
      <Link
        href={brand.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        공식 홈페이지 →<span className="sr-only"> (새 창에서 열림)</span>
      </Link>
    </div>
  );
}
