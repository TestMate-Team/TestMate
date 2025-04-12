/**
 * パスワードバリデーション関数
 * @param password 検証するパスワード
 * @returns バリデーション結果と必要な場合はエラーメッセージ
 */
export const validatePassword = (
  password: string,
): { isValid: boolean; error: string | null } => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasLowerCase || !hasUpperCase || !hasNumber || !hasSpecialChar) {
    return {
      isValid: false,
      error:
        "パスワードは6文字以上で、英小文字、英大文字、数字、記号を含めてください",
    };
  }

  return { isValid: true, error: null };
};

/**
 * Supabaseのエラーメッセージを日本語に翻訳する関数
 * @param message 翻訳するエラーメッセージ
 * @returns 日本語に翻訳されたエラーメッセージ
 */
export const translateAuthError = (message: string): string => {
  // デバッグ用に元のエラーメッセージをログ出力
  console.log("Original auth error:", message);

  const errorMessages: { [key: string]: string } = {
    "Invalid login credentials":
      "メールアドレスまたはパスワードが正しくありません",
    "Email not confirmed": "メールアドレスが確認されていません",
    "User already registered": "このメールアドレスは既に登録されています",
    "Invalid email": "無効なメールアドレスです",
    "Password should be at least 6 characters":
      "パスワードは6文字以上である必要があります",
    "Email already registered": "このメールアドレスは既に登録されています",
    "duplicate key value violates unique constraint":
      "このメールアドレスは既に登録されています",
    "unique violation": "このメールアドレスは既に登録されています",
    // パターンマッチング用の追加
    "already registered": "このメールアドレスは既に登録されています",
    "A user with this email address has already been registered":
      "このメールアドレスは既に登録されています",
  };

  // 完全一致するエラーがない場合は部分一致もチェック
  if (!errorMessages[message]) {
    for (const key in errorMessages) {
      if (message.toLowerCase().includes(key.toLowerCase())) {
        return errorMessages[key];
      }
    }
  }

  return errorMessages[message] || `エラーが発生しました: ${message}`;
};
