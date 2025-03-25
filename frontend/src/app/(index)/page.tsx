"use client"

import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import "@/styles/popup.scss"
import Link from "next/link";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

export default function Home() {
  const[isLogdIn, setIsLogIn] = useState(false);
  const[isPopup, setIsPopup] = useState(false);


  const hd_props ={
    num:"01",
    tit:"Card Fit",
    des: "사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의 신용카드 추천, 복잡한 카드 혜택 비교를 간소화하여 누구나 쉽게 자신에게 맞는 카드를 선택 가능"
  }
  return (
    <>
      <PageHeader number={hd_props.num} title={hd_props.tit} description={hd_props.des}>
        {isLogdIn ? 
        <>
          <h4>{"닉네임"}님 어서오세요.</h4>
          <button className="dim" onClick={() => setIsLogIn(false)}>로그인</button>
        </>
        :
        <button className="dim" onClick={() => setIsPopup(true)}>로그인</button>
        }


      </PageHeader>
      <div className="page-body">
        <section>
          바디에 들어가는 내용
        </section>
      </div>
      {isPopup && (
        <div className="popup-screen">
        <div className="popup-box">
          <form action="">
            <input type="email" className="email" placeholder="example@cardfit.com"/>
            <input type="password" className="password" placeholder="비밀번호를 입력하세요."/>
            <button className="login" onClick={() => =}>이메일로그인</button>
            <Link href={"/signup"}>
            <button className="signup">[회원가입하기]</button></Link>
            
            <button className="naver">네이버 로그인</button>
            <button className="google">구글 로그인</button>
            <button className="github">깃헙 로그인</button>
          </form>
          <div className="close-btn" onClick={() => setIsPopup(false)}>
            <FaTimesCircle/>
          </div>
        </div>
      </div>
      ) }
     
    </>
  );
}
