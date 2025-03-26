'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from "next/headers";
import {encodedRedirect} from "@/utils/utils";

// export const signUpAction = async (formData: FormData) => {
//     // 폼 데이터에서 값 추출
//     const email = formData.get("email")?.toString();
//     const password = formData.get("password")?.toString();
//     const confirmPassword = formData.get("confirmPassword")?.toString();
//     const displayName = formData.get("displayName")?.toString(); // ★ 추가: display name
//
//     const supabase = await createClient();
//     const origin = (await headers()).get("origin");
//
//     // 필수 입력값 검증
//     if (!email || !password || !confirmPassword || !displayName) {
//         return encodedRedirect(
//             "error",
//             "/sign-up",
//             "Email, password, confirm password, and display name are required"
//         );
//     }
//
//     // 비밀번호 일치 여부 확인
//     if (password !== confirmPassword) {
//         return encodedRedirect(
//             "error",
//             "/sign-up",
//             "Passwords do not match"
//         );
//     }
//
//     // 회원가입 호출 (displayName → full_name에 저장)
//     const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//             emailRedirectTo: `${origin}/auth/callback`,
//             data: {
//                 full_name: displayName, // ★ 이 필드가 Supabase Auth 대시보드의 “Display name”으로 표시됨
//             },
//         },
//     });
//
//     if (error) {
//         console.error(error.code + " " + error.message);
//         return encodedRedirect("error", "/sign-up", error.message);
//     }
//
//     // 회원가입 성공 시, user 정보가 있을 경우에만 분류 생성
//     const uid = data.user?.id;
//     if (!uid) {
//         return encodedRedirect("error", "/sign-up", "User ID not available");
//     }
//
//     // 별도로 분류 생성 로직을 호출
//     if (typeof origin === "string") {
//         await createClassifications(uid, origin);
//     }
//
//     return encodedRedirect(
//         "success",
//         "/sign-up",
//         "Thanks for signing up! Please check your email for a verification link."
//     );
// };
//
// export const signInAction = async (formData: FormData) => {
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const supabase = await createClient();
//
//     const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//     });
//
//     if (error) {
//         return encodedRedirect("error", "/sign-in", error.message);
//     }
//
//     return redirect("/");
// };

export const signOutAction = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
};
