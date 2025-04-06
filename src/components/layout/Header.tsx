import { Link } from "react-router-dom";

import { BaseButton } from "@/components/common/BaseButton";

export function Header() {
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
      {/* todo: ログインしたら別のものに変更 */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <BaseButton
          to="/login"
          variant="primary"
          size="sm"
          className="md:text-sm lg:text-base md:px-4 md:py-2"
        >
          ログイン
        </BaseButton>
        <BaseButton
          to="/signup"
          variant="outline"
          size="sm"
          className="md:text-sm lg:text-base md:px-4 md:py-2"
        >
          新規登録
        </BaseButton>
      </div>
    </header>
  );
}
