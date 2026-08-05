"use client";

import { useMemo, memo } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { FlexBox } from "@wanteddev/wds";
import {
  DUR,
  EASE_ENTRY,
  EASE_MICRO,
  SPRING_CARD,
  STAGGER,
} from "@/features/tarot/lib/motion";

interface CardGridProps {
  totalCards: number;
  selectedIndices: number[];
  onSelect: (index: number) => void;
  maxSelections: number;
  shuffledOrder: number[];
}

export const CardGrid = memo(function CardGrid({
  totalCards,
  selectedIndices,
  onSelect,
  maxSelections,
  shuffledOrder,
}: CardGridProps) {
  const selectedSet = useMemo(() => new Set(selectedIndices), [selectedIndices]);
  const isMaxSelected = selectedSet.size >= maxSelections;

  return (
    <FlexBox
      sx={(theme) => ({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
        gap: "6px",
        padding: "16px",
        borderRadius: "16px",
        backgroundColor: theme.semantic.background.normal.normal,
        boxShadow: "none",
      })}
      role="grid"
      aria-label={`타로 카드 ${totalCards}장 중 ${selectedSet.size}/${maxSelections}장 선택됨`}
    >
      {shuffledOrder.map((cardIndex, position) => {
        const isSelected = selectedSet.has(cardIndex);
        const isDisabled = isSelected || isMaxSelected;
        return (
          <CardGridItem
            key={cardIndex}
            cardIndex={cardIndex}
            position={position}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onSelect={onSelect}
          />
        );
      })}
    </FlexBox>
  );
});

const CardGridItem = memo(function CardGridItem({
  cardIndex,
  position,
  isSelected,
  isDisabled,
  onSelect,
}: {
  cardIndex: number;
  position: number;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    // 딜인(입장) 래퍼 — 카드 선택/반환 시에도 언마운트되지 않아 입장이 재생되지 않는다
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        ease: EASE_ENTRY,
        delay: 0.25 + position * STAGGER.deck,
      }}
    >
      <FlexBox
        as="button"
        type="button"
        onClick={() => !isDisabled && onSelect(cardIndex)}
        disabled={isDisabled}
        aria-label={`카드 ${cardIndex + 1}번`}
        aria-selected={isSelected}
        sx={{
          position: "relative",
          display: "block",
          width: "100%",
          aspectRatio: "2/3",
          borderRadius: "8px",
          cursor: isDisabled ? "not-allowed" : "pointer",
          border: "none",
          padding: 0,
          background: "none",
        }}
      >
        {/* 고스트 레이어: 카드가 슬롯으로 날아간 뒤 남는 빈 자리 */}
        <FlexBox
          sx={(theme) => ({
            position: "absolute",
            inset: 0,
            borderRadius: "8px",
            backgroundColor: theme.semantic.fill.alternative,
          })}
        />
        {/* 카드 레이어: 선택되면 언마운트되고 같은 layoutId가 슬롯에 마운트되어 비행한다 */}
        {!isSelected && (
          <motion.div
            layoutId={`tarot-card-${cardIndex}`}
            transition={SPRING_CARD}
            whileHover={
              !isDisabled
                ? { y: -4, transition: { duration: DUR.micro, ease: EASE_MICRO } }
                : undefined
            }
            whileTap={
              !isDisabled
                ? { scale: 0.95, transition: { duration: DUR.micro, ease: EASE_MICRO } }
                : undefined
            }
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              borderRadius: 8,
              opacity: isDisabled ? 0.3 : 1,
            }}
          >
            <FlexBox
              sx={(theme) => ({
                position: "absolute",
                inset: 0,
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: isDisabled
                  ? "none"
                  : theme.semantic.elevation.shadow.normal.xsmall,
              })}
            >
              <Image
                src="/cards/back.webp"
                alt=""
                fill
                sizes="56px"
                style={{ objectFit: "cover" }}
              />
            </FlexBox>
          </motion.div>
        )}
      </FlexBox>
    </motion.div>
  );
});
