import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "../supabase";
import { translateAuthError,validatePassword } from "../utils/errorHandler";

export interface AuthError {
  message: string;
}

export interface AuthResponse<T> {
  data: T | null;
  error: AuthError | null;
}

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
    const emailExists = await this.checkEmailExists(email);
    if (emailExists) {
      return {
        data: null,
        error: { message: "このメールアドレスは既に登録されています" },
      };
    }

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

  // Googleでログイン
  async loginWithGoogle(): Promise<AuthResponse<null>> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) {
      return {
        data: null,
        error: { message: translateAuthError(error.message) },
      };
    }

    return { data: null, error: null };
  },

  // メールアドレスの重複チェック（RPC関数を使用）
  async checkEmailExists(email: string): Promise<boolean> {
    // check_email RPC関数を呼び出す
    const { data, error } = await supabase.rpc("check_email", {
      email_address: email,
    });

    if (error) {
      // エラー発生時はfalseを返す（サインアップを許可）
      return false;
    }
    // check_email関数は件数を返すので、0より大きければメールが存在する
    return data > 0;
  },
};
