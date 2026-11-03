// 카탈로그 국가명(영문 전체 표기) → 국기 이모지. 경쟁사·원산지를 한눈에 스캔하도록 돕는다.
// 카탈로그에 실제로 존재하는 국가를 모두 담는다. 새 국가가 추가되면 country.test.ts 가 누락을 잡는다.
export const COUNTRY_FLAGS: Record<string, string> = {
  Canada: "🇨🇦",
  China: "🇨🇳",
  France: "🇫🇷",
  "Hong Kong": "🇭🇰",
  Japan: "🇯🇵",
  Norway: "🇳🇴",
  "South Korea": "🇰🇷",
  Spain: "🇪🇸",
  "United Kingdom": "🇬🇧",
  "United States": "🇺🇸",
};

// 국가명에 대응하는 국기 이모지. 모르는 국가면 빈 문자열(점진적 degrade).
export function countryFlag(country: string): string {
  return COUNTRY_FLAGS[country] ?? "";
}

// "🇰🇷 South Korea" 형태의 표시 문자열. 국기가 없으면 국가명만 반환한다.
export function countryWithFlag(country: string): string {
  const flag = countryFlag(country);
  return flag ? `${flag} ${country}` : country;
}
