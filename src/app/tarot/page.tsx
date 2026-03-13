"use client";

import Link from "next/link";
import { FlexBox, Typography, Button } from "@wanteddev/wds";

export default function TarotLandingPage() {
  return (
    <FlexBox flexDirection="column" gap="32px">
      {/* Hero */}
      <FlexBox
        flexDirection="column"
        alignItems="center"
        gap="16px"
        sx={{
          paddingTop: "48px",
          paddingBottom: "16px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="caption1"
          weight="medium"
          color="semantic.primary.normal"
        >
          Major Arcana · 22 Cards
        </Typography>
        <Typography variant="display3" weight="bold">
          오늘의 타로
        </Typography>
        <Typography
          variant="body2"
          color="semantic.label.assistive"
          sx={{ maxWidth: "320px", lineHeight: "1.7" }}
        >
          메이저 아르카나 22장으로
          <br />
          당신의 연애, 재물, 직장 운세를 읽어보세요.
        </Typography>
      </FlexBox>

      {/* CTA */}
      <Button
        as={Link}
        href="/tarot/select"
        variant="solid"
        color="primary"
        size="large"
        sx={{ width: "360px", alignSelf: "center" }}
      >
        시작하기
      </Button>
    </FlexBox>
  );
}
