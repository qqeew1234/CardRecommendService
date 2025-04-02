"use client";

import { CardItem } from "@/app/page05/page";
import "@/styles/PageHeader.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaTimesCircle } from "react-icons/fa";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClick = (removedId: string) => {
    const paramName = "selectedCardIds";
    const params = searchParams.get(paramName);
    if (!params) {
      return;
    }
    const ids = params
      .split(",")
      .filter((id) => id !== removedId)
      .join(",");
    console.log(ids);
    router.replace(`${pathname}?${paramName}=${ids}`);
  };

  return (
    <header>
      <div className="hgroup">
        <h6 className="num">{number}</h6>
        <h2 className="tit">
          {years}년 {months}월 내역
        </h2>
        <ul className="chip">
          {cardList.map(({ id, cardCorp, cardName }, index) => (
            <li key={index}>
              <span>
                [{cardCorp}] {cardName}
              </span>
              {cardList.length > 1 && (
                <span
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(id.toString());
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
