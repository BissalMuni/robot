// 사이트 전역 내비게이션의 단일 출처(single source of truth).
// 헤더(SiteHeader)와 사이트맵(sitemap.ts), 테스트가 모두 이 목록을 참조한다.
// 새 섹션 페이지를 추가하면 여기 한 줄만 더하면 되고,
// i18n(nav.<key>) 누락은 navigation.test.ts 가 잡아준다.
export type NavItem = {
  href: string; // 라우트 경로 (예: "/guide")
  key: string; // i18n 키 (nav.<key>) 겸 식별자
  priority: number; // sitemap 우선순위(0~1)
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/guide", key: "guide", priority: 0.7 },
  { href: "/glossary", key: "glossary", priority: 0.6 },
  { href: "/faq", key: "faq", priority: 0.6 },
  { href: "/business", key: "business", priority: 0.6 },
  { href: "/brands", key: "brands", priority: 0.6 },
  { href: "/parts", key: "parts", priority: 0.6 },
  { href: "/assembly", key: "assembly", priority: 0.6 },
  { href: "/software", key: "software", priority: 0.6 },
  { href: "/research", key: "research", priority: 0.6 },
  { href: "/models", key: "models", priority: 0.6 },
  { href: "/community", key: "community", priority: 0.6 },
  { href: "/timeline", key: "timeline", priority: 0.6 },
  { href: "/compare", key: "compare", priority: 0.6 },
  { href: "/stats", key: "stats", priority: 0.5 },
] as const;
