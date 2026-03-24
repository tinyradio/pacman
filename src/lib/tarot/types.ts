export type Spread = "one" | "three";
export type Category = "love" | "wealth" | "career";
export type Orientation = "upright" | "reversed";

export interface TarotCard {
  id: number;
  name: string;
  nameKo: string;
  numeral: string;
  keywords: string[];
}

export type Position = "past" | "present" | "future";

export interface OrientationText {
  upright: string;
  reversed: string;
}

export interface CategoryInterpretation extends OrientationText {
  positions?: Record<Position, OrientationText>;
}

export interface CardInterpretation {
  cardId: number;
  categories: {
    love: CategoryInterpretation;
    wealth: CategoryInterpretation;
    career: CategoryInterpretation;
  };
}

export interface DrawnCard {
  cardId: number;
  orientation: Orientation;
}

export interface SpreadConfig {
  type: Spread;
  label: string;
  description: string;
  cardCount: number;
  positions: string[];
}

export const SPREAD_CONFIGS: Record<Spread, SpreadConfig> = {
  one: {
    type: "one",
    label: "원카드",
    description: "오늘의 한 장으로 보는 운세",
    cardCount: 1,
    positions: ["현재"],
  },
  three: {
    type: "three",
    label: "쓰리카드",
    description: "과거, 현재, 미래를 보는 심층 리딩",
    cardCount: 3,
    positions: ["과거", "현재", "미래"],
  },
};

export const CATEGORY_LABELS: Record<Category, { label: string; description: string }> = {
  career: { label: "직장", description: "직장과 커리어에 대한 운세" },
  wealth: { label: "재물", description: "금전과 재물에 대한 운세" },
  love: { label: "연애", description: "사랑과 관계에 대한 운세" },
};
