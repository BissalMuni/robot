// 휴머노이드·로봇을 움직이는 AI "모델" 카탈로그. /models 페이지가 분류별로 렌더한다.
// 왜 /software·/research 와 다른가:
//   - software = 개발에 쓰는 "도구·프레임워크"(ROS·PyTorch·시뮬레이터 등)
//   - research = 연구소·학회·데이터셋·논문 등 "생태계"
//   - models(여기) = 실제 로봇의 인식·판단·동작을 담당하는 "학습된 모델" 그 자체
// 특정 제품 홍보가 아니라, 분야에 큰 영향을 준 대표 모델을 중립적으로 정리한다.

export type ModelCategory =
  | "vla" // 시각-언어-행동(Vision-Language-Action)
  | "humanoid" // 휴머노이드 범용·전신 모델
  | "manipulation" // 조작 정책 모델
  | "foundation"; // 크로스-임바디먼트 파운데이션

// 성숙도. established=널리 인용·활용되는 확립 모델 · emerging=활발히 연구·확산 중인 신흥 모델.
export type ModelMaturity = "established" | "emerging";

export type RobotModel = {
  id: string;
  category: ModelCategory;
  maturity: ModelMaturity;
  name: string; // 모델 이름
  developer: string; // 개발 주체
  year: number; // 공개 연도
  summary: string; // 한 줄 설명(무엇인가)
  highlights: string[]; // 핵심 요점(왜 중요한가)
  tags: string[]; // 표시용 태그
  url?: string; // 대표 논문·자료(선택)
};

export const categoryLabels: Record<
  ModelCategory,
  { ko: string; en: string; icon: string }
> = {
  vla: { ko: "시각-언어-행동(VLA)", en: "Vision-Language-Action", icon: "👁️" },
  humanoid: { ko: "휴머노이드 범용 모델", en: "Humanoid Generalist", icon: "🤖" },
  manipulation: { ko: "조작 정책", en: "Manipulation Policy", icon: "🦾" },
  foundation: { ko: "크로스-임바디먼트", en: "Cross-Embodiment", icon: "🌐" },
};

// 분류 렌더 순서.
export const categoryOrder: ModelCategory[] = [
  "vla",
  "humanoid",
  "manipulation",
  "foundation",
];

export const maturityLabels: Record<
  ModelMaturity,
  { ko: string; badge: string }
