export type CommunityCategory =
  | "forums"
  | "discord"
  | "github"
  | "youtube"
  | "newsletters";

export type CommunityItem = {
  id: string;
  name: string;
  category: CommunityCategory;
  description: string;
  website: string;
  tags: string[];
  featured?: boolean;
  members?: string;
};

export const categoryLabels: Record<
  CommunityCategory,
  { ko: string; en: string; icon: string }
> = {
  forums: { ko: "포럼·커뮤니티", en: "Forums", icon: "💬" },
  discord: { ko: "디스코드·슬랙", en: "Discord / Slack", icon: "🎙️" },
  github: { ko: "깃허브 오픈소스", en: "Open Source", icon: "⭐" },
  youtube: { ko: "유튜브 채널", en: "YouTube", icon: "▶️" },
  newsletters: { ko: "뉴스레터·블로그", en: "Newsletters", icon: "📰" },
};

export const communityItems: CommunityItem[] = [
  // ── 포럼·커뮤니티 ──────────────────────────────────────────────────────────
  {
    id: "reddit-robotics",
    name: "r/robotics",
    category: "forums",
    description:
      "Reddit 로봇공학 서브레딧. 연구·취업·프로젝트 공유가 활발한 330k+ 멤버 입문 커뮤니티.",
    website: "https://www.reddit.com/r/robotics",
    tags: ["Reddit", "입문", "뉴스"],
    featured: true,
    members: "330k+",
  },
  {
    id: "reddit-ml",
    name: "r/MachineLearning",
    category: "forums",
    description:
      "Reddit ML 서브레딧. 강화학습·로봇 학습 관련 최신 논문·연구 토론. 2M+ 멤버의 활성 커뮤니티.",
    website: "https://www.reddit.com/r/MachineLearning",
    tags: ["Reddit", "RL", "논문"],
    members: "2M+",
  },
  {
    id: "ros-discourse",
    name: "ROS Discourse",
    category: "forums",
    description:
      "ROS 공식 포럼. ROS 2 질문·이슈·패키지 발표가 이루어지는 전 세계 ROS 개발자 허브.",
    website: "https://discourse.ros.org",
    tags: ["ROS", "Q&A", "공식"],
    featured: true,
  },
  {
    id: "robotics-se",
    name: "Robotics Stack Exchange",
    category: "forums",
    description:
      "로봇공학 전문 Q&A 사이트. 키네마틱스·ROS·PID·센서 퓨전 질문에 답변 품질이 높음.",
    website: "https://robotics.stackexchange.com",
    tags: ["Q&A", "입문", "ROS"],
  },
  {
    id: "hf-forum",
    name: "Hugging Face Forums",
    category: "forums",
    description:
      "HuggingFace 공식 포럼. LeRobot·transformers·강화학습 관련 모델·코드 공유 활발.",
    website: "https://discuss.huggingface.co",
    tags: ["HuggingFace", "LeRobot", "모델 공유"],
  },

  // ── 디스코드·슬랙 ─────────────────────────────────────────────────────────
  {
    id: "hf-discord",
    name: "Hugging Face Discord",
    category: "discord",
    description:
      "HuggingFace 공식 디스코드. #lerobot 채널에서 로봇 학습 연구자·개발자와 실시간 소통.",
    website: "https://huggingface.co/join/discord",
    tags: ["LeRobot", "ML", "실시간"],
    featured: true,
  },
  {
    id: "open-robotics-discord",
    name: "Open Robotics Discord",
    category: "discord",
    description:
      "ROS·Gazebo 공식 디스코드. 개발 질문·튜토리얼·새 릴리스 알림을 실시간으로 받을 수 있는 공식 채널.",
    website: "https://discord.gg/openrobotics",
    tags: ["ROS", "Gazebo", "공식"],
    featured: true,
  },
  {
    id: "isaac-discord",
    name: "NVIDIA Omniverse Discord",
    category: "discord",
    description:
      "NVIDIA Isaac Sim·Isaac Lab 공식 디스코드. 물리 시뮬레이션·IsaacGym DRL 질문 커뮤니티.",
    website: "https://discord.gg/nvidiaomniverse",
    tags: ["IsaacLab", "시뮬레이션", "DRL"],
  },

  // ── 깃허브 오픈소스 ───────────────────────────────────────────────────────
  {
    id: "legged-gym",
    name: "legged_gym (ETH-RSL)",
    category: "github",
    description:
      "ETH Zurich RSL. Isaac Gym 기반 사족·이족 DRL 학습 환경. 이족 보행 학습 연구의 사실상 베이스라인.",
    website: "https://github.com/leggedrobotics/legged_gym",
    tags: ["DRL", "이족보행", "IsaacGym", "오픈소스"],
    featured: true,
  },
  {
    id: "isaaclab",
    name: "IsaacLab (NVIDIA)",
    category: "github",
    description:
      "NVIDIA 공식 로봇 강화학습 프레임워크. GPU 병렬 시뮬레이션·모방 학습·조작 태스크 지원.",
    website: "https://github.com/isaac-sim/IsaacLab",
    tags: ["NVIDIA", "RL", "시뮬레이션", "오픈소스"],
    featured: true,
  },
  {
    id: "genesis",
    name: "Genesis Physics Engine",
    category: "github",
    description:
      "초고속 GPU 물리 시뮬레이션 엔진. 43M FPS 달성. 유체·강체·관절 통합. 로봇 DRL 학습에 특화.",
    website: "https://github.com/Genesis-Embodied-AI/Genesis",
    tags: ["물리 엔진", "GPU", "초고속"],
    featured: true,
  },
  {
    id: "lerobot",
    name: "LeRobot (HuggingFace)",
    category: "github",
    description:
      "HuggingFace 로봇 학습 프레임워크. 모방 학습·Real-world 로봇 제어·사전학습 체크포인트 제공.",
    website: "https://github.com/huggingface/lerobot",
    tags: ["HuggingFace", "모방 학습", "오픈소스"],
  },
  {
    id: "mujoco-gh",
    name: "MuJoCo (Google DeepMind)",
    category: "github",
    description:
      "DeepMind 오픈소스 물리 시뮬레이션 엔진. Python 바인딩 완비. 접촉 동역학 학계 표준 시뮬레이터.",
    website: "https://github.com/google-deepmind/mujoco",
    tags: ["물리 엔진", "DeepMind", "오픈소스"],
  },

  // ── 유튜브 채널 ───────────────────────────────────────────────────────────
  {
    id: "boston-dynamics-yt",
    name: "Boston Dynamics",
    category: "youtube",
    description:
      "Atlas·Spot·Stretch 공식 데모 채널. 동적 보행·조작·무용 퍼포먼스 등 최신 하드웨어 데모 영상.",
    website: "https://www.youtube.com/@BostonDynamics",
    tags: ["Atlas", "Spot", "데모"],
    featured: true,
  },
  {
    id: "two-minute-papers",
    name: "Two Minute Papers",
    category: "youtube",
    description:
      "최신 AI·로봇 논문을 2분 내 알기 쉽게 설명. 시뮬레이션·강화학습·로봇 관련 영상 다수 포함.",
    website: "https://www.youtube.com/@TwoMinutePapers",
    tags: ["논문 요약", "AI", "강화학습"],
    featured: true,
  },
  {
    id: "figure-ai-yt",
    name: "Figure AI",
    category: "youtube",
    description:
      "Figure 01·02 휴머노이드 공식 채널. VLA 기반 자율 조작·작업 수행 데모를 정기 공개.",
    website: "https://www.youtube.com/@figureai",
    tags: ["Figure", "VLA", "조작"],
  },
  {
    id: "unitree-yt",
    name: "Unitree Robotics",
    category: "youtube",
    description:
      "Unitree H1·G1·Go2 공식 채널. 이족 보행 데모·파쿠르·개발자 SDK 활용 영상 다수.",
    website: "https://www.youtube.com/@unitreerobotics",
    tags: ["H1", "G1", "이족보행"],
  },

  // ── 뉴스레터·블로그 ───────────────────────────────────────────────────────
  {
    id: "import-ai",
    name: "Import AI",
    category: "newsletters",
    description:
      "Jack Clark(Anthropic 공동창업자) 주간 뉴스레터. AI 연구·로봇·정책 관련 논문 심층 분석.",
    website: "https://jack-clark.net",
    tags: ["주간", "AI 연구", "정책"],
    featured: true,
  },
  {
    id: "the-gradient",
    name: "The Gradient",
    category: "newsletters",
    description:
      "ML 연구자·실무자가 기고하는 해설 블로그. 강화학습·로봇 공학 심층 인터뷰·기고문 다수.",
    website: "https://thegradient.pub",
    tags: ["블로그", "심층 분석", "인터뷰"],
    featured: true,
  },
  {
    id: "ieee-spectrum-robotics",
    name: "IEEE Spectrum Robotics",
    category: "newsletters",
    description:
      "IEEE 공식 로봇공학 뉴스. 산업·연구 최신 로봇 소식·리뷰를 빠르게 파악할 수 있는 채널.",
    website: "https://spectrum.ieee.org/topic/robotics",
    tags: ["IEEE", "뉴스", "산업"],
  },
  {
    id: "robotics-today-seminars",
    name: "Robotics Today Seminars",
    category: "newsletters",
    description:
      "세계 유수 교수·연구자의 최신 연구 발표를 온라인 무료 스트리밍. 실시간 Q&A 포함.",
    website: "https://roboticstoday.github.io",
    tags: ["세미나", "강의", "무료"],
  },
];
