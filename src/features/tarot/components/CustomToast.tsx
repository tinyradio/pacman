"use client";

import { FlexBox, Typography } from "@wanteddev/wds";

interface CustomToastProps {
  message: string;
  visible: boolean;
}

export function CustomToast({ message, visible }: CustomToastProps) {
  return (
    <FlexBox
      justifyContent="center"
      sx={(theme) => ({
        position: "fixed",
        bottom: "40px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "20px"})`,
        opacity: visible ? 1 : 0,
        transition: "all 0.3s ease",
        backgroundColor: `rgba(27, 28, 30, ${theme.opacity[52]})`,
        padding: "12px 24px",
        borderRadius: "12px",
        zIndex: 9999,
        pointerEvents: "none",
      })}
    >
      <Typography
        variant="label2"
        weight="medium"
        color="semantic.inverse.label"
        sx={{ textAlign: "center" }}
      >
        {message}
      </Typography>
    </FlexBox>
  );
}
