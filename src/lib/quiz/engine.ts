/**
 * クイズ出題・採点エンジン
 */

import type { Question, QuestionResult, QuizSettings } from "@/types/quiz";
import { getQuestionsByCategory, loadAllQuestions, getQuestionById } from "./loader";

/** 模擬試験の固定出題数 */
const EXAM_QUESTION_COUNT = 40;

/** Fisher-Yatesアルゴリズムで配列をシャッフルする */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 設定に基づいて出題する問題を選択する */
export function selectQuestions(
  settings: QuizSettings,
  weakQuestionIds?: string[],
): Question[] {
  let pool: Question[];

  switch (settings.mode) {
    case "chapter": {
      // 指定カテゴリから出題（未選択なら全問から）
      pool = settings.category
        ? getQuestionsByCategory(settings.category)
        : loadAllQuestions();
      break;
    }
    case "weak": {
      // 苦手問題から出題
      if (!weakQuestionIds || weakQuestionIds.length === 0) {
        throw new Error("苦手克服モードでは苦手問題IDの指定が必要です");
      }
      pool = weakQuestionIds
        .map((id) => getQuestionById(id))
        .filter((q): q is Question => q !== undefined);
      break;
    }
    case "exam": {
      // 全問からランダム40問
      pool = loadAllQuestions();
      return shuffleArray(pool).slice(0, EXAM_QUESTION_COUNT);
    }
    default: {
      const _exhaustive: never = settings.mode;
      throw new Error(`不明な出題モードです: ${_exhaustive}`);
    }
  }

  const shuffled = shuffleArray(pool);
  // questionCountが0以下の場合は全問出題
  const count = settings.questionCount > 0 ? settings.questionCount : shuffled.length;
  return shuffled.slice(0, count);
}

/** 回答が正解かどうかを判定する */
export function checkAnswer(question: Question, selectedIndex: number): boolean {
  return question.answerIndex === selectedIndex;
}

/** 回答結果からスコアを計算する */
export function calculateScore(results: QuestionResult[]): {
  total: number;
  correct: number;
  rate: number;
} {
  const total = results.length;
  const correct = results.filter((r) => r.isCorrect).length;
  const rate = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { total, correct, rate };
}
