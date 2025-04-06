import { AppData } from "@/types/appItem";

import { AppCard } from "./components/AppCard";

// ホームページコンポーネント
const appData: AppData = {
  id: 1,
  title: "TestMate",
  shortDescription: "あなたのテストをもっと楽しく",
  iconUrl: "/images/testmate.svg",
};
export function HomePage() {
  return (
    <div className="h-min-screen">
      <p>input Field</p>
      <p>絞り込み</p>
      <p>ソート</p>
      <div>
        <AppCard appData={appData} />
      </div>
    </div>
  );
}
