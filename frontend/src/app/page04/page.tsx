import PageHeader from "@/components/PageHeader04";
import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare, FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

import "@/styles/page04.scss";
import CardItem from "@/components/CardItem";
import cardPayment from "@/json/cardPayment.json";
export default function page04() {
  const hd_props = {
    num: "04",
  };
  const testCardPayment = cardPayment;
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
      <div className="page-head page-head-04">
        <PageHeader
          number={hd_props.num}
          cardName={testCardPayment.cardName}
          totalPayment={testCardPayment.cardTotalPayment.toLocaleString()}
          card_date={[
            {
              yy: testCardPayment.paymentDates.year,
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
        <div className="art-header">
          <div className="hdr-left">
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
                {testCardList.map((card, index) => (
                  <CardItem
                    cardImg={card.cardImg}
                    cardName={card.cardName}
                    cardCorp={card.cardCorp}
                    altText={card.altTxt}
                    isChecked={true}
                    index={index}
                    key={index}
                  />
                ))}
              </article>
            </div>
          </div>
          <div className="art-box">
            <div className="art-wrap art-wrap-right">
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
                          {card.payment.toLocaleString()}
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
