import type { Locale } from "@/i18n/config";

// 로봇 조립 사업 준비 페이지 본문 구조.
// 긴 산문·표는 메시지 JSON 대신 이 모듈에 로케일별로 둔다.
export interface BizTerm {
  term: string;
  desc: string;
}

export interface BizTable {
  headers: string[];
  rows: string[][];
}

export interface BizSection {
  id: string;
  heading: string;
  body?: string[]; // 문단 목록
  table?: BizTable; // 비교/대응 표
  terms?: BizTerm[]; // 용어·부품 정의 목록
  callout?: string; // 강조 박스로 띄울 핵심 메시지
}

export interface BizContent {
  title: string;
  subtitle: string;
  sections: BizSection[];
}

// 로봇 조립 사업 준비 콘텐츠 (한국어/영어).
export const business: Record<Locale, BizContent> = {
  ko: {
    title: "로봇 조립 사업, 어떻게 준비할까",
    subtitle:
      "컴퓨터 산업의 역사에서 휴머노이드 로봇 사업의 기회를 읽고, 부품 구조·표준화 흐름·차별화 전략을 정리합니다.",
    sections: [
      {
        id: "analogy",
        heading: "컴퓨터 시대에서 배우는 비유",
        body: [
          "휴머노이드 로봇 산업은 1980~90년대 PC 산업이 걸어온 길을 다시 밟을 가능성이 크다. 기술 원천을 만드는 곳, 핵심 부품을 만드는 곳, 그것을 조립·판매하는 곳, 설계와 브랜드를 쥐는 곳으로 가치사슬이 갈라진다.",
          "각 위치마다 필요한 역량과 마진 구조가 다르다. 어느 자리를 노릴지 먼저 정해야 한다.",
        ],
        table: {
          headers: ["컴퓨터 시대", "휴머노이드 로봇 시대 (예상)"],
          rows: [
            ["IBM — 기술 원천 개발", "Boston Dynamics · Figure · Tesla"],
            ["Intel · ARM — 부품 개발", "Nvidia · Unitree"],
            ["Dell · HP — 조립·판매", "← 진입 가능한 포지션"],
            ["Apple — 설계 + 브랜드 (팹리스)", "더 고급 포지션"],
          ],
        },
        callout:
          "Dell이 90년대에 조립 PC로 급성장한 것이 바로 이 모델이다. 부품이 표준화되는 시점에 조립·판매로 들어가 빠르게 규모를 키웠다.",
      },
      {
        id: "parts",
        heading: "로봇은 어떤 부품으로 이루어지는가",
        body: [
          "컴퓨터가 CPU·RAM·메인보드·파워서플라이 같은 부품의 조합이듯, 휴머노이드도 부품의 조합이다. 컴퓨터 부품과 1:1로 대응시켜 보면 구조가 한눈에 들어온다.",
        ],
        table: {
          headers: ["컴퓨터 부품", "역할", "로봇 대응 부품"],
          rows: [
            ["CPU", "연산·판단", "AI 컴퓨트 보드 (Nvidia Jetson 등)"],
            ["RAM / SSD", "기억·저장", "동일 (RAM / SSD)"],
            ["메인보드", "부품 연결", "제어 보드 (ROS 기반 통합 컨트롤러)"],
            ["파워서플라이", "전력 공급", "배터리 팩 + 전력관리(BMS)"],
            ["GPU", "그래픽 처리", "비전 AI 처리 (카메라 + GPU)"],
            ["냉각 시스템", "발열 관리", "동일 (방열판·팬)"],
            ["케이스", "외장", "외장 바디 패널"],
            ["— (없음)", "구동 '근육'", "액추에이터 (관절 모터)"],
            ["— (없음)", "감각", "센서류 (카메라·LiDAR·IMU·촉각)"],
            ["— (없음)", "골격", "프레임 (알루미늄·탄소섬유)"],
            ["— (없음)", "조작", "핸드 / 그리퍼"],
          ],
        },
      },
      {
        id: "core",
        heading: "로봇에만 있는 핵심 3부품",
        body: [
          "컴퓨터에는 없고 로봇에만 있는 부품이 사실 승부처다. 여기가 가장 비싸고, 기술 난이도가 높고, 아직 표준이 정해지지 않았다.",
        ],
        terms: [
          {
            term: "① 액추에이터 (관절 모터)",
            desc: "로봇의 '근육'. 현재 가장 비싸고 기술 난이도가 높은 부품이다. 전기모터식·유압식·공압식이 있으며, 관절 하나당 단가가 수십만 원에 이른다. 이 부품이 표준화되는 순간이 '로봇판 인텔 CPU'가 등장하는 순간이고, 그때부터 조립 사업이 본격화된다.",
          },
          {
            term: "② 센서 패키지",
            desc: "눈은 카메라(RGB + 깊이), 균형은 IMU(관성측정장치), 촉각은 손끝 압력센서, 위치 파악은 LiDAR가 맡는다. 사람의 감각기관에 해당하며 인지 성능을 좌우한다.",
          },
          {
            term: "③ 소프트웨어 미들웨어 (ROS2)",
            desc: "로봇판 운영체제. ROS2(Robot Operating System)가 사실상 표준에 가깝다. 이것이 표준화될수록 부품을 갈아 끼우는 조립 사업이 쉬워진다.",
          },
        ],
      },
      {
        id: "standardization",
        heading: "지금 부품 표준화는 어디까지 왔나",
        body: [
          "조립 사업이 가능해지는 조건은 '부품 표준화'다. 현재 단계를 점검해 보면, 두뇌와 소프트웨어는 거의 표준에 도달했지만 몸(골격·액추에이터)은 아직 제각각이다.",
        ],
        table: {
          headers: ["부품", "표준화 수준", "비고"],
          rows: [
            ["AI 보드", "★★★★☆", "Nvidia Jetson 거의 표준"],
            ["소프트웨어 (ROS)", "★★★★☆", "사실상 표준"],
            ["배터리", "★★★☆☆", "진행 중"],
            ["골격 / 프레임", "★★☆☆☆", "아직 제각각"],
            ["액추에이터", "★★☆☆☆", "가장 미표준화 — 핵심 변수"],
          ],
        },
        callout:
          "액추에이터가 표준화되는 시점이 조립 사업의 출발 신호다. 지금은 그 직전 단계로 볼 수 있다.",
      },
      {
        id: "dell",
        heading: "왜 Dell만 살아남았나",
        body: [
          "조립 PC 시장의 결말을 반드시 참고해야 한다. 부품이 완전히 표준화되자, 브랜드 없는 조립은 가격 경쟁만 남았다. 누구나 같은 부품으로 똑같이 만들 수 있으니 마진이 사라진 것이다.",
          "그 속에서 Dell이 살아남은 이유는 조립을 잘해서가 아니라, 기업 맞춤 주문·구성·사후 서비스(AS)·운영 솔루션을 붙였기 때문이다. 하드웨어는 같아도 '서비스'로 차별화했다.",
          "로봇도 똑같이 흘러갈 가능성이 높다. 하드웨어 조립 자체는 승부의 기준이 되지 못한다. 진짜 차별화는 현장에 맞춘 소프트웨어와 운영·AS 네트워크에서 나온다. 다만 시작 단계에서는 로봇 기술 자체와 조립 기술을 갖춰야 시장에 들어갈 수 있다.",
        ],
        callout:
          "조립은 입장권일 뿐, 승부는 소프트웨어와 서비스에서 갈린다. 행정 자동화·AI 워크플로우 경험이 바로 그 소프트파워의 씨앗이 될 수 있다.",
      },
      {
        id: "roadmap",
        heading: "사업 준비 3단계",
        body: ["지금부터 단계적으로 준비할 수 있는 경로다."],
        terms: [
          {
            term: "1단계 — 시장·기술 파악 (지금 당장)",
            desc: "상용화 단계의 플랫폼을 공부한다. Unitree(가성비), Figure, Agility Robotics, 1X 등. 어떤 부품이 '인텔 CPU'처럼 범용 표준이 될지 추적한다. 현재 후보는 Nvidia Jetson 계열 두뇌, 관절 액추에이터, 표준 센서다.",
          },
          {
            term: "2단계 — 틈새 시장 선점 (1~3년 내)",
            desc: "처음부터 범용 휴머노이드를 노리지 말고 특정 산업으로 좁힌다. 물류창고·농업·병원 청소·노인 돌봄 등. Dell이 기업용 PC로 시작했듯, 한국 시장에서는 제조업 현장과 요양원 수요가 유망하다.",
          },
          {
            term: "3단계 — 비즈니스 구조 설계",
            desc: "팹리스 모델처럼 설계 + 조립 + AS + 소프트웨어를 담당하고, 실제 제조는 국내 중소 금속·전자 공장에 위탁한다. 차별화는 현장 특화 AI 소프트웨어와 AS 네트워크에 둔다.",
          },
        ],
      },
    ],
  },
  en: {
    title: "How to prepare for a robot assembly business",
    subtitle:
      "Reading the opportunity in humanoid robots through the history of the computer industry — its parts, the path to standardization, and where the real differentiation lies.",
    sections: [
      {
        id: "analogy",
        heading: "Lessons from the computer era",
        body: [
          "The humanoid robot industry is likely to retrace the path the PC industry took in the 1980s–90s. The value chain splits into those who invent the core technology, those who make the key components, those who assemble and sell, and those who own the design and the brand.",
          "Each position demands different capabilities and carries a different margin structure. The first decision is which seat to aim for.",
        ],
        table: {
          headers: ["Computer era", "Humanoid robot era (projected)"],
          rows: [
            ["IBM — core technology", "Boston Dynamics · Figure · Tesla"],
            ["Intel · ARM — components", "Nvidia · Unitree"],
            ["Dell · HP — assembly & sales", "← the position to enter"],
            ["Apple — design + brand (fabless)", "the higher-end position"],
          ],
        },
        callout:
          "Dell's explosive growth in the 1990s on assembled PCs is exactly this model: enter through assembly and sales the moment components standardize, and scale fast.",
      },
      {
        id: "parts",
        heading: "What a robot is made of",
        body: [
          "Just as a computer is a combination of CPU, RAM, motherboard and power supply, a humanoid is a combination of parts. Mapping them one-to-one against computer components makes the structure clear at a glance.",
        ],
        table: {
          headers: ["Computer part", "Role", "Robot equivalent"],
          rows: [
            ["CPU", "Compute & decisions", "AI compute board (e.g. Nvidia Jetson)"],
            ["RAM / SSD", "Memory & storage", "Same (RAM / SSD)"],
            ["Motherboard", "Interconnect", "Control board (ROS-based controller)"],
            ["Power supply", "Power delivery", "Battery pack + power management (BMS)"],
            ["GPU", "Graphics", "Vision AI (camera + GPU)"],
            ["Cooling", "Heat management", "Same (heat sinks, fans)"],
            ["Case", "Enclosure", "Body panels"],
            ["— (none)", "Drive 'muscle'", "Actuators (joint motors)"],
            ["— (none)", "Senses", "Sensors (camera, LiDAR, IMU, tactile)"],
            ["— (none)", "Skeleton", "Frame (aluminum, carbon fiber)"],
            ["— (none)", "Manipulation", "Hands / grippers"],
          ],
        },
      },
      {
        id: "core",
        heading: "The three parts unique to robots",
        body: [
          "The parts a computer doesn't have but a robot does are where the contest is actually decided. They are the most expensive, the hardest, and the least standardized today.",
        ],
        terms: [
          {
            term: "1. Actuators (joint motors)",
            desc: "The robot's 'muscles' — currently the most expensive and most demanding part. They come in electric, hydraulic and pneumatic types, with per-joint cost reaching hundreds of dollars. The moment this part standardizes is the moment the 'Intel CPU of robots' arrives, and assembly as a business takes off.",
          },
          {
            term: "2. Sensor package",
            desc: "Cameras (RGB + depth) for sight, an IMU for balance, fingertip pressure sensors for touch, LiDAR for localization. These are the robot's sense organs and largely determine its perception.",
          },
          {
            term: "3. Software middleware (ROS2)",
            desc: "The robot's operating system. ROS2 (Robot Operating System) is effectively the standard. The more it standardizes, the easier it becomes to swap parts in and out — the core of an assembly business.",
          },
        ],
      },
      {
        id: "standardization",
        heading: "How far has standardization come?",
        body: [
          "The precondition for an assembly business is component standardization. Checking the current state: the brain and software are nearly standard, but the body — frame and actuators — is still all over the place.",
        ],
        table: {
          headers: ["Part", "Standardization", "Notes"],
          rows: [
            ["AI board", "★★★★☆", "Nvidia Jetson nearly standard"],
            ["Software (ROS)", "★★★★☆", "Effectively the standard"],
            ["Battery", "★★★☆☆", "In progress"],
            ["Frame", "★★☆☆☆", "Still fragmented"],
            ["Actuators", "★★☆☆☆", "Least standardized — the key variable"],
          ],
        },
        callout:
          "The point at which actuators standardize is the starting gun for an assembly business. We can see today as the stage just before it.",
      },
      {
        id: "dell",
        heading: "Why only Dell survived",
        body: [
          "The ending of the assembled-PC market is essential reading. Once components fully standardized, unbranded assembly was left with nothing but price competition — anyone could build the same thing from the same parts, and the margin vanished.",
          "Dell survived not because it assembled better, but because it bolted on enterprise-tailored ordering, configuration, after-sales service and operational solutions. The hardware was the same; the differentiation came from service.",
          "Robots are likely to follow the same arc. Assembly itself cannot be the basis of the contest. The real differentiation comes from field-specific software and an operations/service network. That said, in the early stage you still need genuine robot technology and assembly skill just to enter the market.",
        ],
        callout:
          "Assembly is only the ticket in; the contest is won on software and service. Experience in administrative automation and AI workflows can be the seed of exactly that soft power.",
      },
      {
        id: "roadmap",
        heading: "A three-stage path",
        body: ["A path you can prepare for, step by step, starting now."],
        terms: [
          {
            term: "Stage 1 — Map the market and tech (now)",
            desc: "Study the platforms already commercializing: Unitree (value), Figure, Agility Robotics, 1X. Track which parts will become the universal 'Intel CPU'. Current candidates: Nvidia Jetson-class brains, joint actuators, and standard sensors.",
          },
          {
            term: "Stage 2 — Claim a niche (within 1–3 years)",
            desc: "Don't chase a general-purpose humanoid from the start; narrow to a specific industry — warehouse logistics, agriculture, hospital cleaning, elderly care. Just as Dell started with business PCs, in the Korean market manufacturing floors and nursing homes are promising demand.",
          },
          {
            term: "Stage 3 — Design the business structure",
            desc: "Like a fabless model, own design + assembly + service + software, and outsource the actual manufacturing to domestic small/mid metal and electronics shops. Differentiate through field-specific AI software and an after-sales network.",
          },
        ],
      },
    ],
  },
};
