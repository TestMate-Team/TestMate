import { AppItem } from "@/types/appItem";

import { AppInfo } from "./AppInfo";

export function AppCard({ appItem }: { appItem: AppItem }) {
  const handleFavoriteToggle = (isActive: boolean) => {
    console.log(
      `${appItem.title}のお気に入りを${isActive ? "追加" : "解除"}しました`,
    );
    // API呼び出しなど
  };

  return (
    <div className="flex items-center p-2 sm:p-3 md:p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1">
        <AppInfo
          appItem={appItem}
          showMetrics={true}
          metricTypes={["chat", "tester", "favorite"]}
          metricCounts={{ chat: 44, tester: 44, favorite: 44 }}
          onFavoriteToggle={handleFavoriteToggle}
        />
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
