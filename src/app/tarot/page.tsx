"use client";

import Link from "next/link";
import Image from "next/image";
import { FlexBox, Typography, Button } from "@wanteddev/wds";
import { CustomToast } from "@/components/tarot/CustomToast";
import { useShareToast } from "@/lib/tarot/useShareToast";

export default function TarotLandingPage() {
  const { toastMessage, toastVisible, handleShare } = useShareToast();

  return (
    <>
      <FlexBox
        flexDirection="column"
        gap="16px"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "calc(100dvh - 88px)" }}
      >
        <FlexBox
          justifyContent="center"
          alignItems="center"
          sx={{ paddingTop: "30px" }}
        >
          <Image
            src="/images/hero-cards.webp"
            alt="타로 카드"
            width={334}
            height={280}
            style={{ objectFit: "contain" }}
            priority
          />
        </FlexBox>

        <FlexBox
          flexDirection="column"
          alignItems="center"
          gap="16px"
          sx={{ textAlign: "center" }}
        >
          <Typography
            variant="display3"
            weight="bold"
            sx={{ letterSpacing: "-0.97px" }}
          >
            타로 좋아하세요?
          </Typography>
          <Typography
            variant="body2"
            color="semantic.label.alternative"
            sx={{ maxWidth: "320px", lineHeight: "1.7" }}
          >
            메이저 아르카나 22장으로
            <br />
            당신의 직장, 재물, 연애 운세를 점쳐보세요.
          </Typography>
        </FlexBox>

        <FlexBox
          flexDirection="column"
          gap="12px"
          alignItems="center"
          sx={{ maxWidth: "320px", width: "100%", alignSelf: "center", marginTop: "16px", paddingBottom: "40px" }}
        >
          <Button
            as={Link}
            href="/tarot/select"
            variant="solid"
            color="primary"
            size="large"
            fullWidth
          >
            시작하기
          </Button>
          <Button
            variant="outlined"
            color="assistive"
            size="large"
            fullWidth
            onClick={handleShare}
          >
            공유하기
          </Button>
        </FlexBox>
      </FlexBox>

      <CustomToast message={toastMessage} visible={toastVisible} />
    </>
  );
}
