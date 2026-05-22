# Specification — MVP

WHAT과 WHY에 집중한다. HOW는 plan.md에서 다룬다.

## 유저 스토리

- As a 로봇 관심자, I want 전 세계 휴머노이드 로봇을 한 목록에서 보고, So that 어떤 로봇들이 있는지 한눈에 파악한다.
- As a 사용자, I want 이름·제조사·국가·용도로 검색/필터하고, So that 관심 있는 로봇을 빠르게 찾는다.
- As a 사용자, I want 로봇 상세 정보(스펙, 이미지, 출처)를 보고, So that 깊이 있게 비교한다.

## 기능 요구사항 (MVP)

### FR-1 로봇 목록
- 로봇을 카드 그리드로 표시 (이미지, 이름, 제조사, 국가)
- 데이터 출처에 관계없이 통합된 형태로 노출

### FR-2 검색 / 필터
- 텍스트 검색: 이름, 제조사
- 필터: 국가, 용도/카테고리, 상태(연구용/상용/콘셉트)
- 검색은 빈 결과 시 안내 메시지 표시

### FR-3 로봇 상세
- 전체 스펙(키, 무게, 자유도, 발표연도 등), 설명, 이미지 갤러리
- 출처 URL 및 수집 시각 표기
- AI 검색으로 채워진 미검증 필드는 시각적으로 구분

## 데이터 모델 (개념)

`Robot`: id, name, manufacturer, country, year, category, status, height, weight, dof, description, images[], sources[]{url, fetchedAt, verified}

## 성공 기준

- 시드 데이터로 목록/검색/상세가 동작
- 새 로봇을 데이터 소스에 추가하면 코드 변경 없이 목록에 반영
- 스크래핑/AI 수집 결과가 동일 `Robot` 스키마로 들어옴

## Clarifications

- (추후 /speckit.clarify로 채움)
