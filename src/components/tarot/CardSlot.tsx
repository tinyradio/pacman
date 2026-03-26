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
          borderRadius: "6px",
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
            boxShadow: "0px 0px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 0px 14px rgba(0,0,0,0.15)",
            },
          }),
        })}
      >
        {filled ? (
          <Image
            src="/cards/back.webp"
            alt="선택된 카드"
            fill
            sizes="64px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Typography
            variant="title3"
            weight="bold"
            color="semantic.label.disable"
            sx={{ fontSize: "18px" }}
          >
            {index + 1}
          </Typography>
        )}
      </FlexBox>
    </FlexBox>
  );
}
