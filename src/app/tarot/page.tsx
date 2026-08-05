"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FlexBox, Typography, Button } from "@wanteddev/wds";
import { CustomToast } from "@/features/tarot/components/CustomToast";
import { HeroCardMarquee } from "@/features/tarot/components/HeroCardMarquee";
import { useShareToast } from "@/features/tarot/lib/useShareToast";
import {
  CSS_EASE_MICRO,
  DUR,
  fadeRise,
} from "@/features/tarot/lib/motion";

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
        <HeroCardMarquee />

        <FlexBox
          flexDirection="column"
          alignItems="center"
          gap="16px"
          sx={{ textAlign: "center" }}
        >
          <motion.div {...fadeRise(0.15)}>
            <Typography
              variant="display3"
              weight="bold"
              sx={{ letterSpacing: "-0.97px" }}
            >
              타로 좋아하세요?
            </Typography>
          </motion.div>
          <motion.div {...fadeRise(0.23)}>
            <Typography
              variant="body2"
              color="semantic.label.alternative"
              sx={{ maxWidth: "320px", lineHeight: "1.7" }}
            >
              메이저 아르카나 22장으로
              <br />
              당신의 직장, 재물, 연애 운세를 점쳐보세요.
            </Typography>
          </motion.div>
        </FlexBox>

        <motion.div
          {...fadeRise(0.32)}
          style={{
            maxWidth: "320px",
            width: "100%",
            alignSelf: "center",
            marginTop: "16px",
            paddingBottom: "40px",
          }}
        >
          <FlexBox flexDirection="column" gap="12px" alignItems="center">
            <Button
              as={Link}
              href="/tarot/select"
              variant="solid"
              color="primary"
              size="large"
              fullWidth
              sx={{
                transition: `transform ${DUR.micro}s ${CSS_EASE_MICRO}`,
                "&:active": { transform: "scale(0.98)" },
              }}
            >
              시작하기
            </Button>
            <Button
              variant="outlined"
              color="assistive"
              size="large"
              fullWidth
              onClick={handleShare}
              sx={{
                transition: `transform ${DUR.micro}s ${CSS_EASE_MICRO}`,
                "&:active": { transform: "scale(0.98)" },
              }}
            >
              공유하기
            </Button>
          </FlexBox>
        </motion.div>
      </FlexBox>

      <CustomToast message={toastMessage} visible={toastVisible} />
    </>
  );
}
