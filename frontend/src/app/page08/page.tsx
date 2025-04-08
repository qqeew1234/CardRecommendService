"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeaderCopy";
import cardOptionsData from "@/json/cardOptions.json";
import Image from "next/image";
import "@/styles/page08.scss";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export type CardRecommendResponse = {
  cardName: string;
  cardCorp: string;
  imgUrl: string;
  annualFee: number;
  store1: string;
  discount1: string;
  store2: string;
  discount2: string;
  store3: string;
  discount3: string;
};

interface Category {
  optionItems: { optItemName: string }[];
}

interface Props {
  category: Category;
}

export default function Page08() {
  const hd_props = {
    num: "08",
    tit: "카드 옵션 추가",
    des: "최대 5개까지 옵션을 추가하여 보다 적합한 카드를 추천 받을 수 있습니다.",
  };
  const cardOptions = cardOptionsData;
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [cardInf, setCardInf] = useState<CardRecommendResponse[]>([]);
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  // const [cardInf, setCardInf] = useState([
  //   {
  //     cardName: "카드명",
  //     cardCorp: "카드회사",
  //     cardImg: "/cardImg/cardimg2.png",
  //     discount1: "주유할인 10%",
  //     discount2: "포인트적립 20%",
  //     discount3: "편의점 할인 10%",
  //     annualFee: "30",
  //   },
  //   {
  //     cardName: "카드명",
  //     cardCorp: "카드회사",
  //     cardImg: "/cardImg/cardimg3.png",
  //     discount1: "주유할인 10%",
  //     discount2: "포인트적립 20%",

  //     annualFee: "30",
  //   },
  //   {
  //     cardName: "카드명",
  //     cardCorp: "카드회사",
  //     cardImg: "/cardImg/cardimg4.png",
  //     discount1: "주유할인 10%",
  //     discount2: "포인트적립 20%",
  //     discount3: "편의점 할인 10%",
  //     annualFee: "30",
  //   },
  // ]);

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

      const fetchCardInf = async () => {
        const response = await fetch(
          `http://localhost:8080/cards/recommendation?selectedCardIds=${idsParam}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        const data: CardRecommendResponse[] = await response.json();
        console.log("📦 받아온 카드 추천 데이터", data);
        setCardInf(data);
      };
      fetchCardInf();
    }
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);

      if (checked) {
        if (newCheckedItems.size < 5) {
          newCheckedItems.add(name);
        }
      } else {
        newCheckedItems.delete(name);
      }

      return newCheckedItems;
    });
  };

  const handleAnnualFee = async () => {
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

    const response = await fetch(
      `http://localhost:8080/cards/recommendations?selectedCardIds=${searchParams.get(
        "selectedCardIds"
      )}&minAnnualFee=${Number(minFee)}&maxAnnualFee=${Number(maxFee)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    const data: CardRecommendResponse[] = await response.json();
    console.log("📦 받아온 카드 추천 데이터", data);
    setCardInf(data);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(
        `/page06?selectedCardIds=${searchParams.get("selectedCardIds")}`
      );
    }
  };

  useEffect(() => {
    const fetchCardInf = async () => {
      const categories = Array.from(checkedItems).join(",");
      console.log("체크된 옵션", categories);

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

      const response = await fetch(
        `http://localhost:8080/cards/recommendations?selectedCardIds=${searchParams.get(
          "selectedCardIds"
        )}${categories && `&categories=${categories}`}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      const data: CardRecommendResponse[] = await response.json();
      console.log("📦 받아온 카드 추천 데이터", data);
      setCardInf(data);
    };
    fetchCardInf();
  }, [checkedItems]);

  return (
    <>
      <div className="page-head page-head-08">
        <PageHeader
          number={hd_props.num}
          title={hd_props.tit}
          description={hd_props.des}
        >
          {/* <Link href={"/page07"}> */}
          <button onClick={handleBack}>소비패턴 돌아가기</button>
          {/* </Link> */}
          <Link href={"/"}>
            <button className="active">시작으로 돌아가기</button>
          </Link>
        </PageHeader>
      </div>
      <div className="page-body page-body-08">
        <section>
          <div className="sect-left">
            <div className="options">
              <article className="option-membership">
                <h4>
                  <span>연회비</span>
                  <button
                    // onClick={() => {
                    //   router.push(
                    //     `page08?selectedCardIds=${searchParams.get(
                    //       "selectedCardIds"
                    //     )}&minAnnualFee=${minFee}&maxAnnualFee=${maxFee}`
                    //   );
                    // }}
                    onClick={handleAnnualFee}
                  >
                    조회
                  </button>
                </h4>
                <div className="otps-category-group">
                  <input
                    type="text"
                    placeholder="최소연회비"
                    onChange={(e) => setMinFee(e.target.value)}
                  />
                  <span>~</span>
                  <input
                    type="text"
                    placeholder="최대연회비"
                    onChange={(e) => setMaxFee(e.target.value)}
                  />
                </div>
              </article>
              {cardOptions.map((category, index) => (
                <article className="opts-category" key={index}>
                  <h4>
                    <span>{category.optionName}</span>
                  </h4>
                  <div className="opts-category-group">
                    {category.optionItems.map((item, idx) => (
                      <div className="opts-category-item" key={idx}>
                        <input
                          type="checkbox"
                          id={item.optItemName}
                          name={item.optItemName}
                          checked={checkedItems.has(item.optItemName)}
                          onChange={handleCheckboxChange}
                          disabled={
                            !checkedItems.has(item.optItemName) &&
                            checkedItems.size >= 5
                          }
                        />
                        <label htmlFor={item.optItemName}>
                          <span>
                            <Image
                              src={item.optItemIcon}
                              alt=""
                              height={0}
                              width={0}
                              style={{ width: "auto", height: "16px" }}
                            />
                            {item.optItemName}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="sect-right">
            <div className="card-result">
              {cardInf.map((card, idx) => (
                <article className="card-box" key={idx}>
                  <div className="card-img">
                    <Image
                      src={card.imgUrl}
                      alt=""
                      width={340}
                      height={340}
                      // layout="ratio"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="card-inf">
                    <h4>{card.cardName}</h4>
                    <h5>[{card.cardCorp}]</h5>
                    <ul>
                      <li>
                        {card.store1} - {card.discount1}
                      </li>
                      <li>
                        {card.store2} - {card.discount2}
                      </li>
                      <li>
                        {card.store3} - {card.discount3}
                      </li>
                    </ul>
                    <p> 연회비 {card.annualFee.toLocaleString()}원</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
