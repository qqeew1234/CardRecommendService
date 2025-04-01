"use client";
import PageHeader from "@/components/PageHeaderCopy";
import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import "@/styles/page02.scss";
import CardItem from "@/components/CardItem";
import { useRouter } from "next/navigation";
import { log } from "console";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type Card = {
  id: number;
  cardName: string;
  cardCorp: string;
  cardImg: string;
  memberCardId: number;
  altTxt: string;
};

export default function page02() {
  const hd_props = {
    num: "02",
    tit: "내 카드 불러오기",
    des: "소지하신 카드를 불러와 소비패턴 분석을 하거나 기간별 사용내역을 조회할 수 있습니다.",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [cardList, setCardList] = useState<Card[]>([]);
  const [memberCardIds, setMemberCardIds] = useState<number[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getCardsByMember() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.id) {
        return;
      }

      let data = await fetch(`http://localhost:8080/membercards/${user?.id}`);
      let cards = await data.json();
      setCardList(cards);
      setIsLoading(false);
    }

    getCardsByMember();
  }, []);

  //체크된 카드 감지
  const checkHandler = (id: number) => {
    setMemberCardIds(
      (prev) =>
        prev.includes(id) //이전 배열이 id를 이미 포함하고 있으면
          ? prev.filter((x) => x !== id) //id 제거
          : [...prev, id] //아니면 추가
    );
  };

  //router.push
  const handleSubmit = async () => {
    console.log("memberCardIds", memberCardIds);

    const queryString =
      "?" + memberCardIds.map((id) => `memberCardIds=${id}`).join("&");

    console.log("이동할 URL", `/page03${queryString}`);

    router.push(`/page03${queryString}`);
  };

  // const testCardList = [];
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
      <div className="page-head page-head-02">
        <PageHeader
          number={hd_props.num}
          title={hd_props.tit}
          description={hd_props.des}
        >
          {!isLoading && (
            <>
              <Link href="/">
                <button>메인으로 돌아가기</button>
              </Link>
              <button className="recard">카드다시 불러오기</button>
              {/* <Link href="/page03"> */}
              <button className="active" onClick={handleSubmit}>
                분석카드 선택완료
              </button>
              {/* </Link> */}
            </>
          )}
        </PageHeader>
      </div>
      <div className="page-body page-body-02">
        <section>
          <div className="art-wrap">
            {cardList.length > 0 ? (
              cardList.map((card, index) => (
                <article className="card-box p02" key={card.id}>
                  <CardItem
                    cardImg={card.cardImg}
                    cardName={card.cardName}
                    cardCorp={card.cardCorp}
                    altText={card.altTxt}
                    isChecked={memberCardIds.includes(card.id)}
                    index={index}
                    onCheck={() => checkHandler(card.id)}
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
                      let data = await fetch(
                        `http://localhost:8080/membercards/${uuid}`
                      );
                      let posts = await data.json();
                      setCardList(posts);
                      setIsLoading(true);
                    }}
                  >
                    카드불러오기
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
