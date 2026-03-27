import type { Metadata } from "next";
import { Providers } from "@/components/Providers";

import "@wanteddev/wds/global.css";

export const metadata: Metadata = {
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
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
