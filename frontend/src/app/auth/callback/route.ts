// /auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { isFirstLogin } from '@/components/checkAndCreateClassifications';
import { createClassifications } from '@/components/createClassifications';

export const GET = async (request: Request) => {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // 최종 목적지 (쿼리 파라미터 next가 없으면 "/"로 이동)
    const next = searchParams.get('next') ?? '/';

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            // 최초 로그인 여부 확인
            const firstLogin = await isFirstLogin();
            if (firstLogin) {
                // 최초 로그인이라면, 사용자 정보를 다시 가져와 uid를 얻고 분류 데이터를 생성합니다.
                const { data } = await supabase.auth.getUser();
                const uid = data?.user?.id;
                if (uid) {
                    await createClassifications(uid, origin);
                } else {
                    console.error("사용자 ID를 가져올 수 없습니다.");
                }
            }
            // 모든 후처리 후 최종 목적지로 리다이렉트
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
};
