import { describe, it, expect } from "vitest";
import { koreanVendorCount } from "./parts";
import { partCategories, type PartCategory } from "@/data/parts";

function cat(vendorCountries: PartCategory["vendors"][number]["country"][]): PartCategory {
  return {
    id: "x",
    name: "X",
    nameKo: "엑스",
    icon: "🔧",
    description: "d",
    keySpecs: [],
    vendors: vendorCountries.map((c, i) => ({
      name: `v${i}`,
      country: c,
      website: "https://example.com",
      description: "d",
      products: [],
    })),
    purchaseSites: [],
  };
}

describe("koreanVendorCount", () => {
  it("KR 업체 수를 센다", () => {
    expect(koreanVendorCount(cat(["KR", "US", "KR", "CN"]))).toBe(2);
  });

  it("KR 업체가 없으면 0", () => {
    expect(koreanVendorCount(cat(["US", "CN"]))).toBe(0);
  });

  it("실제 데이터: 액추에이터에는 국산 제조사가 1곳 이상 있다(ROBOTIS)", () => {
    const actuator = partCategories.find((c) => c.id === "actuator")!;
    expect(koreanVendorCount(actuator)).toBeGreaterThan(0);
  });
});
