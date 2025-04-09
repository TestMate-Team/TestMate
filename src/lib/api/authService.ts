import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "../supabase";

export interface AuthError {
  message: string;
}

export interface AuthResponse<T> {
  data: T | null;
  error: AuthError | null;
}

// パスワードバリデーション関数
const validatePassword = (
  password: string,
): { isValid: boolean; error: string | null } => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasLowerCase) {
    return {
      isValid: false,
      error: "パスワードには小文字を1文字以上含める必要があります",
    };
  }
  if (!hasUpperCase) {
    return {
      isValid: false,
      error: "パスワードには大文字を1文字以上含める必要があります",
    };
  }
  if (!hasNumber) {
    return {
      isValid: false,
      error: "パスワードには数字を1文字以上含める必要があります",
    };
  }
  if (!hasSpecialChar) {
    return {
      isValid: false,
      error: "パスワードには記号を1文字以上含める必要があります",
    };
  }

  return { isValid: true, error: null };
};

// Supabaseのエラーメッセージを日本語に翻訳
const translateAuthError = (message: string): string => {
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

export const authService = {
  // ログイン
  async login(email: string, password: string): Promise<AuthResponse<User>> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return {
        data: null,
        error: error
          ? { message: translateAuthError(error.message) }
          : { message: "ユーザーが見つかりません" },
      };
    }

    return { data: data.user, error: null };
  },

  // ユーザー登録
  async register(email: string, password: string): Promise<AuthResponse<User>> {
    // まず、パスワードのバリデーションを実行
    const { isValid, error: validationError } = validatePassword(password);
    if (!isValid) {
      return {
        data: null,
        error: {
          message: validationError || "パスワードが要件を満たしていません",
        },
      };
    }

    // 事前にメールアドレスの存在チェックを行う
    // 最も安全な方法は直接 signUp を呼び出して、エラーをキャッチすること
    // 以前の User テーブルを使ったチェックは安全ではないため削除

    // Supabaseの認証機能を使ってユーザー登録
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    // エラー処理を強化
    if (error) {
      console.error("Registration error:", error); // デバッグ用
      return {
        data: null,
        error: { message: translateAuthError(error.message) },
      };
    }

    // ユーザーがnullの場合（通常はエラーだが、エラーオブジェクトがない場合）
    if (!data.user) {
      return {
        data: null,
        error: { message: "ユーザー登録に失敗しました" },
      };
    }

    return { data: data.user, error: null };
  },

  // ログアウト
  async logout(): Promise<AuthResponse<null>> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { data: null, error: { message: error.message } };
    }

    return { data: null, error: null };
  },

  // パスワードリセット
  async resetPassword(email: string): Promise<AuthResponse<null>> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return { data: null, error: { message: error.message } };
    }

    return { data: null, error: null };
  },

  // 現在のセッション取得
  async getSession(): Promise<AuthResponse<Session>> {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      return {
        data: null,
        error: error
          ? { message: error.message }
          : { message: "No active session" },
      };
    }

    return { data: data.session, error: null };
  },

  // メールアドレスの重複チェック（Edge Functionを使用）
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      console.log(
        `[DEBUG] Checking if email exists using Edge Function: ${email}`,
      );

      // Edge Functionを呼び出す
      console.log(`[DEBUG] Invoking check-email function with email: ${email}`);
      const { data, error } = await supabase.functions.invoke("check-email", {
        body: { email },
      });

      if (error) {
        console.error("[DEBUG] メールチェックEdge Functionエラー:", error);
        // エラー発生時はfalseを返す（サインアップを許可）
        return false;
      }

      console.log(`[DEBUG] Edge Function response:`, data);
      return data?.exists || false;
    } catch (error) {
      console.error(`[DEBUG] Email check failed with unexpected error:`, error);
      // 予期せぬエラーの場合は安全側に倒してfalseを返す
      return false;
    }
  },
};
