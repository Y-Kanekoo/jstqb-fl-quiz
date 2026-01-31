"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CategorySelector from "@/components/CategorySelector";
import type { QuizCategory } from "@/types/quiz";

/** 出題数の選択肢 */
const QUESTION_COUNTS = [10, 20, 0] as const;

function QuizSettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") ?? "chapter";

  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);

  /** 開始ボタン押下 */
  const handleStart = () => {
    const params = new URLSearchParams();
    params.set("mode", mode);

    if (mode === "chapter") {
      if (selectedCategory) {
        params.set("category", selectedCategory);
      }
      params.set("count", String(questionCount));
    }

    router.push(`/quiz/play?${params.toString()}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-6">クイズ設定</h1>

      {mode === "chapter" && (
        <div className="space-y-6">
          {/* カテゴリ選択 */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">分野を選択</h2>
            <CategorySelector
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* 出題数選択 */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">出題数</h2>
            <div className="flex gap-3">
              {QUESTION_COUNTS.map((count) => (
                <button
                  key={count}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    questionCount === count
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                  }`}
                  onClick={() => setQuestionCount(count)}
                >
                  {count === 0 ? "全問" : `${count}問`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === "weak" && (
        <p className="text-gray-700 bg-orange-50 border border-orange-200 rounded-lg p-4">
          苦手な問題から出題します。正答率が低い問題を重点的に復習しましょう。
        </p>
      )}

      {mode === "exam" && (
        <p className="text-gray-700 bg-green-50 border border-green-200 rounded-lg p-4">
          全分野から40問出題します。本番を想定して取り組みましょう。
        </p>
      )}

      {/* 開始ボタン */}
      <button
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        onClick={handleStart}
      >
        開始
      </button>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-8 text-gray-400">読み込み中...</div>
      }
    >
      <QuizSettingsContent />
    </Suspense>
  );
}
