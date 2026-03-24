"use client";

import Link from "next/link";
import Image from "next/image";
import { FlexBox, Typography, Button, useToast } from "@wanteddev/wds";
import { IconShare } from "@wanteddev/wds-icon";

export default function TarotLandingPage() {
  const toast = useToast();

  async function handleShare() {
    const url = `${window.location.origin}/tarot`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      toast({ content: "링크가 복사되었습니다", duration: 2000 });
    } catch {
      toast({ content: "링크 복사에 실패했습니다", duration: 2000 });
    }
  }

  return (
    <FlexBox
      flexDirection="column"
      gap="16px"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "calc(100dvh - 88px)" }}
    >
      {/* Card fan illustration */}
      <FlexBox
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: "0px" }}
      >
        <Image
          src="/images/hero-cards.png"
          alt="타로 카드"
          width={334}
          height={280}
          style={{ objectFit: "contain" }}
          priority
        />
      </FlexBox>

      {/* Title & Description */}
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

      {/* CTA Buttons */}
      <FlexBox
        flexDirection="column"
        gap="12px"
        alignItems="center"
        sx={{ maxWidth: "320px", width: "100%", alignSelf: "center", marginTop: "16px" }}
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
          leadingContent={<IconShare />}
          onClick={handleShare}
        >
          공유하기
        </Button>
      </FlexBox>
    </FlexBox>
  );
}
