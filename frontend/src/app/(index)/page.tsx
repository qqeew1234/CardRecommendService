"use client";

import CreditCard from "@/components/CreditCard";
import PageHeader from "@/components/PageHeader";
import "@/styles/page01.scss";
import "@/styles/popup.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { KakaoLoginButton } from "@/components/kakaoLogin";
import { GoogleLoginButton } from "@/components/googleLogin";
import { GitHubLoginButton } from "@/components/gitHubLogin";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const [isPopup, setIsPopup] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const isLoginFail = false;
  const supabase = createClient();
  useEffect(() => {
    async function getDisplayName() {
      const { data } = await supabase.auth.getUser();
      const displayName =
        data?.user?.user_metadata?.full_name || data?.user?.email;
      setDisplayName(displayName);
    }

    getDisplayName();
  }, []);

  const hd_props = {
    num: "01",
    tit: "Card Fit",
    des: "사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의 신용카드 추천, 복잡한 카드 혜택 비교를 간소화하여 누구나 쉽게 자신에게 맞는 카드를 선택 가능",
  };
  return (
    <>
      <PageHeader
        number={hd_props.num}
        title={hd_props.tit}
        description={hd_props.des}
      >
        {displayName ? (
          <div className="user-box">
            <h4 className="btn-top">
              {displayName}님
              <button
                className=""
                onClick={async () => {
                  await supabase.auth.signOut();
                  setDisplayName("");
                }}
              >
                로그아웃
              </button>
            </h4>
            <div className="btn-bot">
              <Link href={"/page02"}>
                <button className={"active"}>소비패턴 분석하기</button>
              </Link>
            </div>
          </div>
        ) : (
          <button className={"active"} onClick={() => setIsPopup(true)}>
            로그인
          </button>
        )}
      </PageHeader>
      <div className="page-body p01">
        <section>
          <div className="art-box">
            <article>
              <h4>소비 패턴에 따른 카드 추천</h4>
              <p>
                사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의
                신용카드 추천 복잡한 카드 혜택 비교를 간소화하여 누구나 쉽게
                자신에게 맞는 카드를 선택 가능 신뢰도 높은 데이터 기반 추천으로
                사용자 만족도 극대화
              </p>
            </article>
            <article>
              <h4>고객 취향에 맞춘 혜택</h4>
              <p>
                사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의
                신용카드 추천 복잡한 카드 혜택 비교를 간소화하여 누구나 쉽게
                자신에게 맞는 카드를 선택 가능 신뢰도 높은 데이터 기반 추천으로
                사용자 만족도 극대화
              </p>
            </article>
            <article>
              <h4>카드 선택에 어려움을 격는 고객을 위한</h4>
              <p>
                사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의
                신용카드 추천 복잡한 카드 혜택 비교를 간소화하여 누구나 쉽게
                자신에게 맞는 카드를 선택 가능 신뢰도 높은 데이터 기반 추천으로
                사용자 만족도 극대화
              </p>
            </article>
          </div>
          <div className="img-box">
            <CreditCard
              cardNumber="1234 5678 9012 3456"
              cardHolder={displayName}
              expiryDate="12/26"
              cvv="123"
              brand="visa"
            />
          </div>
        </section>
      </div>
      {isPopup && (
        <div className="popup-screen">
          <div className="popup-box">
            <form action="">
              {/* <input
                type="email"
                className="email"
                placeholder="example@cardfit.com"
              />
              <input
                type="password"
                className="password"
                placeholder="비밀번호를 입력 하세요."
              />
              <button className="login">이메일 로그인</button>
              <Link href={"/signup"}>
                <button className="signup">[회원가입하기]</button>
              </Link> */}

              <KakaoLoginButton />
              <GoogleLoginButton />
              <GitHubLoginButton />
            </form>
            <div className="close-btn" onClick={() => setIsPopup(false)}>
              <FaTimesCircle />
            </div>
            {isLoginFail && (
              <div className="isLoginFail">
                <h4>이메일 또는 비밀번호를 다시 확인해 주세요.</h4>
                <div className="btns">
                  <button>닫기</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
