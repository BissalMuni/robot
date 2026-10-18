import { describe, it, expect } from "vitest";
import {
  glossaryTerms,
  glossaryJsonLd,
  categoryOrder,
  categoryLabels,
} from "./glossary";

describe("glossary 데이터 정합성", () => {
  const ids = new Set(glossaryTerms.map((t) => t.id));

  it("id 는 중복이 없다", () => {
    expect(ids.size).toBe(glossaryTerms.length);
  });

  it("모든 항목의 category 는 categoryOrder/labels 에 정의돼 있다", () => {
    for (const term of glossaryTerms) {
      expect(categoryOrder).toContain(term.category);
      expect(categoryLabels[term.category]).toBeDefined();
    }
  });

  it("모든 분류에 최소 1개 용어가 있다(빈 섹션 방지)", () => {
    for (const category of categoryOrder) {
      expect(glossaryTerms.some((t) => t.category === category)).toBe(true);
    }
  });

  it("용어·원어·정의는 비어 있지 않다", () => {
    for (const term of glossaryTerms) {
      expect(term.term.trim().length).toBeGreaterThan(0);
      expect(term.termEn.trim().length).toBeGreaterThan(0);
      expect(term.definition.trim().length).toBeGreaterThan(0);
    }
  });

  // seeAlso 는 실제 존재하는 용어 id 만 가리켜야 한다.
  // (GlossaryCard 는 없는 id 를 조용히 걸러내므로, 오타 난 링크가 UI 에서 흔적 없이 사라진다.)
  it("seeAlso 는 존재하는 용어 id 만 참조한다", () => {
    for (const term of glossaryTerms) {
      for (const ref of term.seeAlso ?? []) {
        expect(ids.has(ref), `${term.id} → ${ref}`).toBe(true);
      }
    }
  });

  it("seeAlso 는 자기 자신을 가리키지 않는다", () => {
    for (const term of glossaryTerms) {
      expect(term.seeAlso ?? []).not.toContain(term.id);
    }
  });
});

describe("glossaryJsonLd", () => {
  it("schema.org DefinedTermSet 구조를 만든다", () => {
    const ld = glossaryJsonLd(glossaryTerms);
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("DefinedTermSet");
    const terms = ld.hasDefinedTerm as unknown[];
    expect(terms).toHaveLength(glossaryTerms.length);
  });

  it("각 항목을 DefinedTerm 으로 매핑하고 원어를 alternateName 에 담는다", () => {
    const sample = glossaryTerms.find((t) => t.abbr)!;
    const ld = glossaryJsonLd([sample]);
    const [term] = ld.hasDefinedTerm as {
      "@type": string;
      name: string;
      alternateName: string[];
      description: string;
      termCode?: string;
    }[];
    expect(term["@type"]).toBe("DefinedTerm");
    expect(term.name).toBe(sample.term);
    expect(term.description).toBe(sample.definition);
    expect(term.alternateName).toContain(sample.termEn);
    // 약어가 있으면 alternateName 과 termCode 양쪽에 노출한다.
    expect(term.alternateName).toContain(sample.abbr);
    expect(term.termCode).toBe(sample.abbr);
  });

  it("약어가 없으면 termCode 를 넣지 않는다", () => {
    const noAbbr = glossaryTerms.find((t) => !t.abbr)!;
    const ld = glossaryJsonLd([noAbbr]);
    const [term] = ld.hasDefinedTerm as { termCode?: string }[];
    expect(term.termCode).toBeUndefined();
  });
});
