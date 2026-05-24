import type { Locale } from "@/i18n/config";

// 가이드 본문 구조. 긴 산문은 메시지 JSON 대신 이 모듈에 로케일별로 둔다.
export interface GuideTerm {
  term: string;
  desc: string;
}

export interface GuideSection {
  id: string;
  heading: string;
  body: string[]; // 문단 목록
  terms?: GuideTerm[]; // 용어 정의 목록 (부품·기법 등)
}

export interface GuideContent {
  title: string;
  subtitle: string;
  sections: GuideSection[];
}

// 휴머노이드 로봇 자체에 대한 조사 콘텐츠 (한국어/영어).
export const guide: Record<Locale, GuideContent> = {
  ko: {
    title: "휴머노이드 로봇이란?",
    subtitle: "사람을 닮은 로봇의 정의, 구성 부품, 그리고 학습 방식을 정리합니다.",
    sections: [
      {
        id: "what",
        heading: "휴머노이드 로봇이란 무엇인가",
        body: [
          "휴머노이드(humanoid) 로봇은 사람의 몸 구조를 본떠 만든 로봇이다. 보통 머리·몸통·두 팔·두 다리를 갖추고, 두 발로 서서 걷는 이족 보행을 한다. 사람을 위해 설계된 환경(계단, 문손잡이, 공구, 좁은 통로)에서 그대로 일할 수 있다는 것이 가장 큰 동기다.",
          "산업용 로봇 팔이 한 곳에 고정되어 정해진 동작을 반복하는 것과 달리, 휴머노이드는 범용성을 지향한다. 하나의 몸체로 걷고, 물건을 들고, 도구를 쓰고, 사람과 상호작용하는 여러 작업을 수행하는 것을 목표로 한다.",
          "겉모습이 사람과 비슷한 정도는 제품마다 다르다. 얼굴 표정까지 정교하게 재현한 안드로이드형부터, 기능에 집중해 머리·표정을 단순화한 작업용까지 폭이 넓다. 이 카탈로그는 이족 또는 양팔 상체를 갖춘 '휴머노이드/반휴머노이드'를 함께 다룬다.",
        ],
      },
      {
        id: "components",
        heading: "주요 구성 부품",
        body: [
          "휴머노이드는 기계 구조, 구동, 감각, 연산, 전원이 유기적으로 결합된 시스템이다. 핵심 부품은 다음과 같다.",
        ],
        terms: [
          {
            term: "골격·구조 (Frame)",
            desc: "알루미늄·탄소섬유 등으로 만든 뼈대. 가벼우면서도 하중과 충격을 견뎌야 한다. 관절 수(자유도, DOF)가 많을수록 사람에 가까운 동작이 가능하지만 제어가 복잡해진다.",
          },
          {
            term: "액추에이터 (Actuator)",
            desc: "관절을 움직이는 '근육'. 전기 모터(BLDC)가 가장 흔하며, 감속을 위해 하모닉 드라이브를 쓴다. NAVER AMBIDEX·1X NEO처럼 케이블/텐던 구동으로 가볍고 안전하게 만들기도 하고, 과거 일부는 유압을 썼다.",
          },
          {
            term: "센서 (Sensor)",
            desc: "균형과 인지를 담당하는 감각기관. IMU(관성센서)로 자세·균형을, 관절 엔코더로 각도를, 힘/토크 센서로 접촉력을, 카메라·라이다·뎁스 센서로 주변을, 촉각 센서로 손끝 접촉을 감지한다.",
          },
          {
            term: "제어 컴퓨터 (Compute)",
            desc: "실시간 균형 제어를 담당하는 저지연 컨트롤러와, 인지·계획·AI 추론을 담당하는 고성능 연산기(GPU/NPU 포함)로 나뉜다. 최근에는 AI 모델을 로봇 위에서 직접 돌리는 온보드 추론이 늘고 있다.",
          },
          {
            term: "전원 (Power)",
            desc: "대부분 리튬이온 배터리로 구동된다. 무게·작동 시간·출력의 균형이 설계의 큰 난제이며, 보통 수십 분~수 시간 작동한다.",
          },
          {
            term: "엔드이펙터 (Hand / End-effector)",
            desc: "작업을 수행하는 손. 단순 그리퍼부터 다섯 손가락 정밀 핸드까지 다양하다. 사람 손 수준의 섬세한 조작(dexterous manipulation)은 여전히 가장 어려운 과제 중 하나다.",
          },
        ],
      },
      {
        id: "learning",
        heading: "어떻게 학습하는가",
        body: [
          "전통적으로 보행과 균형은 사람이 물리 모델로 직접 설계한 제어 알고리즘(예: ZMP 기반 보행, 모델 예측 제어)으로 구현했다. 최근에는 데이터와 AI로 스스로 배우는 학습 기반 방식이 빠르게 확산되고 있다.",
        ],
        terms: [
          {
            term: "강화학습 (Reinforcement Learning)",
            desc: "시뮬레이션 안에서 수많은 시행착오를 거쳐 보상이 높아지는 방향으로 동작을 익힌다. 수천 개의 가상 로봇을 병렬로 학습시킨 뒤, 그 정책을 실제 로봇에 옮기는 sim-to-real 기법이 보행 학습에 널리 쓰인다.",
          },
          {
            term: "모방 학습 (Imitation Learning)",
            desc: "사람이 보여준 동작을 따라 배우는 방식. 사람이 로봇을 원격 조작(텔레오퍼레이션)하거나 직접 시연한 데이터를 모아, 같은 상황에서 같은 행동을 내도록 학습시킨다. 손 조작 작업에 특히 효과적이다.",
          },
          {
            term: "시뮬레이션과 Sim-to-Real",
            desc: "물리 시뮬레이터에서 빠르고 안전하게 대량 학습한 뒤 실제로 옮긴다. 시뮬레이션과 현실의 차이(reality gap)를 줄이기 위해 마찰·질량·조명 등을 무작위로 바꾸는 도메인 랜덤화를 쓴다.",
          },
          {
            term: "파운데이션 모델 · VLA",
            desc: "대규모 데이터로 학습한 범용 모델을 로봇에 적용하는 흐름. 카메라 영상과 언어 지시를 입력받아 행동을 출력하는 Vision-Language-Action(VLA) 모델이 대표적이며, '범용 로봇 두뇌'를 향한 핵심 접근으로 주목받는다.",
          },
          {
            term: "데이터 수집",
            desc: "학습의 연료는 데이터다. 텔레오퍼레이션 시연, 실제 작업 로그, 시뮬레이션 생성 데이터, 사람 동작 영상 등을 모아 대규모 데이터셋을 구축한다. 양질의 데이터 확보가 성능을 좌우한다.",
          },
        ],
      },
      {
        id: "challenges",
        heading: "남은 도전 과제",
        body: [
          "휴머노이드는 빠르게 발전하고 있지만 상용화까지 풀어야 할 문제가 많다. 거친 지형에서의 안정적 보행, 사람 손 수준의 정밀 조작, 제한된 배터리 작동 시간, 사람과 함께 일할 때의 안전성, 높은 제조 비용, 그리고 처음 보는 작업에도 대응하는 일반화 능력이 대표적이다.",
          "이 카탈로그의 데이터 중 AI 조사로 수집된 항목은 '미검증'으로 표시된다. 빠르게 바뀌는 분야인 만큼, 수치와 사양은 출처를 함께 확인하는 것이 좋다.",
        ],
      },
    ],
  },
  en: {
    title: "What is a humanoid robot?",
    subtitle: "A primer on what human-shaped robots are, the parts they are built from, and how they learn.",
    sections: [
      {
        id: "what",
        heading: "What a humanoid robot is",
        body: [
          "A humanoid robot is built to mirror the human body — typically a head, torso, two arms and two legs, balancing and walking on two feet. The main motivation is that it can operate in environments designed for people (stairs, door handles, hand tools, narrow aisles) without changing the world around it.",
          "Unlike an industrial arm bolted to one spot repeating a fixed motion, a humanoid aims for generality: one body that can walk, carry objects, use tools, and interact with people across many tasks.",
          "How human-like they look varies widely — from android faces that reproduce subtle expressions, to work-focused designs that simplify the head and face. This catalog covers both full bipedal humanoids and semi-humanoid dual-arm upper bodies.",
        ],
      },
      {
        id: "components",
        heading: "Key components",
        body: [
          "A humanoid is a system that fuses mechanical structure, actuation, sensing, computing, and power. The core parts are:",
        ],
        terms: [
          {
            term: "Frame / structure",
            desc: "The skeleton, made of aluminum, carbon fiber and similar materials — light yet able to bear loads and impacts. More joints (degrees of freedom, DOF) allow more human-like motion but make control harder.",
          },
          {
            term: "Actuators",
            desc: "The 'muscles' that move the joints. Electric (BLDC) motors with harmonic-drive gearing are most common; some robots (NAVER AMBIDEX, 1X NEO) use cable/tendon drives to stay light and safe, and some earlier systems used hydraulics.",
          },
          {
            term: "Sensors",
            desc: "The senses behind balance and perception: an IMU for posture and balance, joint encoders for angles, force/torque sensors for contact, cameras/LiDAR/depth for the surroundings, and tactile sensors at the fingertips.",
          },
          {
            term: "Compute",
            desc: "Split between a low-latency controller for real-time balance and a high-performance unit (often with GPU/NPU) for perception, planning and AI inference. Increasingly, AI models run on-board the robot itself.",
          },
          {
            term: "Power",
            desc: "Most run on lithium-ion batteries. Balancing weight, runtime and output power is a major design challenge; typical operation lasts from tens of minutes to a few hours.",
          },
          {
            term: "Hands / end-effectors",
            desc: "The tools that do the work, from simple grippers to five-fingered dexterous hands. Human-level dexterous manipulation remains one of the hardest open problems.",
          },
        ],
      },
      {
        id: "learning",
        heading: "How they learn",
        body: [
          "Walking and balance were traditionally implemented with control algorithms hand-designed from physics (e.g. ZMP-based walking, model-predictive control). More recently, learning-based methods that pick up skills from data and AI have spread quickly.",
        ],
        terms: [
          {
            term: "Reinforcement learning",
            desc: "The robot learns by trial and error in simulation, improving toward higher reward. Thousands of virtual robots are trained in parallel and the resulting policy is transferred to hardware — the sim-to-real approach widely used for locomotion.",
          },
          {
            term: "Imitation learning",
            desc: "Learning by copying demonstrations. Data is gathered from humans teleoperating the robot or showing the task directly, then the robot is trained to reproduce the same action in the same situation. It is especially effective for manipulation.",
          },
          {
            term: "Simulation & sim-to-real",
            desc: "Train fast and safely at scale in a physics simulator, then transfer to reality. To shrink the reality gap, domain randomization varies friction, mass, lighting and more during training.",
          },
          {
            term: "Foundation models & VLA",
            desc: "Applying large models trained on broad data to robots. Vision-Language-Action (VLA) models take camera images and language instructions and output actions — a leading path toward a general-purpose 'robot brain'.",
          },
          {
            term: "Data collection",
            desc: "Data is the fuel for learning. Teleoperation demonstrations, real task logs, simulation-generated data and human motion video are combined into large datasets. Securing high-quality data largely determines performance.",
          },
        ],
      },
      {
        id: "challenges",
        heading: "Open challenges",
        body: [
          "Humanoids are advancing fast, but much remains before broad deployment: stable walking over rough terrain, human-level dexterous manipulation, limited battery runtime, safety when working alongside people, high manufacturing cost, and generalization to tasks never seen before.",
          "In this catalog, items gathered by AI research are marked 'unverified'. Because the field moves quickly, it is wise to check the cited sources for any figures and specifications.",
        ],
      },
    ],
  },
};
