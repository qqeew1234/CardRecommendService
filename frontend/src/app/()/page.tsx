"use client";

import { useState } from "react";
import PageHeader from "@/components/globals/PageHeader";
import Link from "next/link";


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const header ={
    number: "01",
    title: "CARD FIT",
    description: "사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의 신용카드 추천 복잡한 카드 혜택 비교를 간소화하여 누구나 쉽게 자신에게 맞는 카드를 선택 가능",
  }

  return (
    <>
      <PageHeader number={header.number} title={header.title} description={header.description}>
        {!isLoggedIn ? (
          <div className="btns">
            <button onClick={() => setShowPopup(true)}>로그인</button>
          </div>
        ) : (
          <div className="btns">
            <h4>{"별명"}님 어서오세요. <button>로그아웃</button></h4>
            <Link href={"/pages/02"}>
              <button>소비패턴 분석하기</button>
            </Link>
          </div>
        )}
      </PageHeader>
      <div className="pagehome"></div>
      {showPopup && (
        <div className="popup-screen">
          <div className="popup">
            <form action="">
              <input type="text" placeholder="example@cardfit.com" />
              <input type="password" placeholder="비밀번호를 입력하세요." />
              <button onClick={() => setIsLoggedIn(true)}>이메일 로그인</button>
              <a href={"/pages/signup"}>[회원가입하기]</a>
              <button>카카오 로그인</button>
              <button>네이버 로그인</button>
              <button>구글 로그인</button>
              <button onClick={() => setShowPopup(false)}>닫기</button>
            </form>
          </div>
        </div>
      )}
  </>
  );
}