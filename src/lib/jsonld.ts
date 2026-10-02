// JSON-LD 를 <script type="application/ld+json"> 안에 안전하게 넣기 위한 직렬화.
// "<" 를 유니코드 이스케이프해 "</script>" 로 인한 조기 종료·XSS 를 막는다.
// 도메인별 JSON-LD 빌더(robots/jsonld.ts, data/faq.ts 등)가 공통으로 사용한다.
export function jsonLdString(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
