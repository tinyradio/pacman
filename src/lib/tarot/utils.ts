import type { DrawnCard, Category, Spread } from "./types";

const REVERSE_PROBABILITY = 0.35;

export function determineOrientation(): "upright" | "reversed" {
  return Math.random() < REVERSE_PROBABILITY ? "reversed" : "upright";
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function encodeDrawnCards(cards: DrawnCard[]): string {
  return cards
    .map((c) => (c.orientation === "reversed" ? `${c.cardId}r` : `${c.cardId}`))
    .join(",");
}

export function decodeDrawnCards(param: string): DrawnCard[] | null {
  try {
    const parts = param.split(",");
    const cards: DrawnCard[] = parts.map((part) => {
      const isReversed = part.endsWith("r");
      const idStr = isReversed ? part.slice(0, -1) : part;
      const cardId = parseInt(idStr, 10);
      if (isNaN(cardId) || cardId < 0 || cardId > 21) return null!;
      return { cardId, orientation: isReversed ? "reversed" as const : "upright" as const };
    });
    if (cards.some((c) => c === null)) return null;
    const ids = new Set(cards.map((c) => c.cardId));
    if (ids.size !== cards.length) return null;
    return cards;
  } catch {
    return null;
  }
}

export function isValidCategory(value: string): value is Category {
  return ["love", "wealth", "career"].includes(value);
}

export function isValidSpread(value: string): value is Spread {
  return ["one", "three"].includes(value);
}

export function buildDrawUrl(spread: Spread, category: Category): string {
  return `/tarot/draw?spread=${spread}&category=${category}`;
}

export function buildResultUrl(
  spread: Spread,
  category: Category,
  cards: DrawnCard[]
): string {
  return `/tarot/result?spread=${spread}&category=${category}&cards=${encodeDrawnCards(cards)}`;
}
