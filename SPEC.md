# 타로 리딩 웹사이트 스펙 문서

## 1. 프로젝트 개요

타로 카드를 뽑아 운세를 볼 수 있는 웹사이트. 원카드/쓰리카드 스프레드를 지원하며, 연애/재물/직장 카테고리별 맞춤 해석을 제공한다.

**레퍼런스**: [thegot.co.kr/tarot](https://thegot.co.kr/tarot)

### 기술 스택

- **프레임워크**: Next.js (App Router)
- **UI**: WDS (@wanteddev/wds) 기반 + 커스텀 스타일링
- **스타일링**: Tailwind CSS + Emotion (WDS 내장)
- **언어**: TypeScript
- **카드 이미지**: Rider-Waite 퍼블릭 도메인 (1909 원본)
- **해석 데이터**: 정적 JSON (AI로 초기 데이터 생성)
- **결과 저장**: html2canvas (스크린샷 다운로드)

---

## 2. 카드 데이터 구조

### 2.1 덱 범위

- **MVP**: 메이저 아르카나 22장 (0 The Fool ~ XXI The World)
- **추후 확장**: 마이너 아르카나 56장 (Wands, Cups, Swords, Pentacles)

### 2.2 역방향(리버스)

- 카드 선택 시 **35% 확률**로 역방향 배정
- 역방향 카드는 결과 화면에서 180도 회전하여 표시
- 정방향/역방향 각각 별도 해석 텍스트

### 2.3 해석 데이터 스키마

```typescript
interface CardInterpretation {
  cardId: number; // 0-21
  cardName: string; // "The Fool"
  cardNameKo: string; // "바보"
  keywords: string[]; // ["새로운 시작", "모험", "순수"]
  categories: {
    love: { upright: string; reversed: string };
    wealth: { upright: string; reversed: string };
    career: { upright: string; reversed: string };
  };
}
```

- **총 데이터**: 3 카테고리 × 22장 × 2(정/역) = **132개 해석**
- 초기 데이터는 AI로 생성 후 수동 검수/수정

### 2.4 카드 이미지

- Rider-Waite 1909년 원본 (퍼블릭 도메인)
- `/public/cards/major/{id}.jpg` 경로로 관리
- 카드 뒷면 이미지 1장 별도 제작 (CSS/SVG)

---

## 3. 페이지 구조 & 라우팅

단계별 URL 분리 방식:

| 경로 | 페이지 | 설명 |
|---|---|---|
| `/tarot` | 랜딩 페이지 | SEO 최적화된 소개 + CTA |
| `/tarot/select` | 스프레드/카테고리 선택 | 원카드 or 쓰리카드 + 카테고리 선택 |
| `/tarot/draw` | 카드 뽑기 | 그리드 배치, 카드 선택 인터랙션 |
| `/tarot/result` | 결과 화면 | 카드 공개 + 해석 표시 |

### 상태 전달

- `/tarot/select` → `/tarot/draw`: URL 쿼리 파라미터 (`?spread=three&category=love`)
- `/tarot/draw` → `/tarot/result`: URL 쿼리 파라미터 (`?cards=3r,7,15&category=love&spread=three`)
  - `3r` = 카드ID 3, 역방향 / `7` = 카드ID 7, 정방향
- 뒤로가기 시 자연스럽게 이전 단계로 이동

---

## 4. 사용자 플로우

```
[랜딩] → [스프레드 선택] → [카테고리 선택] → [카드 뽑기] → [결과 확인]
                                                                ↓
                                                    [다시 뽑기] or [홈으로]
```

### 4.1 랜딩 페이지 (`/tarot`)

- 타로 소개 텍스트 (SEO용)
- "타로 시작하기" CTA 버튼
- 메타 태그: title, description, OG 이미지
- 구조화 데이터 (JSON-LD)

### 4.2 스프레드/카테고리 선택 (`/tarot/select`)

- **스프레드 선택**: 원카드 / 쓰리카드 (카드형 UI로 선택)
  - 원카드: "오늘의 한 장" — 간단한 운세
  - 쓰리카드: "과거/현재/미래" — 심층 리딩
- **카테고리 선택**: 연애 / 재물 / 직장
- 스프레드 → 카테고리 순서로 선택 후 "카드 뽑으러 가기" 버튼

### 4.3 카드 뽑기 (`/tarot/draw`)

#### 레이아웃

```
┌─────────────────────────────┐
│     [상단 슬롯 영역]         │
│  ┌──┐  ┌──┐  ┌──┐          │  ← 쓰리카드: 3슬롯 / 원카드: 1슬롯
│  │? │  │★ │  │? │          │     선택한 카드가 슬롯에 채워짐
│  └──┘  └──┘  └──┘          │
│─────────────────────────────│
│     [하단 그리드 영역]       │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ │  ← 22장 뒷면 그리드
│  │★ │ │★ │ │★ │ │★ │ │★ │ │     모바일: 4열 / 데스크톱: 6열
│  └──┘ └──┘ └──┘ └──┘ └──┘ │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ │
│  │★ │ │★ │ │★ │ │★ │ │★ │ │
│  └──┘ └──┘ └──┘ └──┘ └──┘ │
│           ...               │
└─────────────────────────────┘
```

#### 인터랙션

1. 22장의 카드가 뒷면 그리드로 배치
2. 카드 클릭 시 → 상단 빈 슬롯으로 이동 애니메이션
3. 선택된 카드는 그리드에서 사라짐 (or 비활성화)
4. 필요한 장수 선택 완료 시 → "카드 확인하기" 버튼 활성화
5. 선택 취소: 상단 슬롯의 카드 클릭 시 그리드로 복귀

#### 역방향 결정

- 카드 선택 시점에 `Math.random() < 0.35`로 결정
- 사용자에게는 뽑기 단계에서 보이지 않음 (결과에서 공개)

### 4.4 결과 화면 (`/tarot/result`)

#### 카드 공개 연출

- **3D 플립 애니메이션**: CSS `transform: rotateY(180deg)` + `perspective`
- 쓰리카드: 왼쪽부터 한 장씩 순차 공개 (각 0.8초 간격)
- 역방향 카드는 플립 후 180도 회전된 상태로 표시
- `prefers-reduced-motion` 미디어 쿼리 대응 → 애니메이션 비활성화 시 즉시 공개

#### 결과 레이아웃

**원카드:**
```
┌─────────────────────┐
│   [카드 이미지]      │
│   카드 이름          │
│   정방향/역방향 표시  │
│                     │
│   [해석 텍스트]      │
│   키워드 태그        │
└─────────────────────┘
```

**쓰리카드:**
```
┌────────┬────────┬────────┐
│ 과거   │ 현재   │ 미래   │
│ [카드] │ [카드] │ [카드] │
│ 이름   │ 이름   │ 이름   │
└────────┴────────┴────────┘

[과거 해석]
[현재 해석]
[미래 해석]
```

#### 하단 액션

- **스크린샷 저장**: html2canvas로 결과 영역 캡처 → PNG 다운로드
- **다시 뽑기**: `/tarot/select`로 이동
- **홈으로**: `/tarot`로 이동

---

## 5. 디자인

### 5.1 테마: 모던 미니멀

- WDS 기본 테마 활용 (라이트/다크 모드 지원)
- 타로 느낌은 컬러와 타이포그래피로 최소한 표현
  - 악센트 컬러: 딥 퍼플 계열 (카드 뒷면, 포인트 요소)
  - 폰트: Pretendard (WDS 기본) + 카드 이름에만 세리프 폰트
- 불필요한 장식 최소화, 여백과 카드 이미지로 분위기 연출

### 5.2 반응형 (데스크톱 기준 + 반응형)

| 요소 | 모바일 (<768px) | 데스크톱 (≥768px) |
|---|---|---|
| 카드 그리드 | 4열 | 6열 |
| 카드 크기 | 60×90px | 80×120px |
| 상단 슬롯 | 가로 중앙 정렬 | 가로 중앙 정렬 |
| 결과 카드 | 세로 스택 | 가로 나란히 |
| 전체 레이아웃 | max-width 100% | max-width 800px 중앙 |

---

## 6. 접근성 (a11y)

- **키보드 내비게이션**: 카드 그리드 Tab/Enter/Space로 선택 가능
- **ARIA 레이블**:
  - 카드 그리드: `role="grid"`, 각 카드 `role="gridcell"`
  - 카드 버튼: `aria-label="타로 카드 N번"`, 선택 시 `aria-selected="true"`
  - 슬롯: `aria-label="선택된 카드 N번째 슬롯"`, `aria-live="polite"`
- **reduce-motion**: `prefers-reduced-motion: reduce` 시 3D 플립/이동 애니메이션 비활성화
- **포커스 관리**: 카드 선택 후 다음 빈 슬롯으로 포커스 이동
- **스크린리더**: 결과 공개 시 카드 이름과 해석을 순차적으로 읽어줌

---

## 7. SEO

- `/tarot` 랜딩: SSR (Server Component)
  - `<title>`: "무료 타로 카드 운세 - 오늘의 타로"
  - `<meta description>`: 카테고리별 타로 소개
  - OG 이미지: 정적 이미지 (`/public/og-tarot.png`)
  - JSON-LD 구조화 데이터 (WebApplication 스키마)
- `/tarot/select`, `/tarot/draw`, `/tarot/result`: Client Component
  - 기본 메타 태그만 적용
  - `robots: noindex` (동적 인터랙션 페이지)

---

## 8. 프로젝트 구조

```
src/
├── app/
│   └── tarot/
│       ├── page.tsx              # 랜딩 페이지 (Server Component)
│       ├── layout.tsx            # 타로 섹션 레이아웃
│       ├── select/
│       │   └── page.tsx          # 스프레드/카테고리 선택
│       ├── draw/
│       │   └── page.tsx          # 카드 뽑기
│       └── result/
│           └── page.tsx          # 결과 화면
├── components/
│   └── tarot/
│       ├── CardGrid.tsx          # 22장 뒷면 그리드
│       ├── CardSlot.tsx          # 상단 선택 슬롯
│       ├── CardFlip.tsx          # 3D 플립 애니메이션 컴포넌트
│       ├── CardImage.tsx         # 카드 이미지 (정/역방향)
│       ├── SpreadSelector.tsx    # 스프레드 선택 UI
│       ├── CategorySelector.tsx  # 카테고리 선택 UI
│       ├── ReadingResult.tsx     # 해석 결과 표시
│       └── ScreenshotButton.tsx  # 스크린샷 저장 버튼
├── data/
│   └── tarot/
│       ├── cards.ts              # 카드 기본 정보 (이름, 키워드)
│       └── interpretations.ts    # 132개 해석 데이터
├── lib/
│   └── tarot/
│       ├── types.ts              # 타입 정의
│       ├── shuffle.ts            # 셔플 + 역방향 결정 로직
│       └── utils.ts              # URL 파라미터 파싱 등
└── public/
    └── cards/
        ├── major/                # 0.jpg ~ 21.jpg (카드 앞면)
        └── back.svg              # 카드 뒷면
```

---

## 9. 엣지 케이스 & 제약사항

### 9.1 URL 직접 접근

- `/tarot/draw`에 쿼리 파라미터 없이 접근 시 → `/tarot/select`로 리다이렉트
- `/tarot/result`에 유효하지 않은 카드 ID 시 → `/tarot/select`로 리다이렉트
- 카드 ID 범위 검증 (0-21), 중복 카드 방지

### 9.2 뒤로가기

- `/tarot/result` → `/tarot/draw`: 이미 뽑은 카드 상태 복원 불가 → `/tarot/select`로 리다이렉트
- `/tarot/draw` → `/tarot/select`: 정상 동작

### 9.3 카드 이미지 로딩

- 22장 이미지 lazy loading (Intersection Observer)
- 이미지 로딩 실패 시 카드 이름 텍스트 fallback
- draw 페이지 진입 시 이미지 preload 불필요 (뒷면만 표시)

### 9.4 html2canvas 제약

- 외부 이미지(CDN) CORS 이슈 → 카드 이미지는 반드시 `/public`에서 서빙
- 일부 CSS 속성 미지원 가능 (backdrop-filter 등) → 스크린샷 영역은 단순한 스타일 유지

---

## 10. 향후 확장 (Out of Scope)

- 마이너 아르카나 56장 추가
- 켈틱크로스 등 추가 스프레드
- 사용자 계정 + 히스토리 저장 (DB 필요)
- URL 기반 결과 공유 + 동적 OG 이미지
- 다국어(영어) 지원
- AI 맞춤 해석 (LLM API 연동)
- 일일 운세/운세 알림 기능
