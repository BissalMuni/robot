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
            ├─ scraper  : lib/sources/scraper (제조사/위키 크롤링 → Robot)
            └─ ai-search: lib/sources/ai-search (LLM/검색 API → Robot, 미검증)
```

핵심: 모든 소스는 `RobotSource` 인터페이스를 구현해 동일한 `Robot[]`를 반환한다. 수집 결과는 통합 저장소(MVP에선 JSON, 추후 DB)로 머지된다.

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
│       ├── scraper.ts
│       └── ai-search.ts
data/
└── robots.seed.json
```

## 의존성

- `zod` — Robot 스키마 검증/정규화
- `cheerio` — HTML 파싱(스크래핑)
- (선택) `@anthropic-ai/sdk` — AI 검색
- `vitest` — 테스트

## 구현 순서

1. **Setup**: zod 스키마(`types.ts`), 시드 데이터, store 조회
2. **Core**: 목록 페이지 + RobotCard/Grid, 상세 페이지
3. **Features**: 검색/필터, scraper 어댑터, ai-search 어댑터
4. **Polish**: 출처 표기/미검증 배지, SEO 메타데이터, 테스트

## 기술적 결정

- 어댑터 패턴으로 소스를 분리 → 새 소스 추가 시 UI 무변경 (성공 기준 충족)
- MVP 저장소는 JSON 파일, 인터페이스를 DB 교체 가능하게 설계
- 미검증(AI) 데이터는 `sources[].verified=false`로 추적하고 UI에서 배지 표시
