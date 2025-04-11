import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { authService } from "@/lib/api/authService";

export function AuthPage({ isLogin }: { isLogin: boolean }) {
  const navigate = useNavigate();
  const { login, register, loginWithGoogle } = useAuth();

  // フォーム状態の管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const toggleMode = () => {
    if (isLogin) {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  // メールアドレスの存在チェック
  const checkEmailExists = async (emailToCheck: string) => {
    if (!emailToCheck || isLogin || !emailToCheck.includes("@")) return;

    try {
      setIsCheckingEmail(true);
      setEmailError(null); // チェック後に結果が来るまでエラーをクリア

      console.log(`Checking email existence: ${emailToCheck}`);
      const exists = await authService.checkEmailExists(emailToCheck);
      console.log(`Email exists check result: ${exists}`);

      if (exists) {
        setEmailError("このメールアドレスは既に登録されています");
      } else {
        setEmailError(null);
      }
    } catch (err) {
      console.error("メールチェックエラー:", err);
      // エラーが発生した場合はユーザーに表示しない
      setEmailError(null);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // 新規登録でメールアドレスエラーがある場合は処理を中止
    if (!isLogin && emailError) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // ログイン処理
        const { success, error } = await login(email, password);
        if (!success && error) {
          setError(error);
        }
      } else {
        // 新規登録処理
        const { success, error } = await register(email, password);
        if (!success && error) {
          setError(error);
        }
      }
    } catch (err) {
      setError(
        isLogin
          ? "ログイン中にエラーが発生しました"
          : "アカウント作成中にエラーが発生しました",
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // メールアドレスが変更されたらエラーをクリア
  useEffect(() => {
    setEmailError(null);
  }, [email]);

  // Googleログイン処理
  const handleGoogleAuth = async () => {
    setError(null);
    setIsGoogleLoading(true);

    try {
      const { success, error } = await loginWithGoogle();
      if (!success && error) {
        setError(error);
      }
      // 成功した場合はGoogle認証画面にリダイレクトされるので、
      // ここで何かする必要はありません
    } catch (err) {
      setError("Google認証中にエラーが発生しました");
      console.error(err);
    } finally {
      setIsGoogleLoading(false);
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => checkEmailExists(e.target.value)}
              className={`w-full px-3 py-2 border ${emailError ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 ${emailError ? "focus:ring-red-500" : "focus:ring-teal-500"}`}
              required
              autoComplete="email"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
            {isCheckingEmail && (
              <p className="mt-1 text-sm text-gray-500">
                メールアドレスを確認中...
              </p>
            )}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              minLength={6}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>
          {!isLogin && (
            <div className="text-sm text-gray-600 mt-2">
              <p>パスワードは以下の要件を満たす必要があります：</p>
              <ul className="list-disc list-inside ml-2">
                <li>小文字を1文字以上含む</li>
                <li>大文字を1文字以上含む</li>
                <li>数字を1文字以上含む</li>
                <li>
                  記号（!@#$%^&amp;*(),.?&quot;:{}|&lt;&gt;）を1文字以上含む
                </li>
              </ul>
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <a
                href="/reset-password"
                className="text-sm text-teal-600 hover:text-teal-800"
              >
                パスワードをお忘れですか?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || (!isLogin && emailError !== null)}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed"
          >
            {isLoading
              ? isLogin
                ? "ログイン中..."
                : "アカウント作成中..."
              : isLogin
                ? "ログイン"
                : "アカウント新規作成"}
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-gray-300 absolute w-full"></div>
            <span className="bg-white px-2 text-sm text-gray-500 relative">
              または
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
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
            {isGoogleLoading
              ? "処理中..."
              : isLogin
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
