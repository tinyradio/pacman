"use client";

import { usePathname, useRouter } from "next/navigation";
import { FlexBox, IconButton } from "@wanteddev/wds";
import { IconChevronLeft, IconShare } from "@wanteddev/wds-icon";
import { StepIndicatorCompact } from "@/components/tarot/StepIndicator";
import { CustomToast } from "@/components/tarot/CustomToast";
import { useShareToast } from "@/lib/tarot/useShareToast";

const STEPS = ["리딩 선택", "카드 선택", "결과 보기"];

function getStepFromPathname(pathname: string): number {
  if (pathname.includes("/result")) return 2;
  if (pathname.includes("/draw")) return 1;
  if (pathname.includes("/select")) return 0;
  return -1;
}

export default function TarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/tarot";
  const currentStep = getStepFromPathname(pathname);
  const { toastMessage, toastVisible, handleShare } = useShareToast();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/tarot");
    }
  }

  return (
    <FlexBox
      flexDirection="column"
      sx={(theme) => ({
        minHeight: "100vh",
        backgroundColor: isHome
          ? theme.semantic.background.normal.normal
          : theme.semantic.background.normal.alternative,
      })}
    >
      {!isHome && (
        <FlexBox
          as="header"
          alignItems="center"
          sx={(theme) => ({
            height: "56px",
            padding: "0 16px",
            backgroundColor: theme.semantic.background.normal.normal,
            boxShadow: theme.semantic.elevation.shadow.normal.xsmall,
            position: "sticky",
            top: 0,
            zIndex: 50,
          })}
        >
          <IconButton
            variant="normal"
            aria-label="뒤로 가기"
            onClick={handleBack}
            sx={{ flexShrink: 0 }}
          >
            <IconChevronLeft />
          </IconButton>

          {currentStep >= 0 && (
            <FlexBox flex="1" justifyContent="center">
              <StepIndicatorCompact currentStep={currentStep} steps={STEPS} />
            </FlexBox>
          )}

          <IconButton
            variant="normal"
            aria-label="공유하기"
            onClick={handleShare}
            sx={{ flexShrink: 0 }}
          >
            <IconShare />
          </IconButton>
        </FlexBox>
      )}

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

      <CustomToast message={toastMessage} visible={toastVisible} />
    </FlexBox>
  );
}
