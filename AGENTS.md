<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## spec-kit (Spec-Driven Development)

AI 코딩 에이전트를 위한 지시사항. spec-kit 방식의 Spec-Driven Development를 따른다.

## 워크플로우

1. `/speckit.constitution` — 프로젝트 원칙 정의/수정 (`.spec/constitution.md`)
2. `/speckit.specify` — 기능 명세 작성 (`.spec/spec.md`)
3. `/speckit.clarify` — 모호한 요구사항 명확화
4. `/speckit.plan` — 기술 구현 계획 (`.spec/plan.md`)
5. `/speckit.tasks` — 작업 목록 생성 (`.spec/tasks.md`)
6. `/speckit.implement` — 계획 기반 구현
7. `/speckit.analyze` — 교차 문서 일관성 분석 (읽기 전용)

## 규칙

- 구현 전 `.spec/`의 문서를 먼저 읽는다.
- 패키지 매니저는 pnpm, 테스트는 vitest.
- 코드 주석은 한국어, 커밋 메시지는 영어.
