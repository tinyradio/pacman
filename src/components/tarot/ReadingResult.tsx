"use client";

import { useRef } from "react";
import {
  FlexBox,
  Typography,
  ContentBadge,
  Chip,
  Divider,
} from "@wanteddev/wds";
import { CardFlip } from "./CardFlip";
import { ScreenshotButton } from "./ScreenshotButton";
import { getCard } from "@/data/tarot/cards";
import { getInterpretation } from "@/data/tarot/interpretations";
import type { DrawnCard, Category, Spread } from "@/lib/tarot/types";
import { SPREAD_CONFIGS, CATEGORY_LABELS } from "@/lib/tarot/types";

interface ReadingResultProps {
  cards: DrawnCard[];
  category: Category;
  spread: Spread;
}

export function ReadingResult({ cards, category, spread }: ReadingResultProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const config = SPREAD_CONFIGS[spread];
  const categoryLabel = CATEGORY_LABELS[category];

  return (
    <FlexBox flexDirection="column" gap="20px">
      <div ref={resultRef}>
        <FlexBox flexDirection="column" gap="20px">
          {/* Context */}
          <FlexBox gap="8px" alignItems="center">
            <Chip variant="outlined" size="small">
              {config.label}
            </Chip>
            <Chip variant="outlined" size="small">
              {categoryLabel.label}
            </Chip>
          </FlexBox>

          {/* Card reveal area */}
          <FlexBox
            flexDirection="column"
            alignItems="center"
            sx={(theme) => ({
              padding: "32px 20px 28px",
              borderRadius: "20px",
              outline: `1px solid ${theme.semantic.line.normal}`,
              backgroundColor: theme.semantic.background.normal.normal,
            })}
          >
            <FlexBox
              justifyContent="center"
              gap={cards.length === 1 ? "0px" : "24px"}
            >
              {cards.map((card, index) => {
                const cardData = getCard(card.cardId);
                return (
                  <FlexBox
                    key={card.cardId}
                    flexDirection="column"
                    alignItems="center"
                    gap="12px"
                  >
                    {cards.length > 1 && (
                      <Typography
                        variant="caption2"
                        weight="bold"
                        color="semantic.label.assistive"
                        sx={{ letterSpacing: "0.5px" }}
                      >
                        {config.positions[index]}
                      </Typography>
                    )}
                    <CardFlip
                      cardId={card.cardId}
                      orientation={card.orientation}
                      delay={index * 800}
                      cardNameKo={cardData?.nameKo ?? ""}
                    />
                    <FlexBox
                      flexDirection="column"
                      alignItems="center"
                      gap="4px"
                      sx={{ marginTop: "4px" }}
                    >
                      <Typography variant="label1" weight="bold">
                        {cardData?.nameKo}
                      </Typography>
                      <Typography
                        variant="caption2"
                        color="semantic.label.disable"
                      >
                        {cardData?.name}
                      </Typography>
                      <ContentBadge
                        color={
                          card.orientation === "reversed" ? "accent" : "neutral"
                        }
                        size="small"
                      >
                        {card.orientation === "reversed" ? "역방향" : "정방향"}
                      </ContentBadge>
                    </FlexBox>
                  </FlexBox>
                );
              })}
            </FlexBox>
          </FlexBox>

          {/* Interpretations */}
          {cards.map((card, index) => {
            const cardData = getCard(card.cardId);
            const interpretation = getInterpretation(card.cardId);
            if (!cardData || !interpretation) return null;

            const text = interpretation.categories[category][card.orientation];

            return (
              <FlexBox
                key={card.cardId}
                flexDirection="column"
                gap="16px"
                sx={(theme) => ({
                  padding: "24px 20px",
                  borderRadius: "20px",
                  outline: `1px solid ${theme.semantic.line.normal}`,
                  backgroundColor: theme.semantic.background.normal.normal,
                })}
              >
                {/* Position label + Card title */}
                <FlexBox alignItems="flex-start" justifyContent="space-between">
                  <FlexBox flexDirection="column" gap="2px">
                    <Typography variant="headline2" weight="bold">
                      {cardData.nameKo}
                    </Typography>
                    <Typography
                      variant="caption1"
                      color="semantic.label.disable"
                    >
                      {cardData.name} ·{" "}
                      {card.orientation === "reversed" ? "역방향" : "정방향"}
                    </Typography>
                  </FlexBox>
                  {cards.length > 1 && (
                    <Chip variant="outlined" size="xsmall">
                      {config.positions[index]}
                    </Chip>
                  )}
                </FlexBox>

                <Divider />

                {/* Reading text */}
                <Typography
                  variant="body2-reading"
                  color="semantic.label.alternative"
                >
                  {text}
                </Typography>

                {/* Keywords */}
                <FlexBox gap="6px" sx={{ flexWrap: "wrap" }}>
                  {cardData.keywords.map((kw) => (
                    <Chip
                      key={kw}
                      variant="solid"
                      size="xsmall"
                      sx={(theme) => ({
                        backgroundColor: theme.semantic.background.normal.normal,
                      })}
                    >
                      {kw}
                    </Chip>
                  ))}
                </FlexBox>
              </FlexBox>
            );
          })}
        </FlexBox>
      </div>

      {/* Screenshot */}
      <FlexBox justifyContent="center" sx={{ paddingTop: "4px" }}>
        <ScreenshotButton targetRef={resultRef} />
      </FlexBox>
    </FlexBox>
  );
}
