import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // 상위 폴더(coding/)의 lockfile 때문에 루트를 잘못 추론해 남의 src/middleware.ts 를 빌드하던 문제 → 루트 고정
  turbopack: { root: __dirname },
  images: {
    // 위키미디어/제조사 이미지 원격 호스트 허용
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default withNextIntl(nextConfig);
