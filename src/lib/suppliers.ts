import type { PartCategory, Vendor } from "@/data/parts";

// 부품 데이터(partCategories)는 "부품별 공급사"로 정리돼 있다.
// 창업 공급망 관점에서는 "공급사별로 무엇을 만드는가"가 더 유용하므로, 업체 기준으로 뒤집어 집계한다.
export type Supplier = {
  name: string;
  country: Vendor["country"];
  website: string;
  description: string;
  parts: string[]; // 이 업체가 공급하는 부품 카테고리(한국어 이름) 목록
  products: string[];
};

// 모든 부품 카테고리의 업체(vendors)를 이름 기준으로 중복 제거·병합한다 (순수 함수).
// 한 업체가 여러 부품을 공급하면 parts·products 를 합친다. 이름순 정렬로 결정적.
export function aggregateSuppliers(categories: PartCategory[]): Supplier[] {
  const byName = new Map<string, Supplier>();
  for (const cat of categories) {
    for (const v of cat.vendors) {
      const key = v.name.toLowerCase();
      const existing = byName.get(key);
      if (existing) {
        if (!existing.parts.includes(cat.nameKo)) existing.parts.push(cat.nameKo);
        for (const p of v.products) {
          if (!existing.products.includes(p)) existing.products.push(p);
        }
      } else {
        byName.set(key, {
          name: v.name,
          country: v.country,
          website: v.website,
          description: v.description,
          parts: [cat.nameKo],
          products: [...v.products],
        });
      }
    }
  }
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}
