// 휴머노이드 로봇 분야의 핵심 용어집. /glossary 페이지가 분류별로 렌더한다.
// 왜 별도 페이지인가:
//   - guide = "휴머노이드란?" 개괄 설명(서사형)
//   - models/software/research = 특정 대상(모델·도구·생태계) 카탈로그
//   - glossary(여기) = 다른 페이지를 읽다 마주치는 "용어" 자체를 한곳에서 찾아보게 한다
// 특정 제품 홍보가 아니라, 분야에서 널리 쓰이는 개념을 중립적·교육적으로 정의한다.

export type GlossaryCategory =
  | "basics" // 기본 개념
  | "hardware" // 하드웨어·구동
  | "control" // 제어·이동
  | "ai" // 인식·학습
  | "safety"; // 안전·운용

export type GlossaryTerm = {
  id: string;
  category: GlossaryCategory;
  term: string; // 한국어 용어
  termEn: string; // 영어 용어(원어)
  abbr?: string; // 약어(선택)
  definition: string; // 한 줄~두 줄 정의
  seeAlso?: string[]; // 관련 용어 id(선택)
};

export const categoryLabels: Record<
  GlossaryCategory,
  { ko: string; en: string; icon: string }
> = {
  basics: { ko: "기본 개념", en: "Basics", icon: "📘" },
  hardware: { ko: "하드웨어·구동", en: "Hardware & Actuation", icon: "⚙️" },
  control: { ko: "제어·이동", en: "Control & Locomotion", icon: "🎛️" },
  ai: { ko: "인식·학습", en: "Perception & Learning", icon: "🧠" },
  safety: { ko: "안전·운용", en: "Safety & Operation", icon: "🛡️" },
};

// 분류 렌더 순서.
export const categoryOrder: GlossaryCategory[] = [
  "basics",
  "hardware",
  "control",
  "ai",
  "safety",
];

