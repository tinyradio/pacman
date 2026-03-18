"use client";

import Image from "next/image";
import { FlexBox, Typography } from "@wanteddev/wds";

interface CardSlotProps {
  index: number;
  label: string;
  filled: boolean;
  onClick?: () => void;
}

export function CardSlot({ index, label, filled, onClick }: CardSlotProps) {
  return (
    <FlexBox flexDirection="column" alignItems="center" gap="8px">
      <Typography
        variant="caption2"
        weight="bold"
        color={filled ? "semantic.primary.normal" : "semantic.label.assistive"}
      >
        {label}
      </Typography>
      <FlexBox
        as="button"
        type="button"
        alignItems="center"
        justifyContent="center"
        onClick={onClick}
        disabled={!filled}
        aria-label={
          filled
            ? `${label} 슬롯 - 클릭하여 취소`
            : `${label} - 비어있음`
        }
        sx={(theme) => ({
          position: "relative",
          width: "64px",
          height: "96px",
          borderRadius: "12px",
          border: "none",
          outline: filled
            ? "none"
            : `1.5px dashed ${theme.semantic.line.normal}`,
          backgroundColor: filled
            ? theme.semantic.background.normal.normal
            : theme.semantic.fill.alternative,
          cursor: filled ? "pointer" : "default",
          transition: "all 0.25s ease",
          overflow: "hidden",
          padding: 0,
          ...(filled && {
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: theme.semantic.elevation.shadow.normal.small,
            },
          }),
        })}
      >
        {filled ? (
          <Image
            src="/cards/back.svg"
            alt="선택된 카드"
            fill
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
        ) : (
          <Typography
            variant="title3"
            weight="bold"
            color="semantic.label.disable"
          >
            {index + 1}
          </Typography>
        )}
      </FlexBox>
    </FlexBox>
  );
}
