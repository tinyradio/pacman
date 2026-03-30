"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FlexBox,
  Typography,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  Divider,
  ContentBadge,
} from "@wanteddev/wds";
import type { Orientation } from "@/lib/tarot/types";

interface CardFlipProps {
  cardId: number;
  orientation: Orientation;
  delay?: number;
  cardNameKo: string;
  size?: "default" | "small";
}

const SIZES = {
  default: { width: 108, height: 162 },
  small: { width: 88, height: 132 },
};

export function CardFlip({
  cardId,
  orientation,
  delay = 0,
  cardNameKo,
  size = "default",
}: CardFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { width, height } = SIZES[size];

  const openModal = useCallback(() => {
    if (flipped) setShowModal(true);
  }, [flipped]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const timeout = setTimeout(
      () => setFlipped(true),
      prefersReducedMotion ? 0 : delay
    );

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <>
      <FlexBox
        onClick={openModal}
        sx={(theme) => ({
          position: "relative",
          width: `${width}px`,
          height: `${height}px`,
          perspective: "800px",
          borderRadius: flipped ? "12px" : "0px",
          boxShadow: flipped ? theme.semantic.elevation.shadow.normal.small : "none",
          transition: "box-shadow 0.5s ease 0.4s, border-radius 0.5s ease 0.4s",
          cursor: flipped ? "pointer" : "default",
        })}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          aria-label={
            flipped
              ? `${cardNameKo} - ${orientation === "reversed" ? "역방향" : "정방향"}`
              : "카드 공개 대기 중"
          }
          role="img"
        >
          {/* Back */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "12px",
              overflow: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src="/cards/back.webp"
              alt="카드 뒷면"
              fill
              sizes={`${width}px`}
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Front */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "12px",
              overflow: "hidden",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                transform:
                  orientation === "reversed" ? "rotate(180deg)" : "none",
              }}
            >
              <Image
                src={`/cards/major/${cardId}.webp`}
                alt={cardNameKo}
                fill
                sizes={`${width}px`}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </FlexBox>

      <Modal open={showModal} onOpenChange={setShowModal}>
        <ModalContainer
          variant="popup"
          size="medium"
          wrapperProps={{
            sx: {
              justifyContent: "center",
              alignItems: "center",
            },
          }}
          sx={(theme) => ({
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: theme.semantic.elevation.shadow.normal.large,
            backgroundColor: theme.semantic.background.normal.normal,
            maxWidth: "300px",
            margin: "0 auto",
          })}
        >
          <FlexBox
            alignItems="center"
            justifyContent="center"
            sx={{
              position: "relative",
              height: "48px",
              flexShrink: 0,
            }}
          >
            <Typography variant="label1" weight="bold">
              {cardNameKo}
            </Typography>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="닫기"
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                padding: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="#37383C" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </FlexBox>

          <Divider color="semantic.fill.normal" />

          <ModalContent sx={{ paddingTop: "16px" }}>
            <ModalContentItem>
              <FlexBox flexDirection="column" alignItems="center" gap="16px">
                <FlexBox
                  sx={(theme) => ({
                    position: "relative",
                    width: "240px",
                    height: "360px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: theme.semantic.background.normal.alternative,
                    boxShadow: theme.semantic.elevation.shadow.normal.small,
                  })}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: orientation === "reversed" ? "rotate(180deg)" : "none",
                    }}
                  >
                    <Image
                      src={`/cards/major/${cardId}.webp`}
                      alt={cardNameKo}
                      fill
                      sizes="240px"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                </FlexBox>
                <ContentBadge
                  color={orientation === "reversed" ? "accent" : "neutral"}
                  size="small"
                >
                  {orientation === "reversed" ? "역방향" : "정방향"}
                </ContentBadge>
              </FlexBox>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
}
