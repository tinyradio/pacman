"use client";

import { ActionArea, ActionAreaButton } from "@wanteddev/wds";

interface StickyCtaBarProps {
  visible: boolean;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function StickyCtaBar({
  visible,
  label,
  onClick,
  disabled,
}: StickyCtaBarProps) {
  return (
    <ActionArea
      variant="cancel"
      background
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition:
          "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        "& [data-role='action-area-wrapper']": {
          width: "100%",
          maxWidth: "560px",
          margin: "0 auto",
          padding: "10px 0 0",
        },
      }}
    >
      <ActionAreaButton
        variant="main"
        buttonVariant="solid"
        buttonColor="primary"
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </ActionAreaButton>
    </ActionArea>
  );
}
