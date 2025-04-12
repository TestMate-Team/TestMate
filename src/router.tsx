import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import {
  ProtectedRoute,
  PublicOnlyRoute,
} from "@/components/route/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import { LoginPage } from "@/page/Auth/Login";
import { RegisterPage } from "@/page/Auth/Register";
import { HomePage } from "@/page/home";
import { AppDetailPage } from "@/page/home/[id]";
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
    // ルート要素として共通レイアウトとAuthProviderを使用
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      // 認証が必要なルート（ProtectedRouteで保護）
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: "/posts", element: <PostPage /> },
              // その他の認証が必要なルート
            ],
          },
        ],
      },
      // 非認証ユーザー専用ルート（ログイン済みの場合はリダイレクト）
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: "/login", element: <LoginPage /> },
              { path: "/register", element: <RegisterPage /> },
            ],
          },
        ],
      },
      // 認証状態に関わらずアクセス可能なルート
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Navigate to="/home" replace />,
          },
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/home/:id",
            element: <AppDetailPage />,
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);
