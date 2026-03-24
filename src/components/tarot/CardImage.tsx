"use client";

import Image from "next/image";
import type { Orientation } from "@/lib/tarot/types";

interface CardImageProps {
  cardId: number;
  orientation: Orientation;
  revealed?: boolean;
  className?: string;
}

export function CardImage({
  cardId,
  orientation,
  revealed = true,
  className = "",
}: CardImageProps) {
  if (!revealed) {
    return (
      <Image
        src="/cards/back.png"
        alt="타로 카드 뒷면"
        width={240}
        height={360}
        className={className}
        priority
      />
    );
  }

  return (
    <div className={`${orientation === "reversed" ? "rotate-180" : ""} ${className}`}>
      <Image
        src={`/cards/major/${cardId}.png`}
        alt={`타로 카드 ${cardId}`}
        width={240}
        height={360}
        className="rounded-lg"
      />
    </div>
  );
}
