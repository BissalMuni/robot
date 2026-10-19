// JSON-LD 를 <script type="application/ld+json"> 안에 안전하게 넣기 위한 직렬화.
// "<" 를 유니코드 이스케이프해 "</script>" 로 인한 조기 종료·XSS 를 막는다.
// 도메인별 JSON-LD 빌더(robots/jsonld.ts, data/faq.ts 등)가 공통으로 사용한다.
export function jsonLdString(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

// 사이트 전역 구조화 데이터에 쓰는 브랜드 이름.
// layout 의 metadata.title.default·openGraph.siteName 과 일치시켜, 로케일과 무관하게 일관된 엔티티로 노출한다.
export const SITE_NAME = "Humanoid Robot Directory";

// schema.org WebSite 구조화 데이터를 만든다.
// potentialAction(SearchAction) 로 홈의 실제 검색(?q=)을 선언해, 검색엔진의 사이트링크 검색창 노출을 돕는다.
// urlTemplate 의 {search_term_string} 는 query-input 과 짝을 이루는 schema.org 규약 플레이스홀더다.
export function websiteJsonLd(baseUrl: string): Record<string, unknown> {
  const base = baseUrl.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${base}/`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// schema.org Organization 구조화 데이터를 만든다(브랜드 엔티티).
export function organizationJsonLd(baseUrl: string): Record<string, unknown> {
  const base = baseUrl.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: `${base}/`,
  };
}

// 빵부스러기 한 단계. path 는 "/" 로 시작하는 절대 경로.
export type Crumb = { name: string; path: string };

// schema.org BreadcrumbList 구조화 데이터를 만든다(빵부스러기 리치 결과용).
// baseUrl 끝 슬래시는 정리해 중복 슬래시를 막는다.
export function breadcrumbJsonLd(
  items: Crumb[],
  baseUrl: string,
): Record<string, unknown> {
  const base = baseUrl.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}
