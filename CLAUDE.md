# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

전 세계 휴머노이드 로봇 정보를 웹에서 수집·정규화하여 검색 가능한 카탈로그로 보여주는 사이트. 데이터는 **웹 스크래핑 + AI 검색**을 병행해 수집하며, 출처가 달라도 동일한 `Robot` 스키마로 통합한다.

## Commands

```bash
pnpm dev          # 개발 서버 (Turbopack)
pnpm build        # 프로덕션 빌드
pnpm start        # 빌드 결과 실행
pnpm lint         # ESLint
pnpm test         # vitest (전체)
pnpm test <file>  # 단일 테스트 파일
pnpm test -t "name"  # 이름으로 단일 테스트
```

> Next.js 16 / React 19 / Tailwind v4. **이 버전은 학습 데이터의 Next.js와 다르다** — 코드 작성 전 `node_modules/next/dist/docs/`의 가이드를 확인할 것 (AGENTS.md 참고).

## Architecture

데이터 소스를 **어댑터 패턴**으로 분리하는 것이 핵심. 새 소스를 추가해도 UI는 바뀌지 않는다.

- **소스 계층** (`src/lib/sources/`): `seed`(수동 큐레이션 JSON), `scraper`(cheerio로 제조사/위키 크롤링), `ai-search`(LLM/검색 API). 모두 `RobotSource` 인터페이스를 구현해 동일한 `Robot[]`을 반환한다.
- **데이터 계층** (`src/lib/robots/`): zod 기반 `Robot` 스키마(`types.ts`), 통합 저장소 조회(`store.ts`), 검색/필터(`search.ts`). MVP 저장소는 JSON, 인터페이스는 DB 교체 가능하게 설계.
- **UI** (`src/app/`): `/` 목록+검색, `/robots/[id]` 상세. 서버 컴포넌트 우선, 상세 페이지는 SSR/메타데이터로 SEO 확보.
- **출처 추적**: 모든 데이터는 `sources[]{url, fetchedAt, verified}`를 보관. AI 검색 등 미검증 데이터는 `verified=false`로 UI에 배지 표시.

자세한 명세는 `.spec/`(constitution, spec, plan) 참고.

## Conventions

- 패키지 매니저: pnpm / 테스트: vitest
- 코드 주석은 한국어, 커밋 메시지는 영어
- import alias `@/*`
- 스크래핑은 robots.txt 존중 + rate limit 적용

## Spec-Driven Development

spec-kit 워크플로우를 따른다: `/speckit.constitution` → `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement` → `/speckit.analyze`. 구현 전 항상 `.spec/` 문서를 먼저 읽는다.
