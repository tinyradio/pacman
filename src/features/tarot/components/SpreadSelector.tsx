"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FlexBox, Typography } from "@wanteddev/wds";
import { CSS_EASE_MICRO, DUR, EASE_MICRO } from "@/features/tarot/lib/motion";
import type { Spread } from "@/features/tarot/lib/types";
import { SPREAD_CONFIGS } from "@/features/tarot/lib/types";

const SPREAD_IMAGES: Record<Spread, { on: string; off: string; width: number; height: number }> = {
  one: { on: "/images/spread-one-on.png", off: "/images/spread-one-off.png", width: 53, height: 76 },
  three: { on: "/images/spread-three-on.png", off: "/images/spread-three-off.png", width: 94, height: 76 },
};

interface SpreadSelectorProps {
  selected: Spread | null;
  onSelect: (spread: Spread) => void;
}

const SPREADS = Object.values(SPREAD_CONFIGS);

export function SpreadSelector({ selected, onSelect }: SpreadSelectorProps) {

  return (
    <FlexBox gap="12px">
      {SPREADS.map((spread) => {
        const isSelected = selected === spread.type;
        const img = SPREAD_IMAGES[spread.type];
        return (
          <FlexBox
            key={spread.type}
            as="button"
            type="button"
            flexDirection="column"
            alignItems="center"
            gap="12px"
            flex="1"
            onClick={() => onSelect(spread.type)}
            aria-pressed={isSelected}
            sx={(theme) => ({
              position: "relative",
              padding: "24px 16px 20px",
              borderRadius: "16px",
              aspectRatio: "6/5",
              [`@media (max-width: ${theme.breakpoint.sm})`]: {
                aspectRatio: "1",
              },
              justifyContent: "center",
              outline: "none",
              backgroundColor: isSelected
                ? theme.semantic.background.normal.normal
                : `rgba(255, 255, 255, ${theme.opacity[61]})`,
              cursor: "pointer",
              textAlign: "center",
              transition: `background-color 0.2s ease, transform ${DUR.micro}s ${CSS_EASE_MICRO}`,
              "&:active": { transform: "scale(0.97)" },
            })}
          >
            {/* on/off 이미지를 겹쳐 크로스페이드 (양쪽 프리로드 겸용) */}
            <motion.span
              animate={isSelected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: EASE_MICRO, times: [0, 0.4, 1] }}
              style={{
                position: "relative",
                width: img.width,
                height: img.height,
                display: "block",
              }}
            >
              <Image
                src={img.off}
                alt=""
                width={img.width}
                height={img.height}
                style={{
                  display: "block",
                  objectFit: "contain",
                  opacity: isSelected ? 0 : 1,
                  transition: `opacity 0.2s ${CSS_EASE_MICRO}`,
                }}
              />
              <Image
                src={img.on}
                alt=""
                width={img.width}
                height={img.height}
                style={{
                  position: "absolute",
                  inset: 0,
                  objectFit: "contain",
                  opacity: isSelected ? 1 : 0,
                  transition: `opacity 0.2s ${CSS_EASE_MICRO}`,
                }}
              />
            </motion.span>
            <FlexBox flexDirection="column" gap="4px" alignItems="center">
              <Typography
                variant="label1"
                weight="bold"
                color={isSelected ? "semantic.label.normal" : "semantic.label.assistive"}
              >
                {spread.label}
              </Typography>
              <Typography
                variant="caption1"
                color={isSelected ? "semantic.label.alternative" : "semantic.label.assistive"}
                sx={{ lineHeight: "1.4" }}
              >
                {spread.description}
              </Typography>
            </FlexBox>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
}
