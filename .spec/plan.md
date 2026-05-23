# Plan — MVP 구현 계획

constitution + spec 기반 기술 계획.

## 아키텍처 개요

```
브라우저
  └─ Next.js App Router (SSR)
       ├─ 페이지: / (목록+검색), /robots/[id] (상세)
       ├─ 데이터 액세스 계층: lib/robots (스키마, 쿼리, 검색)
       └─ 데이터 소스 계층 (어댑터 패턴)
            ├─ seed     : data/robots.seed.json (수동 큐레이션)
            └─ scraper  : lib/sources/scraper (제조사/위키 크롤링 → Robot)
```

AI 검색은 **런타임 모듈이 아니다**: Claude Code가 큐레이션 시점에 웹을 조사해 `data/`의 JSON에 직접 추가하며, 미검증 항목은 `sources[].verified=false`로 표기한다.

핵심: 코드 소스(seed/scraper)는 `RobotSource` 인터페이스를 구현해 동일한 `Robot[]`를 반환한다. 수집 결과는 통합 저장소(MVP에선 JSON 파일, 추후 DB)로 머지된다.

## 파일 구조 (계획)

```
src/
├── app/
│   ├── page.tsx                 # 목록 + 검색 UI
│   └── robots/[id]/page.tsx     # 상세 페이지
├── components/
│   ├── RobotCard.tsx
│   ├── RobotGrid.tsx
│   └── SearchFilters.tsx
├── lib/
│   ├── robots/
│   │   ├── types.ts             # Robot 스키마 (zod)
│   │   ├── store.ts             # 통합 저장소 조회/검색
│   │   └── search.ts            # 필터/검색 로직
│   └── sources/
│       ├── types.ts             # RobotSource 인터페이스
│       ├── seed.ts
│       └── scraper.ts
├── i18n/                        # next-intl 설정
│   └── messages/{ko,en}.json
data/
├── robots.seed.json             # 수동 큐레이션
└── robots.collected.json        # 스크래핑 + Claude Code 조사 결과(커밋)
```

## 의존성

- `zod` — Robot 스키마 검증/정규화
- `cheerio` — HTML 파싱(스크래핑)
- `next-intl` — 한/영 i18n
- `vitest` — 테스트

런타임 LLM/검색 SDK는 추가하지 않는다 (AI 수집은 Claude Code 큐레이션 절차).

## 구현 순서

1. **Setup**: zod 스키마(`types.ts`), 시드 데이터, store 조회, next-intl(ko/en) 기본 설정
2. **Core**: 목록 페이지 + RobotCard/Grid, 상세 페이지
3. **Features**: 검색/필터, scraper 어댑터, 언어 전환
4. **Polish**: 출처 표기/미검증 배지, SEO 메타데이터, 테스트

## 기술적 결정

- 어댑터 패턴으로 소스를 분리 → 새 소스 추가 시 UI 무변경 (성공 기준 충족)
- MVP 저장소는 JSON 파일, 인터페이스를 DB 교체 가능하게 설계
- 미검증(AI) 데이터는 `sources[].verified=false`로 추적하고 UI에서 배지 표시
