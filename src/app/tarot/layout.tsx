"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlexBox, Typography, IconButton } from "@wanteddev/wds";
import { IconChevronLeft } from "@wanteddev/wds-icon";

export default function TarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/tarot";

  return (
    <FlexBox
      flexDirection="column"
      sx={(theme) => ({
        minHeight: "100vh",
        backgroundColor: theme.semantic.background.normal.alternative,
      })}
    >
      {/* Header - 서브페이지에서만 표시 */}
      {!isHome && (
        <>
          <FlexBox
            as="header"
            alignItems="center"
            sx={(theme) => ({
              height: "56px",
              padding: "0 16px",
              backgroundColor: theme.semantic.background.normal.normal,
              position: "sticky",
              top: 0,
              zIndex: 50,
            })}
          >
            <FlexBox alignItems="center" gap="4px">
              <IconButton
                as={Link}
                href={
                  pathname.includes("/result")
                    ? "/tarot/select"
                    : pathname.includes("/draw")
                    ? "/tarot/select"
                    : "/tarot"
                }
                variant="normal"
                aria-label="뒤로 가기"
              >
                <IconChevronLeft />
              </IconButton>
              <Typography
                variant="headline2"
                weight="bold"
                color="semantic.label.normal"
              >
                {pathname.includes("/select")
                  ? "리딩 설정"
                  : pathname.includes("/draw")
                  ? "카드 선택"
                  : pathname.includes("/result")
                  ? "리딩 결과"
                  : "타로 운세"}
              </Typography>
            </FlexBox>
          </FlexBox>
        </>
      )}

      {/* Content */}
      <FlexBox
        as="main"
        flexDirection="column"
        sx={{
          maxWidth: "560px",
          width: "100%",
          margin: "0 auto",
          padding: "24px 20px 64px",
          flex: 1,
        }}
      >
        {children}
      </FlexBox>
    </FlexBox>
  );
}
