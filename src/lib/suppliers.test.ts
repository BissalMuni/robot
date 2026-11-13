import { describe, it, expect } from "vitest";
import { aggregateSuppliers } from "./suppliers";
import { partCategories, type PartCategory } from "@/data/parts";

function cat(id: string, nameKo: string, vendors: PartCategory["vendors"]): PartCategory {
  return {
    id,
    name: id,
    nameKo,
    icon: "🔧",
    description: "d",
    keySpecs: [],
    vendors,
    purchaseSites: [],
  };
}

const vendor = (name: string, products: string[] = []): PartCategory["vendors"][number] => ({
  name,
  country: "KR",
  website: "https://example.com",
  description: "d",
  products,
});

describe("aggregateSuppliers", () => {
  it("여러 부품에 걸친 같은 업체를 하나로 병합하고 parts·products 를 합친다", () => {
    const result = aggregateSuppliers([
      cat("a", "액추에이터", [vendor("Acme", ["X1"])]),
      cat("b", "감속기", [vendor("Acme", ["Y1"])]),
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].parts).toEqual(["액추에이터", "감속기"]);
    expect(result[0].products).toEqual(["X1", "Y1"]);
  });

  it("이름순으로 정렬한다", () => {
    const result = aggregateSuppliers([
      cat("a", "액추에이터", [vendor("Zeta"), vendor("Alpha")]),
    ]);
    expect(result.map((s) => s.name)).toEqual(["Alpha", "Zeta"]);
  });

  it("실제 데이터: 중복 없는 업체 목록을 만든다", () => {
    const result = aggregateSuppliers(partCategories);
    const names = result.map((s) => s.name.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
    expect(result.length).toBeGreaterThan(0);
    for (const s of result) expect(s.parts.length).toBeGreaterThan(0);
  });
});
