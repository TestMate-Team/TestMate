import "./App.css";

import { Route, Routes } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { HomePage } from "@/page/home";
import { AppDetailPage } from "@/page/home/components/AppDetail";
import { NotFound } from "@/page/NotFound";
import { PostPage } from "@/page/posts";

function App() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      {/* モバイルでは最大幅448px、タブレットでは640px、デスクトップでは768pxに設定 */}
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl relative bottom-1">
        <Header />
        <main className="pt-17 md:pt-20 px-4 shadow-md min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<AppDetailPage />} />
            <Route path="/posts" element={<PostPage />} />
            {/* 404ページ */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
