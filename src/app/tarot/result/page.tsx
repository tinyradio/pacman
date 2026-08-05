"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FlexBox,
  Button,
  Skeleton,
} from "@wanteddev/wds";
import { IconRefresh, IconHome } from "@wanteddev/wds-icon";
import { ReadingResult } from "@/features/tarot/components/ReadingResult";
import {
  isValidSpread,
  isValidCategory,
  decodeDrawnCards,
} from "@/features/tarot/lib/utils";
import { SPREAD_CONFIGS } from "@/features/tarot/lib/types";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const spreadParam = searchParams.get("spread") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const cardsParam = searchParams.get("cards") ?? "";

  const isValid = isValidSpread(spreadParam) && isValidCategory(categoryParam) && !!cardsParam;
  const cards = isValid ? decodeDrawnCards(cardsParam) : null;
  const config = isValid ? SPREAD_CONFIGS[spreadParam] : null;
  const hasValidCards = cards && config && cards.length === config.cardCount;

  useEffect(() => {
    if (!isValid || !hasValidCards) {
      router.replace("/tarot/select");
    }
  }, [isValid, hasValidCards, router]);

  if (!isValid || !hasValidCards || !cards || !config) return <ResultSkeleton />;

  return (
    <FlexBox flexDirection="column" gap="24px">
      <ReadingResult
        cards={cards}
        category={categoryParam as "love" | "wealth" | "career"}
        spread={spreadParam as "one" | "three"}
      />

      <FlexBox gap="12px">
          <Button
            as={Link}
            href="/tarot/select"
            variant="outlined"
            color="assistive"
            size="large"
            fullWidth
            leadingContent={<IconRefresh />}
            sx={(theme) => ({
              backgroundColor: theme.semantic.background.normal.normal,
              border: "none",
              outline: "none",
              boxShadow: "none",
              "& [wds-component='with-interaction']": { display: "none" },
            })}
          >
            다시 뽑기
          </Button>
          <Button
            as={Link}
            href="/tarot"
            variant="outlined"
            color="assistive"
            size="large"
            fullWidth
            leadingContent={<IconHome />}
            sx={(theme) => ({
              backgroundColor: theme.semantic.background.normal.normal,
              border: "none",
              outline: "none",
              boxShadow: "none",
              "& [wds-component='with-interaction']": { display: "none" },
            })}
          >
            홈으로
          </Button>
      </FlexBox>
    </FlexBox>
  );
}

function ResultSkeleton() {
  return (
    <FlexBox flexDirection="column" gap="20px">
      <Skeleton variant="rectangle" width="100%" height="320px" radius="20px" />
      <Skeleton variant="rectangle" width="100%" height="220px" radius="20px" />
      <FlexBox gap="12px" sx={{ paddingTop: "4px" }}>
        <Skeleton variant="rectangle" width="100%" height="48px" radius="12px" />
        <Skeleton variant="rectangle" width="100%" height="48px" radius="12px" />
      </FlexBox>
    </FlexBox>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultSkeleton />}>
      <ResultContent />
    </Suspense>
  );
}
