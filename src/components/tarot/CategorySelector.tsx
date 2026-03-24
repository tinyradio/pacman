"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import {
  IconHeart,
  IconCoins,
  IconBusinessBag,
} from "@wanteddev/wds-icon";
import type { Category } from "@/lib/tarot/types";
import { CATEGORY_LABELS } from "@/lib/tarot/types";

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  love: <IconHeart sx={{ fontSize: "20px" }} />,
  wealth: <IconCoins sx={{ fontSize: "20px" }} />,
  career: <IconBusinessBag sx={{ fontSize: "20px" }} />,
};

interface CategorySelectorProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
}

export function CategorySelector({
  selected,
  onSelect,
}: CategorySelectorProps) {
  const categories = Object.entries(CATEGORY_LABELS) as [
    Category,
    (typeof CATEGORY_LABELS)[Category],
  ][];

  return (
    <FlexBox gap="12px">
      {categories.map(([key, config]) => {
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
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: theme.semantic.elevation.shadow.normal.small,
              },
            })}
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
                transition: "all 0.2s ease",
              })}
            >
              {CATEGORY_ICONS[key]}
            </FlexBox>
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
