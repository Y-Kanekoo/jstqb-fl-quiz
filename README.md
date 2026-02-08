# JSTQB FL 学習アプリ

JSTQB Foundation Level（ソフトウェアテスト技術者資格）試験対策のためのクイズアプリケーション。

## 概要

- **問題数**: 400問（JSTQB FLシラバスV4.0準拠）
- **用語集**: 68語収録
- **学習モード**: 章別学習・苦手克服・模擬試験の3モード
- **進捗管理**: localStorageによる学習履歴の保存

## デモ

https://github.com/Y-Kanekoo/jstqb-fl-quiz

## 技術スタック

| カテゴリ       | 技術                    |
| -------------- | ----------------------- |
| フレームワーク | Next.js 16 (App Router) |
| 言語           | TypeScript 5.9          |
| スタイリング   | Tailwind CSS v4         |
| リンター       | ESLint 9 + Prettier     |
| Git Hooks      | husky + lint-staged     |
| データ永続化   | localStorage            |

## 機能一覧

### クイズ機能

| 機能               | 説明                               |
| ------------------ | ---------------------------------- |
| 章別学習           | 6章から選択して学習                |
| 苦手克服           | 過去に間違えた問題を優先出題       |
| 模擬試験           | 全40問のランダム出題（本試験形式） |
| 選択肢シャッフル   | 毎回選択肢の順序をランダム化       |
| 即時フィードバック | 回答後すぐに正誤と解説を表示       |

### 進捗管理

| 機能           | 説明                         |
| -------------- | ---------------------------- |
| 総解答数       | 累計の解答回数を記録         |
| 正答率         | 全体および章別の正答率を計算 |
| 苦手問題       | 正答率の低い問題を自動抽出   |
| セッション履歴 | 過去の学習セッションを保存   |

### 用語集

| 機能         | 説明                             |
| ------------ | -------------------------------- |
| 68語収録     | JSTQB FLシラバスV4.0の主要用語   |
| 章別フィルタ | 6章ごとに絞り込み                |
| 検索         | 日本語・英語・定義文で検索       |
| 混同用語     | 間違いやすい用語ペアをハイライト |

## ディレクトリ構成

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 共通レイアウト
│   ├── page.tsx             # ホームページ
│   ├── dashboard/           # 学習進捗ページ
│   ├── glossary/            # 用語集ページ
│   └── quiz/
│       ├── page.tsx         # クイズ設定
│       ├── play/page.tsx    # クイズプレイ
│       └── result/page.tsx  # 結果画面
├── components/              # UIコンポーネント
│   ├── CategorySelector.tsx # 章選択
│   ├── ExplanationBox.tsx   # 解説表示
│   ├── ProgressBar.tsx      # 進捗バー
│   └── QuizCard.tsx         # 問題カード
├── data/
│   ├── glossary.ts          # 用語集データ（68語）
│   └── questions/
│       └── jstqb-fl.json    # 問題データ（400問）
├── lib/
│   ├── quiz/
│   │   ├── engine.ts        # クイズエンジン
│   │   └── loader.ts        # 問題ローダー
│   └── storage/
│       └── progress.ts      # 進捗管理
└── types/
    └── quiz.ts              # 型定義
```

## セットアップ

### 必要環境

- Node.js 18+
- npm 9+

### インストール

```bash
git clone https://github.com/Y-Kanekoo/jstqb-fl-quiz.git
cd jstqb-fl-quiz
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセス

### ビルド

```bash
npm run build
npm run start
```

## npm スクリプト

| コマンド               | 説明                       |
| ---------------------- | -------------------------- |
| `npm run dev`          | 開発サーバー起動           |
| `npm run build`        | プロダクションビルド       |
| `npm run start`        | プロダクションサーバー起動 |
| `npm run lint`         | ESLintでコードチェック     |
| `npm run lint:fix`     | ESLintで自動修正           |
| `npm run format`       | Prettierでフォーマット     |
| `npm run format:check` | フォーマットチェック       |
| `npm run typecheck`    | TypeScript型チェック       |

## 問題データ構造

### 問題スキーマ（jstqb-fl.json）

```typescript
interface Question {
  id: string; // "q-0001" 形式
  category: string; // 章名（6章のいずれか）
  question: string; // 問題文
  choices: string[]; // 選択肢（4択）
  answerIndex: number; // 正解インデックス（0-3）
  explanation: string; // 解説（3-5文）
  tags: string[]; // ["K2", "テストの目的"] 形式
}
```

### カテゴリ（章）一覧

