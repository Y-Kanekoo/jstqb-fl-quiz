"use client";

import type { QuizCategory } from "@/types/quiz";

/**
 * カテゴリ選択コンポーネント
 * JSTQBシラバスの6章に対応するカテゴリをボタンで表示する
 */

interface CategorySelectorProps {
  selectedCategory: QuizCategory | null;
  onSelect: (category: QuizCategory | null) => void;
}

/** JSTQBシラバスの章とカテゴリの対応 */
const CATEGORIES: { label: string; value: QuizCategory }[] = [
  { label: "第1章 テストの基礎", value: "テストの基礎" },
  {
    label: "第2章 ライフサイクル全体のテスト",
    value: "ソフトウェア開発ライフサイクル全体を通してのテスト",
  },
  { label: "第3章 静的テスト", value: "静的テスト" },
  { label: "第4章 テスト分析と設計", value: "テスト分析と設計" },
  { label: "第5章 テストのマネジメント", value: "テストのマネジメント" },
  { label: "第6章 テスト支援ツール", value: "テスト支援ツール" },
];

export default function CategorySelector({ selectedCategory, onSelect }: CategorySelectorProps) {
  const getButtonStyle = (isSelected: boolean): string => {
    const base = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border";
    if (isSelected) {
      return `${base} bg-blue-600 text-white border-blue-600`;
    }
    return `${base} bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* 全分野ボタン */}
      <button className={getButtonStyle(selectedCategory === null)} onClick={() => onSelect(null)}>
        全分野
      </button>

      {/* 各カテゴリボタン */}
      {CATEGORIES.map(({ label, value }) => (
        <button
          key={value}
          className={getButtonStyle(selectedCategory === value)}
          onClick={() => onSelect(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
