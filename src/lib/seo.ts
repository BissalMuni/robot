import type { Metadata } from "next";

// 정적 콘텐츠 페이지용 공통 메타데이터를 만든다.
// 기존 title/description 은 그대로 두고, 빠지기 쉬운 canonical 과 OpenGraph(og:title/description/url)를
// 일관되게 채워 준다. url/canonical 은 상대 경로 — layout 의 metadataBase 로 절대화된다.
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string; // "/" 로 시작하는 라우트 경로
}): Metadata {
  const { title, description, path } = opts;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
    },
  };
}
