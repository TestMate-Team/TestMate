import { useState } from "react";

import { AppItem } from "@/types/appItem";

export function AppCard({ appItem }: { appItem: AppItem }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    // クリックイベントが親要素（Link）に伝播しないようにする
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex items-center p-2 sm:p-3 md:p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
        <img
          src={appItem.iconUrl}
          alt="アプリのアイコン"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg md:text-xl font-bold truncate">
          {appItem.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-1 sm:line-clamp-2">
          {appItem.shortDescription}
        </p>
        <div className="flex mt-1 sm:mt-2 space-x-2 sm:space-x-3 md:space-x-4">
          {/* Todo: 認証ユーザは直接タップで遷移 */}
          <div className="flex items-center">
            <img
              src="/icons/Chat.svg"
              alt="チャットのアイコン"
              className="w-4 h-4 md:w-5 md:h-5"
            />
            <span className="text-xs sm:text-sm ml-1">44</span>
          </div>
          <div className="flex items-center">
            <img
              src="/icons/Person.svg"
              alt="テスター参加人数"
              className="w-4 h-4 md:w-5 md:h-5"
            />
            <span className="text-xs sm:text-sm ml-1">44</span>
          </div>
          <button
            className="flex items-center focus:outline-none cursor-pointer"
            onClick={toggleFavorite}
            aria-label="お気に入りに追加"
          >
            <img
              src={
                isFavorite
                  ? "/icons/FavoriteFilled.svg"
                  : "/icons/FavoriteBorder.svg"
              }
              alt="お気に入り登録数"
              className="w-4 h-4 md:w-5 md:h-5"
            />
            <span className="text-xs sm:text-sm ml-1">44</span>
          </button>
        </div>
      </div>
      <div className="ml-2 sm:ml-3 md:ml-4 flex-shrink-0 self-center">
        <img
          src="/icons/Arrow.svg"
          alt="矢印のアイコン"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
        />
      </div>
    </div>
  );
}
