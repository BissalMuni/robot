import type { MetadataRoute } from "next";
import { getAllRobotIds } from "@/lib/robots/store";

// 사이트 기본 URL. 배포 시 NEXT_PUBLIC_SITE_URL 로 덮어쓴다.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// 목록 페이지 + 모든 로봇 상세 페이지를 사이트맵에 포함한다 (SEO).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ids = await getAllRobotIds();
  const robotUrls = ids.map((id) => ({
    url: `${BASE_URL}/robots/${id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    ...robotUrls,
  ];
}
