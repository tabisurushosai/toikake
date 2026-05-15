# TODO - Toikake (AI問いかけ生成)

各タスクを上から1個ずつ消化。SPEC.md v1_0 参照。

## Phase 1: スケルトン
- [x] T001: manifest.json (Manifest V3、side_panel設定)
- [x] T002: icons/ (吹き出しアイコン)
- [x] T003: sidepanel/sidepanel.html で「問いかけを生成」ボタンだけ表示

## Phase 2: ページ本文抽出
- [x] T004: Readability.js を同梱(Mozilla公式、CDNではなくローカル配置)
- [x] T005: content/extract.js でアクティブタブの本文を抽出
- [x] T006: 抽出失敗時のフォールバック(document.body.innerText)

## Phase 3: AI生成
- [x] T007: lib/ai.js でGemini APIクライアント
- [x] T008: lib/prompts.js で5タイプの質問プロンプトを定義
- [x] T009: バックグラウンドServiceWorker経由でAPI呼び出し
- [x] T010: 結果をサイドパネルにカードで表示

## Phase 4: 設定
- [x] T011: options/options.html で子どもの年齢設定(複数子ども対応)
- [x] T012: 教科特化モードの選択
- [x] T013: APIキー入力フォーム

## Phase 5: 年齢チューニング
- [x] T014: プロンプトに年齢情報を埋め込み
- [x] T015: 質問の文体を年齢別に調整(幼児:ひらがな多め、小学校高学年:漢字OK)

## Phase 6: 教科特化
- [x] T016: 教科別プロンプトテンプレートを実装
- [x] T017: サイドパネルで教科切替ボタン

## Phase 7: 保存・履歴
- [x] T018: 生成した質問を chrome.storage.local に保存
- [x] T019: 履歴画面UI
- [x] T020: お気に入りボタン
- [x] T021: 「子どもとの対話メモ」入力欄

## Phase 8: 使い勝手
- [x] T022: 選択範囲があればその部分を優先して生成
- [ ] T023: 右クリックメニュー「Toikakeで問いかけ生成」
- [ ] T024: ショートカットキー対応

## Phase 9: 課金枠
- [ ] T025: 無料版の1日3回制限
- [ ] T026: 有料版フラグの管理

## Phase 10: 仕上げ
- [ ] T027: ダークモード
- [ ] T028: README完成
- [ ] T029: Chrome Web Store提出準備
