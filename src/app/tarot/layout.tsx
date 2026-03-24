"use client";

import { usePathname, useRouter } from "next/navigation";
import { FlexBox, IconButton, useToast } from "@wanteddev/wds";
import { IconChevronLeft, IconShare } from "@wanteddev/wds-icon";
import { StepIndicatorCompact } from "@/components/tarot/StepIndicator";

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
  const toast = useToast();

  async function handleShare() {
    const url = `${window.location.origin}/tarot`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      toast({ content: "링크가 복사되었습니다", duration: 2000 });
    } catch {
      toast({ content: "링크 복사에 실패했습니다", duration: 2000 });
    }
  }

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
      {/* Header - 서브페이지에서만 표시 */}
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

          {/* Stepper centered in header */}
          {currentStep >= 0 && (
            <FlexBox flex="1" justifyContent="center">
              <StepIndicatorCompact currentStep={currentStep} steps={STEPS} />
            </FlexBox>
          )}

          {/* Share button */}
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
