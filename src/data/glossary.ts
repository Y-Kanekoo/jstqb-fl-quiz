/** 用語集の章名 */
export const GLOSSARY_CHAPTERS = [
  "テストの基礎",
  "ソフトウェア開発ライフサイクル全体を通してのテスト",
  "静的テスト",
  "テスト分析と設計",
  "テストのマネジメント",
  "テスト支援ツール",
] as const;

export type GlossaryChapter = (typeof GLOSSARY_CHAPTERS)[number];

/** 用語の型定義 */
export interface GlossaryTerm {
  /** 日本語用語名 */
  term: string;
  /** 英語用語名 */
  termEn: string;
  /** 定義（2-3文） */
  definition: string;
  /** 関連する章名 */
  chapter: GlossaryChapter;
  /** 混同しやすい用語（オプション） */
  confusedWith?: string[];
}

/** JSTQB FLシラバスV4.0 主要用語集 */
export const glossaryTerms: GlossaryTerm[] = [
  // ── テストの基礎 ──
  {
    term: "テスト",
    termEn: "Testing",
    definition:
      "ソフトウェアが要件を満たすかを評価し、欠陥を発見するための活動全般。テスト実行だけでなく、計画・分析・設計・報告などを含む包括的なプロセスである。",
    chapter: "テストの基礎",
  },
  {
    term: "エラー",
    termEn: "Error",
    definition:
      "人間が犯す誤り（間違い）のこと。コードや文書に欠陥を作り込む原因となる。「ミステイク」とも呼ばれる。",
    chapter: "テストの基礎",
    confusedWith: ["欠陥", "故障"],
  },
  {
    term: "欠陥",
    termEn: "Defect",
    definition:
      "エラーによってコードや文書に作り込まれた不備。バグ、フォールトとも呼ばれる。欠陥が実行されると故障を引き起こす可能性がある。",
    chapter: "テストの基礎",
    confusedWith: ["エラー", "故障"],
  },
  {
    term: "故障",
    termEn: "Failure",
    definition:
      "コンポーネントやシステムが期待される結果を提供しない事象。欠陥が原因で発生するが、環境条件など欠陥以外が原因の場合もある。",
    chapter: "テストの基礎",
    confusedWith: ["エラー", "欠陥"],
  },
  {
    term: "根本原因",
    termEn: "Root Cause",
    definition:
      "欠陥を作り込んだ根本的な理由。根本原因を特定し対処することで、同種の欠陥の再発を防止できる。",
    chapter: "テストの基礎",
  },
  {
    term: "品質保証",
    termEn: "Quality Assurance (QA)",
    definition:
      "品質要求を満たすことの確信を与えるために行う、体系的な活動全般。プロセスの遵守を重視し、テストは品質保証の一部である。",
    chapter: "テストの基礎",
    confusedWith: ["品質管理", "テスト"],
  },
  {
    term: "品質管理",
    termEn: "Quality Control (QC)",
    definition:
      "品質要求を満たすための運用技法や活動。テストは品質管理の一形態であり、成果物の品質を直接確認する。",
    chapter: "テストの基礎",
    confusedWith: ["品質保証"],
  },
  {
    term: "テストベース",
    termEn: "Test Basis",
    definition:
      "テスト分析・設計の基礎となるドキュメントや情報源。要件仕様書、設計書、ユーザーストーリーなどが含まれる。",
    chapter: "テストの基礎",
    confusedWith: ["テストウェア", "テストオラクル"],
  },
  {
    term: "テストオラクル",
    termEn: "Test Oracle",
    definition:
      "テスト対象の期待結果を決定するための情報源。仕様書、既存システム、ユーザーの知識などがテストオラクルとなり得る。",
    chapter: "テストの基礎",
    confusedWith: ["テストベース"],
  },
  {
    term: "テストウェア",
    termEn: "Testware",
    definition:
      "テストプロセスで作成される成果物の総称。テスト計画書、テストケース、テストデータ、テストスクリプトなどを含む。",
    chapter: "テストの基礎",
    confusedWith: ["テストベース"],
  },
  {
    term: "テスト条件",
    termEn: "Test Condition",
    definition:
      "テストベースから識別される、テストによって検証可能な項目やイベント。テストケースを導出するための基盤となる。",
    chapter: "テストの基礎",
  },
  {
    term: "テストケース",
    termEn: "Test Case",
    definition:
      "事前条件、入力値、期待結果、事後条件を含むテストの実行単位。テスト条件を検証するために設計される。",
    chapter: "テストの基礎",
  },
  {
    term: "検証",
    termEn: "Verification",
    definition:
      "作業成果物が仕様や条件を満たしているかを確認するプロセス。「正しく構築しているか」を問う活動である。",
    chapter: "テストの基礎",
    confusedWith: ["妥当性確認"],
  },
  {
    term: "妥当性確認",
    termEn: "Validation",
    definition:
      "コンポーネントやシステムがユーザーの真のニーズを満たすかを確認するプロセス。「正しいものを構築しているか」を問う活動である。",
    chapter: "テストの基礎",
    confusedWith: ["検証"],
  },
  {
    term: "テストプロセス",
    termEn: "Test Process",
    definition:
      "テスト計画、テストモニタリングとコントロール、テスト分析、テスト設計、テスト実装、テスト実行、テスト完了の活動群から構成される。組織やプロジェクトの状況に応じてカスタマイズされる。",
    chapter: "テストの基礎",
  },
  {
    term: "トレーサビリティ",
    termEn: "Traceability",
    definition:
      "テストベースの要素とテストウェアの要素を対応づけること。変更の影響分析やテストカバレッジの評価に役立つ。",
    chapter: "テストの基礎",
  },
  // ── ソフトウェア開発ライフサイクル全体を通してのテスト ──
  {
    term: "コンポーネントテスト",
    termEn: "Component Testing",
    definition:
      "個々のソフトウェアコンポーネントを単独でテストするレベル。ユニットテスト、モジュールテストとも呼ばれる。開発者が実施することが多い。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["コンポーネント統合テスト", "統合テスト"],
  },
  {
    term: "コンポーネント統合テスト",
    termEn: "Component Integration Testing",
    definition:
      "コンポーネント間のインタフェースや相互作用をテストするレベル。コンポーネントテストの後に実施し、モジュール間の連携を確認する。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["コンポーネントテスト", "システム統合テスト"],
  },
  {
    term: "統合テスト",
    termEn: "Integration Testing",
    definition:
      "コンポーネントやシステム間のインタフェースと相互作用を検証するテストレベル。コンポーネント統合テストとシステム統合テストがある。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["コンポーネントテスト", "システムテスト"],
  },
  {
    term: "システムテスト",
    termEn: "System Testing",
    definition:
      "システム全体の振る舞いと能力をテストするレベル。機能要件・非機能要件の両方を検証し、独立したテストチームが実施することが多い。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["統合テスト", "受入テスト"],
  },
  {
    term: "システム統合テスト",
    termEn: "System Integration Testing",
    definition:
      "システム間、またはシステムと外部サービス間のインタフェースや相互作用をテストするレベル。システムテストの後に実施される。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["コンポーネント統合テスト", "システムテスト"],
  },
  {
    term: "受入テスト",
    termEn: "Acceptance Testing",
    definition:
      "システムがユーザーのニーズや要件を満たすかを確認するテストレベル。ユーザー受入テスト、運用受入テスト、契約受入テスト、規制受入テストなどがある。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["システムテスト"],
  },
  {
    term: "機能テスト",
    termEn: "Functional Testing",
    definition:
      "システムが「何をするか」を検証するテスト。機能要件に基づき、システムの機能的な正確性や完全性を確認する。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["非機能テスト"],
  },
  {
    term: "非機能テスト",
    termEn: "Non-functional Testing",
    definition:
      "システムが「どのように動作するか」を検証するテスト。パフォーマンス、ユーザビリティ、セキュリティ、信頼性などの品質特性を対象とする。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["機能テスト"],
  },
  {
    term: "ブラックボックステスト",
    termEn: "Black-box Testing",
    definition:
      "内部構造を考慮せず、仕様に基づいてテストケースを導出する技法の総称。すべてのテストレベルで適用可能であり、機能テストに多く使われる。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["ホワイトボックステスト"],
  },
  {
    term: "ホワイトボックステスト",
    termEn: "White-box Testing",
    definition:
      "コードの内部構造に基づいてテストケースを導出する技法の総称。ステートメントカバレッジやブランチカバレッジなどの構造カバレッジを測定する。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["ブラックボックステスト"],
  },
  {
    term: "確認テスト",
    termEn: "Confirmation Testing",
    definition:
      "欠陥の修正後に、その欠陥が正しく修正されたことを確認するためのテスト。再テストとも呼ばれる。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["回帰テスト"],
  },
  {
    term: "回帰テスト",
    termEn: "Regression Testing",
    definition:
      "変更によって既存機能に意図しない影響が生じていないことを確認するテスト。変更のたびに実施され、自動化の良い候補である。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
    confusedWith: ["確認テスト"],
  },
  {
    term: "メンテナンステスト",
    termEn: "Maintenance Testing",
    definition:
      "運用中のシステムへの変更（修正、機能追加、環境変更、退役など）に伴って実施されるテスト。変更の影響範囲の分析が重要となる。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
  },
  {
    term: "影響度分析",
    termEn: "Impact Analysis",
    definition:
      "変更がシステムの既存部分に与える影響を特定する分析活動。回帰テストの範囲決定やメンテナンステストの計画に用いられる。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
  },
  {
    term: "テストレベル",
    termEn: "Test Level",
    definition:
      "まとめて編成し管理されるテスト活動のグループ。コンポーネントテスト、統合テスト、システムテスト、受入テストの4つが代表的である。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
  },
  {
    term: "テストタイプ",
    termEn: "Test Type",
    definition:
      "特定のテスト目的に焦点を当てたテスト活動のグループ。機能テスト、非機能テスト、ブラックボックステスト、ホワイトボックステストなどがある。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
  },
  {
    term: "シフトレフト",
    termEn: "Shift Left",
    definition:
      "テスト活動を開発ライフサイクルのより早い段階で実施するアプローチ。早期に欠陥を発見することでコストを削減し、品質を向上させる。",
    chapter: "ソフトウェア開発ライフサイクル全体を通してのテスト",
  },
  // ── 静的テスト ──
  {
    term: "静的テスト",
    termEn: "Static Testing",
    definition:
      "ソフトウェアを実行せずに行うテスト。レビューや静的解析が含まれる。早い段階で欠陥を発見でき、修正コストの削減に寄与する。",
    chapter: "静的テスト",
    confusedWith: ["動的テスト"],
  },
  {
    term: "動的テスト",
    termEn: "Dynamic Testing",
    definition:
      "ソフトウェアを実行して行うテスト。テスト対象のコードを実際に動かし、期待結果と実際の結果を比較して欠陥を検出する。",
    chapter: "静的テスト",
    confusedWith: ["静的テスト"],
  },
  {
    term: "レビュー",
    termEn: "Review",
    definition:
      "作業成果物を1人以上の人間が調べ、欠陥やフィードバックを提供する静的テスト活動。形式度によってインフォーマルレビュー、ウォークスルー、テクニカルレビュー、インスペクションに分類される。",
    chapter: "静的テスト",
    confusedWith: ["ウォークスルー", "インスペクション"],
  },
  {
    term: "インフォーマルレビュー",
    termEn: "Informal Review",
    definition:
      "形式的なプロセスに従わないレビュー。バディチェックやペアリングなどが含まれる。文書化された手順を必要とせず、迅速にフィードバックを得られる。",
    chapter: "静的テスト",
  },
  {
    term: "ウォークスルー",
    termEn: "Walkthrough",
    definition:
      "作成者が主導するレビュー形式。作成者が成果物を説明し、参加者がフィードバックを行う。教育や知識共有の目的でも使われる。",
    chapter: "静的テスト",
    confusedWith: ["レビュー", "インスペクション"],
  },
  {
    term: "テクニカルレビュー",
    termEn: "Technical Review",
    definition:
      "技術的に資格のある同僚によるレビュー。技術的な問題の検出や意思決定を目的とし、ファシリテーターが主導する。",
    chapter: "静的テスト",
  },
  {
    term: "インスペクション",
    termEn: "Inspection",
    definition:
      "最も形式的なレビュー形式。定義されたプロセスに従い、役割が明確に割り当てられ、メトリクスの収集を行う。欠陥発見の効率が最も高い。",
    chapter: "静的テスト",
    confusedWith: ["ウォークスルー", "レビュー"],
  },
  {
    term: "静的解析",
    termEn: "Static Analysis",
    definition:
      "ツールを用いてコードや成果物を実行せずに分析する技法。コーディング規約違反、セキュリティ脆弱性、複雑度の測定などを自動的に検出する。",
    chapter: "静的テスト",
  },
  // ── テスト分析と設計 ──
  {
    term: "同値分割",
    termEn: "Equivalence Partitioning",
    definition:
      "入力データを同等に処理されるグループ（同値パーティション）に分割し、各グループから代表値を1つ選んでテストする技法。有効同値パーティションと無効同値パーティションがある。",
    chapter: "テスト分析と設計",
    confusedWith: ["境界値分析"],
  },
  {
    term: "境界値分析",
    termEn: "Boundary Value Analysis",
    definition:
      "同値パーティションの境界にある値をテストする技法。境界上とその隣の値でテストケースを作成する。同値分割を拡張した技法である。",
    chapter: "テスト分析と設計",
    confusedWith: ["同値分割"],
  },
  {
    term: "デシジョンテーブルテスト",
    termEn: "Decision Table Testing",
    definition:
      "条件の組み合わせとそれに対応するアクションを表形式で整理し、テストケースを導出する技法。ビジネスルールの組み合わせテストに効果的である。",
    chapter: "テスト分析と設計",
  },
  {
    term: "状態遷移テスト",
    termEn: "State Transition Testing",
    definition:
      "システムの状態、状態間の遷移、遷移のトリガーとなるイベントに基づいてテストケースを設計する技法。状態遷移図や状態遷移表を用いる。",
    chapter: "テスト分析と設計",
  },
  {
    term: "ステートメントカバレッジ",
    termEn: "Statement Coverage",
    definition:
      "テストで実行されたステートメント（文）の割合を測定するホワイトボックス技法。100%のステートメントカバレッジは全文が少なくとも1回実行されたことを意味する。",
    chapter: "テスト分析と設計",
    confusedWith: ["ブランチカバレッジ"],
  },
  {
    term: "ブランチカバレッジ",
    termEn: "Branch Coverage",
    definition:
      "テストで実行された分岐（判定の真偽両方）の割合を測定するホワイトボックス技法。100%のブランチカバレッジは100%のステートメントカバレッジを包含する。",
    chapter: "テスト分析と設計",
    confusedWith: ["ステートメントカバレッジ"],
  },
  {
    term: "経験ベースのテスト技法",
    termEn: "Experience-based Test Technique",
    definition:
      "テスト担当者の知識、スキル、経験に基づいてテストケースを導出する技法。エラー推測、探索的テスト、チェックリストベースドテストなどがある。",
    chapter: "テスト分析と設計",
  },
  {
    term: "エラー推測",
    termEn: "Error Guessing",
    definition:
      "テスト担当者の経験に基づいて、起こりやすいエラーや欠陥を予測してテストケースを設計する技法。フォールトアタックとも関連する。",
    chapter: "テスト分析と設計",
  },
  {
    term: "探索的テスト",
    termEn: "Exploratory Testing",
    definition:
      "テスト設計・実行・学習を同時に行う経験ベースのアプローチ。テストチャーターに基づいてタイムボックス内で実施されることが多い。",
    chapter: "テスト分析と設計",
  },
  {
    term: "チェックリストベースドテスト",
    termEn: "Checklist-based Testing",
    definition:
      "チェックリストに記載された項目をカバーするようテストケースを設計・実行する経験ベースの技法。チェックリストは経験や重要な品質特性から作成される。",
    chapter: "テスト分析と設計",
  },
  {
    term: "テストカバレッジ",
    termEn: "Test Coverage",
    definition:
      "テストベースやコード構造に対して、テストで網羅された割合。テストの十分性を測定する指標として使われる。",
    chapter: "テスト分析と設計",
  },
  {
    term: "協調ベースのテストアプローチ",
    termEn: "Collaboration-based Test Approach",
    definition:
      "ステークホルダーとテスト担当者が協力してテストを設計するアプローチ。ユーザーストーリーの受入基準やATDD（受入テスト駆動開発）が代表例である。",
    chapter: "テスト分析と設計",
  },
  // ── テストのマネジメント ──
  {
    term: "テスト計画",
    termEn: "Test Plan",
    definition:
      "テスト活動の範囲、アプローチ、リソース、スケジュールを記述した文書。テスト目的の達成方法を定義し、プロジェクト全体のテスト活動を調整する。",
    chapter: "テストのマネジメント",
    confusedWith: ["テスト戦略"],
  },
  {
    term: "テスト戦略",
    termEn: "Test Strategy",
    definition:
      "テストプロセスに関する組織レベルの一般的な方針やアプローチ。テスト計画より上位の概念であり、複数プロジェクトに適用される。",
    chapter: "テストのマネジメント",
    confusedWith: ["テスト計画"],
  },
  {
    term: "リスクベースドテスト",
    termEn: "Risk-based Testing",
    definition:
      "プロダクトリスクの分析結果に基づいてテストの優先度と労力を配分するアプローチ。リスクの高い領域を重点的にテストすることで効率を高める。",
    chapter: "テストのマネジメント",
  },
  {
    term: "プロダクトリスク",
    termEn: "Product Risk",
    definition:
      "テスト対象の品質に関するリスク。欠陥により発生し得る悪影響の可能性と影響度で評価される。テスト計画やテスト実行の優先度付けに用いられる。",
    chapter: "テストのマネジメント",
    confusedWith: ["プロジェクトリスク"],
  },
  {
    term: "プロジェクトリスク",
    termEn: "Project Risk",
    definition:
      "プロジェクトの管理・制御に関するリスク。スケジュール遅延、要員不足、ツール問題などが含まれ、テスト活動に影響を与える。",
    chapter: "テストのマネジメント",
    confusedWith: ["プロダクトリスク"],
  },
  {
    term: "入口基準",
    termEn: "Entry Criteria",
    definition:
      "特定のテスト活動を開始するための前提条件。テストベースの準備完了やテスト環境の整備などが典型例である。「定義された準備完了」とも呼ばれる。",
    chapter: "テストのマネジメント",
    confusedWith: ["出口基準"],
  },
  {
    term: "出口基準",
    termEn: "Exit Criteria",
    definition:
      "特定のテスト活動を完了とみなすための条件。計画したカバレッジの達成や未修正欠陥の上限などが典型例である。「定義された完了」とも呼ばれる。",
    chapter: "テストのマネジメント",
    confusedWith: ["入口基準"],
  },
  {
    term: "テスト見積り",
    termEn: "Test Estimation",
    definition:
      "テスト活動に必要な工数、期間、コストを見積もる活動。比率ベースや専門家の判断に基づくアプローチなどがある。",
    chapter: "テストのマネジメント",
  },
  {
    term: "テストモニタリング",
    termEn: "Test Monitoring",
    definition:
      "テスト活動の進捗を継続的に監視し、計画との乖離を確認する活動。テストメトリクスを収集・分析してステークホルダーに報告する。",
    chapter: "テストのマネジメント",
    confusedWith: ["テストコントロール"],
  },
  {
    term: "テストコントロール",
    termEn: "Test Control",
    definition:
      "テストモニタリングの結果に基づいて、テスト活動を計画に沿うよう是正措置を講じる活動。優先度の変更やリソースの再配分などが含まれる。",
    chapter: "テストのマネジメント",
    confusedWith: ["テストモニタリング"],
  },
  {
    term: "欠陥レポート",
    termEn: "Defect Report",
    definition:
      "テスト実行中に発見された欠陥を記録する文書。欠陥の識別情報、再現手順、期待結果、実際の結果、重大度・優先度などを含む。",
    chapter: "テストのマネジメント",
  },
  {
    term: "テストサマリーレポート",
    termEn: "Test Summary Report",
    definition:
      "テスト活動の結果を要約した文書。テスト完了基準の達成状況、品質評価、残存リスクなどを記載してステークホルダーに報告する。",
    chapter: "テストのマネジメント",
  },
  {
    term: "テストの独立性",
    termEn: "Independence of Testing",
    definition:
      "開発者以外がテストすることで客観性を高めるアプローチ。独立性のレベルは、開発者自身のテストから第三者テストまで段階がある。",
    chapter: "テストのマネジメント",
  },
  {
    term: "構成管理",
    termEn: "Configuration Management",
    definition:
      "テストウェアや関連する作業成果物の識別、バージョン管理、変更管理を行うプロセス。テスト結果の再現性やトレーサビリティに不可欠である。",
    chapter: "テストのマネジメント",
  },
  {
    term: "テストチャーター",
    termEn: "Test Charter",
    definition:
      "探索的テストのセッションで何をテストするかを記述した文書。テストの範囲、目的、アプローチのガイダンスを提供する。",
    chapter: "テストのマネジメント",
  },
  // ── テスト支援ツール ──
  {
    term: "テスト自動化",
    termEn: "Test Automation",
    definition:
      "ツールを使用してテストの実行や結果の検証を自動的に行うこと。回帰テストの効率化やCI/CDパイプラインへの組み込みに効果的である。",
    chapter: "テスト支援ツール",
  },
  {
    term: "テストマネジメントツール",
    termEn: "Test Management Tool",
    definition:
      "テストケースの管理、テスト実行の記録、テスト結果の追跡を支援するツール。テスト活動全体のトレーサビリティとレポーティングを提供する。",
    chapter: "テスト支援ツール",
  },
  {
    term: "CI/CD",
    termEn: "Continuous Integration / Continuous Delivery",
    definition:
      "継続的インテグレーションはコード変更を頻繁にメインブランチに統合する手法。継続的デリバリーはいつでもリリース可能な状態を維持する手法。自動テストが不可欠である。",
    chapter: "テスト支援ツール",
  },
  {
    term: "テスト実行ツール",
    termEn: "Test Execution Tool",
    definition:
      "テストスクリプトを自動実行し、期待結果と実際の結果を比較するツール。GUIテストツールやAPIテストツールなどがある。",
    chapter: "テスト支援ツール",
  },
  {
    term: "静的解析ツール",
    termEn: "Static Analysis Tool",
    definition:
      "コードを実行せずに解析し、潜在的な欠陥やコーディング標準違反を検出するツール。リンターやセキュリティスキャナーなどが含まれる。",
    chapter: "テスト支援ツール",
  },
  {
    term: "パフォーマンステストツール",
    termEn: "Performance Testing Tool",
    definition:
      "システムの性能（応答時間、スループット、リソース使用率など）を測定・分析するツール。負荷テストやストレステストの実施に使用される。",
    chapter: "テスト支援ツール",
  },
  {
    term: "デバッグ",
    termEn: "Debugging",
    definition:
      "欠陥の原因を特定し修正する開発活動。テストは欠陥を発見するが、デバッグは欠陥を修正する活動であり、テストとは異なる。",
    chapter: "テスト支援ツール",
    confusedWith: ["テスト"],
  },
];
