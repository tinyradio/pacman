"use client";

import { useState, type RefObject } from "react";
import { Button } from "@wanteddev/wds";
import { IconDownload } from "@wanteddev/wds-icon";

interface ScreenshotButtonProps {
  targetRef: RefObject<HTMLDivElement | null>;
}

export function ScreenshotButton({ targetRef }: ScreenshotButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleScreenshot() {
    if (!targetRef.current) return;

    setLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `tarot-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Screenshot failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={handleScreenshot}
      loading={loading}
      leadingContent={<IconDownload />}
      sx={(theme) => ({
        backgroundColor: theme.semantic.background.normal.normal,
      })}
    >
      이미지로 저장
    </Button>
  );
}
