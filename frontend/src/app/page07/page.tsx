"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeaderCopy";
import cardOptionsData from "@/json/cardOptions.json";
import Image from "next/image";
import "@/styles/page07.scss";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// export type CardPayment = {
//   cardHistoryId: number;
//   cardName: string;
//   cardCorp: string;
//   storeName: string;
//   amount: number;
//   paymentDatetime: string; // ISO 8601 형식
//   category: string;
//   classificationId: number;
// };

// export type Response = {
//   setCardHistoriesResponses: CardPayment[];
//   startDate: string;
//   endDate: string;
//   classificationCost: number;
//   totalCost: number;
//   percent: number;
// };

export type classificationResponse = {
  classificationId: number;
  title: string;
  percent: number;
};

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

  const searchParams = useSearchParams();
  const [cardHistories, setCardHistories] = useState<Response | null>(null);
  const [chart, setChart] = useState<classificationResponse[]>([]);
  const router = useRouter();
  const supabase = createClient();

  //첫화면 fetch
  useEffect(() => {
    const idsParam = searchParams.get("selectedCardIds");
    if (!idsParam) return;

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

      const fetchData = async () => {
        const res = await fetch(
          `http://localhost:8080/membercards/classifications/analyzed?selectedCardIds=${idsParam}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );

        const data: classificationResponse[] = await res.json();
        console.log("#########카드데이터 확인", data);

        setChart(data);
      };
      fetchData();
    }
    getCheckedCards();
  }, [searchParams]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(
        `/page06?selectedCardIds=${searchParams.get("selectedCardIds")}`
      );
    }
  };

  return (
    <>
      <div className="page-head page-head-07">
        <PageHeader
          number={hd_props.num}
          title={hd_props.tit}
          description={hd_props.des}
        >
          <Link href={"/page06"}>
            <button onClick={handleBack}>소비분석 돌아가기</button>
          </Link>
          {/* <Link href={"/page08"}> */}
          <button
            className="active"
            onClick={() => {
              router.push(
                `/page08?selectedCardIds=${searchParams.get("selectedCardIds")}`
              );
            }}
          >
            카드옵션 추가하기
          </button>
          {/* </Link> */}
        </PageHeader>
      </div>
      <div className="page-body page-body-07">
        <section>
          <div className="art-wrap-left">
            {chart.map((data, idx) => {
              console.log("✔️chart 확인", data);
              return (
                <article key={idx}>
                  <h4>
                    <span className="blet"></span>
                    {data.title}
                  </h4>
                  <div className="percent">
                    {data.percent.toFixed(2)}
                    <span>%</span>
                  </div>
                </article>
              );
            })}
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
