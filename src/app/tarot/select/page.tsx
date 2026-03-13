"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FlexBox, Typography, Button } from "@wanteddev/wds";
import { SpreadSelector } from "@/components/tarot/SpreadSelector";
import { CategorySelector } from "@/components/tarot/CategorySelector";
import { StepIndicator } from "@/components/tarot/StepIndicator";
import { buildDrawUrl } from "@/lib/tarot/utils";
import type { Spread, Category } from "@/lib/tarot/types";

export default function SelectPage() {
  const router = useRouter();
  const [spread, setSpread] = useState<Spread | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  const canProceed = spread && category;

  function handleStart() {
    if (!spread || !category) return;
    router.push(buildDrawUrl(spread, category));
  }

  return (
    <FlexBox flexDirection="column" gap="48px">
      <StepIndicator
        currentStep={0}
        steps={["설정", "카드 선택", "결과"]}
      />

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

      {/* CTA */}
      <Button
        variant="solid"
        color="primary"
        size="large"
        fullWidth
        onClick={handleStart}
        disabled={!canProceed}
      >
        {canProceed ? "카드 뽑으러 가기" : "스프레드와 카테고리를 선택하세요"}
      </Button>
    </FlexBox>
  );
}
