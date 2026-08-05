"use client";

import { useReducedMotion } from "motion/react";
import {
  FlexBox,
  Typography,
  ContentBadge,
  Divider,
} from "@wanteddev/wds";
import { CardFlip } from "./CardFlip";
import { getCard } from "@/features/tarot/data/cards";
import { getInterpretation } from "@/features/tarot/data/interpretations";
import { revealTimings } from "@/features/tarot/lib/motion";
import type { DrawnCard, Category, Spread, Position } from "@/features/tarot/lib/types";
import { SPREAD_CONFIGS } from "@/features/tarot/lib/types";

interface ReadingResultProps {
  cards: DrawnCard[];
  category: Category;
  spread: Spread;
}

export function ReadingResult({ cards, category, spread }: ReadingResultProps) {
  const config = SPREAD_CONFIGS[spread];
  const reduced = useReducedMotion();

  // 카드 플립만 순차 연출하고, 텍스트(메타·해석 패널)는 처음부터 모두 노출한다.
  const t = revealTimings(cards.length);
  const flipDelayMs = (i: number) => (reduced ? 0 : t.flipStart(i) * 1000);

  return (
    <FlexBox flexDirection="column" gap="20px">
      {/* Card reveal area */}
      <FlexBox
        flexDirection="column"
        alignItems="center"
        sx={(theme) => ({
          padding: "32px 20px 28px",
          borderRadius: "20px",
          boxShadow: "none",
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
                    color="semantic.label.alternative"
                    sx={{ letterSpacing: "0.5px" }}
                  >
                    {config.positions[index]}
                  </Typography>
                )}
                <CardFlip
                  cardId={card.cardId}
                  orientation={card.orientation}
                  delay={flipDelayMs(index)}
                  cardNameKo={cardData?.nameKo ?? ""}
                  size={cards.length > 1 ? "small" : "default"}
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
                    color="semantic.label.alternative"
                    sx={{ marginBottom: "4px" }}
                  >
                    {cardData?.name}
                  </Typography>
                  <ContentBadge
                    color={card.orientation === "reversed" ? "accent" : "neutral"}
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

        const catData = interpretation.categories[category];
        const positionKey = spread === "three"
          ? (["past", "present", "future"][index] as Position)
          : null;
        const text = positionKey && catData.positions?.[positionKey]
          ? catData.positions[positionKey][card.orientation]
          : catData[card.orientation];

        return (
          <FlexBox
            key={card.cardId}
            flexDirection="column"
            gap="16px"
            sx={(theme) => ({
              padding: "24px 20px",
              borderRadius: "20px",
              boxShadow: "none",
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
                    color="semantic.label.alternative"
                  >
                    {cardData.name} ·{" "}
                    {card.orientation === "reversed" ? "역방향" : "정방향"}
                  </Typography>
                </FlexBox>
                {cards.length > 1 && (
                  <ContentBadge color="neutral" size="small">
                    {config.positions[index]}
                  </ContentBadge>
                )}
              </FlexBox>

              <Divider color="semantic.fill.normal" />

              {/* Reading text */}
              <Typography
                variant="body2-reading"
                color="semantic.label.alternative"
              >
                {text}
              </Typography>

              {/* Keywords */}
              <FlexBox gap="6px" sx={{ flexWrap: "wrap" }}>
                {cardData.keywords.slice(1).map((kw) => (
                  <ContentBadge key={kw} color="neutral" size="small">
                    {kw}
                  </ContentBadge>
                ))}
              </FlexBox>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
}
