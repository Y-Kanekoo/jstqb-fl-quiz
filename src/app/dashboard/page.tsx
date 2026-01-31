"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgress } from "@/lib/storage/progress";
import type { StudyProgress, QuizCategory } from "@/types/quiz";

/** 全カテゴリ一覧 */
const ALL_CATEGORIES: QuizCategory[] = [
  "テストの基礎",
  "ソフトウェア開発ライフサイクル全体を通してのテスト",
  "静的テスト",
  "テスト分析と設計",
  "テストのマネジメント",
  "テスト支援ツール",
];

export default function DashboardPage() {
  const [progress, setProgress] = useState<StudyProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-gray-400">読み込み中...</div>
    );
  }

  const { totalAnswered, totalCorrect } = progress.stats;
  const overallRate =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-xl font-bold text-gray-900">学習ダッシュボード</h1>

      {/* 全体統計 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
          <p className="text-3xl font-bold text-gray-900">{totalAnswered}</p>
          <p className="text-xs text-gray-500 mt-1">総解答数</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
          <p className="text-3xl font-bold text-blue-600">{overallRate}%</p>
          <p className="text-xs text-gray-500 mt-1">総正答率</p>
        </div>
      </div>

      {/* 分野別正答率 */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-sm font-medium text-gray-500 mb-4">分野別正答率</h2>
        <div className="space-y-3">
          {ALL_CATEGORIES.map((cat) => {
            const stats = progress.perCategory[cat];
            const catRate =
              stats && stats.attempts > 0
                ? Math.round((stats.correct / stats.attempts) * 100)
                : 0;
            const hasData = stats && stats.attempts > 0;
            return (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 truncate mr-2">{cat}</span>
                  <span className="text-gray-500 shrink-0">
                    {hasData
                      ? `${stats.correct}/${stats.attempts} (${catRate}%)`
                      : "未学習"}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${catRate}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 直近のセッション一覧 */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-sm font-medium text-gray-500 mb-4">直近の学習セッション</h2>
        {progress.sessions.length === 0 ? (
          <p className="text-sm text-gray-400">まだ学習記録がありません</p>
        ) : (
          <div className="space-y-2">
            {progress.sessions
              .slice(-10)
              .reverse()
              .map((session) => {
                const correct = session.results.filter((r) => r.isCorrect).length;
                const total = session.results.length;
                const sessionRate =
                  total > 0 ? Math.round((correct / total) * 100) : 0;
                const modeLabel =
                  session.settings.mode === "chapter"
                    ? "章別学習"
                    : session.settings.mode === "weak"
                      ? "苦手克服"
                      : "模擬試験";
                return (
                  <div
                    key={session.id}
                    className="flex justify-between items-center text-sm py-2 border-b border-gray-50 last:border-0"
                  >
                    <div>
                      <span className="text-gray-700 font-medium">{modeLabel}</span>
                      {session.settings.category && (
                        <span className="text-gray-400 ml-2 text-xs">
                          {session.settings.category}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500">
                      {correct}/{total} ({sessionRate}%)
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* 苦手問題を復習ボタン */}
      <Link
        href="/quiz?mode=weak"
        className="block w-full text-center py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
      >
        苦手問題を復習
      </Link>
    </div>
  );
}
