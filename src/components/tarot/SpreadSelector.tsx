"use client";

import Image from "next/image";
import { FlexBox, Typography } from "@wanteddev/wds";
import type { Spread } from "@/lib/tarot/types";
import { SPREAD_CONFIGS } from "@/lib/tarot/types";

const SPREAD_IMAGES: Record<Spread, { src: string; width: number; height: number }> = {
  one: { src: "/images/spread-one.png", width: 45, height: 67 },
  three: { src: "/images/spread-three.png", width: 135, height: 67 },
};

interface SpreadSelectorProps {
  selected: Spread | null;
  onSelect: (spread: Spread) => void;
}

export function SpreadSelector({ selected, onSelect }: SpreadSelectorProps) {
  const spreads = Object.values(SPREAD_CONFIGS);

  return (
    <FlexBox gap="12px">
      {spreads.map((spread) => {
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
              transition: "all 0.2s ease",
            })}
          >
            <Image
              src={img.src}
              alt={spread.label}
              width={img.width}
              height={img.height}
              style={{
                objectFit: "contain",
                opacity: isSelected ? 1 : 0.4,
                transition: "opacity 0.2s ease",
              }}
            />
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
