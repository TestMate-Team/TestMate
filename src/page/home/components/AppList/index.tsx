import { AppItem } from "@/types/appItem";

import { AppCard } from "./AppCard";

export function AppList({ appData }: { appData: AppItem[] }) {
  return (
    <div className="space-y-4">
      {appData.map((app) => (
        <AppCard key={app.id} appItem={app} />
      ))}
    </div>
  );
}
