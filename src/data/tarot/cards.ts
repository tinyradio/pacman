import type { TarotCard } from "@/lib/tarot/types";

export const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: "The Fool", nameKo: "바보", numeral: "0", keywords: ["새로운 시작", "모험", "순수", "자유"] },
  { id: 1, name: "The Magician", nameKo: "마법사", numeral: "I", keywords: ["의지력", "창조", "능력", "집중"] },
  { id: 2, name: "The High Priestess", nameKo: "여사제", numeral: "II", keywords: ["직관", "신비", "내면의 지혜", "무의식"] },
  { id: 3, name: "The Empress", nameKo: "여황제", numeral: "III", keywords: ["풍요", "모성", "자연", "창조력"] },
  { id: 4, name: "The Emperor", nameKo: "황제", numeral: "IV", keywords: ["권위", "안정", "리더십", "구조"] },
  { id: 5, name: "The Hierophant", nameKo: "교황", numeral: "V", keywords: ["전통", "가르침", "신앙", "관습"] },
  { id: 6, name: "The Lovers", nameKo: "연인", numeral: "VI", keywords: ["사랑", "조화", "선택", "가치관"] },
  { id: 7, name: "The Chariot", nameKo: "전차", numeral: "VII", keywords: ["승리", "의지", "전진", "결단력"] },
  { id: 8, name: "Strength", nameKo: "힘", numeral: "VIII", keywords: ["용기", "인내", "내면의 힘", "자제력"] },
  { id: 9, name: "The Hermit", nameKo: "은둔자", numeral: "IX", keywords: ["성찰", "고독", "내면 탐구", "지혜"] },
  { id: 10, name: "Wheel of Fortune", nameKo: "운명의 수레바퀴", numeral: "X", keywords: ["변화", "운명", "전환점", "순환"] },
  { id: 11, name: "Justice", nameKo: "정의", numeral: "XI", keywords: ["공정", "진실", "균형", "책임"] },
  { id: 12, name: "The Hanged Man", nameKo: "매달린 사람", numeral: "XII", keywords: ["희생", "새로운 관점", "기다림", "내려놓음"] },
  { id: 13, name: "Death", nameKo: "죽음", numeral: "XIII", keywords: ["변환", "끝과 시작", "해방", "재탄생"] },
  { id: 14, name: "Temperance", nameKo: "절제", numeral: "XIV", keywords: ["균형", "조화", "인내", "적응"] },
  { id: 15, name: "The Devil", nameKo: "악마", numeral: "XV", keywords: ["유혹", "집착", "속박", "욕망"] },
  { id: 16, name: "The Tower", nameKo: "탑", numeral: "XVI", keywords: ["급변", "파괴", "해방", "깨달음"] },
  { id: 17, name: "The Star", nameKo: "별", numeral: "XVII", keywords: ["희망", "영감", "평화", "치유"] },
  { id: 18, name: "The Moon", nameKo: "달", numeral: "XVIII", keywords: ["불안", "환상", "무의식", "직감"] },
  { id: 19, name: "The Sun", nameKo: "태양", numeral: "XIX", keywords: ["기쁨", "성공", "활력", "긍정"] },
  { id: 20, name: "Judgement", nameKo: "심판", numeral: "XX", keywords: ["부활", "각성", "평가", "새 출발"] },
  { id: 21, name: "The World", nameKo: "세계", numeral: "XXI", keywords: ["완성", "성취", "통합", "여행"] },
];

export function getCard(id: number): TarotCard | undefined {
  return MAJOR_ARCANA.find((c) => c.id === id);
}
