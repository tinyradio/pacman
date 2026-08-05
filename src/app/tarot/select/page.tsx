"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { FlexBox, Typography, Button } from "@wanteddev/wds";
import { SpreadSelector } from "@/features/tarot/components/SpreadSelector";
import { CategorySelector } from "@/features/tarot/components/CategorySelector";
import { StickyCtaBar } from "@/features/tarot/components/StickyCtaBar";
import { useInlineCtaSentinel } from "@/features/tarot/lib/useInlineCtaSentinel";
import { buildDrawUrl } from "@/features/tarot/lib/utils";
import { fadeRise } from "@/features/tarot/lib/motion";
import type { Spread, Category } from "@/features/tarot/lib/types";

export default function SelectPage() {
  const router = useRouter();
  const [spread, setSpread] = useState<Spread | null>("one");
  const [category, setCategory] = useState<Category | null>("career");

  const canProceed = spread && category;
  const { sentinelRef, showFixed } = useInlineCtaSentinel();

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
        <motion.div {...fadeRise(0.05)}>
          <FlexBox flexDirection="column" gap="12px">
            <FlexBox flexDirection="column" gap="2px">
              <Typography variant="headline2" weight="bold">
                스프레드
              </Typography>
              <Typography variant="caption1" color="semantic.label.alternative">
                리딩 방식을 선택하세요
              </Typography>
            </FlexBox>
            <SpreadSelector selected={spread} onSelect={setSpread} />
          </FlexBox>
        </motion.div>

        {/* Step 2: Category */}
        <motion.div {...fadeRise(0.14)}>
          <FlexBox flexDirection="column" gap="12px">
            <FlexBox flexDirection="column" gap="2px">
              <Typography variant="headline2" weight="bold">
                카테고리
              </Typography>
              <Typography variant="caption1" color="semantic.label.alternative">
                궁금한 운세 분야를 선택하세요
              </Typography>
            </FlexBox>
            <CategorySelector selected={category} onSelect={setCategory} />
          </FlexBox>
        </motion.div>

        {/* Inline CTA */}
        <div ref={sentinelRef}>
          <motion.div {...fadeRise(0.23)}>
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
          </motion.div>
        </div>
      </FlexBox>

      {/* Fixed bottom CTA - visible when inline CTA is scrolled out of view */}
      <StickyCtaBar
        visible={showFixed}
        label={ctaLabel}
        onClick={handleStart}
        disabled={!canProceed}
      />
    </>
  );
}
