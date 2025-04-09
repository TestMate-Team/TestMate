import { User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "@/lib/api/authService";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 初期ロード時にセッション確認
  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data: session, error } = await authService.getSession();
        if (error) throw error;

        setUser(session?.user || null);
      } catch (error) {
        console.error("Error loading session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadSession();

    // Supabaseの認証状態変更リスナー
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ログイン処理
  const login = async (email: string, password: string) => {
    try {
      const { data: user, error } = await authService.login(email, password);

      if (error) {
        return { success: false, error: error.message };
      }

      setUser(user);
      navigate("/");
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  };

  // 登録処理
  const register = async (email: string, password: string) => {
    try {
      // 先にメールアドレスの存在チェックを行う
      const emailExists = await authService.checkEmailExists(email);

      if (emailExists) {
        return {
          success: false,
          error: "このメールアドレスは既に登録されています",
        };
      }

      const { data: user, error } = await authService.register(email, password);

      if (error) {
        return { success: false, error: error.message };
      }

      setUser(user);
      navigate("/");
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  };

  // ログアウト処理
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// フックを使用して認証コンテキストにアクセス
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
