// utils/GetDisplayName.tsx
import { createClient } from "@/utils/supabase/server";

// 사용자 정보를 기반으로 display name(닉네임 또는 이메일)을 가져오는 함수
export async function getDisplayName(): Promise<string> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
        console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
        return "OO";
    }
    return data.user.user_metadata?.full_name || data.user.email;
}