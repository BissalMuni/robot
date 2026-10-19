import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import {
  jsonLdString,
  websiteJsonLd,
  organizationJsonLd,
} from "@/lib/jsonld";
import "./globals.css";

// sitemap.ts·page.tsx 와 동일한 사이트 출처를 단일화한다.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // sitemap.ts 와 동일한 env 변수를 써서 사이트 출처를 단일화한다.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  ),
  title: {
    default: "Humanoid Robot Directory",
    template: "%s · Humanoid Robot Directory",
  },
  description:
    "Search and compare humanoid robots from around the world, normalized into one catalog.",
  openGraph: {
    siteName: "Humanoid Robot Directory",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 쿠키 기반 로케일을 읽어 <html lang>과 i18n 컨텍스트에 적용한다.
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {/* 사이트 전역 구조화 데이터(schema.org WebSite + SearchAction, Organization).
            WebSite 의 SearchAction 은 홈의 실제 검색(?q=)을 선언해 사이트링크 검색창 노출을 돕는다. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString([
              websiteJsonLd(BASE_URL),
              organizationJsonLd(BASE_URL),
            ]),
          }}
        />
        <NextIntlClientProvider>
          {/* 키보드 사용자가 헤더 내비를 건너뛰고 본문으로 바로 이동하는 링크.
              평소엔 sr-only, 포커스되면 보인다. */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
          >
            {t("nav.skipToContent")}
          </a>
          <SiteHeader />
          {/* 본문 래퍼 — 스킵 링크의 목적지이자, 기존 페이지의 flex-1 성장 보존용. */}
          <div id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
