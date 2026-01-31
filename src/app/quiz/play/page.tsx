"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QuizCard from "@/components/QuizCard";
import ProgressBar from "@/components/ProgressBar";
import { selectQuestions, checkAnswer } from "@/lib/quiz/engine";
import { getWeakQuestions } from "@/lib/storage/progress";
import type {
  Question,
  QuestionResult,
  QuizCategory,
  QuizMode,
  QuizSettings,
  QuizSession,
} from "@/types/quiz";

/** セッション一時保存用のlocalStorageキー */
const SESSION_KEY = "jstqb-last-session";

function QuizPlayContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = (searchParams.get("mode") ?? "chapter") as QuizMode;
  const category = searchParams.get("category") as QuizCategory | null;
  const countParam = searchParams.get("count");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startedAt] = useState(() => new Date().toISOString());

  // 問題を初期化
  useEffect(() => {
    const settings: QuizSettings = {
      mode,
      category: category ?? undefined,
      questionCount: countParam ? Number(countParam) : 40,
    };

    let weakIds: string[] | undefined;
    if (mode === "weak") {
      weakIds = getWeakQuestions();
      if (weakIds.length === 0) {
        // 苦手問題がない場合はホームに戻す
        router.replace("/");
        return;
      }
      settings.questionCount = weakIds.length;
    }

    try {
      const selected = selectQuestions(settings, weakIds);
      setQuestions(selected);
    } catch {
      // 問題の読み込みに失敗した場合
      router.replace("/");
    }
  }, [mode, category, countParam, router]);

  /** 回答選択時の処理 */
  const handleAnswer = useCallback(
    (index: number) => {
      if (showResult || questions.length === 0) return;

      const question = questions[currentIndex];
      const isCorrect = checkAnswer(question, index);
      const result: QuestionResult = {
        questionId: question.id,
        selectedIndex: index,
        isCorrect,
        answeredAt: new Date().toISOString(),
      };

      setSelectedIndex(index);
      setShowResult(true);
      setResults((prev) => [...prev, result]);
    },
    [showResult, questions, currentIndex],
  );

  /** 「次へ」ボタン */
  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= questions.length) {
      // 全問終了 → セッションデータをlocalStorageに一時保存して結果画面へ
      const session: QuizSession = {
        id: crypto.randomUUID(),
        settings: {
          mode,
          category: category ?? undefined,
          questionCount: questions.length,
        },
        results: [...results],
        startedAt,
        finishedAt: new Date().toISOString(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      router.push("/quiz/result");
      return;
    }

    setCurrentIndex(nextIndex);
    setSelectedIndex(null);
    setShowResult(false);
  }, [currentIndex, questions, results, mode, category, startedAt, router]);

  // 問題が読み込まれるまでローディング表示
  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-gray-400">
        問題を準備中...
      </div>
    );
  }

  const correctCount = results.filter((r) => r.isCorrect).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* 進捗バー */}
      <ProgressBar
        current={currentIndex + (showResult ? 1 : 0)}
        total={questions.length}
        correctCount={correctCount}
      />

      {/* クイズカード */}
      <QuizCard
        question={questions[currentIndex]}
        currentIndex={currentIndex}
        totalCount={questions.length}
        onAnswer={handleAnswer}
        selectedIndex={selectedIndex}
        showResult={showResult}
      />

      {/* 次へボタン（結果表示後のみ） */}
      {showResult && (
        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={handleNext}
          >
            {currentIndex + 1 >= questions.length ? "結果を見る" : "次へ"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function QuizPlayPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-8 text-gray-400">読み込み中...</div>
      }
    >
      <QuizPlayContent />
    </Suspense>
  );
}
