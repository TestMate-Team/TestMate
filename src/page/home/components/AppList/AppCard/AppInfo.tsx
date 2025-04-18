import { AppItem } from "@/types/appItem";

import { AppMetric } from "./AppMetric";

interface AppInfoProps {
  appItem: AppItem;
  showMetrics?: boolean;
  initialFavorite?: boolean;
  className?: string;
}

export function AppInfo({
  appItem,
  showMetrics = true,
  initialFavorite = false,
  className = "",
}: AppInfoProps) {
  const metricCounts = { chat: 44, tester: 44, favorite: 44 };
  const handleFavoriteToggle = (isActive: boolean) => {
    console.log(
      `${appItem.title}のお気に入りを${isActive ? "追加" : "解除"}しました`,
    );
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center">
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

          {showMetrics && (
            <div className="flex mt-1 sm:mt-2 space-x-2 sm:space-x-3 md:space-x-4">
              <AppMetric type="chat" count={metricCounts.chat} />
              <AppMetric type="tester" count={metricCounts.tester} />
              <AppMetric
                type="favorite"
                count={metricCounts.favorite}
                initialActive={initialFavorite}
                onToggle={handleFavoriteToggle}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
