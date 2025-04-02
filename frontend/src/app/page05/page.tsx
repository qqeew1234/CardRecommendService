"use client";

import PageHeader from "@/components/PageHeader05";
import Link from "next/link";
import "@/styles/page05.scss";
import { useState, useEffect } from "react";
// import pageData from "@/json/cardHistoryResponses.json";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export type PaymentHistory = {
  cardName: string;
  cardCorp: string;
  storeName: string;
  amount: number;
  paymentDatetime: string;
  category: string;
  classification: string;
};

export type CardHistoryResponse = {
  date: string; // 예: "2025-02-01"
  paymentHistories: PaymentHistory[];
  dailyAmount: number;
};

export type DailyCardHistoryPageResponse = {
  cardHistoryResponses: CardHistoryResponse[];
  totalCost: number;
  page: number;
  totalPages: number;
  size: number;
  totalCount: number;
};

export default function Page05() {
  // const card = pageData.cardHistoryResponses;
  const [cards, setCards] = useState<CardHistoryResponse[]>([]);
  const [pages, setPages] = useState<DailyCardHistoryPageResponse | null>(null);
  const [selectedIds, setSelectedIds] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [cardList, setCardList] = useState<
    { cardCorp: string; cardName: string }[]
  >([]);

  const [hdProps, setHdProps] = useState({
    num: "05",
    years: "",
    months: "",
    // cardList: [] as { cardCorp: string; cardName: string }[],
    // { cardCorp: "현대카드", cardName: "the Red" },
    // { cardCorp: "삼성카드", cardName: "아멕스 블루" },
    // { cardCorp: "국민카드", cardName: "쿠팡" },
    // { cardCorp: "우리카드", cardName: "우리 사장님" },
    // { cardCorp: "신한카드", cardName: "내일배움" },
  });

  const searchParams = useSearchParams();

  // 쿼리스트링 감지
  useEffect(() => {
    const ids = searchParams.get("selectedCardIds");
    if (!ids || ids === "null") return;

    setSelectedIds(ids);

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/membercards/daily?selectedCardIds=${ids}`
      );
      const data: DailyCardHistoryPageResponse = await response.json();

      console.log("📦 받아온 데이터", data);

      setCards(data.cardHistoryResponses);
      setPages(data);

      // hdProps 구성
      if (data.cardHistoryResponses.length > 0) {
        const rawDate = data.cardHistoryResponses[0].date;
        let year = "2025";
        let month = "1";

        if (rawDate.includes("-")) {
          const [y, m] = rawDate.split("-");
          year = y;
          month = m;
        }

        const cardMap = new Map<
          string,
          { cardCorp: string; cardName: string }
        >();
        data.cardHistoryResponses.forEach((day) => {
          day.paymentHistories.forEach((payment) => {
            const key = `${payment.cardCorp}-${payment.cardName}`;
            if (!cardMap.has(key)) {
              cardMap.set(key, {
                cardCorp: payment.cardCorp,
                cardName: payment.cardName,
              });
            }
          });
        });

        setCardList(Array.from(cardMap.values()));
        setHdProps({
          num: "05",
          years: year.slice(2),
          months: String(parseInt(month)).padStart(1, "0"),
          // cardList: Array.from(cardMap.values()),
        });
      }
    };

    fetchData();
  }, [searchParams]);

  const handleFilterCard = (cardName: string) => {
    setSelectedFilter((prev) => (prev === cardName ? null : cardName));
  }

    const handleRemoveCard = (cardName: string) => {
      setCardList((prev) => prev.filter((c) => c.cardName !== cardName));
      if (selectedFilter === cardName) {
        setSelectedFilter(null);
      }
    };

    const filteredCards = cards.filter((card) =>
      card.paymentHistories.some((p) =>
        cardList.some(
          (c) => c.cardName === p.cardName && c.cardCorp === p.cardCorp
        )
      )
    );

    const finalCards = selectedFilter
      ? filteredCards.filter((card) =>
          card.paymentHistories.some((p) => selectedFilter)
        )
      : filteredCards;

    useEffect(() => {
      console.log("🟢 cardList", cardList);
      console.log("🟡 cards", cards);
      console.log("🔴 finalCards", finalCards);
    }, [cardList, cards, finalCards]);

    // const testCard = testData.cardHistoryResponses;
    return (
      <>
        <div className="page-head page-head-05">
          <PageHeader
            number={hdProps.num}
            years={hdProps.years}
            months={hdProps.months}
            cardList={cardList}
            selectedFilter={selectedFilter ?? undefined}
            onFilterCard={handleFilterCard}
            onRemoveCard={handleFilterCard}
          >
            <Link href={"/page04"}>
              <button>카드다시 선택하기</button>
            </Link>
            <Link href={"/page06"}>
              <button className="active">소비패턴 분석하기</button>
            </Link>
          </PageHeader>
          <div className="list-header">
            <div className="list-item list-item-01">이용일</div>
            <div className="list-item list-item-02">이용내역</div>
            <div className="list-item list-item-03">이용금액</div>
            <div className="list-item list-item-04">일별이용금액</div>
          </div>
        </div>
        <div className="page-body page-body-05">
          <section>
            {finalCards.length === 0 && (
              <p style={{ padding: "1rem", color: "red" }}>
                📭 내역이 없습니다.
              </p>
            )}
            {filteredCards.map((card, index) => (
              <div className="list-row" key={index}>
                <div className="list-item list-item-01">
                  <b>
                    {card.date.includes("-")
                      ? card.date.split("-")[2]
                      : card.date}
                  </b>{" "}
                  &nbsp;일
                </div>
                <div className="list-item list-item-02">
                  {card.paymentHistories.map((usage, i) => (
                    <div className="usageLog" key={i}>
                      <h4>{usage.storeName}</h4>
                      <p>
                        {usage.cardName},{usage.paymentDatetime},{"결제형태"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="list-item list-item-03">
                  {card.paymentHistories.map((payment, i) => (
                    <div className="payment" key={i}>
                      <b>{payment.amount.toLocaleString()}</b>원
                    </div>
                  ))}
                </div>
                <div className="list-item list-item-04 dayTotalPayment">
                  <b>{card.dailyAmount.toLocaleString()}</b>원
                </div>
              </div>
            ))}
            <button className="moreBtn">더보기</button>
          </section>
          <footer>
            <div className="total">
              <div className="totalCount">
                총<b>{pages?.totalCount?.toLocaleString() || 0}</b>건
              </div>
              <div className="totalCost">
                <b>{pages?.totalCost?.toLocaleString() || 0}</b>원
              </div>
            </div>
          </footer>
        </div>
      </>
    );
  };

