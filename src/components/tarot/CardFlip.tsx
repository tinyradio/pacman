"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Orientation } from "@/lib/tarot/types";

interface CardFlipProps {
  cardId: number;
  orientation: Orientation;
  delay?: number;
  cardNameKo: string;
}

export function CardFlip({
  cardId,
  orientation,
  delay = 0,
  cardNameKo,
}: CardFlipProps) {
  const [flipped, setFlipped] = useState(false);

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
    <div
      style={{
        position: "relative",
        width: "108px",
        height: "162px",
        perspective: "800px",
        borderRadius: "12px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      }}
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
            src="/cards/back.png"
            alt="카드 뒷면"
            fill
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
              src={`/cards/major/${cardId}.png`}
              alt={cardNameKo}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
