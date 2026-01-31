"use client";

/**
 * 選択肢ボタンコンポーネント
 * 4つの選択肢を表示し、回答結果に応じて色分けする
 */

interface AnswerChoicesProps {
  choices: string[];
  selectedIndex: number | null;
  correctIndex: number;
  showResult: boolean;
  onSelect: (index: number) => void;
}

/** 選択肢のラベル（A, B, C, D） */
const CHOICE_LABELS = ["A", "B", "C", "D"];

export default function AnswerChoices({
  choices,
  selectedIndex,
  correctIndex,
  showResult,
  onSelect,
}: AnswerChoicesProps) {
  /** 各選択肢のスタイルを決定する */
  const getButtonStyle = (index: number): string => {
    const base =
      "w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 flex items-start gap-3";

    if (showResult && selectedIndex !== null) {
      // 正解の選択肢: 緑背景
      if (index === correctIndex) {
        return `${base} border-green-500 bg-green-50 text-green-900`;
      }
      // 選択した不正解: 赤背景
      if (index === selectedIndex && selectedIndex !== correctIndex) {
        return `${base} border-red-500 bg-red-50 text-red-900`;
      }
      // その他（結果表示中の未選択・不正解）
      return `${base} border-gray-200 bg-gray-50 text-gray-400`;
    }

    // 未回答時: 選択済みならハイライト
    if (index === selectedIndex) {
      return `${base} border-blue-600 bg-blue-50 text-blue-900`;
    }

    // 未回答・未選択: ホバーエフェクト付き
    return `${base} border-gray-200 bg-white text-gray-800 hover:border-blue-400 hover:bg-blue-50 cursor-pointer`;
  };

  return (
    <div className="flex flex-col gap-3">
      {choices.map((choice, index) => (
        <button
          key={index}
          className={getButtonStyle(index)}
          onClick={() => onSelect(index)}
          disabled={showResult}
        >
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-sm font-bold shrink-0 mt-0.5">
            {CHOICE_LABELS[index]}
          </span>
          <span className="text-sm leading-relaxed">{choice}</span>
        </button>
      ))}
    </div>
  );
}
