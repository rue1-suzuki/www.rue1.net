# https://www.rue1.net

[ルゥ/Rue1DM](https://twitter.com/Rue1DM)のポートフォリオサイト

vercel CLI をインストール

```sh
vercel link
vercel env pull .env
yarn install
yarn run dev
```

# EM3 テーブル設計

- ユーザ User
  - 主催者 Organizer
    - イベント Event
      - チーム Team
        - プレイヤー Player
          - デッキ Deck
          - 注意・警告 Violation
      - 対戦表 Round
        - 対戦データ RoundData
          - 対戦結果 Winner
      - 成績表 Result
        - 成績データ ResultData

## プレイヤーへのユーザ紐づけ

ユーザの紐づけ → **プレイヤーログイン**

プレイヤーログインを必須とするかは主催者が設定可能(デフォルトは任意)

1 プレイヤーにつき 1 ユーザのみログイン可能

### `user=null`の場合

- だれでもプレイヤーログインが可能
- だれでもデッキ登録が可能

登録されたデッキは`user=null`になる

### ユーザチェックイン済みの場合

- ユーザ本人と主催者のみチェックアウトが可能
- 登録されているデッキの user が自身の場合のみ閲覧可能

## 対戦ステージ管理

イベント ID ステージ ID
