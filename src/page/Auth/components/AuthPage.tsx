import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BaseButton } from "@/components/common/BaseButton";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/lib/api/authService";
import { validatePassword } from "@/lib/utils/errorHandler";

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
  const [passwordError, setPasswordError] = useState<string | null>(null);

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

      const exists = await authService.checkEmailExists(emailToCheck);

      if (exists) {
        setEmailError("このメールアドレスは既に登録されています");
      } else {
        setEmailError(null);
      }
    } catch {
      // エラーが発生した場合はユーザーに表示しない
      setEmailError(null);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // パスワードバリデーション関数
  const checkPassword = (passwordToCheck: string) => {
    // ログイン時はバリデーションをスキップ
    if (isLogin) {
      setPasswordError(null); // ログイン時は常にエラーをクリア
      return;
    }

    if (!passwordToCheck) {
      setPasswordError(null);
      return;
    }

    const validationResult = validatePassword(passwordToCheck);
    if (!validationResult.isValid) {
      setPasswordError(validationResult.error);
    } else {
      setPasswordError(null);
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

  // パスワードが変更されたらエラーをクリア
  useEffect(() => {
    setPasswordError(null);
  }, [password]);

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
              onBlur={(e) => checkPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 ${passwordError ? "focus:ring-red-500" : "focus:ring-teal-500"}`}
              required
              minLength={6}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

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

          <BaseButton
            variant="primary"
            size="lg"
            disabled={
              isLoading ||
              (!isLogin && (emailError !== null || passwordError !== null))
            }
            className="w-full"
            type="submit"
          >
            {isLoading
              ? isLogin
                ? "ログイン中..."
                : "アカウント作成中..."
              : isLogin
                ? "ログイン"
                : "アカウント新規作成"}
          </BaseButton>

          <BaseButton
            variant="custom"
            size="lg"
            className="w-full bg-[#4285F4] text-white hover:bg-[#3367d6] relative flex items-center justify-center"
            disabled={isGoogleLoading}
            onClick={handleGoogleAuth}
          >
            <div className="absolute left-1 top-1 bottom-1 h-[calc(100%-8px)] aspect-square bg-white rounded flex items-center justify-center">
              <img
                src="/icons/Google.svg"
                alt="Google"
                className="w-4/5 h-4/5 object-contain"
              />
            </div>
            <span className="ml-10">
              {isGoogleLoading
                ? "処理中..."
                : isLogin
                  ? "Googleアカウントでログイン"
                  : "Googleアカウントで新規作成"}
            </span>
          </BaseButton>
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
