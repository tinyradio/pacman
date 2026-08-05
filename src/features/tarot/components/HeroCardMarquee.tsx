"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { EASE_ENTRY } from "@/features/tarot/lib/motion";

/**
 * 랜딩 히어로: 완만한 아크 경로를 따라 좌→우로 흐르는 카드 마키.
 * 아크는 화면에 고정되어 있고 카드만 경로(offset-path)를 순환한다 —
 * 카드는 경로 접선을 따라 살짝 기울며, 좌우 가장자리는 블러 + 디졸브로 사라진다.
 * 카드 크기는 px 고정 — 뷰포트가 줄어도 2:3 비율이 변하지 않는다.
 */

// 메이저 아르카나 22장 전부 — 인접 카드끼리 색·구도가 겹치지 않게 배치
const CARDS = [0, 6, 17, 10, 2, 19, 12, 16, 1, 18, 7, 21, 3, 13, 9, 4, 15, 8, 20, 5, 14, 11];
const CARD_W = 120;
const CARD_H = 180; // 2:3 고정
const BAND_MAX = 1000; // 큰 화면에서 마키가 퍼지는 최대 폭
const BAND_H = 224;
const STAGE_W = 1000; // 아크 좌표계 기준 폭 — 꼭짓점이 항상 밴드 중앙에 온다
/**
 * 아크 경로(스테이지 좌표): 좌우로 1000px씩 연장된 완만한 아치.
 * 가시 영역(0~1000px)에서 중앙 카드가 가장자리보다 ~30px 높다.
 */
const ARC_PATH = 'path("M -1000 370 Q 500 -170 2000 370")';
const DURATION = 95; // 경로(~3000px) 한 바퀴 — 약 32px/s

// 작은 화면에서도 충분한 소멸 여백을 확보하도록 px 기반으로 지정
const FADE_WIDTH = "clamp(80px, 18vw, 140px)";
const DISSOLVE_MASK = `linear-gradient(to right, transparent 0, black ${FADE_WIDTH}, black calc(100% - ${FADE_WIDTH}), transparent 100%)`;
const BLUR_WIDTH = "clamp(80px, 16vw, 130px)";

function ArcCard({ id, index, total }: { id: number; index: number; total: number }) {
  const [loaded, setLoaded] = useState(false);

  // 캐시에서 즉시 완료된 이미지는 onLoad가 누락될 수 있어 ref 부착 시점에 보강
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className="hero-arc-card"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: CARD_W,
        height: CARD_H,
        offsetPath: ARC_PATH,
        offsetRotate: "auto",
        animation: `hero-arc ${DURATION}s linear infinite`,
        animationDelay: `${(-DURATION * index) / total}s`,
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(23, 23, 25, 0.06)",
        boxShadow: "0 3px 8px rgba(23, 23, 25, 0.07)",
        backgroundColor: "#F4F4F5",
      }}
    >
      {/* 마키는 카드가 계속 뷰포트로 들어오므로 lazy 로딩이 팝인을 만든다 — eager + 페이드인 */}
      <Image
        ref={imgRef}
        src={`/cards/major/${id}.webp`}
        alt=""
        fill
        sizes="120px"
        loading="eager"
        onLoad={() => setLoaded(true)}
        style={{
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}

export function HeroCardMarquee() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_ENTRY, delay: 0.05 }}
      style={{
        // 560px 컬럼을 탈출하되 최대 1000px까지만 퍼진다
        // (부모 FlexBox의 alignItems: center가 넘치는 폭을 중앙 정렬한다)
        position: "relative",
        width: `min(100vw, ${BAND_MAX}px)`,
        height: BAND_H,
        overflow: "hidden",
        pointerEvents: "none",
        marginBottom: "4px",
        maskImage: DISSOLVE_MASK,
        WebkitMaskImage: DISSOLVE_MASK,
        ["--arc-duration" as string]: `${DURATION}s`,
      }}
    >
      {/* 고정 폭 스테이지: 아크 꼭짓점이 밴드 폭과 무관하게 항상 중앙에 오도록 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: STAGE_W,
          height: "100%",
          marginLeft: -STAGE_W / 2,
        }}
      >
        {CARDS.map((id, i) => (
          <ArcCard key={id} id={id} index={i} total={CARDS.length} />
        ))}
      </div>

      {/* 좌우 블러 스트립: 가장자리로 갈수록 카드가 흐려진 뒤 디졸브된다 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: BLUR_WIDTH,
          zIndex: 2,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to right, black, transparent)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: BLUR_WIDTH,
          zIndex: 2,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to left, black, transparent)",
          WebkitMaskImage: "linear-gradient(to left, black, transparent)",
        }}
      />
    </motion.div>
  );
}
