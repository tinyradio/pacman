import type { Transition } from "motion/react";

/** 마이크로 인터랙션(hover/press/토글) 이징 — 200~300ms와 함께 사용 */
export const EASE_MICRO: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** 표면/페이지 입장 이징 — 500~800ms와 함께 사용 */
export const EASE_ENTRY: [number, number, number, number] = [0.32, 0.72, 0, 1];

export const CSS_EASE_MICRO = "cubic-bezier(0.16, 1, 0.3, 1)";
export const CSS_EASE_ENTRY = "cubic-bezier(0.32, 0.72, 0, 1)";

/** 듀레이션 (초) */
export const DUR = {
  micro: 0.2,
  base: 0.25,
  entry: 0.5,
  page: 0.5,
  flip: 0.8,
} as const;

/** 인터랙티브 요소 기본 스프링 */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

/** 카드 비행(그리드↔슬롯) 스프링 — 약 0.4초 안착, 살짝 오버슈트 */
export const SPRING_CARD: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 28,
};

/** 스태거 간격 (초) — deck은 22장 딜인이 총 ~0.8초에 끝나도록 짧게 */
export const STAGGER = {
  section: 0.09,
  panel: 0.12,
  deck: 0.03,
} as const;

/** 공통 입장 모션: opacity 0→1 + y 상승. motion.div에 스프레드해서 사용 */
export function fadeRise(delay = 0, y = 16) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.entry, ease: EASE_ENTRY, delay },
  };
}

/**
 * 결과 화면 리빌 타임라인 (초).
 * 페이지 페이드인 후 카드가 순서대로 플립되고,
 * 모든 플립이 끝난 뒤에야 해석 패널 → CTA가 등장한다.
 */
export function revealTimings(cardCount: number) {
  const flipStart = (index: number) => 0.35 + index * 0.8;
  const allFlipped = 0.35 + cardCount * 0.8;
  const panel = (index: number) => allFlipped + 0.15 + index * STAGGER.panel;
  const cta = allFlipped + 0.15 + cardCount * STAGGER.panel + 0.1;
  return { flipStart, allFlipped, panel, cta };
}
