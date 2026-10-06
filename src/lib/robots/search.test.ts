import { describe, it, expect } from "vitest";
import {
  searchRobots,
  availableCountries,
  parseRobotFilters,
  parseRobotSort,
  sortRobots,
  hasActiveFilters,
  DEFAULT_ROBOT_SORT,
} from "./search";
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

describe("parseRobotFilters", () => {
  it("유효한 category/status 는 그대로 통과시킨다", () => {
    expect(
      parseRobotFilters({ category: "service", status: "commercial" }),
    ).toEqual({
      query: undefined,
      country: undefined,
      category: "service",
      status: "commercial",
    });
  });

  it("유효하지 않은 category/status 는 무시한다(undefined)", () => {
    const f = parseRobotFilters({ category: "foo", status: "bar" });
    expect(f.category).toBeUndefined();
    expect(f.status).toBeUndefined();
  });

  it("빈 문자열 query/country 는 undefined 로 정규화한다", () => {
    const f = parseRobotFilters({ q: "  ", country: "" });
    expect(f.query).toBeUndefined();
    expect(f.country).toBeUndefined();
  });

  it("query/country 는 공백을 다듬어 유지한다", () => {
    const f = parseRobotFilters({ q: "  atlas ", country: " Japan " });
    expect(f.query).toBe("atlas");
    expect(f.country).toBe("Japan");
  });

  it("파싱 결과를 searchRobots 에 넣으면 잘못된 값이 결과에 영향을 주지 않는다", () => {
    // ?category=foo 같은 잘못된 입력은 무시되어 전체가 반환된다.
    const f = parseRobotFilters({ category: "foo" });
    expect(searchRobots(data, f)).toHaveLength(3);
  });
});

describe("parseRobotSort", () => {
  it("유효한 sort 값은 통과시킨다", () => {
    expect(parseRobotSort("year_desc")).toBe("year_desc");
    expect(parseRobotSort("name_desc")).toBe("name_desc");
  });

  it("없거나 잘못된 값은 기본 정렬로 떨어진다", () => {
    expect(parseRobotSort(undefined)).toBe(DEFAULT_ROBOT_SORT);
    expect(parseRobotSort("nonsense")).toBe(DEFAULT_ROBOT_SORT);
    expect(DEFAULT_ROBOT_SORT).toBe("name_asc");
  });
});

describe("sortRobots", () => {
  const items: Robot[] = [
    robot({ id: "1", name: "Beta", year: 2020 }),
    robot({ id: "2", name: "Alpha", year: 2024 }),
    robot({ id: "3", name: "Gamma" }), // 연도 없음
  ];

  it("원본을 변형하지 않는다(복사본 반환)", () => {
    const before = items.map((r) => r.id);
    sortRobots(items, "year_desc");
    expect(items.map((r) => r.id)).toEqual(before);
  });

  it("기본값은 이름 오름차순", () => {
    expect(sortRobots(items).map((r) => r.name)).toEqual([
      "Alpha",
      "Beta",
      "Gamma",
    ]);
  });

  it("name_desc 는 이름 내림차순", () => {
    expect(sortRobots(items, "name_desc").map((r) => r.name)).toEqual([
      "Gamma",
      "Beta",
      "Alpha",
    ]);
  });

  it("year_desc 는 최신순, 연도 없음은 뒤로", () => {
    expect(sortRobots(items, "year_desc").map((r) => r.id)).toEqual([
      "2",
      "1",
      "3",
    ]);
  });

  it("year_asc 는 오래된순, 연도 없음은 뒤로", () => {
    expect(sortRobots(items, "year_asc").map((r) => r.id)).toEqual([
      "1",
      "2",
      "3",
    ]);
  });
});

describe("hasActiveFilters", () => {
  it("아무것도 없으면 false", () => {
    expect(hasActiveFilters({})).toBe(false);
  });

  it("검색어/국가/용도/상태 중 하나라도 있으면 true", () => {
    expect(hasActiveFilters({ q: "atlas" })).toBe(true);
    expect(hasActiveFilters({ country: "Japan" })).toBe(true);
    expect(hasActiveFilters({ category: "service" })).toBe(true);
    expect(hasActiveFilters({ status: "commercial" })).toBe(true);
  });

  it("비기본 정렬이면 true, 기본 정렬이면 false", () => {
    expect(hasActiveFilters({ sort: "year_desc" })).toBe(true);
    expect(hasActiveFilters({ sort: DEFAULT_ROBOT_SORT })).toBe(false);
  });

  it("잘못된 값은 활성으로 치지 않는다(parse 로 격리)", () => {
    expect(hasActiveFilters({ category: "foo", status: "bar", sort: "nope" })).toBe(
      false,
    );
  });

  it("공백뿐인 검색어/국가는 활성이 아니다", () => {
    expect(hasActiveFilters({ q: "   ", country: "  " })).toBe(false);
  });
});

describe("availableCountries", () => {
  it("중복을 제거하고 정렬한다", () => {
    expect(availableCountries(data)).toEqual(["Japan", "United States"]);
  });
});
