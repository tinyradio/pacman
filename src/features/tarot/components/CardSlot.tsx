"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FlexBox, Typography } from "@wanteddev/wds";
import { SPRING_CARD } from "@/features/tarot/lib/motion";

interface CardSlotProps {
  index: number;
  label: string;
  cardId: number | null;
  onRemove?: () => void;
}

export function CardSlot({ index, label, cardId, onRemove }: CardSlotProps) {
  const filled = cardId !== null;

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
        onClick={onRemove}
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
          transition:
            "background-color 0.25s ease, transform 0.25s ease",
          padding: 0,
          ...(filled && {
            "&:hover": {
              transform: "scale(1.05)",
            },
          }),
        })}
      >
        {cardId !== null ? (
          // 그리드 쪽과 같은 layoutId — 마운트 시 그리드 위치에서 슬롯까지 스프링 비행
          <motion.div
            layoutId={`tarot-card-${cardId}`}
            transition={SPRING_CARD}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              borderRadius: 6,
            }}
          >
            <FlexBox
              sx={(theme) => ({
                position: "absolute",
                inset: 0,
                borderRadius: "6px",
                overflow: "hidden",
                boxShadow: theme.semantic.elevation.shadow.normal.xsmall,
              })}
            >
              <Image
                src="/cards/back.webp"
                alt="선택된 카드"
                fill
                sizes="64px"
                style={{ objectFit: "cover" }}
              />
            </FlexBox>
          </motion.div>
        ) : (
          <Typography
            variant="title3"
            weight="bold"
            color="semantic.label.disable"
            sx={{ fontSize: "17px", fontFamily: "'Noto Sans', sans-serif", fontWeight: 500 }}
          >
            {["I", "II", "III"][index]}
          </Typography>
        )}
      </FlexBox>
    </FlexBox>
  );
}
