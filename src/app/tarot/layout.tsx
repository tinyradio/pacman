"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FlexBox, IconButton } from "@wanteddev/wds";
import { IconChevronLeft, IconShare } from "@wanteddev/wds-icon";
import { StepIndicatorCompact } from "@/components/tarot/StepIndicator";
import { CustomToast } from "@/components/tarot/CustomToast";
import { useShareToast } from "@/lib/tarot/useShareToast";
import { CATEGORY_LABELS } from "@/lib/tarot/types";
import type { Category } from "@/lib/tarot/types";

const BASE_STEPS = ["리딩 선택", "카드 선택", "결과 보기"];

function getStepFromPathname(pathname: string): number {
  if (pathname.includes("/result")) return 2;
  if (pathname.includes("/draw")) return 1;
  if (pathname.includes("/select")) return 0;
  return -1;
}

function TarotLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHome = pathname === "/tarot";
  const currentStep = getStepFromPathname(pathname);
  const { toastMessage, toastVisible, handleShare } = useShareToast();

  const categoryParam = searchParams.get("category") as Category | null;
  const categoryLabel = categoryParam && CATEGORY_LABELS[categoryParam]
    ? `${CATEGORY_LABELS[categoryParam].label} 운세`
    : null;

  const steps = categoryLabel
    ? [BASE_STEPS[0], BASE_STEPS[1], categoryLabel]
    : BASE_STEPS;

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
              <StepIndicatorCompact currentStep={currentStep} steps={steps} />
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

export default function TarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <TarotLayoutInner>{children}</TarotLayoutInner>
    </Suspense>
  );
}
