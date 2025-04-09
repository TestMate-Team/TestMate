import { useState } from "react";
import { Link } from "react-router-dom";

import { BaseButton } from "@/components/common/BaseButton";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Header() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const isMobile = useMediaQuery("(max-width: 480px)");
  const buttonSize = isMobile ? "sm" : "md";

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  return (
    <header className="flex justify-between items-center px-4 md:px-6 py-2 md:py-4 shadow fixed top-0 z-50 w-full max-w-md md:max-w-2xl lg:max-w-3xl bg-white">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/images/testmate.svg"
            alt="TestMate Logo"
            className="w-auto h-8 md:h-10"
          />
          <span className="ml-2 text-lg md:text-xl font-bold">TestMate</span>
        </Link>
      </div>

      {user ? (
        // ログイン済みの場合のヘッダー右側
        <div className="flex items-center space-x-3 md:space-x-5">
          <BaseButton to="/posts" variant="primary" size={buttonSize}>
            <img src="/icons/Pen.svg" alt="投稿" className="w-4 h-4 mr-2" />
            投稿する
          </BaseButton>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 focus:outline-none"
            >
              <img
                src="/images/avatar.png"
                alt="ユーザープロフィール"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/icons/Person.svg";
                }}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  プロフィール
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  設定
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        // 未ログインの場合のヘッダー右側
        <div className="flex items-center space-x-2 md:space-x-4">
          <BaseButton to="/login" variant="primary" size={buttonSize}>
            ログイン
          </BaseButton>
          <BaseButton to="/register" variant="outline" size={buttonSize}>
            新規登録
          </BaseButton>
        </div>
      )}
    </header>
  );
}
