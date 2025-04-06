import { useState } from "react";

import { BaseButton } from "@/components/common/BaseButton";
import { AppInfo } from "@/page/home/components/AppList/AppCard/AppInfo";
import { AppItem } from "@/types/appItem";

export function AppDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 直書きのサンプルデータ
  const userName = "ゲスト";
  const app: AppItem = {
    id: 2,
    title: "エクスプローラーズ",
    shortDescription: "街歩きリアル探索ゲーム",
    iconUrl: "/images/explorers.svg",
    screenshots: ["/images/sample1.png", "/images/sample1.png"],
    longDescription:
      "街を歩きながら、リアルな探索を楽しめるゲームです。GPSを使って現実世界を冒険し、隠されたアイテムやミッションを発見しましょう。友達と一緒に遊べば、より楽しい体験が待っています。オフラインでも遊べるので、Wi-Fi環境がなくても心配ありません。",
  };

  // スクリーンショットのデフォルト値を設定
  const screenshots = app.screenshots || [];

  const handlePreviousImage = () => {
    if (screenshots.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (screenshots.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === screenshots.length - 1 ? 0 : prev + 1,
    );
  };

  const handleBecomeATester = () => {
    // テスター申込処理（実際の実装では適切な処理を行う）
    console.log(`${app.title} のテスターに応募しました`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* AppCardコンポーネントを再利用 */}
        <div className="border-b pb-4">
          <AppInfo appItem={app} />
        </div>

        {/* 開発者情報 */}
        <div className="p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
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
          <div>
            <div className="font-semibold">{userName}</div>
          </div>
        </div>

        {/* スクリーンショットスライダー */}
        {app.screenshots && app.screenshots.length > 0 && (
          <div className="px-4 py-6">
            <div className="relative">
              <div className="flex overflow-x-auto space-x-4 py-2">
                {app.screenshots.map((imgSrc, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-40 h-60 md:w-48 md:h-72 border rounded-md overflow-hidden
                      ${index === currentImageIndex ? "ring-2 ring-blue-500" : ""}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={imgSrc}
                      alt={`${app.title}のスクリーンショット ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/icons/ImagePlaceholder.svg";
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handlePreviousImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-r-md"
              >
                &lt;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-l-md"
              >
                &gt;
              </button>
            </div>
          </div>
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
