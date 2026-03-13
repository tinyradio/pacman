"use client";

import Image from "next/image";
import { FlexBox } from "@wanteddev/wds";

interface CardGridProps {
  totalCards: number;
  selectedIndices: number[];
  onSelect: (index: number) => void;
  maxSelections: number;
  shuffledOrder: number[];
}

export function CardGrid({
  totalCards,
  selectedIndices,
  onSelect,
  maxSelections,
  shuffledOrder,
}: CardGridProps) {
  const isMaxSelected = selectedIndices.length >= maxSelections;

  return (
    <FlexBox
      sx={(theme) => ({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
        gap: "6px",
        padding: "16px",
        borderRadius: "16px",
        backgroundColor: theme.semantic.background.normal.normal,
        outline: `1px solid ${theme.semantic.line.normal}`,
      })}
      role="grid"
      aria-label={`타로 카드 ${totalCards}장 중 ${selectedIndices.length}/${maxSelections}장 선택됨`}
    >
      {shuffledOrder.map((cardIndex) => {
        const isSelected = selectedIndices.includes(cardIndex);
        const isDisabled = isSelected || isMaxSelected;
        return (
          <button
            key={cardIndex}
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
              transform: isSelected
                ? "scale(0.88)"
                : "scale(1)",
              cursor: isDisabled ? "not-allowed" : "pointer",
              border: "none",
              padding: 0,
              background: "none",
              boxShadow:
                !isDisabled
                  ? "0 1px 3px rgba(0,0,0,0.06)"
                  : "none",
            }}
            aria-label={`카드 ${cardIndex + 1}번`}
            aria-selected={isSelected}
          >
            <Image
              src="/cards/back.svg"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </button>
        );
      })}
    </FlexBox>
  );
}
