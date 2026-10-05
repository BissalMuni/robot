// JSON-LD 를 <script type="application/ld+json"> 안에 안전하게 넣기 위한 직렬화.
// "<" 를 유니코드 이스케이프해 "</script>" 로 인한 조기 종료·XSS 를 막는다.
// 도메인별 JSON-LD 빌더(robots/jsonld.ts, data/faq.ts 등)가 공통으로 사용한다.
export function jsonLdString(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
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