export const glossaryTerms: GlossaryTerm[] = [
  // ── 기본 개념 ──────────────────────────────────────────
  {
    id: "humanoid",
    category: "basics",
    term: "휴머노이드",
    termEn: "Humanoid",
    definition:
      "머리·몸통·두 팔·두 다리처럼 사람과 유사한 형태를 가진 로봇. 사람이 쓰는 환경·도구를 그대로 활용하려는 목적이 크다.",
    seeAlso: ["biped", "eef"],
  },
  {
    id: "dof",
    category: "basics",
    term: "자유도",
    termEn: "Degrees of Freedom",
    abbr: "DoF",
    definition:
      "로봇이 독립적으로 움직일 수 있는 관절·축의 수. 자유도가 높을수록 복잡한 자세와 동작이 가능하지만 제어도 어려워진다.",
    seeAlso: ["joint", "kinematics"],
  },
  {
    id: "biped",
    category: "basics",
    term: "이족보행",
    termEn: "Bipedal Locomotion",
    definition:
      "두 다리로 균형을 잡으며 걷는 이동 방식. 계단·문턱 같은 사람 중심 환경에 적합하지만 균형 제어가 까다롭다.",
    seeAlso: ["zmp", "com"],
  },
  {
    id: "embodiment",
    category: "basics",
    term: "임바디먼트",
    termEn: "Embodiment",
    definition:
      "지능이 특정한 물리적 '몸'을 통해 세계와 상호작용한다는 개념. 같은 AI 정책을 여러 로봇 몸체에 적용하는 '크로스-임바디먼트' 연구로 이어진다.",
  },

  // ── 하드웨어·구동 ──────────────────────────────────────
  {
    id: "actuator",
    category: "hardware",
    term: "액추에이터",
    termEn: "Actuator",
    definition:
      "전기·유압 등의 에너지를 실제 움직임(회전·직선)으로 바꾸는 구동 장치. 로봇 관절의 '근육'에 해당한다.",
    seeAlso: ["joint", "torque"],
  },
  {
    id: "joint",
    category: "hardware",
    term: "관절",
    termEn: "Joint",
    definition:
      "두 링크를 연결해 상대 운동을 만드는 부위. 회전형(revolute)·직선형(prismatic)이 대표적이며, 각 관절이 보통 1 자유도를 담당한다.",
    seeAlso: ["dof", "actuator"],
  },
  {
    id: "torque",
    category: "hardware",
    term: "토크",
    termEn: "Torque",
    definition:
      "회전축을 돌리는 힘의 크기. 로봇이 무게를 들거나 자세를 버티는 능력을 좌우하며, 고토크·저감속 액추에이터가 최근 화두다.",
    seeAlso: ["actuator"],
  },
  {
    id: "eef",
    category: "hardware",
    term: "엔드이펙터",
    termEn: "End-Effector",
    abbr: "EEF",
    definition:
      "팔 끝에서 실제 작업을 수행하는 부위(그리퍼·손 등). 무엇을 집고 조작하느냐에 따라 형태가 크게 달라진다.",
    seeAlso: ["manipulation"],
  },
  {
    id: "imu",
    category: "hardware",
    term: "관성측정장치",
    termEn: "Inertial Measurement Unit",
    abbr: "IMU",
    definition:
      "가속도계·자이로로 자세와 가속도를 측정하는 센서. 균형 제어와 자세 추정의 기본 입력이 된다.",
    seeAlso: ["zmp"],
  },

  // ── 제어·이동 ──────────────────────────────────────────
  {
    id: "kinematics",
    category: "control",
    term: "기구학",
    termEn: "Kinematics",
    definition:
      "관절 값과 말단 위치·자세의 관계를 힘을 고려하지 않고 다루는 분야. 목표 위치로부터 관절 값을 푸는 것을 역기구학이라 한다.",
    seeAlso: ["dof", "joint"],
  },
  {
    id: "zmp",
    category: "control",
    term: "영점 모멘트 지점",
    termEn: "Zero Moment Point",
    abbr: "ZMP",
    definition:
      "발이 땅에 닿는 면에서 관성·중력의 합력이 만드는 모멘트가 0이 되는 점. 이 점이 지지면 안에 있으면 넘어지지 않는다고 본다.",
    seeAlso: ["biped", "com"],
  },
  {
    id: "com",
    category: "control",
    term: "무게중심",
    termEn: "Center of Mass",
    abbr: "CoM",
    definition:
      "전체 질량이 한 점에 모였다고 볼 수 있는 지점. 걷기·균형 제어는 대부분 이 점의 궤적을 어떻게 잡느냐로 귀결된다.",
    seeAlso: ["zmp", "biped"],
  },
  {
    id: "wbc",
    category: "control",
    term: "전신 제어",
    termEn: "Whole-Body Control",
    abbr: "WBC",
    definition:
      "여러 목표(균형·자세·접촉력)를 동시에 만족시키도록 모든 관절을 함께 계산하는 제어 기법.",
    seeAlso: ["torque", "zmp"],
  },
  {
    id: "teleop",
    category: "control",
    term: "원격조작",
    termEn: "Teleoperation",
    definition:
      "사람이 원격에서 로봇을 직접 조종하는 것. 시연 데이터를 모아 학습(모방학습)에 활용하는 통로로도 쓰인다.",
    seeAlso: ["imitation"],
  },

  // ── 인식·학습 ──────────────────────────────────────────
  {
    id: "manipulation",
    category: "ai",
    term: "조작",
    termEn: "Manipulation",
    definition:
      "물체를 집고 옮기고 조립하는 등 손·팔로 환경을 다루는 능력. 휴머노이드가 '일'을 하려면 반드시 필요한 역량이다.",
    seeAlso: ["eef", "vla"],
  },
  {
    id: "vla",
    category: "ai",
    term: "시각-언어-행동 모델",
    termEn: "Vision-Language-Action",
    abbr: "VLA",
    definition:
      "카메라 영상과 언어 지시를 함께 받아 로봇의 행동을 직접 출력하는 모델. 최근 범용 로봇 지능의 핵심 접근으로 주목받는다.",
    seeAlso: ["manipulation", "imitation"],
  },
  {
    id: "imitation",
    category: "ai",
    term: "모방학습",
    termEn: "Imitation Learning",
    definition:
      "사람의 시연을 보고 따라 하도록 정책을 학습하는 방식. 원격조작으로 모은 데이터가 주요 학습 재료가 된다.",
    seeAlso: ["teleop", "sim2real"],
  },
  {
    id: "rl",
    category: "ai",
    term: "강화학습",
    termEn: "Reinforcement Learning",
    abbr: "RL",
    definition:
      "보상을 최대화하도록 시행착오로 정책을 학습하는 방식. 걷기·균형 같은 제어를 시뮬레이션에서 익히는 데 널리 쓰인다.",
    seeAlso: ["sim2real"],
  },
  {
    id: "sim2real",
    category: "ai",
    term: "시뮬레이션-실물 전이",
    termEn: "Sim-to-Real",
    definition:
      "가상 시뮬레이션에서 학습한 정책을 실제 로봇에 옮기는 것. 물리 차이(reality gap)를 줄이는 것이 관건이다.",
    seeAlso: ["rl"],
  },

  // ── 안전·운용 ──────────────────────────────────────────
  {
    id: "estop",
    category: "safety",
    term: "비상정지",
    termEn: "Emergency Stop",
    abbr: "E-Stop",
    definition:
      "위험 상황에서 로봇의 동력을 즉시 끊는 안전 장치. 사람과 함께 일하는 로봇의 기본 요구사항이다.",
  },
  {
    id: "cobot",
    category: "safety",
    term: "협동로봇",
    termEn: "Collaborative Robot",
    abbr: "Cobot",
    definition:
      "안전 펜스 없이 사람과 같은 공간에서 함께 작업하도록 설계된 로봇. 접촉을 감지해 힘을 낮추는 기능이 핵심이다.",
    seeAlso: ["estop"],
  },
  {
    id: "payload",
    category: "safety",
    term: "가반하중",
    termEn: "Payload",
    definition:
      "로봇이 안정적으로 들거나 운반할 수 있는 최대 무게. 작업 가능 범위를 가늠하는 대표 스펙 중 하나다.",
    seeAlso: ["torque"],
  },
];
