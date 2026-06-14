export type SoftwareCategory =
  | "os"
  | "middleware"
  | "simulation"
  | "planning"
  | "ai-ml"
  | "slam-nav"
  | "computer-vision"
  | "embedded"
  | "devtools";

export type SoftwareLicense =
  | "Apache-2.0"
  | "MIT"
  | "BSD"
  | "GPL"
  | "LGPL"
  | "Commercial"
  | "Free"
  | "AGPL-3.0";

export type SoftwareTool = {
  id: string;
  name: string;
  category: SoftwareCategory;
  description: string;
  descriptionKo: string;
  website: string;
  github?: string;
  license: SoftwareLicense;
  languages: string[];
  tags: string[];
  recommended?: boolean;
};

export const categoryLabels: Record<SoftwareCategory, { ko: string; en: string; icon: string }> = {
  os: { ko: "운영체제", en: "OS & Kernel", icon: "🖥️" },
  middleware: { ko: "미들웨어", en: "Middleware", icon: "🔗" },
  simulation: { ko: "시뮬레이션", en: "Simulation", icon: "🎮" },
  planning: { ko: "모션 플래닝", en: "Motion Planning", icon: "🦾" },
  "ai-ml": { ko: "AI / 강화학습", en: "AI / RL", icon: "🧠" },
  "slam-nav": { ko: "SLAM / 내비게이션", en: "SLAM / Navigation", icon: "🗺️" },
  "computer-vision": { ko: "컴퓨터 비전", en: "Computer Vision", icon: "👁️" },
  embedded: { ko: "임베디드", en: "Embedded", icon: "⚙️" },
  devtools: { ko: "개발 도구", en: "Dev Tools", icon: "🛠️" },
};

