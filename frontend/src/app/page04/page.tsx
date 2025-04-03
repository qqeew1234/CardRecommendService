"use client";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader04";
import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare, FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

import "@/styles/page04.scss";
import CardItem from "@/components/CardItem";
import cardPayment from "@/json/cardPayment.json";

type Card = {
  index: number;
  id: number;
  cardName: string;
  cardCorp: string;
  cardImg: string;
  memberCardId: number;
  altTxt: string;
};

type CardPayment = {
  cardName: string;
  cardCorp: string;
  storeName: string;
  amount: number;
  paymentDatetime: string; // ISO 8601 형식의 문자열
  payType: string;
  category: string;
  classification: string;
};

type PageInfo = {
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
};

type Response = {
  cardHistoryResponseList: CardPayment[];
  startDate: string; // 예: "2025-02-01"
  endDate: string; // 예: "2025-02-28"
  totalCost: number;
  page: PageInfo;
};

const hd_props = {
  num: "04",
};

const monthOptions = [
  { label: "25년 1월", offset: 3 },
  { label: "25년 2월", offset: 2 },
  { label: "25년 3월", offset: 1 },
];

export default function page04() {
  const hd_props = {
    num: "04",
  };

  const searchParams = useSearchParams();
  const [cardList, setCardList] = useState<Card[]>([]);
  const [paymentList, setPaymentList] = useState<CardPayment[]>([]);
  const [cardResponse, setCardResponse] = useState<Response | null>(null);
  const [pageInfo, setPageInfo] = useState<PageInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selcetedCardIds, setSelectedCardIds] = useState<number[]>(
    searchParams
      .get("memberCardId")!
      .split(",")
      .map((id) => Number(id))
  );

  const router = useRouter();

  //query에서 받은 값
  // const queryMemberCardIds = searchParams.get("memberCardId");
  // const memberCardIds = useMemo(() => {
  //   return queryMemberCardIds ? queryMemberCardIds.split(",").map(Number) : [];
  // }, [queryMemberCardIds]);

  const selectedCardIds = Number(searchParams.get("selectedCardId")); // 하나의 카드 선택값
  // console.log("🔍 searchParams.get('memberCardIds'):", queryMemberCardIds);
  // console.log("🔍 searchParams.get('selectedCardIds'):", selectedCardIds);

  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [monthOffset, setMonthOffset] = useState<number>(1);
  // console.log("Response", cardResponse?.totalCost);

  //카드목록 보여주기
  useEffect(() => {
    async function fetchCardList() {
      const queryString = `?memberCardIds=${selcetedCardIds.join(",")}`;
      const response = await fetch(
        `http://localhost:8080/membercards${queryString}`
      );
      const fetchedCardList = await response.json();
      setCardList(fetchedCardList);
      setIsLoading(false);
    }
    fetchCardList();
  }, []);

  //카드 사용내역 가져오기
  useEffect(() => {
    async function fetchPaymentDetails() {
      if (!selectedCardIds) return; // 선택된 카드가 없으면 종료

      const selectedCardIdsString = Array.isArray(selectedCardIds)
        ? selectedCardIds.join(",")
        : selectedCardIds;

      const page = 1; // Default page number
      const size = 13; // Default size per page
      const queryString = `?selectedCardIds=${encodeURIComponent(
        selectedCardIdsString
      )}&monthOffset=${monthOffset}&page=${page}&size=${size}`;
      const response = await fetch(
        `http://localhost:8080/membercards/histories/selected${queryString}`
      );
      const data = await response.json();
      console.log("API 응답 데이터:", data);

      setCardResponse(data);
      setPaymentList(data.cardHistoryResponseList);
    }
    fetchPaymentDetails();
  }, [selectedCardIds, monthOffset]);

  //다른 카드 선택할 때 이용내역 새로 갱신
  const cardSelectHandler = (cardId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("selectedCardId", cardId.toString());

    router.replace(`/page04?${params.toString()}`);
    router.refresh();
  };

  //카드 월별 사용내역 보여주기
  const handleMonthChange = (offset: number) => {
    setMonthOffset(offset);
  };

  //page05로 보낼 체크된 카드 핸들러
  const checkedHandler = (id: number) => {
    setSelectedCardIds(
      (prev) =>
        prev.includes(id) //이전 배열이 id를 이미 포함하고 있으면
          ? prev.filter((x) => x !== id) //id 제거
          : [...prev, id] //아니면 추가
    );
    const params = new URLSearchParams(searchParams.toString());
    params.set("selectedCardId", id.toString());

    router.replace(`/page04?${params.toString()}`);
    router.refresh();
  };

  //ruter.push
  const submitHandler = () => {
    const queryString = `?selectedCardIds=${selcetedCardIds.join(",")}`;
    router.push(`page05${queryString}`);
  };

  const testCardPayment = cardPayment;
  const testCardList = [];
  return (
    <>
      <div className="page-head page-head-04">
        <PageHeader
          number={hd_props.num}
          cardName={paymentList.length > 0 ? paymentList[0].cardName : ""}
          totalPayment={(cardResponse?.totalCost ?? 0).toLocaleString()}
          card_date={
            cardResponse
              ? [
                  {
                    // yy: testCardPayment.paymentDates.year,
                    // mm: testCardPayment.paymentDates.month,
                    // sd: testCardPayment.paymentDates.startDay,
                    // ed: testCardPayment.paymentDates.endDay,
                    yy: Number(cardResponse.startDate.split("-")[0]),
                    mm: Number(cardResponse.startDate.split("-")[1]),
                    sd: Number(cardResponse.startDate.split("-")[2]),
                    ed: Number(cardResponse.endDate.split("-")[2]),
                  },
                ]
              : [
                  {
                    yy: 0,
                    mm: 0,
                    sd: 0,
                    ed: 0,
                  },
                ]
          }
        >
          <Link href={"/page03"}>
            <button>카드목록보기</button>
          </Link>
          {/* <Link href={"/page05"}> */}
          <button className="active" onClick={submitHandler}>
            {" "}
            분석데이타보기
          </button>
          {/* </Link> */}
        </PageHeader>
        <div className="art-header">
          <div className="hdr-left">
            {monthOptions.map((option, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name="cardMonth"
                  checked={monthOffset === option.offset}
                  onChange={() => setMonthOffset(option.offset)}
                />
                <MdRadioButtonUnchecked
                  style={{
                    display: monthOffset === option.offset ? "none" : "inline",
                  }}
                />
                <MdRadioButtonChecked
                  style={{
                    display: monthOffset === option.offset ? "inline" : "none",
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <div className="hdr-right">
            <h4>이용내역</h4>
          </div>
        </div>
      </div>

      <div className="page-body page-body-04">
        <section>
          <div className="art-box">
            <div className="art-wrap art-wrap-left">
              <article className="card-wrap">
                {isLoading ? (
                  <p>카드를 불러오는 중</p>
                ) : (
                  cardList.map((card, index) => (
                    <CardItem
                      cardId={card.id}
                      cardImg={card.cardImg}
                      cardName={card.cardName}
                      cardCorp={card.cardCorp}
                      altText={card.altTxt}
                      isChecked={true}
                      index={index}
                      key={card.id}
                      onClick={() => cardSelectHandler(card.id)}
                      onCheck={() => checkedHandler(card.id)}
                      // onCheck={() => cardSelectHandler(card.id)}
                      totalCost={paymentList
                        .filter((p) => p.cardName === card.cardName)
                        .reduce((acc, cur) => acc + cur.amount, 0)}
                    />
                  ))
                )}
              </article>
            </div>
          </div>
          <div className="art-box">
            <div className="art-wrap art-wrap-right">
              <div className="card-payment-box">
                <ul className="card-payment-list">
                  {paymentList.map((payment, index) => (
                    // usagePoint: "스타벅스 정발산점",
                    // cardName: "the Red",
                    // authDate: "2025-03-22 10:43",
                    // voidDate: null,
                    // payType: "일시불",
                    // payment: "4,500",
                    <li key={index}>
                      <div className="list-left">
                        <h5>{payment.storeName}</h5>
                        <p>
                          {payment.cardName}, {payment.paymentDatetime},
                          {payment.payType}
                        </p>
                      </div>
                      <div className="list-right">
                        <h5>
                          {payment.amount.toLocaleString()}
                          <span> 원</span>
                        </h5>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
