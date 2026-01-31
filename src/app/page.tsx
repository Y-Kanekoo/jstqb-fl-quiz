"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgress } from "@/lib/storage/progress";

/** モードカードの定義 */
const MODE_CARDS = [
  {
    title: "章別学習",
    description: "分野を選んで学習",
    href: "/quiz?mode=chapter",
    color: "bg-blue-500",
  },
  {
    title: "苦手克服",
    description: "間違えた問題を復習",
    href: "/quiz?mode=weak",
    color: "bg-orange-500",
  },
  {
    title: "模擬試験",
    description: "全40問の模擬試験",
    href: "/quiz?mode=exam",
    color: "bg-green-500",
  },
] as const;

export default function HomePage() {
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctRate, setCorrectRate] = useState(0);

  useEffect(() => {
    const progress = getProgress();
    const { totalAnswered: answered, totalCorrect } = progress.stats;
    setTotalAnswered(answered);
    setCorrectRate(
      answered > 0 ? Math.round((totalCorrect / answered) * 100) : 0,
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトル */}
      <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        JSTQB Foundation Level 学習アプリ
      </h1>

      {/* モードカード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {MODE_CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="block bg-white rounded-xl border border-gray-100 p-6 transition-shadow duration-200 hover:shadow-lg"
          >
            <div className={`w-10 h-10 ${card.color} rounded-lg mb-4`} />
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {card.title}
            </h2>
            <p className="text-sm text-gray-500">{card.description}</p>
          </Link>
        ))}
      </div>

      {/* 進捗サマリ */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">学習の進捗</h3>
        <div className="flex gap-8">
          <div>
            <p className="text-2xl font-bold text-gray-900">{totalAnswered}</p>
            <p className="text-xs text-gray-500">総解答数</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{correctRate}%</p>
            <p className="text-xs text-gray-500">正答率</p>
          </div>
        </div>
      </div>
    </div>
  );
}
