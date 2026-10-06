import type { MetadataRoute } from "next";
import { getAllRobots } from "@/lib/robots/store";
import { latestFetchedAt } from "@/lib/robots/freshness";
import { NAV_ITEMS } from "@/lib/navigation";

// 사이트 기본 URL. 배포 시 NEXT_PUBLIC_SITE_URL 로 덮어쓴다.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// 정적 페이지는 내비게이션 단일 출처(NAV_ITEMS)에서 파생한다.
// 새 섹션을 NAV_ITEMS 에 추가하면 헤더·사이트맵이 함께 갱신된다.
const STATIC_PAGES: { path: string; priority: number }[] = NAV_ITEMS.map(
  ({ href, priority }) => ({ path: href, priority }),
);

// 목록 페이지 + 모든 정적 페이지 + 모든 로봇 상세 페이지를 사이트맵에 포함한다 (SEO).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const robots = await getAllRobots();
  const robotUrls = robots.map((robot) => ({
    url: `${BASE_URL}/robots/${robot.id}`,
    // 데이터가 마지막으로 수집된 시점을 lastModified 로 노출한다(없으면 생략).
    lastModified: latestFetchedAt(robot),
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
