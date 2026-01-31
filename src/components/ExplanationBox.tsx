"use client";

/**
 * 解説表示コンポーネント
 * 正解/不正解に応じた背景色とアイコンで解説を表示する
 */

interface ExplanationBoxProps {
  explanation: string;
  isCorrect: boolean;
}

export default function ExplanationBox({
  explanation,
  isCorrect,
}: ExplanationBoxProps) {
  return (
    <div
      className={`mt-4 rounded-lg p-4 ${
        isCorrect
          ? "bg-green-50 border border-green-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      {/* 正解/不正解メッセージ */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl" role="img" aria-label={isCorrect ? "正解" : "不正解"}>
          {isCorrect ? "○" : "×"}
        </span>
        <span
          className={`font-bold text-sm ${
            isCorrect ? "text-green-800" : "text-red-800"
          }`}
        >
          {isCorrect ? "正解！" : "不正解"}
        </span>
      </div>

      {/* 解説文 */}
      <p
        className={`text-sm leading-relaxed ${
          isCorrect ? "text-green-900" : "text-red-900"
        }`}
      >
        {explanation}
      </p>
    </div>
  );
}
