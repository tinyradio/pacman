"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FlexBox,
  Typography,
  Button,
  Chip,
  Skeleton,
} from "@wanteddev/wds";
import { CardGrid } from "@/components/tarot/CardGrid";
import { CardSlot } from "@/components/tarot/CardSlot";
import { StepIndicator } from "@/components/tarot/StepIndicator";
import {
  isValidSpread,
  isValidCategory,
  buildResultUrl,
  determineOrientation,
  shuffleArray,
} from "@/lib/tarot/utils";
import { SPREAD_CONFIGS, CATEGORY_LABELS } from "@/lib/tarot/types";
import type { DrawnCard } from "@/lib/tarot/types";

function DrawContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const spreadParam = searchParams.get("spread") ?? "";
  const categoryParam = searchParams.get("category") ?? "";

  if (!isValidSpread(spreadParam) || !isValidCategory(categoryParam)) {
    router.replace("/tarot/select");
    return null;
  }

  const spread = spreadParam;
  const category = categoryParam;
  const config = SPREAD_CONFIGS[spread];
  const categoryLabel = CATEGORY_LABELS[category];

  const [selectedCards, setSelectedCards] = useState<DrawnCard[]>([]);

  const shuffledOrder = useMemo(
    () => shuffleArray(Array.from({ length: 22 }, (_, i) => i)),
    []
  );

  const selectedIndices = selectedCards.map((c) => c.cardId);
  const isComplete = selectedCards.length >= config.cardCount;

  const handleSelect = useCallback(
    (cardIndex: number) => {
      if (selectedCards.length >= config.cardCount) return;
      const orientation = determineOrientation();
      setSelectedCards((prev) => [
        ...prev,
        { cardId: cardIndex, orientation },
      ]);
    },
    [selectedCards.length, config.cardCount]
  );

  const handleRemove = useCallback((slotIndex: number) => {
    setSelectedCards((prev) => prev.filter((_, i) => i !== slotIndex));
  }, []);

  function handleReveal() {
    if (!isComplete) return;
    router.push(buildResultUrl(spread, category, selectedCards));
  }

  return (
    <>
      <FlexBox flexDirection="column" gap="24px" sx={{ paddingBottom: "80px" }}>
        <StepIndicator
          currentStep={1}
          steps={["설정", "카드 선택", "결과"]}
        />

        {/* Context chips */}
        <FlexBox gap="8px" alignItems="center">
          <Chip variant="outlined" size="small">
            {config.label}
          </Chip>
          <Chip variant="outlined" size="small">
            {categoryLabel.label}
          </Chip>
          <FlexBox flex="1" />
          <Typography
            variant="label2"
            weight="bold"
            color={isComplete ? "semantic.primary.normal" : "semantic.label.assistive"}
          >
            {selectedCards.length} / {config.cardCount}
          </Typography>
        </FlexBox>

        {/* Slots */}
        <FlexBox
          justifyContent="center"
          gap="20px"
          sx={(theme) => ({
            padding: "24px",
            borderRadius: "16px",
            backgroundColor: theme.semantic.fill.normal,
          })}
        >
          {config.positions.map((label, i) => (
            <CardSlot
              key={i}
              index={i}
              label={label}
              filled={i < selectedCards.length}
              onClick={() => handleRemove(i)}
            />
          ))}
        </FlexBox>

        {/* Guide text */}
        <Typography
          variant="caption1"
          weight="medium"
          color="semantic.label.assistive"
          sx={{ textAlign: "center" }}
        >
          {isComplete
            ? "모든 카드를 선택했습니다. 결과를 확인하세요."
            : "아래 카드 중 마음이 끌리는 카드를 선택하세요"}
        </Typography>

        {/* Grid */}
        <CardGrid
          totalCards={22}
          selectedIndices={selectedIndices}
          onSelect={handleSelect}
          maxSelections={config.cardCount}
          shuffledOrder={shuffledOrder}
        />
      </FlexBox>

      {/* Bottom action area */}
      <FlexBox
        sx={(theme) => ({
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 20px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
          backgroundColor: theme.semantic.background.normal.normal,
          borderTop: `1px solid ${theme.semantic.line.normal}`,
          zIndex: 100,
        })}
        justifyContent="center"
      >
        <FlexBox sx={{ maxWidth: "560px", width: "100%" }}>
          <Button
            variant="solid"
            color="primary"
            size="large"
            fullWidth
            onClick={handleReveal}
            disabled={!isComplete}
          >
            {isComplete
              ? "카드 확인하기"
              : `${config.cardCount - selectedCards.length}장 더 선택하세요`}
          </Button>
        </FlexBox>
      </FlexBox>
    </>
  );
}

function DrawSkeleton() {
  return (
    <FlexBox flexDirection="column" gap="24px">
      <Skeleton variant="rectangle" width="100%" height="46px" radius="12px" />
      <FlexBox gap="8px">
        <Skeleton variant="rectangle" width="64px" height="28px" radius="14px" />
        <Skeleton variant="rectangle" width="52px" height="28px" radius="14px" />
      </FlexBox>
      <Skeleton variant="rectangle" width="100%" height="140px" radius="16px" />
      <Skeleton variant="rectangle" width="100%" height="320px" radius="16px" />
      <Skeleton variant="rectangle" width="100%" height="48px" radius="12px" />
    </FlexBox>
  );
}

export default function DrawPage() {
  return (
    <Suspense fallback={<DrawSkeleton />}>
      <DrawContent />
    </Suspense>
  );
}
