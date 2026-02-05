"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { calculateScore } from "@/lib/quiz/engine";
import { recordQuizResult } from "@/lib/storage/progress";
import { getQuestionById } from "@/lib/quiz/loader";
import type { QuizSession, QuizCategory } from "@/types/quiz";

/** セッション一時保存用のlocalStorageキー */
const SESSION_KEY = "jstqb-last-session";

export default function QuizResultPage() {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [recorded, setRecorded] = useState(false);

  // セッションデータを取得
  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return;

    try {
      const data = JSON.parse(raw) as QuizSession;
      setSession(data);
    } catch {
      // パース失敗時は何もしない
    }
  }, []);

  // 結果を永続化（1度だけ）
  useEffect(() => {
    if (session && !recorded) {
      recordQuizResult(session);
      setRecorded(true);
    }
  }, [session, recorded]);

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-gray-400">結果データが見つかりません</div>
    );
  }

  const { total, correct, rate } = calculateScore(session.results);

  // 分野別正答率を集計
  const categoryMap = new Map<QuizCategory, { correct: number; total: number }>();
  for (const result of session.results) {
    const question = getQuestionById(result.questionId);
    if (!question) continue;
    const cat = question.category;
    const entry = categoryMap.get(cat) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (result.isCorrect) entry.correct += 1;
    categoryMap.set(cat, entry);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* 正答率（大きく表示） */}
      <div className="text-center">
        <p className="text-6xl font-bold text-blue-600">{rate}%</p>
        <p className="text-gray-500 mt-2">
          {total}問中 {correct}問正解
        </p>
      </div>

      {/* 分野別正答率 */}
      {categoryMap.size > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-4">分野別正答率</h2>
          <div className="space-y-3">
            {Array.from(categoryMap.entries()).map(([cat, stats]) => {
              const catRate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 truncate mr-2">{cat}</span>
                    <span className="text-gray-500 shrink-0">
                      {stats.correct}/{stats.total} ({catRate}%)
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
      )}

      {/* ボタン */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="flex-1 text-center py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          ホームに戻る
        </Link>
        <Link
          href={`/quiz?mode=${session.settings.mode}`}
          className="flex-1 text-center py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          もう一度
        </Link>
      </div>
    </div>
  );
}
