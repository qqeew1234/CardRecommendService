"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeaderCopy";
import cardOptionsData from "@/json/cardOptions.json";
import Image from "next/image";
import "@/styles/page07.scss";
import Link from "next/link";
export default function Page07() {
  const hd_props = {
    num: "08",
    tit: "카드 옵션 추가",
    des: "최대 5개까지 옵션을 추가하여 보다 적합한 카드를 추천 받을 수 있습니다.",
  };
  const cardOptions = cardOptionsData;
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

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
          <Link href={"/page09"}>
            <button className="active">맞춤카드 추천받기</button>
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
                  <button>조회</button>
                </h4>
                <div className="otps-category-group">
                  <input type="text" placeholder="최소연회비" />
                  <span>~</span>
                  <input type="text" placeholder="최대연회비" />
                </div>
              </article>
              {cardOptions.map((category, index) => (
                <article className="opts-category" key={index}>
                  <h4>
                    <span>{category.optionName}</span>
                    <button>조회</button>
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
            <div className="cardResult">
              {
                <article>
                  <h4>추천카드</h4>
                  <div className="">
                    <div className="">
                      <div className="card-img"></div>
                      <div className="card-inf">
                        <h4>카드이름</h4>
                        <h5>[카드회사]</h5>
                        <ul>
                          <li>혜택종류</li>
                          <li>혜택종류</li>
                          <li>혜택종류</li>
                        </ul>
                        <p>전월실적 30만원 이상</p>
                      </div>
                    </div>
                  </div>
                </article>
              }
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
