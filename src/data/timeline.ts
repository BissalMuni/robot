export type TimelineCategory =
  | "hardware"
  | "software"
  | "competition"
  | "commercial"
  | "research";

export type TimelineEvent = {
  id: string;
  year: number;
  month?: number;
  title: string;
  subtitle?: string;
  description: string;
  category: TimelineCategory;
  milestone?: boolean;
  tags: string[];
  country?: string;
  link?: string;
};

export const categoryLabels: Record<
  TimelineCategory,
  { ko: string; en: string; icon: string; color: string }
> = {
  hardware:    { ko: "하드웨어", en: "Hardware",    icon: "🤖", color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  software:    { ko: "소프트웨어", en: "Software",   icon: "💻", color: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
  competition: { ko: "대회",      en: "Competition", icon: "🏆", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
  commercial:  { ko: "상용화",    en: "Commercial",  icon: "🏭", color: "bg-green-500/10 text-green-400 border-green-500/30" },
  research:    { ko: "연구",      en: "Research",    icon: "📄", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30" },
};

export const timelineEvents: TimelineEvent[] = [
  // 1970s
  {
    id: "wabot-1",
    year: 1973,
    title: "WABOT-1",
    subtitle: "와세다 대학",
    description:
      "세계 최초의 전신 휴머노이드 로봇. 두 발로 걸으며 손으로 물체를 잡고 일본어로 대화 가능. 인공 귀·눈·입을 갖춘 최초 시도.",
    category: "hardware",
    milestone: true,
    tags: ["최초", "이족보행", "와세다", "일본"],
    country: "JP",
  },

  // 1980s
  {
    id: "wabot-2",
    year: 1984,
    title: "WABOT-2",
    subtitle: "와세다 대학",
    description:
      "악보를 읽고 전자 오르간을 연주하는 음악가 로봇. 손가락 11개로 건반·페달 동시 조작. 인간-기계 상호작용 연구의 이정표.",
    category: "hardware",
    tags: ["음악", "손가락 조작", "와세다"],
    country: "JP",
  },

  // 1990s
  {
    id: "honda-p2",
    year: 1996,
    title: "Honda P2",
    subtitle: "Honda",
    description:
      "최초의 완전 자율 이족보행 로봇. 무선 통신으로 계단 오르내리기·평지 보행 수행. 배터리·제어기를 본체에 내장한 독립 시스템.",
    category: "hardware",
    milestone: true,
    tags: ["Honda", "이족보행", "자율", "일본"],
    country: "JP",
  },
  {
    id: "cog",
    year: 1998,
    title: "COG",
    subtitle: "MIT AI Lab",
    description:
      "Rodney Brooks 주도. 인간 신경계를 모방한 '구현된 인지(embodied cognition)' 개념 검증 로봇. 시각·청각·촉각 통합 센서 탑재.",
    category: "research",
    tags: ["MIT", "인지 로봇", "센서 융합"],
    country: "US",
  },

  // 2000s
  {
    id: "asimo",
    year: 2000,
    month: 11,
    title: "ASIMO 공개",
    subtitle: "Honda",
    description:
      "Honda의 대표 휴머노이드 ASIMO 첫 공개. 1.2m 키, 6km/h 보행. 이후 17년간 지속 업데이트되며 휴머노이드 로봇의 대중적 아이콘이 됨.",
    category: "hardware",
    milestone: true,
    tags: ["ASIMO", "Honda", "대중화", "일본"],
    country: "JP",
    link: "https://global.honda/en/ASIMO/",
  },
  {
    id: "qrio",
    year: 2003,
    title: "QRIO",
    subtitle: "Sony",
    description:
      "Sony의 소형 이족보행 로봇. 0.58m 키, 달리기 가능(최초의 달리는 소형 휴머노이드 중 하나). 음악·춤·대화 가능. 2006년 개발 중단.",
    category: "hardware",
    tags: ["Sony", "소형", "달리기", "엔터테인먼트"],
    country: "JP",
  },
  {
    id: "darpa-grand-challenge-1",
    year: 2004,
    title: "DARPA Grand Challenge",
    subtitle: "DARPA",
    description:
      "자율주행 로봇 자동차 경주. 1회는 완주팀 없이 종료됐으나 자율주행·로봇 기술 연구에 불을 당긴 전환점. 2005년 2회에서 5팀 완주.",
    category: "competition",
    tags: ["DARPA", "자율주행", "챌린지"],
    country: "US",
  },
  {
    id: "khr3-hubo",
    year: 2005,
    title: "KHR-3 HUBO",
    subtitle: "KAIST",
    description:
      "오준호 교수 팀 개발. 한국 최초 이족보행 휴머노이드. 1.2m 키, 3km/h 보행. 이후 DRC-HUBO로 발전, DARPA DRC 2015 우승.",
    category: "hardware",
    milestone: true,
    tags: ["KAIST", "HUBO", "한국", "이족보행"],
    country: "KR",
  },
  {
    id: "nao",
    year: 2006,
    title: "NAO 로봇",
    subtitle: "Aldebaran Robotics",
    description:
      "0.58m 소형 프로그래머블 휴머노이드. RoboCup 공식 플랫폼 채택. 전 세계 연구·교육기관 9,000+ 대 보급. 학술 표준 플랫폼 정착.",
    category: "commercial",
    tags: ["NAO", "교육", "RoboCup", "프랑스"],
    country: "FR",
    link: "https://www.aldebaran.com",
  },
  {
    id: "atlas-darpa",
    year: 2009,
    title: "PETMAN 공개",
    subtitle: "Boston Dynamics",
    description:
      "화학 방호복 테스트용 인간형 로봇 PETMAN. 최초의 동적 안정 이족보행 군사용 로봇. 이후 Atlas로 발전하는 플랫폼의 전신.",
    category: "hardware",
    tags: ["Boston Dynamics", "PETMAN", "군사", "동적 보행"],
    country: "US",
  },

  // 2010s
  {
    id: "darpa-robotics-challenge-ann",
    year: 2011,
    title: "DARPA Robotics Challenge 발표",
    subtitle: "DARPA",
    description:
      "후쿠시마 원전 사고를 계기로 재난 구조 로봇 개발 가속. 총상금 $3.5M, 전 세계 팀 참가. 휴머노이드 로봇 연구 방향을 '재난 대응'으로 집결.",
    category: "competition",
    milestone: true,
    tags: ["DARPA DRC", "재난 구조", "후쿠시마"],
    country: "US",
  },
  {
    id: "atlas-v1",
    year: 2013,
    month: 7,
    title: "Atlas 1세대 공개",
    subtitle: "Boston Dynamics (DARPA 지원)",
    description:
      "DARPA DRC용으로 개발된 수압식 Atlas. 키 1.88m, 149kg. 28개 관절, 다방향 LIDAR·스테레오 카메라 탑재. DRC 참가팀에 플랫폼 제공.",
    category: "hardware",
    milestone: true,
    tags: ["Atlas", "Boston Dynamics", "수압식", "DARPA"],
    country: "US",
  },
  {
    id: "drc-finals",
    year: 2015,
    month: 6,
    title: "DARPA DRC 결승 — DRC-HUBO 우승",
    subtitle: "KAIST",
    description:
      "KAIST DRC-HUBO, 8개 과제(차량 운전·문 열기·밸브 조작·드릴 사용 등)를 44분 28초에 완주하여 우승. 총상금 $2M. 한국 로봇 기술 세계 1위 입증.",
    category: "competition",
    milestone: true,
    tags: ["DRC", "KAIST", "우승", "DRC-HUBO", "재난 구조"],
    country: "KR",
  },
  {
    id: "atlas-outdoors",
    year: 2016,
    month: 2,
    title: "Atlas 야외 보행 영상",
    subtitle: "Boston Dynamics",
    description:
      "눈 쌓인 숲길 보행·상자 들어 올리기·밀쳐도 균형 유지 영상 공개. 동적 균형 제어 수준을 세계에 시연. 유튜브 수천만 조회수 기록.",
    category: "hardware",
    tags: ["Atlas", "동적 균형", "Boston Dynamics"],
    country: "US",
  },
  {
    id: "google-sells-bd",
    year: 2017,
    month: 6,
    title: "SoftBank, Boston Dynamics 인수",
    subtitle: "SoftBank ← Google",
    description:
      "2013년 Google X가 인수했던 Boston Dynamics를 SoftBank가 재인수. 이후 2020년 현대차그룹이 인수하며 상업화 가속.",
    category: "commercial",
    tags: ["Boston Dynamics", "M&A", "SoftBank"],
    country: "US",
  },
  {
    id: "atlas-parkour",
    year: 2017,
    month: 11,
    title: "Atlas 파쿠르 영상",
    subtitle: "Boston Dynamics",
    description:
      "Atlas가 장애물 점프·공중 회전·계단 달리기 수행. '로봇이 넘어진다'는 고정관념 깨뜨린 충격적 영상. 공학계·대중 모두 열광.",
    category: "hardware",
    milestone: true,
    tags: ["Atlas", "파쿠르", "동적 보행"],
    country: "US",
  },
  {
    id: "digit-agility",
    year: 2019,
    title: "Digit 상업 판매 개시",
    subtitle: "Agility Robotics",
    description:
      "Agility Robotics의 Digit, 첫 상업 판매. Ford 자동차와 협력해 소포 배달 로봇 시연. 이족보행 로봇 최초 상업화 사례 중 하나.",
    category: "commercial",
    milestone: true,
    tags: ["Digit", "Agility Robotics", "상업화", "배달"],
    country: "US",
  },

  // 2020s
  {
    id: "tesla-bot-announce",
    year: 2021,
    month: 8,
    title: "Tesla Bot(Optimus) 발표",
    subtitle: "Tesla",
    description:
      "Elon Musk, Tesla AI Day에서 휴머노이드 로봇 Optimus 개발 계획 공개. '위험하고 반복적인 노동 대체' 목표. FSD 비전 AI·오토파일럿 기술 전용.",
    category: "commercial",
    milestone: true,
    tags: ["Tesla", "Optimus", "Elon Musk", "FSD"],
    country: "US",
  },
  {
    id: "unitree-h1",
    year: 2022,
    title: "Unitree H1 공개",
    subtitle: "Unitree Robotics",
    description:
      "중국 Unitree, 최초의 전신 휴머노이드 H1 공개. 키 1.8m, 3D LIDAR·depth 카메라. 소비자용 저가 휴머노이드 시대 개막. Go1·Go2 성공 기반.",
    category: "hardware",
    milestone: true,
    tags: ["Unitree", "H1", "중국", "저가"],
    country: "CN",
    link: "https://www.unitree.com/h1",
  },
  {
    id: "figure-01-announce",
    year: 2023,
    month: 3,
    title: "Figure 01 공개",
    subtitle: "Figure AI",
    description:
      "Brett Adcock 설립 Figure AI, 범용 휴머노이드 Figure 01 공개. Microsoft·OpenAI·NVIDIA 등에서 $675M 투자 유치. VLA 기반 행동 생성.",
    category: "commercial",
    milestone: true,
    tags: ["Figure AI", "VLA", "투자", "범용"],
    country: "US",
    link: "https://figure.ai",
  },
  {
    id: "apptronik-apollo",
    year: 2023,
    month: 8,
    title: "Apollo 공개",
    subtitle: "Apptronik",
    description:
      "NASA JSC와 협력 이력의 Apptronik, 물류·제조용 Apollo 발표. 키 1.73m, 55kg 탑재량. Mercedes-Benz 공장 파일럿 협약.",
    category: "commercial",
    tags: ["Apptronik", "Apollo", "물류", "Mercedes"],
    country: "US",
  },
  {
    id: "1x-neo",
    year: 2023,
    title: "NEO Beta 공개",
    subtitle: "1X Technologies",
    description:
      "노르웨이 1X Technologies(구 Halodi Robotics), 가정용 휴머노이드 NEO Beta 공개. OpenAI 투자. 가정 환경 특화 설계.",
    category: "commercial",
    tags: ["1X Technologies", "NEO", "가정용", "OpenAI"],
    country: "NO",
  },
  {
    id: "bd-atlas-electric",
    year: 2024,
    month: 4,
    title: "Boston Dynamics Atlas 전기식 전환",
    subtitle: "Boston Dynamics",
    description:
      "23년 역사의 수압식 Atlas 퇴역 발표, 전기 구동 신형 Atlas 공개. 현대차그룹 제조 라인 투입 목표. 인간보다 넓은 관절 범위, 더 유연한 동작.",
    category: "hardware",
    milestone: true,
    tags: ["Atlas", "전기식", "현대차", "Boston Dynamics"],
    country: "US",
    link: "https://bostondynamics.com/atlas",
  },
  {
    id: "figure-bmw",
    year: 2024,
    month: 1,
    title: "Figure 01, BMW 공장 투입",
    subtitle: "Figure AI × BMW",
    description:
      "Figure 01이 BMW 사우스캐롤라이나 공장 파일럿 라인 투입. 실제 제조 환경에서 작업하는 범용 휴머노이드 최초 사례. 상업 배포 신호탄.",
    category: "commercial",
    milestone: true,
    tags: ["Figure AI", "BMW", "제조", "파일럿"],
    country: "US",
  },
  {
    id: "tesla-optimus-gen2",
    year: 2024,
    month: 12,
    title: "Tesla Optimus Gen 2",
    subtitle: "Tesla",
    description:
      "2세대 Optimus 공개. 30% 빠른 보행 속도, 손가락 11-DOF 정밀 조작, 자체 조립 라인 배치. Tesla Gigafactory 내 생산 목표 1만 대/년.",
    category: "hardware",
    milestone: true,
    tags: ["Tesla", "Optimus Gen2", "양산", "손가락 조작"],
    country: "US",
  },
  {
    id: "unitree-g1",
    year: 2024,
    title: "Unitree G1 출시",
    subtitle: "Unitree Robotics",
    description:
      "$16,000 소비자 가격, 키 1.27m. 중국 휴머노이드 가격 경쟁 본격화. 연구·교육용 저가 플랫폼. 국내 구매 가능.",
    category: "commercial",
    milestone: true,
    tags: ["Unitree", "G1", "저가", "중국", "소비자"],
    country: "CN",
    link: "https://www.unitree.com/g1",
  },
  {
    id: "humanoid-race-2025",
    year: 2025,
    title: "글로벌 휴머노이드 양산 경쟁 본격화",
    subtitle: "산업 전반",
    description:
      "Figure·Boston Dynamics·Tesla·1X·Agility·Unitree·Fourier 등 10+ 기업이 동시에 양산 로드맵 발표. Goldman Sachs, 2030년 휴머노이드 시장 $38B 예측. '로봇 AI 원년' 선언.",
    category: "commercial",
    milestone: true,
    tags: ["양산", "시장 경쟁", "Goldman Sachs", "2030"],
    country: "US",
  },
];
