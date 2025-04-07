import { useState } from "react";

import { BaseButton } from "@/components/common/BaseButton";
import { AppInfo } from "@/page/home/components/AppList/AppCard/AppInfo";
import { AppItem } from "@/types/appItem";

import { ScreenshotSlider } from "./ScreenshotSlider";

export function AppDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 直書きのサンプルデータ
  const userName = "ゲスト";
  const app: AppItem = {
    id: 1,
    title: "エクスプローラーズ",
    shortDescription: "街歩きリアル探索ゲーム",
    iconUrl: "/images/testmate.svg",
    screenshots: [
      "/images/sample1.png",
      "/images/sample1.png",
      "/images/sample1.png",
      "/images/sample1.png",
    ],
    longDescription:
      "街を歩きながら、リアルな探索を楽しめるゲームです。GPSを使って現実世界を冒険し、隠されたアイテムやミッションを発見しましょう。友達と一緒に遊べば、より楽しい体験が待っています。オフラインでも遊べるので、Wi-Fi環境がなくても心配ありません。",
  };

  // スクリーンショットのデフォルト値を設定
  const screenshots = app.screenshots || [];

  const handleScreenshotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleBecomeATester = () => {
    // テスター申込処理（実際の実装では適切な処理を行う）
    console.log(`${app.title} のテスターに応募しました`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* アプリ情報と開発者情報を横並びに - レスポンシブ対応版 */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b">
          {/* AppInfoコンポーネントを再利用 */}
          <div className="flex-grow mb-4 sm:mb-0">
            <AppInfo appItem={app} />
          </div>

          {/* 開発者情報 - レスポンシブ対応版 */}
          <div className="flex items-center sm:flex-col sm:items-center self-start sm:self-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="/images/avatar.png"
                alt="開発者"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/icons/Person.svg";
                }}
              />
            </div>
            <div className="ml-3 sm:ml-0 sm:mt-2 sm:text-center">
              <div className="font-medium text-sm sm:text-base">{userName}</div>
            </div>
          </div>
        </div>

        {/* スクリーンショットスライダー */}
        {screenshots.length > 0 && (
          <ScreenshotSlider
            screenshots={screenshots}
            title={app.title}
            onScreenshotClick={handleScreenshotClick}
            currentIndex={currentImageIndex}
          />
        )}

        {/* 詳細情報 */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-3">詳しい説明</h2>
          <p className="text-gray-700">{app.longDescription}</p>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex mt-6 space-x-4">
        <BaseButton to="/" variant="secondary" className="flex-1">
          戻る
        </BaseButton>
        <BaseButton onClick={handleBecomeATester} className="flex-1">
          テスターになる
        </BaseButton>
      </div>
    </div>
  );
}