| 章番号 | カテゴリ名                                         | 問題数 |
| ------ | -------------------------------------------------- | ------ |
| 1      | テストの基礎                                       | 69問   |
| 2      | ソフトウェア開発ライフサイクル全体を通してのテスト | 67問   |
| 3      | 静的テスト                                         | 63問   |
| 4      | テスト分析と設計                                   | 71問   |
| 5      | テストのマネジメント                               | 68問   |
| 6      | テスト支援ツール                                   | 62問   |

### Kレベル分布

| レベル | 説明               | 問題数 |
| ------ | ------------------ | ------ |
| K1     | 記憶（用語・定義） | 23問   |
| K2     | 理解（説明・比較） | 347問  |
| K3     | 適用（技法の適用） | 30問   |

## 用語集データ構造

### 用語スキーマ（glossary.ts）

```typescript
interface GlossaryTerm {
  term: string; // 日本語用語名
  termEn: string; // 英語用語名
  definition: string; // 定義（2-3文）
  chapter: string; // 関連する章名
  confusedWith?: string[]; // 混同しやすい用語
}
```

## 品質管理

### 問題データの品質基準

本プロジェクトでは以下の品質基準で問題データを管理しています。

| 基準         | 内容                                 | 状態 |
| ------------ | ------------------------------------ | ---- |
| 重複チェック | 2-gram Jaccard類似度 < 0.84          | ✅   |
| 選択肢長さ   | 正解が他平均の1.7倍未満              | ✅   |
| 断定表現     | 「必ず」「絶対」等の不適切使用なし   | ✅   |
| 用語統一     | コンポーネントテスト、影響分析に統一 | ✅   |
| シラバス準拠 | FL範囲内のトピックのみ               | ✅   |
| JSON整合性   | 必須フィールド完備、4択、範囲内      | ✅   |

### 品質チェックの実行

```bash
# Codex CLIによる品質分析（要OPENAI_API_KEY）
codex exec --full-auto --sandbox read-only --cd "$(pwd)" "問題データの品質チェック"
```

## 開発履歴

### コミット履歴

| コミット | 内容                                                            |
| -------- | --------------------------------------------------------------- |
| 638c1ca  | 初期コミット                                                    |
| 70cc9c1  | JSTQB FL学習アプリの全機能を実装（100問）                       |
| 88673fa  | 問題数を100問から400問に拡充                                    |
| debf270  | 400問の品質改善: 重複解消・選択肢再設計・用語統一・シラバス準拠 |
| 6f398df  | 問題品質改善・用語集ページ追加・Kレベルタグ付与                 |
| 2fdc752  | 最終品質チェック指摘事項の修正                                  |
| 51b78aa  | 開発環境セットアップ（ESLint/Prettier/husky）                   |

### 品質改善の経緯

#### Phase 1: 初期実装（100問）

- Next.js 16 + TypeScript + Tailwind CSS v4でアプリ構築
- JSTQB FLシラバスV4.0に基づく100問を作成
- 3つの学習モード実装

#### Phase 2: 問題拡充（400問）

- 競合アプリ「テス友」の400問以上に対抗
- 章ごとにバランスよく拡充
- 詳細な解説（3-5文）を付与

#### Phase 3: 品質改善

Codex CLIによる定量分析で以下を検出・修正:

| 問題           | 検出数 | 対応               |
| -------------- | ------ | ------------------ |
| 完全重複ペア   | 2組    | 改題               |
| 高類似ペア     | 49組   | 上位7組を改題      |
| 選択肢長さ偏り | 56問   | 誤答選択肢を具体化 |
| 断定表現       | 19件   | 自然な表現に修正   |
| 用語不統一     | 5箇所  | 統一               |
| シラバス範囲外 | 3問    | FL範囲内に修正     |

#### Phase 4: 機能追加

- 用語集ページ追加（68語）
- Kレベルタグ付与（400問全て）
- 開発環境整備（ESLint/Prettier/husky）

## Pre-commit フック

コミット時に以下が自動実行されます:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

## コントリビューション

### ブランチ戦略

- `main`: 本番環境（直接push禁止）
- `develop`: 開発統合
- `feature/*`: 新機能
- `fix/*`: バグ修正

### コミットメッセージ規約

```
[種別] 変更内容の要約

種別: feat, fix, refactor, docs, test, chore
例: [feat] ユーザー認証機能を追加
```

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照

## 作者

Y-Kanekoo

## 参考資料

- [JSTQB FLシラバス V4.0](https://jstqb.jp/syllabus.html)
- [ISTQB Glossary](https://glossary.istqb.org/)
- [Next.js Documentation](https://nextjs.org/docs)
