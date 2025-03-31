import PageHeader from "@/components/PageHeader05";
import testData from "@/json/cardHistoryResponses.json";
import Link from "next/link";
import "@/styles/page05.scss";
export default function page05() {
  const hdProps = {
    num: "05",
    years: "25",
    months: "2",
    cardList: [
      { cardCorp: "현대카드", cardName: "the Red" },
      { cardCorp: "삼성카드", cardName: "아멕스 블루" },
      { cardCorp: "국민카드", cardName: "쿠팡" },
      { cardCorp: "우리카드", cardName: "우리 사장님" },
      { cardCorp: "신한카드", cardName: "내일배움" },
    ],
  };
  const testCard = testData.cardHistoryResponses;
  return (
    <>
      <div className="page-head page-head-05">
        <PageHeader
          number={hdProps.num}
          years={hdProps.years}
          months={hdProps.months}
          cardList={hdProps.cardList}
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
          {testCard.map((card, index) => (
            <div className="list-row" key={index}>
              <div className="list-item list-item-01">
                <b>{card.date}</b> &nbsp;일
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
              총<b>{testData.totalCount.toLocaleString()}</b>건
            </div>
            <div className="totalCost">
              <b>{testData.totalCost.toLocaleString()}</b>원
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
