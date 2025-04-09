import { createBrowserRouter, Outlet } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { LoginPage } from "@/page/Auth/Login";
import { RegisterPage } from "@/page/Auth/Register";
import { HomePage } from "@/page/home";
import { AppDetailPage } from "@/page/home/components/AppDetail";
import { NotFound } from "@/page/NotFound";
import { PostPage } from "@/page/posts";

// メインレイアウト（ヘッダーあり）
const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-17 md:pt-20 px-4 shadow-md min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

// 認証レイアウト（ヘッダーなし）
const AuthLayout = () => {
  return (
    <main className="px-4">
      <Outlet />
    </main>
  );
};

// ルート構造全体を包む共通レイアウト
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl relative bottom-1">
        <Outlet />
      </div>
    </div>
  );
};

// ルーターの定義
export const router = createBrowserRouter([
  {
    // ルート要素として共通レイアウトを使用
    element: <RootLayout />,
    children: [
      // メインレイアウトを使用するルート（ヘッダーあり）
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/posts", element: <PostPage /> },
          { path: "/:id", element: <AppDetailPage /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      // 認証レイアウトを使用するルート（ヘッダーなし）
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
    ],
  },
]);
