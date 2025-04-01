"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeaderCopy";
import cardOptionsData from "@/json/cardOptions.json";
import Image from "next/image";
import "@/styles/page07.scss";
import Link from "next/link";
export default function Page07() {
  const hd_props = {
    num: "07",
    tit: "소비패턴 분석결과",
    des: "결제내역을 분석하여 소비패턴 결과를 보여줍니다.",
  };
  const [testChart, setTestChart] = useState([
    {
      spendingName: "임시항목",
      spendingValue: 0,
    },
    {
      spendingName: "임시항목",
      spendingValue: 0,
    },
    {
      spendingName: "임시항목",
      spendingValue: 0,
    },
    {
      spendingName: "임시항목",
      spendingValue: 0,
    },
    {
      spendingName: "임시항목",
      spendingValue: 0,
    },
    {
      spendingName: "임시항목",
      spendingValue: 0,
    },
    {
      spendingName: "임시항목",
      spendingValue: 0,
    },
  ]);
  return (
    <>
      <div className="page-head page-head-07">
        <PageHeader
          number={hd_props.num}
          title={hd_props.tit}
          description={hd_props.des}
        >
          <Link href={"/page06"}>
            <button>소비분석 돌아가기</button>
          </Link>
          <Link href={"/page08"}>
            <button className="active">카드옵션 추가하기</button>
          </Link>
        </PageHeader>
      </div>
      <div className="page-body page-body-07">
        <section>
          <div className="art-wrap-left">
            {testChart.map((data, idx) => (
              <article key={idx}>
                <h4>
                  <span className="blet"></span>
                  {data.spendingName}
                </h4>
                <div className="percent">
                  {data.spendingValue}
                  <span>%</span>
                </div>
              </article>
            ))}
          </div>
          <div className="art-wrap-right">
            <div className="diagram"></div>
            <div className="diagram-inf"></div>
          </div>
        </section>
      </div>
    </>
  );
}
