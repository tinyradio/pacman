import type { CardInterpretation } from "@/lib/tarot/types";
import { CARDS_0_3 } from "./parts/cards0-3";
import { CARDS_4_7 } from "./parts/cards4-7";
import { CARDS_8_11 } from "./parts/cards8-11";
import { CARDS_12_15 } from "./parts/cards12-15";
import { CARDS_16_18 } from "./parts/cards16-18";
import { CARDS_19_21 } from "./parts/cards19-21";

export const INTERPRETATIONS: CardInterpretation[] = [
  ...CARDS_0_3,
  ...CARDS_4_7,
  ...CARDS_8_11,
  ...CARDS_12_15,
  ...CARDS_16_18,
  ...CARDS_19_21,
] as CardInterpretation[];

const INTERPRETATION_MAP = new Map(
  INTERPRETATIONS.map((i) => [i.cardId, i])
);

export function getInterpretation(cardId: number): CardInterpretation | undefined {
  return INTERPRETATION_MAP.get(cardId);
}
