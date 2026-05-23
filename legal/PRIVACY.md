# Privacy Policy / プライバシーポリシー

Last updated: 2026-05-16

## 日本語

**拡張機能名**: Toikake (といかけ)  
**開発者**: 旅する書斎 (tabisurushosai)  
**連絡先**: patvessel+legal@gmail.com

### 概要

Toikake は、保護者が今読んでいる Web ページ・絵本・動画などのコンテンツから、子どもとの対話を促す問いかけを Google Gemini AI で生成する Chrome 拡張機能 (サイドパネル形式) です。本ポリシーは、本拡張機能が取り扱う情報の範囲と目的を明確にするものです。

### 収集する情報

本拡張機能および開発者は、利用者を特定する情報 (氏名、住所、メールアドレス、IPアドレス、その他の個人識別情報) を開発者のサーバーへ**一切送信・収集しません**。

以下のデータはすべて利用者の端末内 (`chrome.storage.local`) にのみ保存され、開発者のサーバーには送信されません:

- 利用者が設定した Google Gemini API キー
- 問いかけの生成履歴 (ページタイトル、URL、生成された問いかけ文)
- お気に入りに登録した問いかけ
- 対話メモ
- 子どもの表示名またはニックネーム (入力した場合) と年齢設定、教科設定 (国語・算数・理科・社会・道徳)
- ダークモードなどの表示設定
- 無料版の利用回数・利用日、有料版の有効状態

### 外部サービスとの通信 (Web サイトのコンテンツ取得について)

本拡張機能は、利用者が明示的に「このページから問いかけを生成」ボタンをクリックした時のみ、以下の動作を行います:

1. **アクティブタブのページ本文取得**: `activeTab` および `scripting` 権限を用いて、利用者が現在表示中のタブからページのテキストコンテンツ (本文・タイトル) を取得します。

2. **Google Gemini API への送信**: 取得したページコンテンツを、利用者が自身で設定した Google Gemini API キーを用いて Google Generative Language API (`generativelanguage.googleapis.com`) に送信し、問いかけを生成します。送信される情報はページ本文と生成パラメータ (年齢設定・教科設定) のみで、利用者個人を特定する情報や閲覧履歴・ブラウジングデータは一切含まれません。

3. **コンテンツの非保存**: Gemini API に送信したページ本文は、要約処理後に破棄され、端末内にも開発者サーバーにも保存されません。保存されるのは、生成された問いかけ文・ページタイトル・URL のみで、それらもすべて利用者の端末内にのみ保管されます。

なお、Google Gemini API の利用にあたっては、Google の[プライバシーポリシー](https://policies.google.com/privacy)および [Generative AI 追加利用規約](https://policies.google.com/terms/generative-ai)も適用されます。

### 有料プランの決済について

現行バージョンの本拡張機能は、決済ページを開いたり、決済プロバイダに情報を送信したりしません。本拡張機能および開発者は、クレジットカード番号などの決済情報を**取り扱いません**。有料版の有効状態は、利用者の端末内 (`chrome.storage.local`) の設定としてのみ保存されます。

### 第三者への提供

本拡張機能は、上記の Google Gemini API への送信を除き、利用者データを第三者に販売または転送しません。また、信用度の評価や融資判定などの目的にも一切使用しません。

### 著作権への配慮

ページ本文は問いかけ生成の入力としてのみ使用され、処理後は端末内に保存されません。表示・保存される情報は AI 生成の問いかけと元ページの URL リンクのみで、原文の全文転載は行いません。

### 13歳未満の利用

本拡張機能は保護者向けの対話支援ツールであり、13歳未満の利用者から意図的にデータを収集することはありません。子どもが直接本拡張機能を利用する場合は、保護者の管理下でのご利用をお願いします。

### ポリシーの変更

本ポリシーは予告なく更新されることがあります。最新版は常にこのファイルで公開されます。

---

## English

**Extension Name**: Toikake  
**Developer**: Tabisurushosai (旅する書斎)  
**Contact**: patvessel+legal@gmail.com

### Overview

Toikake is a Chrome extension (side panel) that uses Google Gemini AI to generate thought-provoking questions for parent-child conversations, based on the content of the webpage the user is currently viewing — articles, digital picture books, videos, and more.

### Data We Collect

The extension and its developer do **not transmit or collect personally identifiable information** (name, address, email, IP address, etc.) on the developer's servers.

The following data is stored **only on the user's local device** (`chrome.storage.local`) and is never transmitted to the developer's servers:

- The Google Gemini API key set by the user
- Question generation history (page title, URL, generated question text)
- Bookmarked questions
- Conversation notes
- Child display names or nicknames (if entered), age settings, subject settings (Language Arts, Math, Science, Social Studies, Ethics)
- Display preferences (e.g. dark mode)
- Free-plan usage count/date and premium enablement status

### Communication with External Services (Webpage Content Access)

The extension performs the following only when the user **explicitly clicks the "Generate Questions from This Page" button**:

1. **Active tab content retrieval**: Using the `activeTab` and `scripting` permissions, the extension reads the text content (body and title) of the currently displayed tab.

2. **Sending data to Google Gemini API**: The retrieved page content is sent to Google's Generative Language API (`generativelanguage.googleapis.com`) using the user's own API key, in order to generate questions. Only the page content and generation parameters (age / subject) are sent — no user-identifiable information, browsing history, or activity data is included.

3. **No content storage**: The page content sent to the Gemini API is discarded after processing and is never stored locally or on developer servers. Only the generated questions, page title, and URL are saved, and they remain on the user's local device.

Use of the Google Gemini API is also subject to [Google's Privacy Policy](https://policies.google.com/privacy) and the [Generative AI Additional Terms](https://policies.google.com/terms/generative-ai).

### Premium Plan Payments

The current version of the extension does not open payment pages or send information to a payment provider. The extension and its developer **do not handle credit card numbers or other payment details**. Premium enablement status is stored only as a setting on the user's local device (`chrome.storage.local`).

### Third-party Sharing

Except for the Google Gemini API transmission described above, the extension does **not sell or transfer user data to third parties**. User data is **not used for creditworthiness or lending decisions**.

### Copyright

Page content is used solely as input for question generation and is not stored after processing. Only AI-generated questions and links to the original sources are saved — full content reproductions are never retained.

### Children's Privacy

Toikake is a parent-facing dialogue assistance tool. It does not knowingly collect data from users under 13. Children using this extension should do so under parental supervision.

### Policy Changes

This policy may be updated without prior notice. The latest version is always published in this file.
