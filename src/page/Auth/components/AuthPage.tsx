import { useNavigate } from "react-router-dom";

export function AuthPage({ isLogin }: { isLogin: boolean }) {
  const navigate = useNavigate();

  const toggleMode = () => {
    if (isLogin) {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="shadow-lg w-full max-w-md p-8 border border-gray-300">
        <div className="flex justify-center mb-6">
          <img src="/images/testmate.svg" alt="Logo" className="w-32 h-32" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">
          {isLogin ? "ログイン" : "アカウント作成"}
        </h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-sm text-teal-600 hover:text-teal-800">
                パスワードをお忘れですか?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {isLogin ? "ログイン" : "アカウント新規作成"}
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-gray-300 absolute w-full"></div>
            <span className="bg-white px-2 text-sm text-gray-500 relative">
              または
            </span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLogin
              ? "Googleアカウントでログイン"
              : "Googleアカウントで新規作成"}
          </button>
        </form>

        <div className="text-center mt-6">
          {isLogin ? (
            <p className="text-sm text-gray-600">
              アカウントを未登録ですか?
              <button
                onClick={toggleMode}
                className="text-teal-600 hover:text-teal-800 ml-1 font-medium"
              >
                アカウント作成
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              アカウントをお持ちですか?
              <button
                onClick={toggleMode}
                className="text-teal-600 hover:text-teal-800 ml-1 font-medium"
              >
                ログイン
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
