"use client";

/**
 * 進捗バーコンポーネント
 * 現在の進捗と正解数を表示する
 */

interface ProgressBarProps {
  current: number;
  total: number;
  correctCount: number;
}

export default function ProgressBar({
  current,
  total,
  correctCount,
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full">
      {/* テキスト情報 */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">
          進捗: {current} / {total}
        </span>
        <span className="text-xs font-medium text-blue-600">
          {total}問中{correctCount}問正解
        </span>
      </div>

      {/* プログレスバー */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
