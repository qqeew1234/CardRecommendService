"use client";

import PageHeader from "@/components/PageHeaderCopy";
import "@/styles/page01.scss";
import "@/styles/creditCard.scss";
import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { KakaoLoginButton } from "@/components/kakaoLogin";
import { GoogleLoginButton } from "@/components/googleLogin";
import { GitHubLoginButton } from "@/components/gitHubLogin";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isPopup, setIsPopup] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const loggined = !!displayName;
  const [isFlipped, setIsFlipped] = useState(false);
  const supabase = createClient();
  const router = useRouter()

  useEffect(() => {
    async function getDisplayName() {
      const { data } = await supabase.auth.getUser();
      const name = data?.user?.user_metadata?.full_name || data?.user?.email;
      setDisplayName(name);
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
      <div className="page-head page-head-01">
        <PageHeader
          number={hd_props.num}
          title={hd_props.tit}
          description={hd_props.des}
        >
          <div className={`credit-card ${isFlipped ? "flipped" : ""}`}>
            <div
              className="card-inner"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* 카드 앞면 */}
              <div className="card-front">
                <div className="card-brand">
                  <div>
                    Card<i>Fit</i>
                  </div>
                  <div>&nbsp;</div>
                </div>
                {loggined ? (
                  <div className="user-box">
                    <Link href={"/page02"}>
                      <button className="active">소비패턴 분석하기</button>
                    </Link>
                  </div>
                ) : (
                  <div className="user-box">
                    <button className="active">로그인</button>
                  </div>
                )}
                <div className="card-holder">
                  <div className="name">
                    {loggined ? `${displayName}` : "Guest"}
                  </div>
                  <div className="logout">로그아웃</div>
                </div>
              </div>

              {/* 카드 뒷면 */}
              <div className="card-back">
                {loggined ? (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation(); // 클릭 이벤트 버블링 방지
                      await supabase.auth.signOut();
                      setDisplayName("");
                      setIsFlipped(false); // 로그아웃 시 카드 다시 앞면으로
                    }}
                  >
                    로그아웃
                  </button>
                ) : (
                  <>
                    <KakaoLoginButton />
                    <GoogleLoginButton />
                    <GitHubLoginButton />
                  </>
                )}
              </div>
            </div>
          </div>
        </PageHeader>
      </div>

      <div className="page-body page-body-01">
        <section>
          <div className="art-box">
            <article>
              <h4>소비 패턴에 따른 카드 추천</h4>
              <p>
                사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의
                신용카드 추천. 복잡한 카드 혜택 비교를 간소화하여 누구나 쉽게
                자신에게 맞는 카드를 선택 가능.
              </p>
            </article>
            <article>
              <h4>고객 취향에 맞춘 혜택</h4>
              <p>
                사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의
                신용카드 추천. 신뢰도 높은 데이터 기반 추천으로 사용자 만족도
                극대화.
              </p>
            </article>
            <article>
              <h4>고객 취향에 맞춘 혜택</h4>
              <p>
                사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의
                신용카드 추천. 신뢰도 높은 데이터 기반 추천으로 사용자 만족도
                극대화.
              </p>
            </article>
          </div>

          <div className="img-box"></div>
        </section>
      </div>
    </>
  );
}
