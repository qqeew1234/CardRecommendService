"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeaderCopy";
import cardOptionsData from "@/json/cardOptions.json";
import Image from "next/image";
import "@/styles/page08.scss";
import Link from "next/link";
export default function Page07() {
  const hd_props = {
    num: "07",
    tit: "소비패턴 분석결과",
    des: "최대 5개까지 옵션을 추가하여 보다 적합한 카드를 추천 받을 수 있습니다.",
  };

  return (
    <>
      <div className="page-head page-head-08">
        <PageHeader
          number={hd_props.num}
          title={hd_props.tit}
          description={hd_props.des}
        >
          <Link href={"/page06"}>
            <button>소비패턴 돌아가기</button>
          </Link>
          <Link href={"/page08"}>
            <button className="active">카드옵션 추가하기</button>
          </Link>
        </PageHeader>
      </div>
      <div className="page-body page-body-08">
        <section></section>
      </div>
    </>
  );
}
