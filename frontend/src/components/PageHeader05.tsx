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
}

export default function PageHeader05({
  number,
  years,
  months,
  cardList,
  children,
}: PageHeaderProps) {
  const [cards, setCards] = useState<CardItem[]>(cardList);
  const removeCard = (index: number) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, i) => i !== index));
    }
  };

  return (
    <header>
      <div className="hgroup">
        <h6 className="num">{number}</h6>
        <h2 className="tit">
          {years}년 {months}월 내역
        </h2>
        <ul className="chip">
          {cards.map(({ cardCorp, cardName }, index) => (
            <li key={index}>
              <span>
                [{cardCorp}] {cardName}
              </span>
              {cards.length > 1 && (
                <span className="btn" onClick={() => removeCard(index)}>
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
