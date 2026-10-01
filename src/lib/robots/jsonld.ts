import type { Robot } from "./types";

// 스펙 한 항목(schema.org PropertyValue). 값이 있을 때만 추가한다.
type PropertyValue = {
  "@type": "PropertyValue";
  name: string;
  value: string | number;
  unitCode?: string; // UN/CEFACT 단위 코드
};

// 로봇 상세 페이지용 schema.org 구조화 데이터(JSON-LD)를 만든다.
// 검색엔진이 이름·제조사·스펙을 구조적으로 이해해 리치 결과로 노출할 수 있게 한다.
// robot 은 zod 로 검증된 값이라 그대로 신뢰할 수 있다.
export function robotJsonLd(robot: Robot): Record<string, unknown> {
  const additionalProperty: PropertyValue[] = [];
  if (robot.year !== undefined) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Year",
      value: robot.year,
    });
  }
  if (robot.height !== undefined) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Height",
      value: robot.height,
      unitCode: "CMT", // 센티미터
    });
  }
  if (robot.weight !== undefined) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Weight",
      value: robot.weight,
      unitCode: "KGM", // 킬로그램
    });
  }
  if (robot.dof !== undefined) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Degrees of freedom",
      value: robot.dof,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: robot.name,
    category: robot.category,
    brand: { "@type": "Brand", name: robot.manufacturer },
    ...(robot.description ? { description: robot.description } : {}),
    ...(robot.images.length > 0 ? { image: robot.images } : {}),
    ...(robot.country ? { countryOfOrigin: robot.country } : {}),
    ...(additionalProperty.length > 0 ? { additionalProperty } : {}),
  };
}

// 목록(홈) 페이지용 schema.org ItemList 구조화 데이터를 만든다.
// 검색엔진이 카탈로그에 어떤 로봇들이 있는지 순서와 함께 이해하도록 돕는다.
export function robotListJsonLd(
  robots: Robot[],
  baseUrl: string,
): Record<string, unknown> {
  // 끝의 슬래시를 정리해 "//robots/.." 같은 중복 슬래시를 막는다.
  const base = baseUrl.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: robots.length,
    itemListElement: robots.map((robot, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/robots/${robot.id}`,
      name: robot.name,
    })),
  };
}

// JSON-LD 를 <script> 안에 안전하게 넣기 위한 직렬화.
// "<" 를 유니코드 이스케이프해 </script> 등으로 인한 조기 종료·XSS 를 막는다.
function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function robotJsonLdString(robot: Robot): string {
  return serializeJsonLd(robotJsonLd(robot));
}

export function robotListJsonLdString(
  robots: Robot[],
  baseUrl: string,
): string {
  return serializeJsonLd(robotListJsonLd(robots, baseUrl));
}
