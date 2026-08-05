# 🔮 타로 카드 운세

메이저 아르카나 22장으로 보는 타로 리딩 웹 애플리케이션입니다.
원카드 / 쓰리카드 스프레드를 지원하며, **연애 · 재물 · 직장** 카테고리별로 정 · 역방향을 모두 반영한 맞춤 해석을 제공합니다.

> 라이트 미니멀 UI에 프리미엄 모션을 더한, 모바일 우선(mobile-first) 단일 컬럼 서비스입니다.

---

## 목차

- [서비스 소개](#서비스-소개)
- [주요 기능](#주요-기능)
- [사용 흐름](#사용-흐름)
- [카드 & 해석 시스템](#카드--해석-시스템)
- [모션 & 인터랙션](#모션--인터랙션)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [로컬 실행](#로컬-실행)
- [배포](#배포)

---

## 서비스 소개

타로 카드를 뽑아 오늘의 운세를 확인하는 웹사이트입니다. 사용자는 리딩 방식(스프레드)과 궁금한 분야(카테고리)를 고르고, 셔플된 22장의 카드 중에서 직접 카드를 뽑습니다. 뽑은 카드가 펼쳐지면 각 카드의 정 · 역방향에 맞춰 카테고리별로 작성된 해석을 읽을 수 있습니다.

- **카드**: 라이더-웨이트(Rider-Waite) 계열 메이저 아르카나 22장
- **화면 폭**: 최대 560px 단일 컬럼(모바일 우선)
- **테마**: 라이트 모드 고정
- **결과 공유**: 리딩 결과가 URL에 담겨, 링크만으로 그대로 다시 열 수 있습니다

---

## 주요 기능

### 스프레드 (리딩 방식)

| 스프레드 | 카드 수 | 포지션 | 설명 |
|---|---|---|---|
| **원카드** | 1장 | 현재 | 한 장으로 보는 오늘의 운세 |
| **쓰리카드** | 3장 | 과거 · 현재 · 미래 | 흐름을 짚어보는 세 장 리딩 |

### 카테고리

- 💙 **연애** — 나의 연애운은?
- 🪙 **재물** — 나의 금전운은?
- 💼 **직장** — 나의 직장운은?

### 정방향 / 역방향

카드를 뽑을 때마다 약 35% 확률로 역방향(reversed)이 결정됩니다. 정방향과 역방향은 완전히 다른 해석을 가지며, 쓰리카드에서는 포지션(과거 · 현재 · 미래)별로도 별도의 해석이 제공됩니다.

### 공유 가능한 결과

리딩 결과는 스프레드 · 카테고리 · 뽑은 카드가 모두 쿼리 파라미터로 인코딩됩니다. 예:

```
/tarot/result?spread=three&category=love&cards=15,18,6r
```

- `spread` — `one` | `three`
- `category` — `love` | `wealth` | `career`
- `cards` — 카드 번호를 쉼표로 나열, `r` 접미사는 역방향 (예: `6r` = 6번 카드 역방향)

이 URL을 저장하거나 공유하면 동일한 리딩을 언제든 재현할 수 있습니다.

---

## 사용 흐름

```
/tarot           랜딩 (히어로 카드 마키 + CTA)
   ↓  시작하기
/tarot/select    스프레드 · 카테고리 선택
   ↓  카드 뽑으러 가기
/tarot/draw      22장 그리드에서 카드 선택 → 슬롯으로 이동
   ↓  카드 확인하기
/tarot/result    카드 공개 + 카테고리별 해석
```

1. **랜딩** — 아치 경로를 따라 흐르는 카드 마키와 함께 서비스를 소개합니다.
2. **선택** — 원카드/쓰리카드와 연애/재물/직장을 고릅니다.
3. **뽑기** — 셔플된 22장 중에서 스프레드 장수만큼 카드를 뽑습니다. 뽑힌 카드는 상단 슬롯으로 날아가고, 슬롯을 다시 누르면 취소됩니다.
4. **결과** — 카드가 순서대로 뒤집히며 공개되고, 각 카드의 이름 · 정/역방향 · 카테고리 해석 · 키워드를 확인합니다. "다시 뽑기" 또는 "홈으로"로 이동할 수 있습니다.

상태는 모두 **URL 쿼리 파라미터**로만 관리되어 별도의 전역 스토어 없이도 결과를 딥링크 · 공유할 수 있습니다.

---

## 카드 & 해석 시스템

### 메이저 아르카나 22장

| # | 이름 | # | 이름 |
|---|---|---|---|
| 0 | The Fool · 바보 | 11 | Justice · 정의 |
| 1 | The Magician · 마법사 | 12 | The Hanged Man · 매달린 사람 |
| 2 | The High Priestess · 여사제 | 13 | Death · 죽음 |
| 3 | The Empress · 여황제 | 14 | Temperance · 절제 |
| 4 | The Emperor · 황제 | 15 | The Devil · 악마 |
| 5 | The Hierophant · 교황 | 16 | The Tower · 탑 |
| 6 | The Lovers · 연인 | 17 | The Star · 별 |
| 7 | The Chariot · 전차 | 18 | The Moon · 달 |
| 8 | Strength · 힘 | 19 | The Sun · 태양 |
| 9 | The Hermit · 은둔자 | 20 | Judgement · 심판 |
| 10 | Wheel of Fortune · 운명의 수레바퀴 | 21 | The World · 세계 |

### 해석 데이터 구조

각 카드는 세 카테고리(연애 · 재물 · 직장)마다 정 · 역방향 기본 해석을 가지며, 쓰리카드용으로 과거 · 현재 · 미래 포지션별 정 · 역방향 해석도 별도로 보유합니다.

```ts
interface CardInterpretation {
  cardId: number;
  categories: {
    love:   CategoryInterpretation;
    wealth: CategoryInterpretation;
    career: CategoryInterpretation;
  };
}

interface CategoryInterpretation {
  upright: string;   // 정방향 기본
  reversed: string;  // 역방향 기본
  positions?: Record<"past" | "present" | "future", {
    upright: string;
    reversed: string;
  }>;
}
```

즉 카드 한 장당 **연애/재물/직장 × 정/역 × (기본 + 과거/현재/미래)** = 최대 24개의 해석 텍스트가 담겨 있습니다.

---

## 모션 & 인터랙션

정적인 라이트 UI 위에 [Motion(framer-motion)](https://motion.dev) 기반의 연출을 얹어, 전환마다 흐름이 느껴지도록 설계했습니다. 모든 모션 토큰(이징 · 듀레이션 · 스프링 · 스태거)은 `src/features/tarot/lib/motion.ts`에 중앙화되어 있습니다.

- **페이지 입장** — 화면 전환마다 `template.tsx`가 콘텐츠를 페이드 + 상승시킵니다.
- **랜딩 히어로** — 22장의 카드가 완만한 아치 경로(`offset-path`)를 따라 좌 → 우로 흐르고, 좌우 가장자리는 블러 + 디졸브로 자연스럽게 사라집니다.
- **덱 딜인** — 뽑기 화면의 22장 카드가 순차 스태거로 등장합니다.
- **카드 → 슬롯 비행** — 카드를 뽑으면 `layoutId` 기반 FLIP 스프링으로 그리드에서 상단 슬롯까지 날아가고, 취소 시 원위치로 역비행합니다.
- **결과 리빌** — 카드가 0.8초 간격으로 순서대로 뒤집히며 공개됩니다(해석 텍스트는 즉시 노출).
- **선택 피드백** — 스프레드/카테고리 선택 시 스프링 팝과 이미지 크로스페이드가 적용됩니다.
- **접근성** — `prefers-reduced-motion`을 전역 CSS 클램프와 `MotionConfig`로 동시에 존중하여, 모션 최소화 설정 시 애니메이션이 즉시 정지/생략됩니다.

---

## 기술 스택

- **프레임워크** — [Next.js](https://nextjs.org) (App Router) · React 19 · TypeScript
- **디자인 시스템** — [WDS `@wanteddev/wds`](https://www.npmjs.com/package/@wanteddev/wds) (Emotion `sx` 기반)
- **애니메이션** — [Motion](https://motion.dev) (framer-motion v12)
- **폰트** — Pretendard (본문) · Noto Sans (로마 숫자)
- **이미지** — 라이더-웨이트 퍼블릭 도메인 카드 아트 (`next/image`)
- **배포** — [Vercel](https://vercel.com)

---

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx                # 루트 레이아웃, 폰트/글로벌 CSS
│   ├── globals.css               # reduced-motion 클램프 + 마키 키프레임
│   └── tarot/
│       ├── layout.tsx            # 헤더(스텝 인디케이터·공유·백) + MotionConfig
│       ├── template.tsx          # 페이지 입장 애니메이션
│       ├── page.tsx              # 랜딩
│       ├── select/page.tsx       # 스프레드·카테고리 선택
│       ├── draw/page.tsx         # 카드 뽑기
│       └── result/page.tsx       # 결과
└── features/tarot/
    ├── components/               # CardFlip, CardGrid, CardSlot, ReadingResult,
    │                             # HeroCardMarquee, StickyCtaBar, 셀렉터 등
    ├── lib/                      # motion.ts(모션 토큰), utils.ts(URL 인코딩),
    │                             # types.ts, 훅
    └── data/                     # 22장 카드 정보 + 카테고리별 해석
```

---

## 로컬 실행

> 패키지 매니저는 **pnpm**을 사용합니다. WDS 패키지는 GitHub Packages 레지스트리에서 받으므로, `.npmrc`에 `GITHUB_PKG_TOKEN` 인증이 필요합니다.

```bash
pnpm install
pnpm dev
```

개발 서버가 뜨면 [http://localhost:3000/tarot](http://localhost:3000/tarot) 에서 확인할 수 있습니다. `/` 접속 시 자동으로 `/tarot`으로 리다이렉트됩니다.

```bash
pnpm build   # 프로덕션 빌드
pnpm start   # 프로덕션 서버
pnpm lint    # ESLint
```

---

## 배포

Vercel과 GitHub가 연동되어 있어, 기본 브랜치에 푸시하면 자동으로 프로덕션 배포가 진행됩니다. 그 외 브랜치 푸시는 프리뷰 배포로 생성됩니다.

---

*카드 아트워크는 1909년 라이더-웨이트 덱(퍼블릭 도메인)을 기반으로 합니다.*
