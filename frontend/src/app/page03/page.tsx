"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
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
      id: 0,
      cardImg: "/cardImg.png",
      cardCorp: "현대카드",
      cardName: "the Red",
      altTxt: "현대카드 더 레드 1",
    },
    {
      id: 1,
      cardImg: "/cardImg.png",
      cardCorp: "삼성카드",
      cardName: "아멕스 블루",
      altTxt: "현대카드 더 레드 2",
    },
    {
      id: 2,
      cardImg: "/cardImg.png",
      cardCorp: "국민카드",
      cardName: "쿠팡",
      altTxt: "현대카드 더 레드 3",
    },
    {
      id: 3,
      cardImg: "/cardImg.png",
      cardCorp: "우리카드",
      cardName: "우리 사장님",
      altTxt: "현대카드 더 레드 4",
    },
    {
      id: 4,
      cardImg: "/cardImg.png",
      cardCorp: "신한카드",
      cardName: "내일배움",
      altTxt: "현대카드 더 레드 5",
    },
  ];
  return (
    <>
      <PageHeader
        number={hd_props.num}
        title={hd_props.tit}
        description={hd_props.des}
      >
        <Link href={"/page02"}>
          <button className="acrive">카드 다시불러오기</button>
        </Link>
      </PageHeader>
      <div className="page-body p03">
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
