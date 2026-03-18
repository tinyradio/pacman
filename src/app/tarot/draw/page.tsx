"use client";

import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FlexBox,
  Typography,
  Button,
  Chip,
  Skeleton,
  ActionArea,
  ActionAreaButton,
} from "@wanteddev/wds";
import { CardGrid } from "@/components/tarot/CardGrid";
import { CardSlot } from "@/components/tarot/CardSlot";
import {
  isValidSpread,
  isValidCategory,
  buildResultUrl,
  determineOrientation,
  shuffleArray,
} from "@/lib/tarot/utils";
import { SPREAD_CONFIGS, CATEGORY_LABELS } from "@/lib/tarot/types";
import type { DrawnCard } from "@/lib/tarot/types";

const DEFAULT_ORDER = Array.from({ length: 22 }, (_, i) => i);

function DrawContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const spreadParam = searchParams.get("spread") ?? "";
  const categoryParam = searchParams.get("category") ?? "";

  const isValid = isValidSpread(spreadParam) && isValidCategory(categoryParam);

  const [selectedCards, setSelectedCards] = useState<DrawnCard[]>([]);
  const [shuffledOrder] = useState(() => shuffleArray([...DEFAULT_ORDER]));

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

  useEffect(() => {
    if (!isValid) {
      router.replace("/tarot/select");
    }
  }, [isValid, router]);

  const config = isValid ? SPREAD_CONFIGS[spreadParam] : null;
  const categoryLabel = isValid ? CATEGORY_LABELS[categoryParam] : null;
  const selectedIndices = selectedCards.map((c) => c.cardId);
  const isComplete = config ? selectedCards.length >= config.cardCount : false;

  const configRef = useRef(config);
  configRef.current = config;

  const handleSelect = useCallback(
    (cardIndex: number) => {
      setSelectedCards((prev) => {
        const c = configRef.current;
        if (!c || prev.length >= c.cardCount) return prev;
        const orientation = determineOrientation();
        return [...prev, { cardId: cardIndex, orientation }];
      });
    },
    []
  );

  const handleRemove = useCallback((slotIndex: number) => {
    setSelectedCards((prev) => prev.filter((_, i) => i !== slotIndex));
  }, []);

  if (!isValid || !config || !categoryLabel) return null;

  function handleReveal() {
    if (!isComplete || !config) return;
    router.push(buildResultUrl(spreadParam as "one" | "three", categoryParam as "love" | "wealth" | "career", selectedCards));
  }

  return (
    <>
      <FlexBox flexDirection="column" gap="24px" sx={{ paddingBottom: "80px" }}>
        {/* Context chips */}
        <FlexBox gap="8px" alignItems="center">
          <Chip variant="outlined" size="small" disableInteraction sx={(theme) => ({ backgroundColor: theme.semantic.background.normal.normal })}>
            {config.label}
          </Chip>
          <Chip variant="outlined" size="small" disableInteraction sx={(theme) => ({ backgroundColor: theme.semantic.background.normal.normal })}>
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
          color="semantic.label.alternative"
          sx={{ textAlign: "center" }}
        >
          {isComplete
            ? "모든 카드를 선택했습니다. 결과를 확인하세요."
            : "아래 카드 중 마음이 끌리는 카드를 신중하게 선택하세요"}
        </Typography>

        {/* Grid */}
        <CardGrid
          totalCards={22}
          selectedIndices={selectedIndices}
          onSelect={handleSelect}
          maxSelections={config.cardCount}
          shuffledOrder={shuffledOrder}
        />

        {/* Inline CTA */}
        <div ref={inlineCtaRef}>
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
        </div>
      </FlexBox>

      {/* Fixed bottom CTA - only visible when inline CTA is scrolled out of view */}
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
          onClick={handleReveal}
          disabled={!isComplete}
        >
          {isComplete
            ? "카드 확인하기"
            : `${config.cardCount - selectedCards.length}장 더 선택하세요`}
        </ActionAreaButton>
      </ActionArea>
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
