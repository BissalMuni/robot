import type { MetadataRoute } from "next";
import { getAllRobotIds } from "@/lib/robots/store";

// 사이트 기본 URL. 배포 시 NEXT_PUBLIC_SITE_URL 로 덮어쓴다.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// src/app/ 아래 모든 정적 페이지. 새 페이지 추가 시 여기도 함께 갱신할 것.
const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/guide", priority: 0.7 },
  { path: "/business", priority: 0.6 },
  { path: "/brands", priority: 0.6 },
  { path: "/parts", priority: 0.6 },
  { path: "/assembly", priority: 0.6 },
  { path: "/software", priority: 0.6 },
  { path: "/research", priority: 0.6 },
  { path: "/community", priority: 0.6 },
  { path: "/timeline", priority: 0.6 },
  { path: "/compare", priority: 0.6 },
];

// 목록 페이지 + 모든 정적 페이지 + 모든 로봇 상세 페이지를 사이트맵에 포함한다 (SEO).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ids = await getAllRobotIds();
  const robotUrls = ids.map((id) => ({
    url: `${BASE_URL}/robots/${id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const staticUrls = STATIC_PAGES.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    ...staticUrls,
    ...robotUrls,
  ];
}
