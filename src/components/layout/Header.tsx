import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-2 shadow fixed top-0 left-0 right-0 z-50 max-w-md mx-auto w-full">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/images/testmate.svg"
            alt="TestMate Logo"
            className="w-auto h-8"
          />
          <span className="ml-2 text-lg font-bold">TestMate</span>
        </Link>
      </div>
      {/* todo: ログインしたら別のものに変更 */}
      <div className="flex items-center space-x-2">
        <Link
          to="/login"
          className="bg-teal-400 hover:bg-teal-500 text-white text-xs px-3 py-2 rounded-md whitespace-nowrap"
        >
          ログイン
        </Link>
        <Link
          to="/signup"
          className="border border-teal-400 text-teal-400 hover:bg-teal-50 text-xs px-3 py-2 rounded-md whitespace-nowrap"
        >
          新規登録
        </Link>
      </div>
    </header>
  );
}
