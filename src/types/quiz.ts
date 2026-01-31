/**
 * JSTQB FL学習アプリ - クイズ関連の型定義
 */

/** JSTQBシラバスの章に対応するカテゴリ */
export type QuizCategory =
  | "テストの基礎"
  | "ソフトウェア開発ライフサイクル全体を通してのテスト"
  | "静的テスト"
  | "テスト分析と設計"
  | "テストのマネジメント"
  | "テスト支援ツール";

/** クイズの出題モード */
export type QuizMode = "chapter" | "weak" | "exam";

/** 問題データ */
export interface Question {
  /** 問題の一意識別子 */
  id: string;
  /** 所属カテゴリ */
  category: QuizCategory;
  /** 問題文 */
  question: string;
  /** 選択肢（4つ） */
  choices: [string, string, string, string];
  /** 正解のインデックス（0-3） */
  answerIndex: 0 | 1 | 2 | 3;
  /** 解説 */
  explanation: string;
  /** タグ（検索・分類用） */
  tags: string[];
}

/** クイズの設定 */
export interface QuizSettings {
  /** 出題モード */
  mode: QuizMode;
  /** 対象カテゴリ（章別モード時に使用） */
  category?: QuizCategory;
  /** 出題数 */
  questionCount: number;
}

/** 1問ごとの回答結果 */
export interface QuestionResult {
  /** 問題ID */
  questionId: string;
  /** 選択した選択肢のインデックス */
  selectedIndex: number;
  /** 正解かどうか */
  isCorrect: boolean;
  /** 回答日時（ISO 8601形式） */
  answeredAt: string;
}

/** クイズセッション（1回分の学習記録） */
export interface QuizSession {
  /** セッションの一意識別子 */
  id: string;
  /** クイズ設定 */
  settings: QuizSettings;
  /** 回答結果の配列 */
  results: QuestionResult[];
  /** 開始日時（ISO 8601形式） */
  startedAt: string;
  /** 終了日時（ISO 8601形式、未完了の場合はundefined） */
  finishedAt?: string;
}

/** 問題ごとの統計情報 */
export interface QuestionStats {
  /** 回答回数 */
  attempts: number;
  /** 正解回数 */
  correct: number;
  /** 最後の回答が正解だったか */
  lastResult: boolean;
  /** 最後に回答した日時（ISO 8601形式） */
  lastAnsweredAt: string;
}

/** カテゴリごとの統計情報 */
export interface CategoryStats {
  /** 回答回数 */
  attempts: number;
  /** 正解回数 */
  correct: number;
}

/** 学習進捗の全体データ */
export interface StudyProgress {
  /** 全体統計 */
  stats: {
    /** 総回答数 */
    totalAnswered: number;
    /** 総正解数 */
    totalCorrect: number;
    /** 最後に学習した日時（ISO 8601形式） */
    lastStudyAt: string;
  };
  /** 問題ごとの統計（キー: 問題ID） */
  perQuestion: Record<string, QuestionStats>;
  /** カテゴリごとの統計 */
  perCategory: Record<QuizCategory, CategoryStats>;
  /** セッション履歴 */
  sessions: QuizSession[];
}
