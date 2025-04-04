"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeaderCopy";
import cardOptionsData from "@/json/cardOptions.json";
import Image from "next/image";
import "@/styles/page08.scss";
import Link from "next/link";

export default function Page07() {
  const hd_props = {
    num: "08",
    tit: "카드 옵션 추가",
    des: "최대 5개까지 옵션을 추가하여 보다 적합한 카드를 추천 받을 수 있습니다.",
  };
  const cardOptions = cardOptionsData;

  // 선택된 카테고리 상태 (최대 5개)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  // 추천 카드 데이터 (백엔드에서 받아올 데이터)
  const [cardInf, setCardInf] = useState<any[]>([]);
  // 연회비 입력 상태 (문자열로 받아서 필요 시 숫자로 변환)
  const [minFee, setMinFee] = useState<string>("");
  const [maxFee, setMaxFee] = useState<string>("");

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

  // 연회비 및 카테고리 정보로 백엔드 추천 API 호출
  const fetchRecommendedCards = async () => {
    const min = Number(minFee);
    const max = Number(maxFee);

    const storeCategories = Array.from(checkedItems)
        .map(cat => `storeCategories=${encodeURIComponent(cat)}`)
        .join("&");

    const url = `http://localhost:8080/cards/recommend?minAnnualFee=${min}&maxAnnualFee=${max}&${storeCategories}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch failed:", response.status, errorText);
        return;
      }
      const data = await response.json();
      console.log("Recommended cards:", data);
      setCardInf(data.recommendedCards);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <>
        <div className="page-head page-head-08">
          <PageHeader
              number={hd_props.num}
              title={hd_props.tit}
              description={hd_props.des}
          >
            <Link href={"/page07"}>
              <button>소비패턴 돌아가기</button>
            </Link>
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
                    {/* 연회비 조회 버튼 클릭 시 추천 API 호출 */}
                    <button onClick={fetchRecommendedCards}>조회</button>
                  </h4>
                  <div className="otps-category-group">
                    <input
                        type="text"
                        placeholder="최소연회비"
                        value={minFee}
                        onChange={(e) => setMinFee(e.target.value)}
                    />
                    <span>~</span>
                    <input
                        type="text"
                        placeholder="최대연회비"
                        value={maxFee}
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
                {cardInf.length === 0 ? (
                    <p>추천된 카드가 없습니다. 옵션을 선택하고 조회 버튼을 눌러주세요.</p>
                ) : (
                    cardInf.map((card, idx) => (
                        <article className="card-box" key={idx}>
                          <div className="card-img">
                            <Image
                                src={card.cardImg}
                                alt=""
                                width={340}
                                height={0}
                                style={{ width: "auto", height: "auto" }}
                            />
                          </div>
                          <div className="card-inf">
                            <h4>{card.cardName}</h4>
                            <h5>[{card.cardCorp}]</h5>
                            <ul>
                              {card.discount1 && <li>{card.discount1}</li>}
                              {card.discount2 && <li>{card.discount2}</li>}
                              {card.discount3 && <li>{card.discount3}</li>}
                            </ul>
                            <p>전월실적 {card.annualFee}만원 이상</p>
                          </div>
                        </article>
                    ))
                )}
              </div>
            </div>
          </section>
        </div>
      </>
  );
}
