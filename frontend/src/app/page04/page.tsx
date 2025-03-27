import PageHeader from "@/components/PageHeader04";
import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare, FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

import "@/styles/page04.scss";
import CardItem from "@/components/CardItem";
export default function page04() {
  const hd_props = {
    num: "04",
  };
  const testCardPayment = {
    cardName: "the Red",
    cardTotalPayment: "1,800,000",
    paymentDates: {
      years: 2024,
      month: 2,
      startDay: 1,
      endDay: 29,
    },
    usageLog: [
      {
        usagePoint: "카드사용처",
        cardName: "카드이름",
        authDate: "결제승인일",
        voidDate: "결제취소일",
        payType: "결제형태",
        payment: "결제금액",
      },
      {
        usagePoint: "CU편의점 정발산점",
        cardName: "the Red",
        authDate: "2025-03-22 10:24",
        voidDate: null,
        payType: "일시불",
        payment: "23,400",
      },
      {
        usagePoint: "스타벅스 정발산점",
        cardName: "the Red",
        authDate: "2025-03-22 10:43",
        voidDate: null,
        payType: "일시불",
        payment: "4,500",
      },
      {
        usagePoint: "맛있는 손칼국수",
        cardName: "the Red",
        authDate: "2025-03-22 12:24",
        voidDate: null,
        payType: "일시불",
        payment: "6,000",
      },
      {
        usagePoint: "CU편의점 정발산점",
        cardName: "the Red",
        authDate: "2025-03-23 12:31",
        voidDate: null,
        payType: "일시불",
        payment: "4,400",
      },
    ],
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
      <PageHeader
        number={hd_props.num}
        card_goods={testCardPayment.cardName}
        total_coast={testCardPayment.cardTotalPayment}
        card_date={[
          {
            yy: testCardPayment.paymentDates.years,
            mm: testCardPayment.paymentDates.month,
            sd: testCardPayment.paymentDates.startDay,
            ed: testCardPayment.paymentDates.endDay,
          },
        ]}
      >
        <Link href={"/page03"}>
          <button>카드목록보기</button>
        </Link>
        <Link href={"/page05"}>
          <button className="active">분석데이타보기</button>
        </Link>
      </PageHeader>
      <div className="page-body p04">
        <section>
          <div className="art-wrap art-wrap-left">
            <div className="art-head">
              <div className="selectMonth">
                <label>
                  <input type="radio" name="cardMonth" defaultChecked />
                  <MdRadioButtonUnchecked />
                  <MdRadioButtonChecked />
                  <span>24년 12월</span>
                </label>
                <label>
                  <input type="radio" name="cardMonth" />
                  <MdRadioButtonUnchecked />
                  <MdRadioButtonChecked />
                  <span>25년 1월</span>
                </label>
                <label>
                  <input type="radio" name="cardMonth" />
                  <MdRadioButtonUnchecked />
                  <MdRadioButtonChecked />
                  <span>25년 2월</span>
                </label>
              </div>
            </div>
            {testCardList.map((card, index) => (
              <article className="card-box" key={index}>
                <CardItem
                  cardImg={card.cardImg}
                  cardName={card.cardName}
                  cardCorp={card.cardCorp}
                  altText={card.altTxt}
                  isChecked={true}
                  index={index}
                />
              </article>
            ))}
          </div>
          <div className="art-wrap art-wrap-right">
            <div className="art-head">
              <h4>이용내역</h4>
            </div>
            <div className="card-payment-box">
              <ul className="card-payment-list">
                {testCardPayment.usageLog.map((card, index) => (
                  // usagePoint: "스타벅스 정발산점",
                  // cardName: "the Red",
                  // authDate: "2025-03-22 10:43",
                  // voidDate: null,
                  // payType: "일시불",
                  // payment: "4,500",
                  <li key={index}>
                    <div className="list-left">
                      <h5>{card.usagePoint}</h5>
                      <p>
                        {card.cardName}, {card.authDate}, {card.payType}
                      </p>
                    </div>
                    <div className="list-right">
                      <h5>
                        {card.payment}
                        <span> 원</span>
                      </h5>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
