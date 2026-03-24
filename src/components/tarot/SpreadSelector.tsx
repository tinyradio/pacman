"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import {
  IconSparkle,
  IconStar,
  IconCircleCheckFill,
} from "@wanteddev/wds-icon";
import type { Spread } from "@/lib/tarot/types";
import { SPREAD_CONFIGS } from "@/lib/tarot/types";

const SPREAD_ICONS: Record<Spread, React.ReactNode> = {
  one: <IconSparkle sx={{ fontSize: "20px" }} />,
  three: <IconStar sx={{ fontSize: "20px" }} />,
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
              aspectRatio: "4/3",
              justifyContent: "center",
              outline: "none",
              backgroundColor: isSelected
                ? theme.semantic.background.normal.normal
                : `rgba(255, 255, 255, ${theme.opacity[61]})`,
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: theme.semantic.elevation.shadow.normal.small,
              },
            })}
          >
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
                width: "40px",
                height: "60px",
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
              {SPREAD_ICONS[spread.type]}
            </FlexBox>
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
