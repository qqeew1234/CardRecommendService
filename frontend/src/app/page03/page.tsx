"use client";

import { Key, useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeaderCopy";
import CardItem from "@/components/CardItem";
import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import "@/styles/page03.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Card = {
  index: number;
  id: number;
  cardName: string;
  cardCorp: string;
  cardImg: string;
  memberCardId: number;
  altTxt: string;
  cardTotalAmount: string;
};

export default function page03() {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCardIds, setSelectedCardIds] = useState<number | undefined>(
    undefined
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const memberCardIds: number[] = useMemo(() => {
    return searchParams.getAll("memberCardIds").map(Number);
  }, [searchParams.toString()]);

  const checked = searchParams ? searchParams.get("memberCardIds") : null;

  const supabase = createClient();

  console.log(
    "🔍 searchParams.get('memberCardIds'):",
    searchParams.get("memberCardIds")
  );
  console.log("쿼리에서 받은 값:", checked);
  console.log("최종 memberCardIds:", memberCardIds);

  useEffect(() => {
    if (!memberCardIds || memberCardIds.length === 0) {
      console.log("❗선택된 카드 없음, fetch 중단");
      setIsLoading(false);
      return;
    }

    const queryString = `?memberCardIds=${memberCardIds.join(",")}`;

    async function getCheckedCards() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.id) {
        return;
      }

      console.log("유저아이디 확인", user.id);

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        return;
      }
      const res = await fetch(
        `http://localhost:8080/membercards${queryString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      const cards = await res.json();
      console.log("cards:", cards);

      setCardList(cards);
      setIsLoading(false);
    }

    getCheckedCards();
  }, [memberCardIds]);

  // 선택한 카드 감지
  const cardSelectHandler = (selectedCardIds: number) => {
    setSelectedCardIds(selectedCardIds);
  };

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
          {isLoading ? (
            <p>카드를 불러오는 중</p>
          ) : (
            cardList.map((card, index) => (
              <article
                className="card-box p03"
                key={card.id}
                onClick={() => {
                  router.push(
                    `/page04?memberCardId=${memberCardIds.join(
                      ","
                    )}&selectedCardId=${card.memberCardId}`
                  );
                }}
              >
                <CardItem
                  cardImg={card.cardImg}
                  cardName={card.cardName}
                  cardCorp={card.cardCorp}
                  altText={card.altTxt}
                  isChecked={false}
                  index={index}
                  onCheck={() => cardSelectHandler(card.memberCardId)}
                  cardTotalAmount={card.cardTotalAmount.toLocaleString()}
                />
                {/* <Link href={"/page04"}></Link> */}
              </article>
            ))
          )}
        </section>
      </div>
    </>
  );
}
