"use client";

import type { Question } from "@/types/quiz";
import AnswerChoices from "@/components/AnswerChoices";
import ExplanationBox from "@/components/ExplanationBox";

/**
 * クイズカードコンポーネント
 * 問題文・選択肢・解説を1つのカードにまとめて表示する
 */

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalCount: number;
  onAnswer: (index: number) => void;
  selectedIndex: number | null;
  showResult: boolean;
}

export default function QuizCard({
  question,
  currentIndex,
  totalCount,
  onAnswer,
  selectedIndex,
  showResult,
}: QuizCardProps) {
  const isCorrect = selectedIndex === question.answerIndex;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl w-full mx-auto">
      {/* 問題番号 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-blue-600">
          問 {currentIndex + 1} / {totalCount}
        </span>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          {question.category}
        </span>
      </div>

      {/* 問題文 */}
      <p className="text-gray-900 text-base leading-relaxed mb-6 whitespace-pre-wrap">
        {question.question}
      </p>

      {/* 選択肢 */}
      <AnswerChoices
        choices={[...question.choices]}
        selectedIndex={selectedIndex}
        correctIndex={question.answerIndex}
        showResult={showResult}
        onSelect={onAnswer}
      />

      {/* 解説（結果表示時のみ） */}
      {showResult && selectedIndex !== null && (
        <ExplanationBox explanation={question.explanation} isCorrect={isCorrect} />
      )}
    </div>
  );
}
