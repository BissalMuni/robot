export type PartCategory = {
  id: string;
  name: string;
  nameKo: string;
  icon: string;
  description: string;
  keySpecs: string[];
  vendors: Vendor[];
  purchaseSites: PurchaseSite[];
};

export type Vendor = {
  name: string;
  country: "KR" | "US" | "CN" | "JP" | "DE" | "NL" | "CH";
  website: string;
  description: string;
  products: string[];
};

export type PurchaseSite = {
  name: string;
  url: string;
  country: "KR" | "US" | "GLOBAL";
  description: string;
};

export const partCategories: PartCategory[] = [
  {
    id: "actuator",
    name: "Actuator",
    nameKo: "액추에이터",
    icon: "⚙️",
    description:
      "로봇 관절을 구동하는 핵심 부품. 서보모터·BLDC 모터 기반으로 토크·속도·위치를 제어한다.",
    keySpecs: ["연속 토크(Nm)", "최대 RPM", "통신 방식(RS-485/CAN)", "전압(V)", "무게(g)"],
    vendors: [
      {
        name: "ROBOTIS",
        country: "KR",
        website: "https://robotis.com",
        description: "다이나믹셀(Dynamixel) 시리즈. 국내 연구·교육용 서보 표준.",
        products: ["Dynamixel X430", "Dynamixel P-Series", "Dynamixel MX-106"],
      },
      {
        name: "Maxon",
        country: "DE",
        website: "https://maxongroup.com",
        description: "고정밀 BLDC 모터. Mars Rover·의료기기에 사용. 내구성 최고.",
        products: ["EC-i 40", "DCX 22 L", "ESCON 모터 컨트롤러"],
      },
      {
        name: "T-Motor",
        country: "CN",
        website: "https://tmotor.com",
        description: "드론용 BLDC를 휴머노이드에 전용. 고출력 밀도·경량.",
        products: ["AK80-9", "AK60-6", "AK10-9"],
      },
      {
        name: "Unitree",
        country: "CN",
        website: "https://unitree.com",
        description: "자체 설계 준직접구동(QDD) 액추에이터. H1/G1 내장.",
        products: ["A1 Actuator", "B1 Hip Actuator"],
      },
    ],
    purchaseSites: [
      { name: "로보티즈 e숍", url: "https://www.robotis.com/shop/", country: "KR", description: "다이나믹셀 공식 구매처" },
      { name: "Actuonix", url: "https://www.actuonix.com", country: "US", description: "소형 선형 액추에이터 전문" },
      { name: "디바이스마트", url: "https://www.devicemart.co.kr", country: "KR", description: "국내 최대 전자부품 쇼핑몰, 로보티즈 취급" },
    ],
  },
  {
    id: "gearbox",
    name: "Gearbox / Reducer",
    nameKo: "감속기",
    icon: "🔩",
    description:
      "모터 출력 토크를 증폭하고 회전수를 낮추는 기어 장치. 백드라이빙 가능 여부가 안전성을 결정한다.",
    keySpecs: ["감속비", "백래시(arcmin)", "최대 입력 토크(Nm)", "효율(%)", "무게(g)"],
    vendors: [
      {
        name: "Harmonic Drive",
        country: "JP",
        website: "https://www.harmonicdrive.net",
        description: "스트레인웨이브 기어. 제로 백래시·고감속비. 관절용 표준.",
        products: ["CSF-14", "SHD-25", "CSD-20"],
      },
      {
        name: "Nabtesco",
        country: "JP",
        website: "https://www.nabtesco.com",
        description: "사이클로이드 기어(RV 감속기). 산업용 로봇팔 사실상 표준.",
        products: ["RV-6E", "RV-20E", "RV-80E"],
      },
      {
        name: "SPG",
        country: "KR",
        website: "https://www.spg.co.kr",
        description: "국내 기어드모터·감속기 제조사. 소형 로봇 관절 적용 가능.",
        products: ["GM30 기어드모터", "감속기 SG 시리즈"],
      },
      {
        name: "Leaderdrive",
        country: "CN",
        website: "https://www.leaderdrive.cn",
        description: "중국산 하모닉 드라이브 클론. 가성비 연구용.",
        products: ["LHD-14", "LHD-20"],
      },
    ],
    purchaseSites: [
      { name: "하모닉 드라이브 공식", url: "https://www.harmonicdrive.net/products", country: "US", description: "공식 견적·구매" },
      { name: "디바이스마트", url: "https://www.devicemart.co.kr", country: "KR", description: "소형 감속기 취급" },
      { name: "RobotShop", url: "https://www.robotshop.com", country: "GLOBAL", description: "로봇 부품 글로벌 전문 쇼핑몰" },
    ],
  },
  {
    id: "force-torque-sensor",
    name: "Force/Torque Sensor",
    nameKo: "힘·토크 센서",
    icon: "📡",
    description:
      "손목·발목에 장착해 6축(Fx, Fy, Fz, Mx, My, Mz) 힘과 모멘트를 측정. 안전 제어·임피던스 제어에 필수.",
    keySpecs: ["측정 범위(N/Nm)", "분해능", "통신(USB/EtherCAT/RS-485)", "샘플링(Hz)", "IP 등급"],
    vendors: [
      {
        name: "에이딘로보틱스 (Aidin Robotics)",
        country: "KR",
        website: "https://aidinrobotics.co.kr",
        description: "국산 6축 힘토크 센서·로봇 핸드. Rainbow Robotics 협력.",
        products: ["AIDIN-FS6-100N", "AIDIN 6-DOF Force Sensor"],
      },
      {
        name: "ATI Industrial Automation",
        country: "US",
        website: "https://www.ati-ia.com",
        description: "산업용 F/T 센서 세계 1위. Gamma·Omega 시리즈.",
        products: ["Gamma SI-65-5", "Mini45", "Omega160"],
      },
      {
        name: "Bota Systems",
        country: "DE",
        website: "https://www.botasystems.com",
        description: "협동로봇·휴머노이드 전용 소형 F/T 센서.",
        products: ["SensONE", "MiniONE"],
      },
    ],
    purchaseSites: [
      { name: "에이딘로보틱스 공식", url: "https://aidinrobotics.co.kr", country: "KR", description: "국산 F/T 센서 직구매" },
      { name: "ATI 공식 견적", url: "https://www.ati-ia.com/products/ft/ft_models.aspx", country: "US", description: "ATI F/T 센서 모델 선택" },
      { name: "RobotShop", url: "https://www.robotshop.com/collections/force-torque-sensors", country: "GLOBAL", description: "F/T 센서 비교 구매" },
    ],
  },
  {
    id: "imu",
    name: "IMU",
    nameKo: "관성측정장치",
    icon: "🧭",
    description:
      "가속도계·자이로스코프·지자기계 조합으로 자세(Roll/Pitch/Yaw)를 추정. 보행 안정화의 핵심 피드백 소스.",
    keySpecs: ["자유도(6/9축)", "자이로 잡음(°/s/√Hz)", "가속도 범위(g)", "출력(SPI/I2C/UART)", "크기"],
    vendors: [
      {
        name: "VectorNav",
        country: "US",
        website: "https://www.vectornav.com",
        description: "고정밀 항법급 IMU. 드리프트 최소화. 자율 보행 적합.",
        products: ["VN-100", "VN-200 GNSS/INS"],
      },
      {
        name: "XSENS (Movella)",
        country: "NL",
        website: "https://www.movella.com",
        description: "웨어러블·모션캡처 전문. MTi 시리즈 로봇 채용 많음.",
        products: ["MTi-1", "MTi-300", "MTi-630"],
      },
      {
        name: "Bosch Sensortec",
        country: "DE",
        website: "https://www.bosch-sensortec.com",
        description: "BMI088·BMI270 등 저가 고성능 IMU IC. DIY/프로토타입에 적합.",
        products: ["BMI088", "BNO055", "BMI270"],
      },
    ],
    purchaseSites: [
      { name: "디바이스마트", url: "https://www.devicemart.co.kr", country: "KR", description: "IMU 모듈 다종 취급" },
      { name: "Mouser", url: "https://www.mouser.kr", country: "KR", description: "반도체·부품 글로벌 유통사" },
      { name: "Digi-Key", url: "https://www.digikey.kr", country: "KR", description: "보쉬·STM 등 IMU IC 구매" },
    ],
  },
  {
    id: "controller",
    name: "Controller / SBC",
    nameKo: "제어 컴퓨터",
    icon: "🖥️",
    description:
      "로봇 전체 제어 루프를 실행하는 온보드 컴퓨터. 실시간 제어는 MCU, 고수준 AI/비전은 SBC/GPU가 담당.",
    keySpecs: ["CPU", "GPU 유무", "I/O(CAN/USB/Ethernet)", "TDP(W)", "크기(mm)", "OS 지원"],
    vendors: [
      {
        name: "NVIDIA",
        country: "US",
        website: "https://www.nvidia.com/en-us/autonomous-machines/jetson/",
        description: "Jetson Orin 시리즈. AI 추론 + 실시간 제어 통합. 대부분의 현대 휴머노이드 탑재.",
        products: ["Jetson Orin NX", "Jetson AGX Orin", "Jetson Orin Nano"],
      },
      {
        name: "Intel",
        country: "US",
        website: "https://www.intel.com/content/www/us/en/products/details/nuc.html",
        description: "NUC 미니PC. x86 호환으로 ROS2 생태계 완벽 지원.",
        products: ["NUC 13 Pro", "Core Ultra NUC"],
      },
      {
        name: "STMicroelectronics",
        country: "CH",
        website: "https://www.st.com",
        description: "STM32 MCU. 로봇 하위 제어(CAN 버스·PWM·인코더) 표준.",
        products: ["STM32F4", "STM32H7", "STM32G4"],
      },
    ],
    purchaseSites: [
      { name: "NVIDIA Jetson 공식", url: "https://developer.nvidia.com/buy-jetson", country: "US", description: "Jetson 공식 구매" },
      { name: "디바이스마트", url: "https://www.devicemart.co.kr", country: "KR", description: "Jetson 모듈·STM32 취급" },
      { name: "Arrow Electronics", url: "https://www.arrow.com", country: "GLOBAL", description: "임베디드 컴퓨팅 글로벌 유통" },
    ],
  },
  {
    id: "battery",
    name: "Battery",
    nameKo: "배터리",
    icon: "🔋",
    description:
      "리튬 이온·LiPo 팩으로 로봇 전력을 공급. 용량·방전율·무게가 보행 시간과 기동성을 결정한다.",
    keySpecs: ["용량(Wh)", "전압(V)", "C-레이팅", "무게(g)", "충전 시간", "BMS 유무"],
    vendors: [
      {
        name: "Tattu (Gens Ace)",
        country: "CN",
        website: "https://www.genstattu.com",
        description: "드론·로봇용 고방전 LiPo. 성능 대비 가격 우수.",
        products: ["Tattu Plus 22.2V 30C", "Tattu 6S 10000mAh"],
      },
      {
        name: "Samsung SDI",
        country: "KR",
        website: "https://www.samsungsdi.com",
        description: "21700·18650 셀. 고에너지 밀도. 맞춤 팩 설계 가능.",
        products: ["21700 50E", "18650 35E"],
      },
      {
        name: "MaxAmps",
        country: "US",
        website: "https://www.maxamps.com",
        description: "커스텀 LiPo 팩 전문. 로봇 전압/용량 맞춤 제작.",
        products: ["LiPo 22.2V 10000mAh", "커스텀 팩"],
      },
    ],
    purchaseSites: [
      { name: "RC마트", url: "https://www.rcmart.co.kr", country: "KR", description: "국내 LiPo 배터리 전문 쇼핑몰" },
      { name: "디바이스마트", url: "https://www.devicemart.co.kr", country: "KR", description: "18650·LiPo 셀 취급" },
      { name: "RobotShop", url: "https://www.robotshop.com/collections/robot-batteries", country: "GLOBAL", description: "로봇 전용 배터리 모음" },
    ],
  },
];
