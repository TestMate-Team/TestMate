// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "jsr:@supabase/supabase-js";

console.log("Email check function initialized");

// メールアドレスの存在をチェックする関数
Deno.serve(async (req) => {
  try {
    // CORSヘッダーの設定
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, x-client-info, apikey, Referer, User-Agent, Origin, Accept",
          "Access-Control-Max-Age": "86400",
        },
        status: 204,
      });
    }

    // リクエストからメールアドレスを取得
    const { email } = await req.json();
    console.log(`[EDGE] メールチェックリクエスト受信: ${email}`);

    if (!email) {
      console.log("[EDGE] メールアドレスが空");
      return new Response(
        JSON.stringify({ error: "メールアドレスが必要です" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, x-client-info, apikey, Referer, User-Agent, Origin, Accept",
          },
        },
      );
    }

    // 環境変数のチェック
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("[EDGE] 環境変数が設定されていません", {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseServiceRoleKey,
      });
      return new Response(
        JSON.stringify({
          error: "サーバー設定エラーが発生しました",
          exists: false,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, x-client-info, apikey, Referer, User-Agent, Origin, Accept",
          },
        },
      );
    }

    // Supabase Admin クライアントの作成
    console.log("[EDGE] Supabase Admin クライアントを作成");
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // メールアドレスでユーザーを検索
    console.log("[EDGE] ユーザー検索を実行 メール:", email);

    // すべてのユーザーを取得してフィルタリング
    // listUsersのfiltersパラメータが機能しない場合の回避策
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error("[EDGE] ユーザー検索エラー:", error);
      return new Response(
        JSON.stringify({
          error: `サーバーエラー: ${error.message}`,
          exists: false,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, x-client-info, apikey, Referer, User-Agent, Origin, Accept",
          },
        },
      );
    }

    // メールアドレスに一致するユーザーを手動でフィルタリング
    const matchingUsers = data?.users?.filter(
      (user) => user.email && user.email.toLowerCase() === email.toLowerCase(),
    );

    // メールが存在するかどうかを返す
    const exists = matchingUsers && matchingUsers.length > 0;
    console.log(
      `[EDGE] メール存在確認結果: ${exists ? "存在する" : "存在しない"}`,
      {
        allUsersCount: data?.users?.length || 0,
        matchingUsersCount: matchingUsers?.length || 0,
        matchingUsers: matchingUsers?.map((u) => ({
          id: u.id,
          email: u.email,
        })),
      },
    );

    return new Response(JSON.stringify({ exists }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, x-client-info, apikey, Referer, User-Agent, Origin, Accept",
      },
    });
  } catch (error) {
    console.error("[EDGE] 予期せぬエラー:", error);
    return new Response(
      JSON.stringify({
        error: `サーバーエラー: ${error.message}`,
        exists: false,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, x-client-info, apikey, Referer, User-Agent, Origin, Accept",
        },
      },
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/check-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
