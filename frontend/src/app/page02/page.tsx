"use client";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function page02() {
 
const hd_props = {
    num: "02",
    tit: "내 카드 불러오기",
    des: "소지하신 카드를 불러와 소비패턴 분석을 하거나 기간별 사용내역을 조회할 수 있습니다.",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [cardList, setCardList] = useState<Card[]>([]);
  const uuid = 1;
  const hasCardList = [
    {
      key: 0,
      card_image: "/card_image.png",
      card_company: "현대카드",
      card_goods: "the Red",
      alt_txt: "현대카드 더 레드 1",
    },
    {
      key: 1,
      card_image: "/card_image.png",
      card_company: "현대카드",
      card_goods: "the Red",
      alt_txt: "현대카드 더 레드 2",
    },
    {
      key: 2,
      card_image: "/card_image.png",
      card_company: "현대카드",
      card_goods: "the Red",
      alt_txt: "현대카드 더 레드 3",
    },
    {
      key: 3,
      card_image: "/card_image.png",
      card_company: "현대카드",
      card_goods: "the Red",
      alt_txt: "현대카드 더 레드 4",
    },
    {
      key: 4,
      card_image: "/card_image.png",
      card_company: "현대카드",
      card_goods: "the Red",
      alt_txt: "현대카드 더 레드 5",
    },
    {
      key: 5,
      card_image: "/card_image.png",
      card_company: "현대카드",
      card_goods: "the Red",
      alt_txt: "현대카드 더 레드 6",
    },
    {
      key: 6,
      card_image: "/card_image.png",
      card_company: "현대카드",
      card_goods: "the Red",
      alt_txt: "현대카드 더 레드 7",
    },
    {
      key: 7,
      card_image: "/card_image.png",
      card_company: "현대카드",
      card_goods: "the Red",
      alt_txt: "현대카드 더 레드 8",
    },
  ];

  type Card = {
    id: number;
    cardName: string;
    cardCorp: String;
    cardImg: string;
    memberCardId: number;
    altTxt: string | null;
  };

  return (
    <>
      <PageHeader
        number={hd_props.num}
        title={hd_props.tit}
        description={hd_props.des}
      >
        {isLoading ? (
          <>
            <Link href={"/"}>
              <button>카드다시 불러오기</button>
            </Link>
            <Link href={"/page03"}>
              <button>분석카드 선택완료</button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </PageHeader>
      <div className="page-body">
        <section>
          {isLoading ? (
            cardList.map((card) => {
              return (
                <article key={card.id}>
                  <div className="card-image">
                    <Image
                      src={card.cardImg}
                      width={120}
                      height={80}
                      alt={card.altTxt ?? "카드이미지"}
                    />
                  </div>
                  <h4>
                    [<span className="card-company">{card.cardCorp}</span>]
                    <span className="card-goods">{card.cardName}</span>
                  </h4>
                </article>
              );
            })
          ) : (
            <div className="popup">
              <h4>
                [카드불러오기] 버튼을 클릭 해 소비패턴으로 분석하고 싶은
                카드정보를 가져올 수 있습니다.
              </h4>
              <div className="btns">
                <button>이전으로</button>
                <button onClick={async() => { 
                    let data = await fetch(`http://localhost:8080/membercard/${uuid}`)
                    let posts = await data.json()
                  setCardList(posts)
                  setIsLoading(true)}}>카드불러오기</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
