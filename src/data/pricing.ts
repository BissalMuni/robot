// 휴머노이드 로봇 "가격·구매 가이드" 데이터. /pricing 페이지가 렌더한다.
// 창업(시장·가격 조사) 관점에서 "지금 실제로 살 수 있는가, 얼마인가, 어떻게 사는가"를 한곳에 모은다.
// 가격은 범위·조건부가 많아 단일 숫자 대신 '표기 문자열(priceLabel)'로 둔다. 모든 수치는 확인한 출처를 남긴다.

// 구매 형태 — 일시불 구매 / 리스 / 구독 / 견적 문의.
export type PricingBasis = "purchase" | "lease" | "subscription" | "contact";

export type PricingSource = {
  url: string;
  fetchedAt: string; // ISO 8601
  verified: boolean;
};

export type PricingEntry = {
  id: string;
  model: string;
  maker: string;
  country: string;
  priceLabel: string; // 예: "US$13,500–16,000"
  basis: PricingBasis;
  availability: string; // 예: "판매 중", "사전예약(2026 배송)"
  note?: string;
  robotId?: string; // 카탈로그(data/robots.*.json)의 로봇 id — 있으면 상세 페이지로 연결한다.
  sources: PricingSource[];
};

// 구매 형태 라벨(한국어) — 표의 배지에 쓴다.
export const basisLabel: Record<PricingBasis, string> = {
  purchase: "구매",
  lease: "리스",
  subscription: "구독",
  contact: "견적 문의",
};

// 진입 가격이 낮은 순(창업자가 "가장 싸게 시작하는" 관점으로 훑기 좋게).
export const pricingEntries: PricingEntry[] = [
  {
    id: "unitree-r1",
    robotId: "unitree-r1",
    model: "Unitree R1",
    maker: "Unitree Robotics",
    country: "China",
    priceLabel: "US$5,900 (스탠다드)",
    basis: "purchase",
    availability: "판매 중(주문)",
    note: "2025년 7월 공개된 현존 최저가급 풀사이즈 이족 로봇. EDU 구성은 약 US$10,500.",
    sources: [
      { url: "https://www.therobotreport.com/unitree-designs-r1-humanoid-robot-to-be-agile-and-affordable/", fetchedAt: "2026-10-29T00:00:00.000Z", verified: true },
      { url: "https://shop.unitree.com/", fetchedAt: "2026-10-29T00:00:00.000Z", verified: false },
    ],
  },
  {
    id: "unitree-g1",
    robotId: "unitree-g1",
    model: "Unitree G1",
    maker: "Unitree Robotics",
    country: "China",
    priceLabel: "US$13,500–16,000 (기본형)",
    basis: "purchase",
    availability: "판매 중",
    note: "2024년 양산. 연구·개발 플랫폼으로 널리 보급. 프로그래밍용 EDU 구성은 더 높은 가격대.",
    sources: [
      { url: "https://www.unitree.com/g1", fetchedAt: "2026-10-29T00:00:00.000Z", verified: true },
    ],
  },
  {
    id: "1x-neo",
    robotId: "neo",
    model: "1X NEO",
    maker: "1X Technologies",
    country: "Norway",
    priceLabel: "US$20,000 또는 월 US$499(구독)",
    basis: "subscription",
    availability: "사전예약(2026 배송 예정)",
    note: "2025년 10월 가정용 모델 사전예약 개시. 현재 다수 작업은 원격조작(텔레오퍼레이션) 보조가 필요.",
    sources: [
      { url: "https://en.wikipedia.org/wiki/1X_Technologies", fetchedAt: "2026-10-29T00:00:00.000Z", verified: true },
      { url: "https://www.engadget.com/ai/1x-neo-is-a-20000-home-robot-that-will-learn-chores-via-teleoperation-040252200.html", fetchedAt: "2026-10-29T00:00:00.000Z", verified: false },
    ],
  },
  {
    id: "figure-03",
    robotId: "figure-03",
    model: "Figure 03",
    maker: "Figure AI",
    country: "United States",
    priceLabel: "월 약 US$600 (가정용 리스)",
    basis: "lease",
    availability: "출하·리스 확대 중",
    note: "2025년 10월 공개. 자체 AI(Helix)·가정 사용·대량 생산을 목표. 2026년 들어 출하량 확대.",
    sources: [
      { url: "https://en.wikipedia.org/wiki/Figure_AI", fetchedAt: "2026-10-29T00:00:00.000Z", verified: true },
    ],
  },
  {
    id: "unitree-h1",
    robotId: "unitree-h1",
    model: "Unitree H1",
    maker: "Unitree Robotics",
    country: "China",
    priceLabel: "US$90,000 (견적 문의)",
    basis: "contact",
    availability: "견적 문의(후속 H2는 약 US$29,900)",
    note: "고성능 풀사이즈 모델. 공식 스토어에 가격 표기는 있으나 직접 온라인 구매가 아닌 영업 문의 방식.",
    sources: [
      { url: "https://shop.unitree.com/products/unitree-h1", fetchedAt: "2026-10-29T00:00:00.000Z", verified: true },
    ],
  },
];

// 카탈로그 로봇 id 로 해당 가격 정보를 찾는다(상세 페이지의 가격 배지용). 없으면 undefined.
export function pricingEntryFor(robotId: string): PricingEntry | undefined {
  return pricingEntries.find((e) => e.robotId === robotId);
}
