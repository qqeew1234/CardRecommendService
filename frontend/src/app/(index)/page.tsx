"use client";

import PageHeader from "@/components/PageHeader";
import "@/styles/page01.scss";
import "@/styles/popup.scss";
import styles from "@/styles/CreditCard.module.scss";
import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { KakaoLoginButton } from "@/components/kakaoLogin";
import { GoogleLoginButton } from "@/components/googleLogin";
import { GitHubLoginButton } from "@/components/gitHubLogin";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function Home() {
  const [isPopup, setIsPopup] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isFlipped, setIsFlipped] = useState(false); // 카드 플립 상태 추가
  const supabase = createClient();

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
      <PageHeader
        number={hd_props.num}
        title={hd_props.tit}
        description={hd_props.des}
      >
        <></>
      </PageHeader>

      <div className="page-body p01">
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
          </div>

          <div className="img-box">
            {/* 클릭 시 카드 플립 */}
            <div
              className={`${styles["credit-card"]} ${
                isFlipped ? styles.flipped : ""
              }`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={styles["card-inner"]}>
                {/* 카드 앞면 */}
                <div className={styles["card-front"]}>
                  <div className={styles["card-brand"]}>
                    <div>Card Fit</div>
                    <div>ㄹㄹㄹㄹ</div>
                  </div>
                  {displayName ? (
                    <div className="user-box">
                      <div className="btn-bot">
                        <Link href={"/page02"}>
                          <button className="active">소비패턴 분석하기</button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="active"
                      onClick={() => setIsFlipped(true)}
                    >
                      로그인
                    </button>
                  )}
                  <div className={styles["card-holder"]}>
                    <div className={styles["name"]}>{displayName}님</div>
                    <div className={styles["expiry"]}>EXP</div>
                  </div>
                </div>

                {/* 카드 뒷면 */}
                <div className={styles["card-back"]}>
                  <div className={styles["cvv"]}>
                    <form action="">
                      <button
                        onClick={async () => {
                          await supabase.auth.signOut();
                          setDisplayName("");
                        }}
                      >
                        로그아웃
                      </button>
                      <KakaoLoginButton />
                      <GoogleLoginButton />
                      <GitHubLoginButton />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {isPopup && (
        <div className="popup-screen">
          <div className="popup-box">
            <form action="">
              <KakaoLoginButton />
              <GoogleLoginButton />
              <GitHubLoginButton />
            </form>
            <div className="close-btn" onClick={() => setIsPopup(false)}>
              <FaTimesCircle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
