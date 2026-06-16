export type ResearchCategory =
  | "labs"
  | "conferences"
  | "datasets"
  | "papers";

export type ResearchItem = {
  id: string;
  name: string;
  category: ResearchCategory;
  description: string;
  website: string;
  tags: string[];
  featured?: boolean;
  country?: string;
  year?: number;
  authors?: string;
};

export const categoryLabels: Record<
  ResearchCategory,
  { ko: string; en: string; icon: string }
> = {
  labs: { ko: "연구소", en: "Research Labs", icon: "🏛️" },
  conferences: { ko: "학회", en: "Conferences", icon: "📢" },
  datasets: { ko: "데이터셋", en: "Datasets", icon: "🗄️" },
  papers: { ko: "핵심 논문", en: "Key Papers", icon: "📄" },
};

export const researchItems: ResearchItem[] = [
  // ── 연구소 ──────────────────────────────────────────────────────────────────
  {
    id: "kaist-hubo",
    name: "KAIST 휴보 연구소",
    category: "labs",
    description:
      "오준호 교수 주도. 한국 최초 이족보행 로봇 HUBO 개발·DRC 우승(2015). 고관절·보행 제어 원천 기술 보유.",
    website: "https://hubolab.kaist.ac.kr",
    tags: ["이족보행", "HUBO", "WBC", "한국"],
    featured: true,
    country: "KR",
  },
  {
    id: "snu-dyros",
    name: "서울대 DYROS Lab",
    category: "labs",
    description:
      "공현수 교수 주도. 전신 제어(Whole-Body Control)·TOCABI 로봇 개발. 오픈소스 WBC 스택 공개.",
    website: "https://dyros.snu.ac.kr",
    tags: ["WBC", "TOCABI", "한국", "오픈소스"],
    featured: true,
    country: "KR",
  },
  {
    id: "eth-rsl",
    name: "ETH Zurich RSL",
    category: "labs",
    description:
      "Marco Hutter 교수. ANYmal 사족보행 로봇·DRL 기반 보행 학습 연구 선도. legged_gym/isaacgym 프레임워크 공개.",
    website: "https://rsl.ethz.ch",
    tags: ["ANYmal", "DRL", "보행 학습", "legged_gym"],
    featured: true,
    country: "CH",
  },
  {
    id: "berkeley-bair",
    name: "UC Berkeley BAIR",
    category: "labs",
    description:
      "Berkeley Artificial Intelligence Research. RT-X·Dex-Net·RLPD 등 로봇 조작·임모방 학습 원천 연구.",
    website: "https://bair.berkeley.edu",
    tags: ["조작", "모방 학습", "RT-X", "RL"],
    country: "US",
  },
  {
    id: "cmu-ri",
    name: "CMU Robotics Institute",
    category: "labs",
    description:
      "세계 최대 규모 로봇 연구소. 자율주행·제조·휴머노이드 전 분야 커버. DARPA 챌린지 다수 수상.",
    website: "https://ri.cmu.edu",
    tags: ["자율주행", "제조", "DARPA"],
    country: "US",
  },
  {
    id: "mit-csail",
    name: "MIT CSAIL",
    category: "labs",
    description:
      "컴퓨터 과학·AI 통합 연구소. Russ Tedrake 그룹의 Drake 툴킷·최적화 제어 연구 선도.",
    website: "https://www.csail.mit.edu",
    tags: ["Drake", "최적화 제어", "MPC"],
    country: "US",
  },
  {
    id: "deepmind-robotics",
    name: "Google DeepMind Robotics",
    category: "labs",
    description:
      "RT-1·RT-2·SayCan 등 언어-행동 통합 기반 로봇 조작 연구. 대규모 모방 학습 데이터셋 Open X-Embodiment 공개.",
    website: "https://deepmind.google/research/robotics",
    tags: ["RT-2", "VLA", "모방 학습", "Open X-Embodiment"],
    country: "UK",
  },
  {
    id: "bd-ai-institute",
    name: "Boston Dynamics AI Institute",
    category: "labs",
    description:
      "현대차그룹 지원 독립 연구 기관. Atlas 동적 보행 제어·접촉 계획·지각-행동 통합 연구.",
    website: "https://theaiinstitute.com",
    tags: ["Atlas", "동적 보행", "접촉 계획"],
    country: "US",
  },

  // ── 학회 ────────────────────────────────────────────────────────────────────
  {
    id: "icra",
    name: "ICRA",
    category: "conferences",
    description:
      "IEEE International Conference on Robotics and Automation. 매년 5월 개최. 로봇공학 최대 규모 학회(3,000+ 논문 제출).",
    website: "https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra",
    tags: ["IEEE", "이족보행", "조작", "SLAM", "연간"],
    featured: true,
  },
  {
    id: "humanoids",
    name: "Humanoids",
    category: "conferences",
    description:
      "IEEE-RAS International Conference on Humanoid Robots. 휴머노이드 로봇 전문 학회. 매년 11월 개최.",
    website: "https://www.ieee-ras.org/conferences-workshops/fully-sponsored/humanoids",
    tags: ["IEEE", "휴머노이드 전문", "연간"],
    featured: true,
  },
  {
    id: "rss",
    name: "RSS",
    category: "conferences",
    description:
      "Robotics: Science and Systems. 매년 7월. 소규모 단일 트랙으로 acceptance rate 낮고 논문 품질 높음.",
    website: "https://roboticsconference.org",
    tags: ["고품질", "단일 트랙", "연간"],
    featured: true,
  },
  {
    id: "corl",
    name: "CoRL",
    category: "conferences",
    description:
      "Conference on Robot Learning. 매년 11월. 강화학습·모방 학습·기반 모델의 로봇 응용 핵심 발표지.",
    website: "https://www.robot-learning.org",
    tags: ["RL", "모방 학습", "기반 모델", "연간"],
    featured: true,
  },
  {
    id: "iros",
    name: "IROS",
    category: "conferences",
    description:
      "IEEE/RSJ International Conference on Intelligent Robots and Systems. 매년 10월. ICRA와 함께 양대 로봇 학회.",
    website: "https://www.iros.org",
    tags: ["IEEE", "SLAM", "센서 융합", "연간"],
  },
  {
    id: "iclr",
    name: "ICLR",
    category: "conferences",
    description:
      "International Conference on Learning Representations. 로봇이 주제는 아니나 강화학습·트랜스포머 기반 제어 핵심 논문 다수 발표.",
    website: "https://iclr.cc",
    tags: ["RL", "트랜스포머", "딥러닝"],
  },

  // ── 데이터셋 ─────────────────────────────────────────────────────────────────
  {
    id: "open-x-embodiment",
    name: "Open X-Embodiment",
    category: "datasets",
    description:
      "Google 주도 컨소시엄. 22종 로봇, 1M+ 에피소드, 60개 데이터셋 통합. VLA 사전학습 표준 데이터셋.",
    website: "https://robotics-transformer-x.github.io",
    tags: ["조작", "모방 학습", "1M+ 에피소드", "Google"],
    featured: true,
    year: 2023,
    authors: "Open X-Embodiment Collaboration",
  },
  {
    id: "amass",
    name: "AMASS",
    category: "datasets",
    description:
      "Archive of Motion Capture as Surface Shapes. 40시간+ 인간 동작 모캡 통합(15개 기존 데이터셋). SMPL 파라미터화. 보행·물리 시뮬레이션 기준 데이터.",
    website: "https://amass.is.tue.mpg.de",
    tags: ["모캡", "SMPL", "보행", "동작 생성"],
    featured: true,
    year: 2019,
    authors: "Mahmood et al.",
  },
  {
    id: "rh20t",
    name: "RH20T",
    category: "datasets",
    description:
      "110,000+ 로봇 시연 클립. 힘·토크 센서 포함 멀티모달 조작 데이터. 한-중-영 다국어 명령어 포함.",
    website: "https://rh20t.github.io",
    tags: ["조작", "힘 토크", "멀티모달"],
    year: 2023,
    authors: "Fang et al.",
  },
  {
    id: "droid",
    name: "DROID",
    category: "datasets",
    description:
      "Distributed Robot Interaction Dataset. 76,000+ 궤적, 350+ 장면, 7-DOF 로봇 팔. 다양한 환경 조작 학습용.",
    website: "https://droid-dataset.github.io",
    tags: ["조작", "7-DOF", "다양성"],
    year: 2024,
    authors: "Khazatsky et al.",
  },
  {
    id: "cmu-mocap",
    name: "CMU MoCap Database",
    category: "datasets",
    description:
      "카네기멜론 대학교 무료 공개 모캡 DB. 2,605개 시퀀스, 144개 피실험자. 보행·스포츠·일상 동작 포함. DeepMimic 등 물리 캐릭터 연구에 표준 사용.",
    website: "http://mocap.cs.cmu.edu",
    tags: ["모캡", "무료", "보행", "DeepMimic"],
    year: 2003,
  },

  // ── 핵심 논문 ────────────────────────────────────────────────────────────────
  {
    id: "learning-to-walk",
    name: "Learning to Walk in Minutes Using Massively Parallel Deep RL",
    category: "papers",
    description:
      "ETH Zurich / NVIDIA. Isaac Gym 기반 4,096개 환경 병렬 DRL로 사족 보행 10분 내 학습. legged_gym 오픈소스 공개. 현재 이족 보행 학습 연구의 기반.",
    website: "https://arxiv.org/abs/2109.11978",
    tags: ["DRL", "병렬 훈련", "Isaac Gym", "사족"],
    featured: true,
    year: 2021,
    authors: "Kumar et al. (ETH / NVIDIA)",
  },
  {
    id: "humanoid-next-token",
    name: "Humanoid Locomotion as Next Token Prediction",
    category: "papers",
    description:
      "Figure AI. GPT 스타일 트랜스포머로 휴머노이드 보행 동작 시퀀스를 예측. 언어 모델링 기법을 모션 생성에 직접 적용.",
    website: "https://arxiv.org/abs/2402.18423",
    tags: ["트랜스포머", "VLA", "이족보행", "Figure AI"],
    featured: true,
    year: 2024,
    authors: "Radosavovic et al. (Figure AI / UC Berkeley)",
  },
  {
    id: "rt2",
    name: "RT-2: Vision-Language-Action Models",
    category: "papers",
    description:
      "Google DeepMind. 웹 규모 VLM(PaLI-X, PaLM-E)을 직접 로봇 행동 생성에 파인튜닝. 언어 명령→로봇 액션 직접 매핑.",
    website: "https://arxiv.org/abs/2307.15818",
    tags: ["VLA", "LLM", "조작", "Google"],
    featured: true,
    year: 2023,
    authors: "Brohan et al. (Google DeepMind)",
  },
  {
    id: "ppo",
    name: "Proximal Policy Optimization Algorithms",
    category: "papers",
    description:
      "OpenAI. 현재 로봇 보행 DRL의 사실상 표준 알고리즘. clip 기반으로 안정적 업데이트 보장. Isaac Gym/Gym 환경 기본 베이스라인.",
    website: "https://arxiv.org/abs/1707.06347",
    tags: ["PPO", "RL 알고리즘", "기초"],
    year: 2017,
    authors: "Schulman et al. (OpenAI)",
  },
  {
    id: "mujoco",
    name: "MuJoCo: A Physics Engine for Model-Based Control",
    category: "papers",
    description:
      "Todorov et al. 접촉 동역학·관절 시뮬레이션 엔진. 2022년 DeepMind 인수 후 오픈소스 공개. 로봇 시뮬레이션 학계 표준.",
    website: "https://arxiv.org/abs/1310.1368",
    tags: ["시뮬레이션", "물리 엔진", "오픈소스"],
    year: 2012,
    authors: "Todorov et al.",
  },
  {
    id: "deepmimic",
    name: "DeepMimic: Example-Guided Deep RL of Physics-Based Character Skills",
    category: "papers",
    description:
      "UC Berkeley. 모캡 레퍼런스 모션을 RL로 모방해 자연스러운 물리 캐릭터 동작 생성. 참조 모션 추종 보상 설계의 원형.",
    website: "https://arxiv.org/abs/1804.02717",
    tags: ["모방 학습", "모캡", "물리 시뮬레이션"],
    year: 2018,
    authors: "Peng et al. (UC Berkeley)",
  },
];
