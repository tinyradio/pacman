"use client";

import { motion } from "motion/react";
import { FlexBox, Typography } from "@wanteddev/wds";
import {
  IconHeart,
  IconCoins,
  IconBusinessBag,
} from "@wanteddev/wds-icon";
import { CSS_EASE_MICRO, DUR, EASE_MICRO } from "@/features/tarot/lib/motion";
import type { Category } from "@/features/tarot/lib/types";
import { CATEGORY_LABELS } from "@/features/tarot/lib/types";

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  love: <IconHeart sx={{ fontSize: "20px" }} />,
  wealth: <IconCoins sx={{ fontSize: "20px" }} />,
  career: <IconBusinessBag sx={{ fontSize: "20px" }} />,
};

const CATEGORIES = Object.entries(CATEGORY_LABELS) as [
  Category,
  (typeof CATEGORY_LABELS)[Category],
][];

interface CategorySelectorProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
}

export function CategorySelector({
  selected,
  onSelect,
}: CategorySelectorProps) {
  return (
    <FlexBox gap="12px">
      {CATEGORIES.map(([key, config]) => {
        const isSelected = selected === key;
        return (
          <FlexBox
            key={key}
            as="button"
            type="button"
            flexDirection="column"
            alignItems="center"
            gap="10px"
            flex="1"
            onClick={() => onSelect(key)}
            aria-pressed={isSelected}
            sx={(theme) => ({
              position: "relative",
              padding: "24px 12px 20px",
              borderRadius: "16px",
              aspectRatio: "1",
              justifyContent: "center",
              outline: "none",
              backgroundColor: isSelected
                ? theme.semantic.background.normal.normal
                : `rgba(255, 255, 255, ${theme.opacity[61]})`,
              cursor: "pointer",
              transition: `background-color 0.2s ease, transform ${DUR.micro}s ${CSS_EASE_MICRO}`,
              "&:active": { transform: "scale(0.97)" },
            })}
          >
            <motion.div
              animate={isSelected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: EASE_MICRO, times: [0, 0.4, 1] }}
            >
              <FlexBox
                alignItems="center"
                justifyContent="center"
                sx={(theme) => ({
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  backgroundColor: isSelected
                    ? theme.atomic.blue[95]
                    : theme.atomic.coolNeutral[98],
                  color: isSelected
                    ? theme.semantic.primary.normal
                    : theme.semantic.label.assistive,
                  "& svg": {
                    opacity: isSelected ? theme.opacity[74] : 1,
                    transition: "opacity 0.2s ease",
                  },
                  transition: "background-color 0.2s ease, color 0.2s ease",
                })}
              >
                {CATEGORY_ICONS[key]}
              </FlexBox>
            </motion.div>
            <FlexBox flexDirection="column" gap="6px" alignItems="center">
              <Typography
                variant="label1"
                weight="bold"
                color={isSelected ? "semantic.label.normal" : "semantic.label.assistive"}
              >
                {config.label}
              </Typography>
              <Typography variant="caption1" color={isSelected ? "semantic.label.alternative" : "semantic.label.assistive"}>
                {config.description}
              </Typography>
            </FlexBox>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
}
