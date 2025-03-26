'use client';

import { createClient } from '@/utils/supabase/client';

const Kakaologin = async () => {

    const supabase = createClient();

    const {} = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
    })
};

export function KakaoLoginButton() {
    return (
        <div>
            <button type="button" onClick={Kakaologin} className="naver">
                Kakao 로그인
            </button>
        </div>
    );
}
