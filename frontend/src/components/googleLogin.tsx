"use client";

import { createClient } from "@/utils/supabase/client";

const GoogleLogin = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

export function GoogleLoginButton() {
  return (
    <button type="button" onClick={GoogleLogin} className="google">
      Google 로그인
    </button>
  );
}
