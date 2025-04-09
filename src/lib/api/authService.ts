import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "../supabase";

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
          ? { message: error.message }
          : { message: "User not found" },
      };
    }

    return { data: data.user, error: null };
  },

  // ユーザー登録
  async register(email: string, password: string): Promise<AuthResponse<User>> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      return {
        data: null,
        error: error
          ? { message: error.message }
          : { message: "User registration failed" },
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
};
