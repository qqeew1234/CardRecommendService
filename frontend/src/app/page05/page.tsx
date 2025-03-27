import PageHeader from "@/components/PageHeader05";
import Link from "next/link";
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
  return (
    <>
      <PageHeader
        num={hdProps.num}
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
      <div className="page-body p05">
        <section>
          <div className="list-header">
            <div className="list-item day">이용일</div>
            <div className="list-item des">이용내역</div>
            <div className="list-item pay">이용금액</div>
            <div className="list-item total">일별이용금액</div>
          </div>
          <div className="list-row">
            <div className="list-item day"></div>
            <div className="list-item des"></div>
            <div className="list-item pay"></div>
            <div className="list-item total"></div>
          </div>
        </section>
      </div>
    </>
  );
}
