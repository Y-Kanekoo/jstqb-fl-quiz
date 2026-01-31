/**
 * 問題データの読み込み・検索ユーティリティ
 */

import type { Question, QuizCategory } from "@/types/quiz";
import questionsData from "@/data/questions/jstqb-fl.json";

/** 全問題を返す */
export function loadAllQuestions(): Question[] {
  return questionsData as Question[];
}

/** 指定カテゴリの問題を返す */
export function getQuestionsByCategory(category: QuizCategory): Question[] {
  return loadAllQuestions().filter((q) => q.category === category);
}

/** IDで問題を検索する */
export function getQuestionById(id: string): Question | undefined {
  return loadAllQuestions().find((q) => q.id === id);
}
