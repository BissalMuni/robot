import { describe, it, expect } from "vitest";
import { searchRobots, availableCountries } from "./search";
import type { Robot } from "./types";

function robot(p: Partial<Robot> & Pick<Robot, "id" | "name">): Robot {
  return {
    manufacturer: "M",
    country: "US",
    category: "general",
    status: "concept",
    description: "",
    images: [],
    sources: [],
    ...p,
  };
}

const data: Robot[] = [
  robot({ id: "1", name: "Atlas", manufacturer: "Boston Dynamics", country: "United States", category: "research", status: "research" }),
  robot({ id: "2", name: "Pepper", manufacturer: "SoftBank", country: "Japan", category: "service", status: "commercial" }),
  robot({ id: "3", name: "Optimus", manufacturer: "Tesla", country: "United States", category: "general", status: "concept" }),
];

describe("searchRobots", () => {
  it("빈 필터면 전체를 반환한다", () => {
    expect(searchRobots(data, {})).toHaveLength(3);
  });

  it("이름으로 검색한다(대소문자 무시)", () => {
    expect(searchRobots(data, { query: "atlas" }).map((r) => r.id)).toEqual(["1"]);
  });

  it("제조사로 검색한다", () => {
    expect(searchRobots(data, { query: "tesla" }).map((r) => r.id)).toEqual(["3"]);
  });

  it("설명(description) 키워드로 검색한다", () => {
    const withDesc: Robot[] = [
      ...data,
      robot({
        id: "4",
        name: "Digit",
        manufacturer: "Agility Robotics",
        country: "United States",
        description: "bipedal logistics automation robot",
      }),
    ];
    expect(searchRobots(withDesc, { query: "bipedal" }).map((r) => r.id)).toEqual(["4"]);
  });

  it("설명이 빈 로봇은 설명 검색에 걸리지 않는다", () => {
    // 기존 data 는 모두 description: "" → "bipedal" 매칭 없음
    expect(searchRobots(data, { query: "bipedal" })).toEqual([]);
  });

  it("국가 필터를 적용한다", () => {
    expect(searchRobots(data, { country: "United States" }).map((r) => r.id)).toEqual(["1", "3"]);
  });

  it("카테고리/상태 필터를 조합한다", () => {
    expect(searchRobots(data, { category: "general", status: "concept" }).map((r) => r.id)).toEqual(["3"]);
  });

  it("일치 항목이 없으면 빈 배열", () => {
    expect(searchRobots(data, { query: "zzz" })).toEqual([]);
  });
});

describe("availableCountries", () => {
  it("중복을 제거하고 정렬한다", () => {
    expect(availableCountries(data)).toEqual(["Japan", "United States"]);
  });
});
