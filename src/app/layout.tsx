import type { Metadata } from "next";
import { Providers } from "@/components/Providers";

import "@wanteddev/wds/global.css";
import "./globals.css";

// 프로덕션 도메인은 Vercel이 주입하는 환경변수에서 가져와, 프로젝트 이름 변경에도 자동으로 따라간다
const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "타로 카드 운세",
  description: "메이저 아르카나 22장으로 당신의 직장, 재물, 연애 운세를 점쳐보세요.",
  openGraph: {
    title: "타로 좋아하세요?",
    description: "메이저 아르카나 22장으로 당신의 직장, 재물, 연애 운세를 점쳐보세요.",
    images: [{ url: "/images/og-tarot.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "타로 좋아하세요?",
    description: "메이저 아르카나 22장으로 당신의 직장, 재물, 연애 운세를 점쳐보세요.",
    images: ["/images/og-tarot.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500&display=swap"
        />
        {process.env.NODE_ENV !== "production" && (
          <script
            async
            src="http://localhost:7878/spidey-sense.js"
            data-spidey-sense="true"
          />
        )}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
