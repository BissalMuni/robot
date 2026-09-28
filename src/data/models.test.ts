import { describe, it, expect } from "vitest";
import {
  robotModels,
  categoryOrder,
  categoryLabels,
  maturityLabels,
} from "./models";

// 모델 페이지는 categoryOrder(단일 출처)로 섹션·앵커를 렌더하고 maturity 배지를 붙인다.
// 아래 테스트는 그 전제(id 고유·순서-라벨 일치·카테고리 커버·유효 maturity·필수 필드·유효 링크·연도)를 지킨다.
describe("models 데이터", () => {
  it("모든 항목의 id 가 고유하다(앵커·React key 충돌 방지)", () => {
    const ids = robotModels.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("categoryOrder 와 categoryLabels 의 키가 일치한다(단일 출처)", () => {
    expect(new Set(categoryOrder)).toEqual(
      new Set(Object.keys(categoryLabels) as typeof categoryOrder),
    );
  });

  it("모든 항목의 category 가 categoryOrder 안에 있다", () => {
    for (const item of robotModels) {
      expect(categoryOrder).toContain(item.category);
    }
  });

  it("모든 카테고리에 최소 한 개의 모델이 있다(빈 섹션 방지)", () => {
    for (const category of categoryOrder) {
      expect(robotModels.some((m) => m.category === category)).toBe(true);
    }
  });

  it("모든 항목의 maturity 가 maturityLabels 에 정의돼 있다", () => {
    for (const item of robotModels) {
      expect(Object.keys(maturityLabels)).toContain(item.maturity);
    }
  });

  it("모든 항목은 이름·개발주체·설명과 최소 한 개의 요점·태그를 가진다", () => {
    for (const item of robotModels) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.developer.length).toBeGreaterThan(0);
      expect(item.summary.length).toBeGreaterThan(0);
      expect(item.highlights.length).toBeGreaterThan(0);
      expect(item.tags.length).toBeGreaterThan(0);
    }
  });

  it("연도는 2000~2100 범위의 정수다", () => {
    for (const item of robotModels) {
      expect(Number.isInteger(item.year)).toBe(true);
      expect(item.year).toBeGreaterThanOrEqual(2000);
      expect(item.year).toBeLessThanOrEqual(2100);
    }
  });

  it("url 이 있으면 http(s) 절대 URL 이다", () => {
    for (const item of robotModels) {
      if (item.url !== undefined) {
        expect(item.url).toMatch(/^https?:\/\//);
      }
    }
  });
});
