"use client";
import { useState } from "react";
import "@/styles/PageHeader.scss";
import { FaTimesCircle } from "react-icons/fa";

interface CardItem {
  cardCorp: string;
  cardName: string;
}

interface PageHeaderProps {
  number: string;
  years: string;
  months: string;
  cardList: CardItem[];
  children: React.ReactNode;
  selectedFilter?: string; // ✅ 선택된 필터값
  onFilterCard?: (cardName: string) => void;
  onRemoveCard?: (cardName: string) => void;
}

export default function PageHeader05({
  number,
  years,
  months,
  cardList,
  children,
  selectedFilter,
  onFilterCard,
  onRemoveCard,
}: PageHeaderProps) {
  // const [cards, setCards] = useState<CardItem[]>(cardList);
  // const removeCard = (index: number) => {
  //   if (cardList.length > 1) {
  //     setCards(cardList.filter((_, i) => i !== index));
  //   }
  // };

  return (
    <header>
      <div className="hgroup">
        <h6 className="num">{number}</h6>
        <h2 className="tit">
          {years}년 {months}월 내역
        </h2>
        <ul className="chip">
          {cardList.map(({ cardCorp, cardName }, index) => (
            <li
              key={index}
              className={selectedFilter === cardName ? "active" : ""}
              onClick={() => onFilterCard?.(cardName)}
            >
              <span>
                [{cardCorp}] {cardName}
              </span>
              {cardList.length > 1 && (
                <span
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveCard?.(cardName);
                  }}
                >
                  <FaTimesCircle />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="btngroup">{children}</div>
    </header>
  );
}
