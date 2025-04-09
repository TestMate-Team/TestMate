import { Link } from "react-router-dom";

import { AppItem } from "@/types/appItem";

import { AppCard } from "./AppCard";

export function AppList({ appData }: { appData: AppItem[] }) {
  return (
    <div className="space-y-4">
      {appData.map((app) => (
        <Link
          key={app.id}
          to={`/app/${app.id}`}
          className="block no-underline text-inherit"
        >
          <AppCard appItem={app} />
        </Link>
      ))}
    </div>
  );
}
