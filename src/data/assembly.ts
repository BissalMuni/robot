export type AssemblyStep = {
  id: string;
  step: number;
  title: string;
  titleEn: string;
  icon: string;
  summary: string;
  tasks: string[];
  tools: string[];
  warnings: string[];
  estimatedTime: string;
};

export type RoadmapPhase = {
  phase: number;
  name: string;
  subtitle: string;
  duration: string;
  targetUnits: string;
  goals: string[];
  milestones: string[];
  automationLevel: "수작업" | "반자동" | "자동화";
};

export const assemblySteps: AssemblyStep[] = [
  {
    id: "frame",
    step: 1,
    title: "프레임 조립",
    titleEn: "Frame Assembly",
    icon: "🦴",
    summary:
      "알루미늄/카본 소재 링크·조인트 브래킷으로 골격을 구성한다. 관절 자유도(DoF)와 가동 범위(ROM)를 기계 설계 단계에서 확정한 후 조립에 들어간다.",
    tasks: [
      "메인 토르소·골반 프레임 체결 (토크 렌치 규정값 적용)",
      "대퇴·경골·발목 링크 연결 — 축 정렬 0.1 mm 이내",
      "어깨·팔꿈치·손목 링크 조립",
      "관절 간섭(collision) 검사: 전 ROM 수동 회전",
      "볼트 마킹 후 접착제(Loctite 243) 도포",
    ],
    tools: ["토크 렌치(1~10 Nm)", "캘리퍼스", "3D 프린터(파일럿 브래킷)", "CAD 검토 도면"],
    warnings: [
      "알루미늄 나사산 파손 주의 — 스테인리스 헬리코일 삽입 권장",
      "카본 프레임 드릴 시 분진 마스크 필수",
      "조립 전 CAD 간섭 체크 필수 (SolidWorks/Fusion360)",
    ],
    estimatedTime: "8~16시간 (1유닛)",
  },
  {
    id: "actuator",
    step: 2,
    title: "액추에이터 장착",
    titleEn: "Actuator Mounting",
    icon: "⚙️",
    summary:
      "각 관절에 모터·감속기·인코더를 조립하고 CAN 버스 ID를 설정한다. 백래시와 예압(preload)이 추후 제어 성능을 좌우하므로 정밀 조정이 핵심이다.",
    tasks: [
      "하모닉드라이브/RV 감속기 입력축에 모터 커플링",
      "출력축 플랜지 토크 규정값 체결",
      "인코더 케이블 배선 (꺾임 반경 > 10 mm 유지)",
      "CAN 버스 터미네이터 저항(120 Ω) 양 끝 배치",
      "다이나믹셀/AK 시리즈: ID 1~32 설정, baud 4 Mbps",
      "무부하 회전 시험 — 이음 없음·발열 < 40 ℃ 확인",
    ],
    tools: ["토크 렌치", "CAN 분석기(PEAK PCAN)", "멀티미터", "열화상 카메라"],
    warnings: [
      "감속기 그리스 과주입 시 백래시 증가 — 메이커 규정량 준수",
      "인코더 케이블 뒤틀림 시 오류 신호 → 관절 런어웨이 위험",
      "CAN ID 중복 시 버스 충돌 — 전체 맵 미리 작성",
    ],
    estimatedTime: "6~12시간 (1유닛, 관절 수 따라 변동)",
  },
  {
    id: "sensor",
    step: 3,
    title: "센서 설치",
    titleEn: "Sensor Installation",
    icon: "📡",
    summary:
      "IMU(관성측정장치), F/T 센서(손목·발목), 뎁스 카메라(두부)를 장착하고 배선을 정리한다. 센서 좌표계와 로봇 기구학 좌표계 정합이 캘리브레이션 정확도를 결정한다.",
    tasks: [
      "IMU — 골반 링크 중심부 장착, 축 방향 CAD와 일치 확인",
      "발목 F/T 센서 — 볼트 패턴 토크 균등 체결",
      "손목 F/T 센서 — 케이블 여유 길이 확보 (손목 ROM 대응)",
      "Intel RealSense D435 / ZED 2 — 두부 전방 고정",
      "배선 경로: 벨크로 타이로 관절 회전 간섭 없이 정리",
      "USB/EtherCAT 케이블 레이블링",
    ],
    tools: ["토크 렌치(0.5~5 Nm)", "전용 케이블 배선 지그", "레이블 프린터"],
    warnings: [
      "IMU 장착 위치 편심 시 보행 제어 오차 직결",
      "F/T 센서 과토크 체결 → 제로 오프셋 오류 발생",
      "카메라 렌즈 앞 금속 반사체 배치 금지 (IR 간섭)",
    ],
    estimatedTime: "4~8시간 (1유닛)",
  },
  {
    id: "controller",
    step: 4,
    title: "제어기 설치 및 배선",
    titleEn: "Controller & Wiring",
    icon: "🖥️",
    summary:
      "온보드 컴퓨터(Jetson Orin)와 하위 MCU(STM32)를 장착하고 CAN 버스·Ethernet·USB 버스를 구성한다. 전원 분배 보드(PDB)를 통해 전압 레일을 분리한다.",
    tasks: [
      "Jetson AGX Orin — 토르소 내 방진 마운트에 고정",
      "STM32H7 MCU 보드 — CAN1/CAN2 버스 분리 배선",
      "PDB 설치: 48 V(모터)·24 V·12 V·5 V 레일 분리",
      "이더넷 스위치(5 port) 또는 허브 — 센서·컴퓨터 연결",
      "비상 정지(E-stop) 회로: 하드웨어 인터럽트 → 모터 전원 차단",
      "EMC 대책: 모터 케이블 페라이트 코어·차폐 쉘 적용",
    ],
    tools: ["멀티미터", "오실로스코프", "납땜 인두", "케이블 스트리퍼"],
    warnings: [
      "모터·신호 케이블 동일 번들 금지 — EMI 간섭으로 CAN 오류",
      "E-stop 누락 시 안전 인증 불가",
      "Jetson 전원은 반드시 12 V 안정화 후 투입",
    ],
    estimatedTime: "6~10시간 (1유닛)",
  },
  {
    id: "battery",
    step: 5,
    title: "배터리 연결",
    titleEn: "Battery Integration",
    icon: "🔋",
    summary:
      "LiPo/Li-ion 팩과 BMS(배터리 관리 시스템)를 연결하고 전원 시퀀스를 검증한다. 과충전·과방전 보호와 발열 모니터링이 안전의 핵심이다.",
    tasks: [
      "BMS 연결: 셀 밸런싱 포트 순서 확인",
      "XT90/AS150 커넥터 납땜 — 극성 이중 확인",
      "PDB 메인 퓨즈(100 A) 및 배선 단면적 검토",
      "충전 포트 외부 노출 위치에 고정",
      "전원 ON 시퀀스 검증: BMS → PDB → 제어기 → 모터",
      "만충 후 30분 발열 모니터링 (< 40 ℃ 목표)",
    ],
    tools: ["셀 전압 측정기", "멀티미터", "열화상 카메라", "전류 클램프 미터"],
    warnings: [
      "LiPo 팽창·손상 팩 절대 사용 금지 — 화재 위험",
      "극성 역삽입 방지용 커넥터 방향 잠금 설계 필수",
      "배터리 격납 공간에 내화 소재(유리섬유 패드) 적용",
    ],
    estimatedTime: "2~4시간 (1유닛)",
  },
  {
    id: "calibration",
    step: 6,
    title: "캘리브레이션",
    titleEn: "Calibration",
    icon: "🎯",
    summary:
      "관절 영점(home position), IMU 바이어스, F/T 센서 오프셋을 소프트웨어로 조정한다. 이 단계의 정밀도가 전체 보행 성능을 좌우한다.",
    tasks: [
      "관절 영점 설정: 각 축 물리 스토퍼 위치 기록 → 소프트웨어 home 등록",
      "IMU 캘리브레이션: 6-면 정적 캘리브레이션 (가속도계·자이로 바이어스)",
      "F/T 센서 영점: 무부하 상태에서 bias tare 수행",
      "모터 전류 제한·PID 초기값 설정 (gains: P=10, I=0.1, D=0.05 → 튜닝)",
      "ROS 2 joint_state_publisher로 전 관절 가동 범위 확인",
      "기준 자세(수직 기립) 저장 및 반복 재현 테스트",
    ],
    tools: ["ROS 2 Humble", "rqt_joint_trajectory", "Foxglove Studio", "수준계"],
    warnings: [
      "영점 오차 1° 이상 시 보행 알고리즘 수렴 불가 — 반드시 재측정",
      "IMU 근처 금속 구조물 변경 시 재캘리브레이션 필요",
      "캘리브레이션 결과는 버전 관리(git) 필수",
    ],
    estimatedTime: "4~8시간 (1유닛, 반복 포함)",
  },
  {
    id: "integration-test",
    step: 7,
    title: "통합 테스트",
    titleEn: "Integration Testing",
    icon: "🧪",
    summary:
      "저부하 기동 테스트에서 시작해 제자리 보행, 전진 보행, 장애물 대응까지 단계적으로 검증한다. 실패 모드별 비상 정지 응답을 필수 확인한다.",
    tasks: [
      "전원 ON 체크리스트 실행 (하네스 팀 2인 1조)",
      "하니스(안전 줄) 장착 후 저부하 관절 이동 시험",
      "기립 자세 유지 3분 — 발열·진동·이상음 모니터링",
      "제자리 걷기(in-place stepping) 10 사이클",
      "전진 보행 0.3 m/s, 평지 5 m 왕복",
      "비상 정지 응답 테스트: E-stop 누름 → 0.1 s 이내 전 모터 정지",
      "로그 수집 및 관절 토크·온도 그래프 검토",
    ],
    tools: ["안전 하니스", "Foxglove Studio", "열화상 카메라", "스톱워치"],
    warnings: [
      "최초 기립 시 반드시 2인 이상 입회 — 낙하 위험",
      "관절 온도 > 70 ℃ 시 즉시 전원 차단",
      "보행 테스트는 평탄·미끄럼 방지 바닥에서만 진행",
    ],
    estimatedTime: "4~8시간 (1유닛)",
  },
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: 1,
    name: "Phase 1 — 프로토타입",
    subtitle: "개념 검증(PoC) 단일 유닛",
    duration: "6~12개월",
    targetUnits: "1~3대",
    goals: [
      "기구학·제어 알고리즘 기초 검증",
      "핵심 부품 공급망 확보",
      "소프트웨어 스택(ROS 2) 확립",
      "안전 운영 절차(SOP) 초안 작성",
    ],
    milestones: ["관절 캘리브레이션 완료", "평지 보행 3 m 성공", "비상 정지 응답 < 0.1 s 확인"],
    automationLevel: "수작업",
  },
  {
    phase: 2,
    name: "Phase 2 — 파일럿 생산",
    subtitle: "소량 반복 제작 및 품질 관리 체계 수립",
    duration: "6~12개월",
    targetUnits: "5~10대",
    goals: [
      "조립 SOP 확정 및 QC 체크리스트 완성",
      "부품 조달 리드타임 단축 (국내 대체 부품 검토)",
      "반복 재현성 확인 (유닛 간 성능 편차 < 5 %)",
      "필드 내구성 시험 (100 시간 연속 운전)",
    ],
    milestones: ["QC 합격률 > 90 %", "조립 사이클 타임 < 40 시간/유닛", "필드 테스트 100 시간 무고장"],
    automationLevel: "반자동",
  },
  {
    phase: 3,
    name: "Phase 3 — 양산",
    subtitle: "자동화 조립 라인 구축 및 인증 획득",
    duration: "12개월~",
    targetUnits: "100대+/년",
    goals: [
      "조립 공정 자동화(픽앤플레이스·토크 자동화)",
      "KS·CE·UL 안전 인증 획득",
      "AS(애프터서비스) 체계 구축",
      "원가 절감: 파일럿 대비 30 % 이상",
    ],
    milestones: ["조립 라인 Takt Time < 8 시간/유닛", "안전 인증 심사 합격", "첫 번째 외부 고객 납품"],
    automationLevel: "자동화",
  },
];
