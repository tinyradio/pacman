"use client";

import Link from "next/link";
import Image from "next/image";
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
        <Image
          src="/images/tarot-thinking.png"
          alt="고민하는 캐릭터"
          width={180}
          height={180}
          style={{ objectFit: "contain", paddingLeft: "20px" }}
          priority
        />
        <Typography variant="display3" weight="bold">
          오늘의 타로점
        </Typography>
        <Typography
          variant="body2"
          color="semantic.label.alternative"
          sx={{ maxWidth: "320px", lineHeight: "1.7" }}
        >
          메이저 아르카나 22장으로
          <br />
          당신의 연애, 재물, 직장 운세를 점쳐보세요.
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