export const softwareTools: SoftwareTool[] = [
  // ── OS & Kernel ─────────────────────────────────────────────────────────────
  {
    id: "ubuntu-2204",
    name: "Ubuntu 22.04 LTS",
    category: "os",
    description: "De-facto standard OS for ROS2-based robotics development",
    descriptionKo: "ROS2 기반 로봇 개발의 사실상 표준 OS. 장기 지원(2027년까지)으로 안정성 보장.",
    website: "https://ubuntu.com",
    license: "Free",
    languages: [],
    tags: ["LTS", "Jammy"],
    recommended: true,
  },
  {
    id: "rt-linux",
    name: "PREEMPT_RT Patch",
    category: "os",
    description: "Real-time Linux kernel patch for deterministic low-latency control",
    descriptionKo: "저지연 실시간 제어가 필요한 관절 제어 루프에 적용. 1 kHz 제어 루프 구현 시 필수.",
    website: "https://wiki.linuxfoundation.org/realtime/start",
    license: "GPL",
    languages: ["C"],
    tags: ["실시간", "커널"],
  },
  // ── Middleware ───────────────────────────────────────────────────────────────
  {
    id: "ros2-humble",
    name: "ROS2 Humble",
    category: "middleware",
    description: "LTS release of ROS2 — the standard robotics middleware for sensor fusion, inter-process communication, and hardware abstraction",
    descriptionKo: "로봇 개발 표준 미들웨어. 센서 데이터 퍼블리싱, 서비스 호출, 액션 서버로 분산 노드 구성.",
    website: "https://docs.ros.org/en/humble",
    github: "https://github.com/ros2/ros2",
    license: "Apache-2.0",
    languages: ["Python", "C++"],
    tags: ["LTS", "DDS", "토픽/서비스/액션"],
    recommended: true,
  },
  {
    id: "micro-ros",
    name: "micro-ROS",
    category: "middleware",
    description: "ROS2 for microcontrollers (STM32, Arduino, ESP32)",
    descriptionKo: "마이크로컨트롤러 위에서 ROS2 노드를 직접 실행. 관절 드라이버·IMU 펌웨어에 활용.",
    website: "https://micro.ros.org",
    github: "https://github.com/micro-ROS",
    license: "Apache-2.0",
    languages: ["C"],
    tags: ["STM32", "임베디드", "RTOS"],
  },
  // ── Simulation ──────────────────────────────────────────────────────────────
  {
    id: "gazebo-harmonic",
    name: "Gazebo (Harmonic)",
    category: "simulation",
    description: "Open-source 3D robot simulator with ROS2 integration via gz_ros2_control",
    descriptionKo: "ROS2 와 기본 통합되는 3D 물리 시뮬레이터. URDF/SDF 모델을 그대로 사용 가능.",
    website: "https://gazebosim.org",
    github: "https://github.com/gazebosim",
    license: "Apache-2.0",
    languages: ["C++", "Python"],
    tags: ["물리엔진", "ROS2", "URDF"],
    recommended: true,
  },
  {
    id: "isaac-sim",
    name: "NVIDIA Isaac Sim",
    category: "simulation",
    description: "GPU-accelerated photorealistic simulator with synthetic data generation for humanoid training",
    descriptionKo: "GPU 가속 포토리얼리스틱 시뮬레이터. 강화학습 대규모 병렬 훈련(IsaacGym 후계)에 적합.",
    website: "https://developer.nvidia.com/isaac-sim",
    license: "Free",
    languages: ["Python"],
    tags: ["GPU", "강화학습", "합성 데이터", "Omniverse"],
  },
  {
    id: "mujoco",
    name: "MuJoCo",
    category: "simulation",
    description: "Fast, accurate physics simulator widely used for legged locomotion research",
    descriptionKo: "Google DeepMind 오픈소스. 이족·사족 보행 연구에서 가장 많이 사용되는 물리 엔진.",
    website: "https://mujoco.org",
    github: "https://github.com/google-deepmind/mujoco",
    license: "Apache-2.0",
    languages: ["C", "Python"],
    tags: ["물리엔진", "보행", "RL환경"],
    recommended: true,
  },
  // ── Motion Planning ─────────────────────────────────────────────────────────
  {
    id: "moveit2",
    name: "MoveIt 2",
    category: "planning",
    description: "ROS2 arm/whole-body motion planning framework with collision avoidance",
    descriptionKo: "ROS2 기반 팔·전신 모션 플래닝 프레임워크. 충돌 회피, IK 솔버, 경로 최적화 포함.",
    website: "https://moveit.ros.org",
    github: "https://github.com/ros-planning/moveit2",
    license: "BSD",
    languages: ["C++", "Python"],
    tags: ["IK", "충돌회피", "ROS2"],
    recommended: true,
  },
  {
    id: "drake",
    name: "Drake",
    category: "planning",
    description: "Model-based optimization and control for manipulation and locomotion (MIT / Toyota Research)",
    descriptionKo: "모델 기반 최적화 제어. 조작·보행 궤적 최적화(iLQR, SOS 등)에 활용.",
    website: "https://drake.mit.edu",
    github: "https://github.com/RobotLocomotion/drake",
    license: "BSD",
    languages: ["C++", "Python"],
    tags: ["최적화", "궤적계획", "제어"],
  },
  // ── AI / RL ─────────────────────────────────────────────────────────────────
  {
    id: "pytorch",
    name: "PyTorch",
    category: "ai-ml",
    description: "Primary deep learning framework for robot policy training",
    descriptionKo: "로봇 정책 학습(locomotion policy, manipulation policy)의 기본 딥러닝 프레임워크.",
    website: "https://pytorch.org",
    github: "https://github.com/pytorch/pytorch",
    license: "BSD",
    languages: ["Python", "C++"],
    tags: ["딥러닝", "GPU"],
    recommended: true,
  },
  {
    id: "isaaclab",
    name: "Isaac Lab",
    category: "ai-ml",
    description: "NVIDIA's unified RL training platform (successor to IsaacGym) for humanoid locomotion and dexterous manipulation",
    descriptionKo: "NVIDIA 강화학습 훈련 플랫폼. 수천 환경 병렬 실행으로 이족 보행·다관절 조작 정책 신속 훈련.",
    website: "https://isaac-sim.github.io/IsaacLab",
    github: "https://github.com/isaac-sim/IsaacLab",
    license: "BSD",
    languages: ["Python"],
    tags: ["강화학습", "병렬훈련", "NVIDIA", "보행"],
    recommended: true,
  },
  {
    id: "legged-gym",
    name: "legged_gym",
    category: "ai-ml",
    description: "ETH Zurich's IsaacGym-based training environment for legged robots (ANYmal, Unitree)",
    descriptionKo: "ETH 취리히 이족·사족 로봇 RL 훈련 환경. Unitree H1/Go2 등 최신 로봇 정책 학습 기준선.",
    website: "https://leggedrobotics.github.io/legged_gym",
    github: "https://github.com/leggedrobotics/legged_gym",
    license: "BSD",
    languages: ["Python"],
    tags: ["이족보행", "강화학습", "ETH"],
  },
  // ── SLAM / Navigation ────────────────────────────────────────────────────────
  {
    id: "nav2",
    name: "Nav2",
    category: "slam-nav",
    description: "ROS2 Navigation Stack — path planning and obstacle avoidance for mobile bases",
    descriptionKo: "ROS2 표준 내비게이션 스택. 경로 계획·장애물 회피·동적 지도 활용.",
    website: "https://nav2.org",
    github: "https://github.com/ros-navigation/navigation2",
    license: "Apache-2.0",
    languages: ["C++", "Python"],
    tags: ["경로계획", "ROS2"],
    recommended: true,
  },
  {
    id: "orb-slam3",
    name: "ORB-SLAM3",
    category: "slam-nav",
    description: "Real-time monocular/stereo/RGB-D SLAM system",
    descriptionKo: "단안·스테레오·RGB-D 지원 실시간 SLAM. 로봇 자기위치추정(localization)에 활용.",
    website: "https://github.com/UZ-SLAMlab/ORB_SLAM3",
    github: "https://github.com/UZ-SLAMlab/ORB_SLAM3",
    license: "GPL",
    languages: ["C++"],
    tags: ["SLAM", "비전"],
  },
  {
    id: "cartographer",
    name: "Cartographer",
    category: "slam-nav",
    description: "Google's real-time 2D/3D SLAM with loop-closure detection",
    descriptionKo: "Google 오픈소스 2D/3D SLAM. 루프 클로저 자동 감지로 대형 공간 지도 작성에 강점.",
    website: "https://google-cartographer.readthedocs.io",
    github: "https://github.com/cartographer-project/cartographer",
    license: "Apache-2.0",
    languages: ["C++"],
    tags: ["SLAM", "Lidar", "Google"],
  },
  // ── Computer Vision ──────────────────────────────────────────────────────────
  {
    id: "opencv",
    name: "OpenCV",
    category: "computer-vision",
    description: "Foundational open-source computer vision library",
    descriptionKo: "컴퓨터 비전 기본 라이브러리. 카메라 보정·이미지 처리·물체 검출 기초 제공.",
    website: "https://opencv.org",
    github: "https://github.com/opencv/opencv",
    license: "Apache-2.0",
    languages: ["C++", "Python"],
    tags: ["비전", "카메라"],
    recommended: true,
  },
  {
    id: "yolov8",
    name: "YOLOv8 (Ultralytics)",
    category: "computer-vision",
    description: "State-of-the-art real-time object detection for robot perception",
    descriptionKo: "최신 실시간 물체 검출 모델. 로봇 인식(물건 파악·사람 검출)에 사용.",
    website: "https://docs.ultralytics.com",
    github: "https://github.com/ultralytics/ultralytics",
    license: "AGPL-3.0",
    languages: ["Python"],
    tags: ["물체검출", "실시간"],
  },
  {
    id: "mediapipe",
    name: "MediaPipe",
    category: "computer-vision",
    description: "Google's cross-platform ML pipeline for hand/pose/face detection",
    descriptionKo: "Google 크로스플랫폼 ML 파이프라인. 손·자세·얼굴 추정으로 인간-로봇 인터랙션에 활용.",
    website: "https://developers.google.com/mediapipe",
    github: "https://github.com/google-ai-edge/mediapipe",
    license: "Apache-2.0",
    languages: ["Python", "C++"],
    tags: ["자세추정", "Google"],
  },
  // ── Embedded ─────────────────────────────────────────────────────────────────
  {
    id: "dynamixel-sdk",
    name: "Dynamixel SDK",
    category: "embedded",
    description: "ROBOTIS official SDK for Dynamixel servo communication (C++/Python/ROS2)",
    descriptionKo: "로보티즈 다이나믹셀 서보 공식 SDK. ROS2 패키지 포함, 국내 연구팀 표준.",
    website: "https://emanual.robotis.com/docs/en/software/dynamixel/dynamixel_sdk",
    github: "https://github.com/ROBOTIS-GIT/DynamixelSDK",
    license: "Apache-2.0",
    languages: ["C++", "Python"],
    tags: ["서보", "ROBOTIS", "국산"],
    recommended: true,
  },
  {
    id: "ethercat",
    name: "EtherCAT / SOEM",
    category: "embedded",
    description: "Industrial real-time fieldbus for high-performance motor driver communication",
    descriptionKo: "고성능 서보 드라이버 통신 표준. 1 ms 이하 주기 제어가 필요한 산업용 로봇 관절에 사용.",
    website: "https://www.ethercat.org",
    license: "Free",
    languages: ["C"],
    tags: ["필드버스", "실시간", "산업용"],
  },
  // ── Dev Tools ─────────────────────────────────────────────────────────────────
  {
    id: "docker",
    name: "Docker",
    category: "devtools",
    description: "Containerize ROS2 environments for reproducible builds and CI/CD",
    descriptionKo: "ROS2 개발 환경 컨테이너화. CI/CD 및 팀 간 환경 통일에 필수.",
    website: "https://www.docker.com",
    github: "https://github.com/docker",
    license: "Apache-2.0",
    languages: [],
    tags: ["컨테이너", "CI/CD"],
    recommended: true,
  },
  {
    id: "rviz2",
    name: "RViz2",
    category: "devtools",
    description: "ROS2 3D visualization tool for sensor data, TF frames, and robot state",
    descriptionKo: "ROS2 표준 3D 시각화 도구. 센서 데이터·TF 트리·로봇 상태를 실시간 확인.",
    website: "https://github.com/ros2/rviz",
    github: "https://github.com/ros2/rviz",
    license: "Apache-2.0",
    languages: ["C++"],
    tags: ["시각화", "ROS2"],
  },
  {
    id: "foxglove",
    name: "Foxglove Studio",
    category: "devtools",
    description: "Modern ROS2 visualization and log analysis platform (browser + desktop)",
    descriptionKo: "모던 ROS2 시각화·로그 분석 플랫폼. 브라우저·데스크탑 모두 지원, WebSocket 연동.",
    website: "https://foxglove.dev",
    github: "https://github.com/foxglove/studio",
    license: "MIT",
    languages: ["TypeScript"],
    tags: ["시각화", "로그분석", "브라우저"],
  },
];
