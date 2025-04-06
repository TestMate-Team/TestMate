import { useState } from "react";

export type MetricType = "chat" | "tester" | "favorite";

// メトリック設定の共通インターフェース
interface MetricConfig {
  icon?: string;
  defaultIcon?: string;
  activeIcon?: string;
  altText: string;
  isToggleable: boolean;
}

interface AppMetricProps {
  type: MetricType;
  count: number;
  initialActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  className?: string;
}

export function AppMetric({
  type,
  count = 0,
  initialActive = false,
  onToggle,
  className = "",
}: AppMetricProps) {
  const [isActive, setIsActive] = useState(initialActive);

  // メトリクスの設定を定義したオブジェクト
  const metricConfig: Record<MetricType, MetricConfig> = {
    chat: {
      icon: "/icons/Chat.svg",
      altText: "チャットのアイコン",
      isToggleable: false,
    },
    tester: {
      icon: "/icons/Person.svg",
      altText: "テスター参加人数",
      isToggleable: false,
    },
    favorite: {
      defaultIcon: "/icons/FavoriteBorder.svg",
      activeIcon: "/icons/FavoriteFilled.svg",
      altText: "お気に入り登録数",
      isToggleable: true,
    },
  };

  // 設定を取得
  const config = metricConfig[type];

  // アイコンを決定
  const icon =
    isActive && config.activeIcon
      ? config.activeIcon
      : config.defaultIcon || config.icon;

  if (!icon) {
    return null; // アイコンが定義されていない場合は何も表示しない
  }

  const handleToggle = (e: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (config.isToggleable) {
      const newState = !isActive;
      setIsActive(newState);

      if (onToggle) {
        onToggle(newState);
      }
    }
  };

  return (
    <div
      className={`flex items-center ${config.isToggleable ? "cursor-pointer" : ""} ${className}`}
      onClick={config.isToggleable ? handleToggle : undefined}
      role={config.isToggleable ? "button" : undefined}
      aria-label={
        config.isToggleable ? `${config.altText}を切り替え` : undefined
      }
    >
      <img src={icon} alt={config.altText} className="w-4 h-4 md:w-5 md:h-5" />
      <span className="text-xs sm:text-sm ml-1">{count}</span>
    </div>
  );
}
