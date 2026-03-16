"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FlexBox,
  Typography,
  Button,
  Skeleton,
} from "@wanteddev/wds";
import { IconRefresh, IconHome } from "@wanteddev/wds-icon";
import { ReadingResult } from "@/components/tarot/ReadingResult";
import {
  isValidSpread,
  isValidCategory,
  decodeDrawnCards,
} from "@/lib/tarot/utils";
import { SPREAD_CONFIGS } from "@/lib/tarot/types";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const spreadParam = searchParams.get("spread") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const cardsParam = searchParams.get("cards") ?? "";

  if (
    !isValidSpread(spreadParam) ||
    !isValidCategory(categoryParam) ||
    !cardsParam
  ) {
    router.replace("/tarot/select");
    return null;
  }

  const cards = decodeDrawnCards(cardsParam);
  const config = SPREAD_CONFIGS[spreadParam];

  if (!cards || cards.length !== config.cardCount) {
    router.replace("/tarot/select");
    return null;
  }

  return (
    <FlexBox flexDirection="column" gap="24px">
      <ReadingResult
        cards={cards}
        category={categoryParam}
        spread={spreadParam}
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
    <FlexBox flexDirection="column" gap="24px">
      <Skeleton variant="rectangle" width="100%" height="46px" radius="12px" />
      <FlexBox gap="8px">
        <Skeleton variant="rectangle" width="64px" height="28px" radius="14px" />
        <Skeleton variant="rectangle" width="52px" height="28px" radius="14px" />
      </FlexBox>
      <Skeleton variant="rectangle" width="100%" height="280px" radius="20px" />
      <Skeleton variant="rectangle" width="100%" height="200px" radius="20px" />
      <FlexBox gap="12px" sx={{ paddingTop: "16px" }}>
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
