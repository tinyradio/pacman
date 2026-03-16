"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FlexBox,
  Typography,
  Button,
  ActionArea,
  ActionAreaButton,
} from "@wanteddev/wds";
import { SpreadSelector } from "@/components/tarot/SpreadSelector";
import { CategorySelector } from "@/components/tarot/CategorySelector";
import { buildDrawUrl } from "@/lib/tarot/utils";
import type { Spread, Category } from "@/lib/tarot/types";

export default function SelectPage() {
  const router = useRouter();
  const [spread, setSpread] = useState<Spread | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  const canProceed = spread && category;

  const inlineCtaRef = useRef<HTMLDivElement>(null);
  const [showFixedCta, setShowFixedCta] = useState(false);

  useEffect(() => {
    const el = inlineCtaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFixedCta(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleStart() {
    if (!spread || !category) return;
    router.push(buildDrawUrl(spread, category));
  }

  const ctaLabel = canProceed
    ? "카드 뽑으러 가기"
    : "스프레드와 카테고리를 선택하세요";

  return (
    <>
      <FlexBox flexDirection="column" gap="48px" sx={{ paddingBottom: "80px" }}>
        {/* Step 1: Spread */}
        <FlexBox flexDirection="column" gap="12px">
          <FlexBox flexDirection="column" gap="2px">
            <Typography variant="headline2" weight="bold">
              스프레드
            </Typography>
            <Typography variant="caption1" color="semantic.label.assistive">
              리딩 방식을 선택하세요
            </Typography>
          </FlexBox>
          <SpreadSelector selected={spread} onSelect={setSpread} />
        </FlexBox>

        {/* Step 2: Category */}
        <FlexBox flexDirection="column" gap="12px">
          <FlexBox flexDirection="column" gap="2px">
            <Typography variant="headline2" weight="bold">
              카테고리
            </Typography>
            <Typography variant="caption1" color="semantic.label.assistive">
              궁금한 운세 분야를 선택하세요
            </Typography>
          </FlexBox>
          <CategorySelector selected={category} onSelect={setCategory} />
        </FlexBox>

        {/* Inline CTA */}
        <div ref={inlineCtaRef}>
          <Button
            variant="solid"
            color="primary"
            size="large"
            fullWidth
            onClick={handleStart}
            disabled={!canProceed}
          >
            {ctaLabel}
          </Button>
        </div>
      </FlexBox>

      {/* Fixed bottom CTA - visible when inline CTA is scrolled out of view */}
      <ActionArea
        variant="cancel"
        background
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          opacity: showFixedCta ? 1 : 0,
          pointerEvents: showFixedCta ? "auto" : "none",
          transform: showFixedCta ? "translateY(0)" : "translateY(100%)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          "& [data-role='action-area-wrapper']": {
            width: "100%",
            maxWidth: "560px",
            margin: "0 auto",
            padding: "10px 20px 0",
          },
        }}
      >
        <ActionAreaButton
          variant="main"
          buttonVariant="solid"
          buttonColor="primary"
          onClick={handleStart}
          disabled={!canProceed}
        >
          {ctaLabel}
        </ActionAreaButton>
      </ActionArea>
    </>
  );
}
