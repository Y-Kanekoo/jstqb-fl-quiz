"use client";

import { useState, useMemo } from "react";
import {
  glossaryTerms,
  GLOSSARY_CHAPTERS,
  type GlossaryChapter,
} from "@/data/glossary";

export default function GlossaryPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedChapter, setSelectedChapter] =
    useState<GlossaryChapter | null>(null);

  /** フィルタ済みの用語リスト */
  const filteredTerms = useMemo(() => {
    const q = searchText.toLowerCase().trim();
    return glossaryTerms.filter((t) => {
      // 章フィルタ
      if (selectedChapter && t.chapter !== selectedChapter) return false;
      // テキスト検索
      if (
        q &&
        !t.term.toLowerCase().includes(q) &&
        !t.termEn.toLowerCase().includes(q) &&
        !t.definition.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [searchText, selectedChapter]);

  /** 混同しやすい用語をハイライトするための全termセット */
  const confusedTermSet = useMemo(() => {
    const set = new Set<string>();
    for (const t of glossaryTerms) {
      if (t.confusedWith && t.confusedWith.length > 0) {
        set.add(t.term);
        for (const c of t.confusedWith) set.add(c);
      }
    }
    return set;
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">用語集</h1>

      {/* 検索ボックス */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="用語を検索（日本語・英語）"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* 章フィルタ */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
            selectedChapter === null
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
          }`}
          onClick={() => setSelectedChapter(null)}
        >
          すべて
        </button>
        {GLOSSARY_CHAPTERS.map((ch) => (
          <button
            key={ch}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              selectedChapter === ch
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
            }`}
            onClick={() => setSelectedChapter(ch)}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* 件数表示 */}
      <p className="text-sm text-gray-500 mb-4">
        {filteredTerms.length}件の用語
      </p>

      {/* 用語カード一覧 */}
      <div className="space-y-4">
        {filteredTerms.map((t) => (
          <div
            key={t.term}
            className="bg-white rounded-xl border border-gray-100 p-5 transition-shadow duration-200 hover:shadow-lg"
          >
            <div className="flex flex-wrap items-baseline gap-2 mb-2">
              <h2 className="text-lg font-bold text-gray-900">{t.term}</h2>
              <span className="text-sm text-gray-400">{t.termEn}</span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t.definition}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                {t.chapter}
              </span>

              {t.confusedWith && t.confusedWith.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700">
                  混同注意: {t.confusedWith.join("、")}
                </span>
              )}

              {confusedTermSet.has(t.term) && !t.confusedWith && (
                <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700">
                  混同されやすい用語
                </span>
              )}
            </div>
          </div>
        ))}

        {filteredTerms.length === 0 && (
          <p className="text-gray-400 text-center py-8">
            該当する用語が見つかりませんでした
          </p>
        )}
      </div>
    </div>
  );
}
