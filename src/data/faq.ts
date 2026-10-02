// 휴머노이드 로봇에 대해 자주 묻는 질문(FAQ). /faq 페이지가 분류별로 렌더하고,
// schema.org FAQPage 구조화 데이터로도 노출한다.
// 특정 제품 홍보가 아니라, 분야 전반에 대한 중립적·일반적 설명을 담는다.

export type FaqCategory = "basics" | "buying" | "tech" | "safety";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string; // 한두 문단의 평문(마크업 없음)
};

export const categoryLabels: Record<
  FaqCategory,
  { ko: string; en: string; icon: string }
> = {
  basics: { ko: "기본", en: "Basics", icon: "📘" },
  buying: { ko: "구매·비용", en: "Buying & Cost", icon: "💰" },
  tech: { ko: "기술", en: "Technology", icon: "⚙️" },
  safety: { ko: "안전·윤리", en: "Safety & Ethics", icon: "🛡️" },
};

// 분류 렌더 순서.
export const categoryOrder: FaqCategory[] = [
  "basics",
  "buying",
  "tech",
  "safety",
];

export const faqItems: FaqItem[] = [
  // ── 기본 ──────────────────────────────────────────────
  {
    id: "what-is-humanoid",
    category: "basics",
    question: "휴머노이드 로봇이란 무엇인가요?",
    answer:
      "사람과 유사한 형태(머리·몸통·두 팔·두 다리)를 가진 로봇을 말합니다. 사람이 쓰도록 만들어진 환경과 도구를 그대로 활용하기 위해 사람의 몸을 닮게 설계합니다. 바퀴형·고정형 로봇과 달리 계단·문·손잡이 같은 사람 중심 공간에 적응하는 것을 목표로 합니다.",
  },
  {
    id: "humanoid-vs-industrial",
    category: "basics",
    question: "기존 산업용 로봇팔과는 어떻게 다른가요?",
    answer:
      "산업용 로봇팔은 정해진 자리에서 반복 작업을 매우 빠르고 정확하게 수행하도록 특화되어 있습니다. 반면 휴머노이드는 한 가지 작업에 고정되지 않고, 이동하며 다양한 작업을 범용적으로 처리하는 것을 지향합니다. 그만큼 균형·인식·범용 제어가 더 어렵습니다.",
  },
  {
    id: "why-now",
    category: "basics",
    question: "왜 최근 들어 휴머노이드가 주목받나요?",
    answer:
      "액추에이터·배터리 같은 하드웨어 원가가 내려가고, 영상·언어를 함께 다루는 AI 모델이 빠르게 발전하면서 '범용 동작'의 현실성이 높아졌기 때문입니다. 여러 기업이 양산을 목표로 시제품을 공개하며 경쟁이 가속되고 있습니다.",
  },

  // ── 구매·비용 ──────────────────────────────────────────
  {
    id: "can-i-buy",
    category: "buying",
    question: "일반 소비자가 휴머노이드 로봇을 살 수 있나요?",
    answer:
      "대부분은 아직 연구기관·기업 대상의 한정 판매나 시범 운영 단계입니다. 일부 소형·교육용 모델은 개인이 구매할 수 있지만, 전신 범용 휴머노이드의 일반 소비자 판매는 초기 단계입니다. 구체적인 판매 여부는 각 제조사 공지를 확인해야 합니다.",
  },
  {
    id: "how-much",
    category: "buying",
    question: "가격은 어느 정도인가요?",
    answer:
      "모델과 사양에 따라 편차가 매우 큽니다. 교육·연구용 소형 모델은 상대적으로 저렴하지만, 전신 범용 휴머노이드는 아직 고가이며 제조사들은 양산을 통해 가격을 크게 낮추는 것을 목표로 제시하고 있습니다. 이 사이트의 각 로봇 상세·스펙 비교에서 공개된 정보를 참고하세요.",
  },
  {
    id: "where-to-compare",
    category: "buying",
    question: "여러 로봇의 사양을 어떻게 비교하나요?",
    answer:
      "이 사이트의 ‘스펙 비교’ 페이지에서 키·무게·자유도·속도·가반하중·배터리를 나란히 비교할 수 있습니다. 개별 제품의 출처와 수집 시점도 상세 페이지에 함께 표기하며, 미검증 정보는 배지로 구분합니다.",
  },

  // ── 기술 ──────────────────────────────────────────────
  {
    id: "how-they-walk",
    category: "tech",
    question: "두 다리로 어떻게 균형을 잡고 걷나요?",
    answer:
      "관성측정장치(IMU)·힘 센서로 자세를 실시간 추정하고, 무게중심(CoM)과 영점 모멘트 지점(ZMP)이 안정 범위 안에 있도록 전신 제어로 모든 관절을 함께 조정합니다. 최근에는 시뮬레이션에서 강화학습으로 걷기 정책을 익힌 뒤 실제 로봇에 옮기는 방식도 널리 쓰입니다.",
  },
  {
    id: "ai-brain",
    category: "tech",
    question: "로봇의 ‘두뇌’ 역할을 하는 AI는 무엇인가요?",
    answer:
      "카메라 영상과 언어 지시를 함께 받아 행동을 출력하는 시각-언어-행동(VLA) 모델이 대표적입니다. 사람의 시연을 따라 배우는 모방학습, 보상 기반의 강화학습이 함께 쓰입니다. 자세한 모델 흐름은 ‘AI 모델’ 페이지에서 볼 수 있습니다.",
  },
  {
    id: "battery-life",
    category: "tech",
    question: "한 번 충전으로 얼마나 작동하나요?",
    answer:
      "작업 강도와 모델에 따라 다르지만 보통 수 시간 수준이며, 교체형 배터리나 도킹 충전으로 가동 시간을 늘립니다. 보행·운반처럼 힘을 많이 쓰는 작업일수록 소모가 큽니다. 공개된 값은 스펙 비교 페이지의 배터리 항목을 참고하세요.",
  },

  // ── 안전·윤리 ──────────────────────────────────────────
  {
    id: "are-they-safe",
    category: "safety",
    question: "사람 곁에서 일해도 안전한가요?",
    answer:
      "사람과 같은 공간에서 작동하는 로봇은 접촉을 감지해 힘을 낮추는 기능과 즉시 동력을 끊는 비상정지(E-Stop)를 기본으로 갖춥니다. 다만 전신 휴머노이드는 무게와 가동 범위가 커서, 운용 환경에 맞는 안전 설계와 검증이 특히 중요합니다.",
  },
  {
    id: "job-impact",
    category: "safety",
    question: "일자리에 어떤 영향을 주나요?",
    answer:
      "반복적·위험한 작업을 대체해 생산성을 높일 수 있는 반면, 일부 직무의 수요 변화를 가져올 수 있습니다. 기술 도입 속도, 재교육, 제도 설계에 따라 영향의 크기와 방향이 달라지므로 단정하기 어렵습니다.",
  },
  {
    id: "data-privacy",
    category: "safety",
    question: "카메라·센서로 수집한 데이터는 어떻게 되나요?",
    answer:
      "휴머노이드는 주변을 인식하기 위해 카메라·마이크 등 다양한 센서를 사용하므로 개인정보 보호가 중요한 쟁점입니다. 수집 범위 최소화, 저장·전송 보안, 사용자 고지와 동의 등 운용 주체의 투명한 정책이 요구됩니다.",
  },
];

// /faq 페이지용 schema.org FAQPage 구조화 데이터를 만든다.
// 검색엔진이 질문·답변 쌍을 이해해 리치 결과로 노출할 수 있게 한다.
export function faqJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
