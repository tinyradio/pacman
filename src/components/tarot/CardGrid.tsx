"use client";

import { useMemo, memo } from "react";
import Image from "next/image";
import { FlexBox } from "@wanteddev/wds";

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
      {shuffledOrder.map((cardIndex) => {
        const isSelected = selectedSet.has(cardIndex);
        const isDisabled = isSelected || isMaxSelected;
        return (
          <CardGridItem
            key={cardIndex}
            cardIndex={cardIndex}
            isSelected={isSelected}
            isDisabled={isDisabled}
            isMaxSelected={isMaxSelected}
            onSelect={onSelect}
          />
        );
      })}
    </FlexBox>
  );
});

const CardGridItem = memo(function CardGridItem({
  cardIndex,
  isSelected,
  isDisabled,
  isMaxSelected,
  onSelect,
}: {
  cardIndex: number;
  isSelected: boolean;
  isDisabled: boolean;
  isMaxSelected: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <button
      type="button"
      role="gridcell"
      onClick={() => !isDisabled && onSelect(cardIndex)}
      disabled={isDisabled}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "2/3",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "all 0.2s ease",
        opacity: isSelected ? 0.12 : isMaxSelected ? 0.3 : 1,
        transform: isSelected ? "scale(0.88)" : "scale(1)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        border: "none",
        padding: 0,
        background: "none",
        boxShadow: isDisabled ? "none" : "0px 0px 4px rgba(0,0,0,0.1)",
      }}
      aria-label={`카드 ${cardIndex + 1}번`}
      aria-selected={isSelected}
    >
      <Image
        src="/cards/back.webp"
        alt=""
        fill
        sizes="56px"
        style={{ objectFit: "cover" }}
      />
    </button>
  );
});