> = {
  // 널리 인용·활용되는 확립 모델
  established: {
    ko: "확립",
    badge:
      "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  },
  // 활발히 연구·확산 중인 신흥 모델
  emerging: {
    ko: "신흥",
    badge:
      "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300",
  },
};

export const robotModels: RobotModel[] = [
  // ── 시각-언어-행동(VLA) ─────────────────────────────────────────────────
  {
    id: "rt-2",
    category: "vla",
    maturity: "established",
    name: "RT-2",
    developer: "Google DeepMind",
    year: 2023,
    summary:
      "웹 규모로 사전학습한 시각-언어 모델에 로봇 행동을 함께 학습시켜, 보지 못한 지시도 일반화하도록 만든 대표적 VLA.",
    highlights: [
      "인터넷 지식을 로봇 제어로 전이한다는 발상을 대중화",
      "이후 등장한 다수 VLA 연구의 기준점이 됨",
    ],
    tags: ["VLA", "일반화", "웹 사전학습"],
    url: "https://arxiv.org/abs/2307.15818",
  },
  {
    id: "openvla",
    category: "vla",
    maturity: "emerging",
    name: "OpenVLA",
    developer: "Stanford·UC Berkeley 등",
    year: 2024,
    summary:
      "오픈 가중치로 공개된 7B급 VLA. 대규모 로봇 시연 데이터로 학습해 미세조정·재현 연구를 쉽게 만들었다.",
    highlights: [
      "가중치·코드 공개로 접근성을 크게 높임",
      "적은 자원으로 미세조정 가능한 실용성 강조",
    ],
    tags: ["VLA", "오픈소스", "미세조정"],
    url: "https://arxiv.org/abs/2406.09246",
  },
  {
    id: "pi-zero",
    category: "vla",
    maturity: "emerging",
    name: "π0 (pi-zero)",
    developer: "Physical Intelligence",
    year: 2024,
    summary:
      "플로우 매칭으로 연속적인 행동을 생성하는 VLA. 다양한 로봇·과제에서 정교한 조작을 목표로 한다.",
    highlights: [
      "이산 토큰이 아닌 연속 행동 생성으로 부드러운 조작",
      "여러 로봇 플랫폼에 걸친 범용성 지향",
    ],
    tags: ["VLA", "flow matching", "조작"],
    url: "https://arxiv.org/abs/2410.24164",
  },

  // ── 휴머노이드 범용 모델 ────────────────────────────────────────────────
  {
    id: "groot-n1",
    category: "humanoid",
    maturity: "emerging",
    name: "GR00T N1",
    developer: "NVIDIA",
    year: 2025,
    summary:
      "휴머노이드를 겨냥한 오픈 파운데이션 모델. 인식·추론을 담당하는 느린 경로와 동작을 생성하는 빠른 경로로 구성된다.",
    highlights: [
      "휴머노이드 전용 범용 모델을 표방",
      "시뮬레이션·실물 데이터를 함께 활용하는 파이프라인",
    ],
    tags: ["휴머노이드", "파운데이션", "듀얼 시스템"],
    url: "https://arxiv.org/abs/2503.14734",
  },
  {
    id: "helix",
    category: "humanoid",
    maturity: "emerging",
    name: "Helix",
    developer: "Figure AI",
    year: 2025,
    summary:
      "휴머노이드 상체 전신 제어를 목표로 한 VLA. 지각과 고빈도 제어를 결합해 가정·산업 과제를 다룬다.",
    highlights: [
      "상체 다관절을 고빈도로 제어하는 것을 강조",
      "언어 지시 기반의 협동 작업 시연",
    ],
    tags: ["휴머노이드", "VLA", "전신 제어"],
  },

  // ── 조작 정책 ───────────────────────────────────────────────────────────
  {
    id: "rt-1",
    category: "manipulation",
    maturity: "established",
    name: "RT-1",
    developer: "Google",
    year: 2022,
    summary:
      "대규모 실물 시연 데이터를 트랜스포머로 학습한 로봇 조작 정책. 데이터 규모가 일반화로 이어짐을 보였다.",
    highlights: [
      "로봇 조작에 '데이터 스케일링' 관점을 도입",
      "RT-2 등 후속 VLA 계보의 출발점",
    ],
    tags: ["트랜스포머", "조작", "스케일링"],
    url: "https://arxiv.org/abs/2212.06817",
  },
  {
    id: "diffusion-policy",
    category: "manipulation",
    maturity: "established",
    name: "Diffusion Policy",
    developer: "Columbia·MIT·TRI 등",
    year: 2023,
    summary:
      "행동을 확산(diffusion) 과정으로 생성하는 모방학습 정책. 다중 모드 동작을 안정적으로 학습한다.",
    highlights: [
      "여러 갈래의 정답 동작을 동시에 표현 가능",
      "정밀 조작 모방학습에서 강한 성능",
    ],
    tags: ["diffusion", "모방학습", "조작"],
    url: "https://arxiv.org/abs/2303.04137",
  },
  {
    id: "act-aloha",
    category: "manipulation",
    maturity: "established",
    name: "ACT (Action Chunking)",
    developer: "Stanford (ALOHA)",
    year: 2023,
    summary:
      "행동을 청크 단위로 예측해 오차 누적을 줄인 모방학습 기법. 저비용 양팔 원격조작 시연과 함께 제안됐다.",
    highlights: [
      "행동 청킹으로 장기 과제의 표류(drift)를 완화",
      "저가 하드웨어로도 정밀 양팔 조작 학습을 보임",
    ],
    tags: ["action chunking", "모방학습", "양팔"],
    url: "https://arxiv.org/abs/2304.13705",
  },

  // ── 크로스-임바디먼트 ───────────────────────────────────────────────────
  {
    id: "open-x-embodiment",
    category: "foundation",
    maturity: "established",
    name: "Open X-Embodiment / RT-X",
    developer: "다기관 공동 (Google DeepMind 주도)",
    year: 2023,
    summary:
      "여러 기관의 로봇 데이터를 통합한 대규모 공개 데이터셋과, 이를 학습한 크로스-임바디먼트 모델(RT-X).",
    highlights: [
      "서로 다른 로봇의 데이터를 함께 학습하면 성능이 오른다는 것을 보임",
      "로봇 학습의 '공동 데이터' 흐름을 촉발",
    ],
    tags: ["데이터셋", "크로스-임바디먼트", "공개"],
    url: "https://arxiv.org/abs/2310.08864",
  },
];
