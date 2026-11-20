// 휴머노이드 로봇 시장 전망(투자·시장 규모) 데이터. /market 페이지가 렌더한다.
// 창업(시장 규모·타이밍 판단) 관점에서 주요 금융기관의 공개 전망을 출처와 함께 모은다.
// 전망치는 기관·정의·시점에 따라 편차가 크므로, 각 수치는 반드시 확인한 출처를 남긴다.

export type MarketSource = {
  url: string;
  fetchedAt: string; // ISO 8601
  verified: boolean;
};

export type MarketForecast = {
  id: string;
  source: string; // 전망 주체(기관)
  targetYear: number; // 전망 목표 연도
  marketLabel: string; // 시장 규모 표기
  unitsLabel: string; // 대수 표기
  summary: string; // 핵심 요약(한국어)
  sources: MarketSource[];
};

// 목표 연도가 가까운 순으로 정렬해 둔다.
export const marketForecasts: MarketForecast[] = [
  {
    id: "goldman-2035",
    source: "Goldman Sachs",
    targetYear: 2035,
    marketLabel: "약 US$138B",
    unitsLabel: "연 650만 대(출하)",
    summary:
      "물류·창고·자동차 수요가 견인. 2026년 7.5만 대 → 2030년 89만 대 → 2035년 650만 대로 단계적 확대(2026년 전망 상향).",
    sources: [
      { url: "https://247wallst.com/investing/2026/09/13/robots-everywhere-goldman-sachs-now-sees-6-5-million-humanoid-robots-by-2035/", fetchedAt: "2026-11-02T00:00:00.000Z", verified: true },
      { url: "https://www.goldmansachs.com/insights/goldman-sachs-research/global-automation-humanoid-robot-the-ai-accelerant", fetchedAt: "2026-11-02T00:00:00.000Z", verified: false },
    ],
  },
  {
    id: "morgan-stanley-2050",
    source: "Morgan Stanley",
    targetYear: 2050,
    marketLabel: "매출 약 US$4.7조(시장 ~US$5조)",
    unitsLabel: "약 10억 대(보급)",
    summary:
      "2025년 4월 전망. 2050년 약 10억 대 보급, 글로벌 매출 약 US$4.7조(수리·유지보수 등 공급망 포함 시 시장 약 US$5조). 약 90%가 산업·상업용.",
    sources: [
      { url: "https://www.cnbc.com/2025/04/29/how-to-play-a-5-trillion-market-for-humanoid-robots-by-2050.html", fetchedAt: "2026-11-02T00:00:00.000Z", verified: true },
      { url: "https://www.morganstanley.com/insights/articles/humanoid-robot-market-5-trillion-by-2050", fetchedAt: "2026-11-02T00:00:00.000Z", verified: false },
    ],
  },
  {
    id: "citi-2050",
    source: "Citi (GPS)",
    targetYear: 2050,
    marketLabel: "약 US$7조",
    unitsLabel: "약 6.48억 대(보급)",
    summary:
      "2050년 TAM 약 US$7조 전망(보급 약 6억 4,800만 대). 택배·건설·음식배달·홈서비스를 주요 성장 용도로 꼽는다.",
    sources: [
      { url: "https://finance.yahoo.com/news/humanoid-robots-could-create-a-7-trillion-market-in-the-next-25-years-citi-analysts-233324909.html", fetchedAt: "2026-11-02T00:00:00.000Z", verified: true },
      { url: "https://longbridge.com/en/news/218827006", fetchedAt: "2026-11-02T00:00:00.000Z", verified: false },
    ],
  },
];
