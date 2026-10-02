import { describe, it, expect } from "vitest";
import {
  faqItems,
  faqJsonLd,
  categoryOrder,
  categoryLabels,
} from "./faq";

describe("faq 데이터 정합성", () => {
  it("id 는 중복이 없다", () => {
    const ids = faqItems.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("모든 항목의 category 는 categoryOrder/labels 에 정의돼 있다", () => {
    for (const item of faqItems) {
      expect(categoryOrder).toContain(item.category);
      expect(categoryLabels[item.category]).toBeDefined();
    }
  });

  it("모든 분류에 최소 1개 질문이 있다(빈 섹션 방지)", () => {
    for (const category of categoryOrder) {
      expect(faqItems.some((f) => f.category === category)).toBe(true);
    }
  });

  it("질문·답변은 비어 있지 않다", () => {
    for (const item of faqItems) {
      expect(item.question.trim().length).toBeGreaterThan(0);
      expect(item.answer.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("faqJsonLd", () => {
  it("schema.org FAQPage 구조를 만든다", () => {
    const ld = faqJsonLd(faqItems);
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("FAQPage");
    const entities = ld.mainEntity as unknown[];
    expect(entities).toHaveLength(faqItems.length);
  });

  it("각 항목을 Question/acceptedAnswer 쌍으로 매핑한다", () => {
    const ld = faqJsonLd([faqItems[0]]);
    const [q] = ld.mainEntity as {
      "@type": string;
      name: string;
      acceptedAnswer: { "@type": string; text: string };
    }[];
    expect(q["@type"]).toBe("Question");
    expect(q.name).toBe(faqItems[0].question);
    expect(q.acceptedAnswer["@type"]).toBe("Answer");
    expect(q.acceptedAnswer.text).toBe(faqItems[0].answer);
  });
});
