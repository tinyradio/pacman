"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import {
  IconHeart,
  IconCoins,
  IconBusinessBag,
  IconCircleCheckFill,
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
              outline: isSelected
                ? `2px solid ${theme.semantic.primary.normal}`
                : `1px solid ${theme.semantic.line.normal}`,
              backgroundColor: theme.semantic.background.normal.normal,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                outlineColor: theme.semantic.primary.normal,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              },
            })}
          >
            {/* Check indicator */}
            {isSelected && (
              <FlexBox
                sx={(theme) => ({
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  "& svg": {
                    color: `${theme.semantic.primary.normal} !important`,
                  },
                })}
              >
                <IconCircleCheckFill sx={{ fontSize: "20px" }} />
              </FlexBox>
            )}

            <FlexBox
              alignItems="center"
              justifyContent="center"
              sx={(theme) => ({
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: isSelected
                  ? `color-mix(in srgb, ${theme.semantic.primary.normal} 10%, transparent)`
                  : theme.semantic.fill.normal,
                color: isSelected
                  ? theme.semantic.primary.normal
                  : theme.semantic.label.assistive,
                transition: "all 0.2s ease",
              })}
            >
              {CATEGORY_ICONS[key]}
            </FlexBox>
            <FlexBox flexDirection="column" gap="2px" alignItems="center">
              <Typography
                variant="label1"
                weight="bold"
                color={isSelected ? "semantic.label.normal" : "semantic.label.alternative"}
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
