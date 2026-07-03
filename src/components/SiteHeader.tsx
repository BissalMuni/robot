"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NAV_ITEMS = [
  { href: "/guide", key: "guide" },
  { href: "/business", key: "business" },
  { href: "/brands", key: "brands" },
  { href: "/parts", key: "parts" },
  { href: "/assembly", key: "assembly" },
  { href: "/software", key: "software" },
  { href: "/research", key: "research" },
  { href: "/community", key: "community" },
  { href: "/timeline", key: "timeline" },
  { href: "/compare", key: "compare" },
] as const;

// 모든 페이지에서 다른 섹션으로 바로 이동할 수 있는 전역 sticky 헤더.
// 압축된 한 줄 레이아웃 + 가로 스크롤 네비로 모바일에서도 공간을 아낀다.
export default function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-20 h-12 border-b border-zinc-200 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold whitespace-nowrap hover:opacity-80"
        >
          {t("site.title")}
        </Link>

        <nav
          aria-label={t("nav.home")}
          className="-mx-1 flex-1 overflow-x-auto px-1"
        >
          <div className="flex min-w-max items-center gap-1.5">
            {NAV_ITEMS.map(({ href, key }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-md px-2 py-1 text-xs transition-colors sm:text-sm ${
                    active
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  }`}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
