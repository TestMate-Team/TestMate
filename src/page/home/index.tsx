import { useState } from "react";

import { BaseButton } from "@/components/common/BaseButton";
import { Dropdown } from "@/components/common/Dropdown";
import { AppItem } from "@/types/appItem";

import { AppList } from "./components/AppList";

// ホームページコンポーネント
const appData: AppItem[] = [
  {
    id: 1,
    title: "testmate",
    shortDescription: "テスターを集めるサイト",
    iconUrl: "/images/testmate.svg",
  },
  {
    id: 2,
    title: "エクスプローラーズ",
    shortDescription: "街歩きリアル探索ゲーム",
    iconUrl: "/images/explorers.svg",
  },
  {
    id: 3,
    title: "testmate",
    shortDescription: "テスターを集めるサイト",
    iconUrl: "/images/testmate.svg",
  },
];

// ドロップダウンのオプション
const appTypeOptions = [
  { value: "all", label: "すべて" },
  { value: "game", label: "ゲーム" },
  { value: "app", label: "アプリ" },
];

const categoryOptions = [
  { value: "all", label: "すべて" },
  { value: "business", label: "ビジネス" },
  { value: "education", label: "教育" },
  { value: "entertainment", label: "エンターテイメント" },
];

const statusOptions = [
  { value: "all", label: "すべて" },
  { value: "testing", label: "テスト中" },
  { value: "released", label: "リリース済み" },
];

const sortOptions = [
  { value: "newest", label: "新規順" },
  { value: "popular", label: "人気順" },
  { value: "rating", label: "評価順" },
];

export function HomePage() {
  // 選択された値
  const [appType, setAppType] = useState("game/app");
  const [category, setCategory] = useState("カテゴリ");
  const [status, setStatus] = useState("testing/released");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* 検索フィールド */}
      <div className="mb-4 relative">
        <div className="flex items-center border rounded-md overflow-hidden">
          <div className="px-3 py-2">
            <img src="/icons/Search.svg" alt="検索" className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="検索..."
            className="w-full py-2 px-2 outline-none"
          />
        </div>
      </div>

      {/* フィルターとソート */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center">
            <img
              src="/icons/Filter.svg"
              alt="フィルター"
              className="w-5 h-5 mr-1"
            />
            <span className="text-sm mr-2">絞り込み:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* アプリタイプのドロップダウン */}
            <Dropdown
              options={appTypeOptions}
              value={appType}
              onChange={setAppType}
              placeholder="ゲーム/アプリ"
              className="mr-2"
            />

            {/* カテゴリのドロップダウン */}
            <Dropdown
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              placeholder="カテゴリ"
              className="mr-2"
            />

            {/* ステータスのドロップダウン */}
            <Dropdown
              options={statusOptions}
              value={status}
              onChange={setStatus}
              placeholder="テスト中/リリース済み"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className="text-sm mr-2">ソート:</span>

            {/* ソートのドロップダウン */}
            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="新規順"
            />
          </div>

          <BaseButton>表示</BaseButton>
        </div>
      </div>

      {/* アプリケーション一覧 */}
      <AppList appData={appData} />
    </div>
  );
}
