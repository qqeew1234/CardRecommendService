"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeaderCopy";
import CardItem from "@/components/CardItem";
import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import "@/styles/page03.scss";
export default function page02() {
  const hd_props = {
    num: "03",
    tit: "소비패턴분석카드",
    des: "카드를 클릭하면 월별 소비내역을 확인할수 있습니다.",
  };
  const testCardList = [
    {
      cardImg: "/cardImg/cardimg1.png",
      cardCorp: "삼성카드",
      cardName: "아메리칸익스프레스 블루",
      altTxt: "아메리칸익스프레스 블루",
    },
    {
      cardImg: "/cardImg/cardimg2.png",
      cardCorp: "신한카드",
      cardName: "미스터 라이프",
      altTxt: "미스터라이프",
    },
    {
      cardImg: "/cardImg/cardimg3.png",
      cardCorp: "신한카드",
      cardName: "더 베스트 에프",
      altTxt: "신한카드",
    },
    {
      cardImg: "/cardImg/cardimg4.png",
      cardCorp: "국민카드",
      cardName: "쿠팡 와우",
      altTxt: "쿠팡와우",
    },
    {
      cardImg: "/cardImg/cardimg5.png",
      cardCorp: "하나카드",
      cardName: "제이드 프리미엄",
      altTxt: "현대카드 더 레드 5",
    },
    // {
    //   cardImg: "/cardImg/cardimg6.png",
    //   cardCorp: "우리카드",
    //   cardName: "카드의 정석 스카이패스",
    //   altTxt: "현대카드 더 레드 6",
    // },
    // {
    //   cardImg: "/cardImg/cardimg7.png",
    //   cardCorp: "롯데카드",
    //   cardName: "L.O.C.A",
    //   altTxt: "현대카드 더 레드 7",
    // },
    // {
    //   cardImg: "/cardImg/cardimg8.png",
    //   cardCorp: "NH카드",
    //   cardName: "올바른 FLEX",
    //   altTxt: "현대카드 더 레드 8",
    // },
  ];
  return (
    <>
      <div className="page-head page-head-03">
        <PageHeader
          number={hd_props.num}
          title={hd_props.tit}
          description={hd_props.des}
        >
          <Link href={"/page02"}>
            <button className="active">카드 다시불러오기</button>
          </Link>
        </PageHeader>
      </div>
      <div className="page-body page-body-03">
        <section>
          {testCardList.map((card, index) => (
            <article className="card-box p03" key={index}>
              <CardItem
                cardImg={card.cardImg}
                cardName={card.cardName}
                cardCorp={card.cardCorp}
                altText={card.altTxt}
                isChecked={false}
                index={index}
              />
              <Link href={"/page04"}></Link>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
