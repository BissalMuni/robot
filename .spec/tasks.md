# Tasks — MVP

`.spec/plan.md` + `.spec/spec.md` 기반. Phase 순서대로 진행한다. 각 작업은 독립 실행/검증 가능.

## Phase 1: Setup

- [x] [T001] 의존성 설치: `zod`, `cheerio`, `next-intl` (`package.json`)
- [x] [T002] vitest 설정: `vitest.config.ts`, `package.json` test 스크립트, 샘플 테스트
- [x] [T003] `Robot` zod 스키마 정의 (`src/lib/robots/types.ts`) — id, name, manufacturer, country, year, category, status, height, weight, dof, description, images[], sources[]{url, fetchedAt, verified}
- [x] [T004] `RobotSource` 인터페이스 정의 (`src/lib/sources/types.ts`)
- [x] [T005] next-intl 기본 설정 + ko/en 메시지 파일 (`src/i18n/`, `src/i18n/messages/{ko,en}.json`)

## Phase 2: Core

- [x] [T006] 수동 시드 데이터 작성: 휴머노이드 로봇 10~20개 (`data/robots.seed.json`)
- [x] [T007] seed 소스 어댑터 — JSON 로드 + 스키마 검증 (`src/lib/sources/seed.ts`)
- [x] [T008] 통합 저장소: 모든 소스 머지 + id 조회 (`src/lib/robots/store.ts`)
- [x] [T009] `RobotCard` / `RobotGrid` 컴포넌트 (`src/components/`)
- [x] [T010] 목록 페이지 — store에서 전체 로드 후 그리드 렌더 (`src/app/page.tsx`)
- [x] [T011] 상세 페이지 + SSR 메타데이터 (`src/app/robots/[id]/page.tsx`)

## Phase 3: Features

- [x] [T012] 검색/필터 로직 — 이름·제조사 텍스트, 국가·카테고리·상태 필터 (`src/lib/robots/search.ts`)
- [x] [T013] `SearchFilters` UI + 목록 페이지 연결 (`src/components/SearchFilters.tsx`)
- [x] [T014] 빈 결과 안내 메시지 처리
- [x] [T015] scraper 어댑터 — cheerio 파싱, robots.txt 존중 + rate limit, Robot 정규화 (`src/lib/sources/scraper.ts`)
- [x] [T016] 스크래핑 결과를 `data/robots.collected.json`으로 저장하는 수집 스크립트
- [x] [T017] 언어 전환 UI (ko/en)

## Phase 4: Polish

- [x] [T018] 출처 표기 + 미검증(verified=false) 배지 UI (상세 페이지)
- [x] [T019] search.ts / store.ts / scraper 정규화 단위 테스트 (vitest)
- [x] [T020] SEO: sitemap/metadata 점검, 이미지 최적화
- [x] [T021] `pnpm lint` / `pnpm build` 통과 확인

## 요약

- 총 21개 작업 / 4 Phase (Setup 5, Core 6, Features 6, Polish 4)
- Claude Code의 AI 데이터 조사는 T006/T016 산출물(JSON)에 직접 보강하는 절차로 수행 (런타임 코드 아님)
