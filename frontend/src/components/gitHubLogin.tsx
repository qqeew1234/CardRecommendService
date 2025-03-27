"use client";

import { createClient } from "@/utils/supabase/client"; // 클라이언트용 Supabase 초기화 파일

const GitHubLogin = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

export function GitHubLoginButton() {
  return (
    <button type="button" onClick={GitHubLogin} className="github">
      GitHub로 로그인
    </button>
  );
}
