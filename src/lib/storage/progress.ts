"use client";

import type { StudyProgress, QuizSession, QuizCategory, CategoryStats } from "@/types/quiz";
import { getQuestionById } from "@/lib/quiz/loader";

/** localStorageのキー */
const STORAGE_KEY = "jstqb-progress";

/** 全カテゴリの一覧 */
const ALL_CATEGORIES: QuizCategory[] = [
  "テストの基礎",
  "ソフトウェア開発ライフサイクル全体を通してのテスト",
  "静的テスト",
  "テスト分析と設計",
  "テストのマネジメント",
  "テスト支援ツール",
];

/** カテゴリ統計の初期値を生成 */
function createEmptyPerCategory(): Record<QuizCategory, CategoryStats> {
  const record = {} as Record<QuizCategory, CategoryStats>;
  for (const cat of ALL_CATEGORIES) {
    record[cat] = { attempts: 0, correct: 0 };
  }
  return record;
}

/** 学習進捗の初期値 */
function createInitialProgress(): StudyProgress {
  return {
    stats: {
      totalAnswered: 0,
      totalCorrect: 0,
      lastStudyAt: "",
    },
    perQuestion: {},
    perCategory: createEmptyPerCategory(),
    sessions: [],
  };
}

/**
 * localStorageから学習記録を取得する。
 * データが存在しない場合やパース失敗時は初期値を返す。
 */
export function getProgress(): StudyProgress {
  if (typeof window === "undefined") {
    return createInitialProgress();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createInitialProgress();
    }
    return JSON.parse(raw) as StudyProgress;
  } catch {
    return createInitialProgress();
  }
}

/**
 * localStorageに学習記録を保存する。
 */
export function saveProgress(progress: StudyProgress): void {
  if (typeof window === "undefined") return;
  // セッション数が増えすぎないよう上限100件に制限
  if (progress.sessions.length > 100) {
    progress.sessions = progress.sessions.slice(-100);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // 容量超過時は古いセッションを削って再試行
    progress.sessions = progress.sessions.slice(-20);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // それでも失敗した場合は無視
    }
  }
}

/**
 * セッション結果を記録し、stats / perQuestion / perCategory を更新する。
 */
export function recordQuizResult(session: QuizSession): void {
  const progress = getProgress();

  // セッション履歴に追加
  progress.sessions.push(session);

  // 各回答を集計
  for (const result of session.results) {
    // --- 全体統計 ---
    progress.stats.totalAnswered += 1;
    if (result.isCorrect) {
      progress.stats.totalCorrect += 1;
    }

    // --- 問題ごとの統計 ---
    const qStats = progress.perQuestion[result.questionId] ?? {
      attempts: 0,
      correct: 0,
      lastResult: false,
      lastAnsweredAt: "",
    };
    qStats.attempts += 1;
    if (result.isCorrect) {
      qStats.correct += 1;
    }
    qStats.lastResult = result.isCorrect;
    qStats.lastAnsweredAt = result.answeredAt;
    progress.perQuestion[result.questionId] = qStats;

    // --- カテゴリごとの統計（問題IDからカテゴリを取得して全モードで更新） ---
    const question = getQuestionById(result.questionId);
    if (question) {
      const cat = question.category;
      const cStats = progress.perCategory[cat] ?? { attempts: 0, correct: 0 };
      cStats.attempts += 1;
      if (result.isCorrect) {
        cStats.correct += 1;
      }
      progress.perCategory[cat] = cStats;
    }
  }

  // 最終学習日時を更新
  progress.stats.lastStudyAt = session.finishedAt ?? session.startedAt;

  saveProgress(progress);
}

/**
 * 正答率が閾値未満の問題IDを返す。
 * @param threshold - 正答率の閾値（0〜100）。デフォルトは50。
 */
export function getWeakQuestions(threshold = 50): string[] {
  const progress = getProgress();
  const weakIds: string[] = [];

  for (const [questionId, stats] of Object.entries(progress.perQuestion)) {
    if (stats.attempts === 0) continue;
    const rate = (stats.correct / stats.attempts) * 100;
    if (rate < threshold) {
      weakIds.push(questionId);
    }
  }

  return weakIds;
}

/**
 * 全データをリセットする。
 */
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
