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
      id: 0,
      cardImg: "/cardImg.png",
      cardCorp: "현대카드",
      cardName: "the Red",
      altTxt: "현대카드 더 레드 1",
    },
    {
      id: 1,
      cardImg: "/cardImg.png",
      cardCorp: "현대카드",
      cardName: "the Red",
      altTxt: "현대카드 더 레드 2",
    },
    {
      id: 2,
      cardImg: "/cardImg.png",
      cardCorp: "현대카드",
      cardName: "the Red",
      altTxt: "현대카드 더 레드 3",
    },
    {
      id: 3,
      cardImg: "/cardImg.png",
      cardCorp: "현대카드",
      cardName: "the Red",
      altTxt: "현대카드 더 레드 4",
    },
    {
      id: 4,
      cardImg: "/cardImg.png",
      cardCorp: "현대카드",
      cardName: "the Red",
      altTxt: "현대카드 더 레드 5",
    },
    {
      id: 5,
      cardImg: "/cardImg.png",
      cardCorp: "현대카드",
      cardName: "the Red",
      altTxt: "현대카드 더 레드 6",
    },
    {
      id: 6,
      cardImg: "/cardImg.png",
      cardCorp: "현대카드",
      cardName: "the Red",
      altTxt: "현대카드 더 레드 7",
    },
    {
      id: 7,
      cardImg: "/cardImg.png",
      cardCorp: "현대카드",
      cardName: "the Red",
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
              <button>분석카드 선택완료</button>
            </Link>
          </>
        )}
      </PageHeader>

      <div className="page-body p02">
        <section>
          {isLoading ? (
            testCardList.map((card, index) => (
              <article className="card-box" key={index}>
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
