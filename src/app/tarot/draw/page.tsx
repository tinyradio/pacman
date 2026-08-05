"use client";

import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, LayoutGroup } from "motion/react";
import { FlexBox, Typography, Button, Skeleton } from "@wanteddev/wds";
import { CardGrid } from "@/features/tarot/components/CardGrid";
import { CardSlot } from "@/features/tarot/components/CardSlot";
import { StickyCtaBar } from "@/features/tarot/components/StickyCtaBar";
import { useInlineCtaSentinel } from "@/features/tarot/lib/useInlineCtaSentinel";
import {
  isValidSpread,
  isValidCategory,
  buildResultUrl,
  determineOrientation,
  shuffleArray,
} from "@/features/tarot/lib/utils";
import { fadeRise } from "@/features/tarot/lib/motion";
import { SPREAD_CONFIGS, CATEGORY_LABELS } from "@/features/tarot/lib/types";
import type { DrawnCard } from "@/features/tarot/lib/types";

const DEFAULT_ORDER = Array.from({ length: 22 }, (_, i) => i);

const emptySubscribe = () => () => {};

function DrawContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const spreadParam = searchParams.get("spread") ?? "";
  const categoryParam = searchParams.get("category") ?? "";

  const isValid = isValidSpread(spreadParam) && isValidCategory(categoryParam);

  const [selectedCards, setSelectedCards] = useState<DrawnCard[]>([]);
  // 서버/하이드레이션 렌더는 기본 순서를 쓰고, 하이드레이션 직후에만 셔플한다
  // (Math.random을 SSR에 노출하면 하이드레이션 불일치 — 뒷면이 동일해 리오더는 보이지 않음)
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const shuffledOrder = useMemo(
    () => (isClient ? shuffleArray([...DEFAULT_ORDER]) : DEFAULT_ORDER),
    [isClient]
  );

  const { sentinelRef, showFixed } = useInlineCtaSentinel();

  useEffect(() => {
    if (!isValid) {
      router.replace("/tarot/select");
    }
  }, [isValid, router]);

  const config = isValid ? SPREAD_CONFIGS[spreadParam] : null;
  const categoryLabel = isValid ? CATEGORY_LABELS[categoryParam] : null;
  const selectedIndices = useMemo(() => selectedCards.map((c) => c.cardId), [selectedCards]);
  const isComplete = config ? selectedCards.length >= config.cardCount : false;

  const handleSelect = useCallback(
    (cardIndex: number) => {
      if (!config) return;
      setSelectedCards((prev) => {
        if (prev.length >= config.cardCount) return prev;
        const orientation = determineOrientation();
        return [...prev, { cardId: cardIndex, orientation }];
      });
      // 결과 화면 플립 전에 앞면 이미지를 브라우저 캐시에 올려둔다
      new window.Image().src = `/cards/major/${cardIndex}.webp`;
    },
    [config]
  );

  const handleRemove = useCallback((slotIndex: number) => {
    setSelectedCards((prev) => prev.filter((_, i) => i !== slotIndex));
  }, []);

  if (!isValid || !config || !categoryLabel) return <DrawSkeleton />;

  function handleReveal() {
    if (!isComplete || !config) return;
    router.push(buildResultUrl(spreadParam as "one" | "three", categoryParam as "love" | "wealth" | "career", selectedCards));
  }

  const ctaLabel = isComplete
    ? "카드 확인하기"
    : `${config.cardCount - selectedCards.length}장 더 선택하세요`;

  return (
    <>
      <LayoutGroup id="draw">
        <FlexBox flexDirection="column" gap="24px" sx={{ paddingBottom: "80px" }}>
          {/* Slots */}
          <motion.div {...fadeRise(0.05)}>
            <FlexBox
              justifyContent="center"
              gap="20px"
              sx={(theme) => ({
                padding: "24px",
                borderRadius: "16px",
                backgroundColor: theme.semantic.background.normal.normal,
              })}
            >
              {config.positions.map((label, i) => (
                <CardSlot
                  key={i}
                  index={i}
                  label={label}
                  cardId={selectedCards[i]?.cardId ?? null}
                  onRemove={() => handleRemove(i)}
                />
              ))}
            </FlexBox>
          </motion.div>

          {/* Guide text */}
          <motion.div {...fadeRise(0.12)}>
            <Typography
              variant="caption1"
              weight="medium"
              color="semantic.label.alternative"
              sx={{ textAlign: "center", display: "block" }}
            >
              {isComplete
                ? "모든 카드를 선택했습니다. 결과를 확인하세요."
                : `아래 카드를 신중히 선택해 ${categoryLabel.label} 운세를 점쳐보세요.`}
            </Typography>
          </motion.div>

          {/* Grid */}
          <motion.div {...fadeRise(0.18)}>
            <CardGrid
              totalCards={22}
              selectedIndices={selectedIndices}
              onSelect={handleSelect}
              maxSelections={config.cardCount}
              shuffledOrder={shuffledOrder}
            />
          </motion.div>

          {/* Inline CTA */}
          <div ref={sentinelRef}>
            <motion.div {...fadeRise(0.3)}>
              <Button
                variant="solid"
                color="primary"
                size="large"
                fullWidth
                onClick={handleReveal}
                disabled={!isComplete}
              >
                {ctaLabel}
              </Button>
            </motion.div>
          </div>
        </FlexBox>
      </LayoutGroup>

      {/* Fixed bottom CTA - only visible when inline CTA is scrolled out of view */}
      <StickyCtaBar
        visible={showFixed}
        label={ctaLabel}
        onClick={handleReveal}
        disabled={!isComplete}
      />
    </>
  );
}

function DrawSkeleton() {
  return (
    <FlexBox flexDirection="column" gap="24px">
      <Skeleton variant="rectangle" width="100%" height="170px" radius="16px" />
      <FlexBox justifyContent="center">
        <Skeleton variant="rectangle" width="60%" height="16px" radius="8px" />
      </FlexBox>
      <Skeleton variant="rectangle" width="100%" height="300px" radius="16px" />
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
