"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FlexBox, Typography, Button } from "@wanteddev/wds";

function CustomToast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "20px"})`,
        opacity: visible ? 1 : 0,
        transition: "all 0.3s ease",
        backgroundColor: "rgba(27, 28, 30, 0.52)",
        color: "white",
        padding: "12px 24px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 500,
        textAlign: "center",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
}

export default function TarotLandingPage() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  }, []);

  useEffect(() => {
    if (!toastVisible) return;
    const timeout = setTimeout(() => setToastVisible(false), 2000);
    return () => clearTimeout(timeout);
  }, [toastVisible]);

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
      showToast("링크가 복사되었습니다");
    } catch {
      showToast("링크 복사에 실패했습니다");
    }
  }

  return (
    <>
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
