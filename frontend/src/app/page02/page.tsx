"use client";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import "@/styles/page02.scss";
import CardItem from "@/components/CardItem";

export default function page02() {
  const hd_props = {
    num: "02",
    tit: "내 카드 불러오기",
    des: "소지하신 카드를 불러와 소비패턴 분석을 하거나 기간별 사용내역을 조회할 수 있습니다.",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [cardList, setCardList] = useState<Card[]>([]);
  const uuid = 1;

  type Card = {
    cardName: string;
    cardCorp: string;
    cardImg: string;
    memberCardId: number;
    altTxt: string | null;
  };

  const testCardList = [
    {
      cardImg: "/cardImg/cardimg1.png",
      cardCorp: "삼성카드",
      cardName: "아메리칸익스프레스 블루",
      altTxt: "",
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
    {
      cardImg: "/cardImg/cardimg6.png",
      cardCorp: "우리카드",
      cardName: "카드의 정석 스카이패스",
      altTxt: "현대카드 더 레드 6",
    },
    {
      cardImg: "/cardImg/cardimg7.png",
      cardCorp: "롯데카드",
      cardName: "L.O.C.A",
      altTxt: "현대카드 더 레드 7",
    },
    {
      cardImg: "/cardImg/cardimg8.png",
      cardCorp: "NH카드",
      cardName: "올바른 FLEX",
      altTxt: "현대카드 더 레드 8",
    },
  ];

  return (
    <>
      <PageHeader
        number={hd_props.num}
        title={hd_props.tit}
        description={hd_props.des}
      >
        {isLoading && (
          <>
            <Link href="/">
              <button>카드다시 불러오기</button>
            </Link>
            <Link href="/page03">
              <button className="active">분석카드 선택완료</button>
            </Link>
          </>
        )}
      </PageHeader>

      <div className="page-body p02">
        <section>
          {isLoading ? (
            testCardList.map((card, index) => (
              <article className="card-box p02" key={index}>
                <CardItem
                  cardImg={card.cardImg}
                  cardName={card.cardName}
                  cardCorp={card.cardCorp}
                  altText={card.altTxt}
                  isChecked={false}
                  index={index}
                />
              </article>
            ))
          ) : (
            <div className="popup">
              <h4>
                [카드불러오기] 버튼을 클릭 해 소비패턴으로 분석하고 싶은
                카드정보를 가져올 수 있습니다.
              </h4>
              <div className="btns">
                <button>이전으로</button>
                <button
                  onClick={async () => {
                    // let data = await fetch(
                    //   `http://localhost:8080/membercard/${uuid}`
                    // );
                    // let posts = await data.json();
                    // setCardList(posts);
                    setIsLoading(true);
                  }}
                >
                  카드불러오기
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
