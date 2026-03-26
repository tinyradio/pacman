"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  const { width, height } = SIZES[size];

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
        width: `${width}px`,
        height: `${height}px`,
        perspective: "800px",
        borderRadius: flipped ? "12px" : "0px",
        boxShadow: flipped ? "0px 0px 10px rgba(0,0,0,0.1)" : "none",
        transition: "box-shadow 0.5s ease 0.4s, border-radius 0.5s ease 0.4s",
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
            src="/cards/back.webp"
            alt="카드 뒷면"
            fill
            sizes="108px"
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
              sizes="108px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
