import { Children } from "react";
import "@/styles/PageHeader.scss";

interface myType {
  number: string;
  card_goods: string;
  total_coast: string;
  card_date: string;
  children: React.ReactNode;
}

export default function PageHeader04({
  number,
  card_goods,
  total_coast,
  card_date,
  children,
}: myType) {
  return (
    <div className="page-header page-header-04">
      <header>
        <div className="hdr-left">
          <h6>{number}</h6>
          <h3>{card_goods}</h3>
          <h2>{total_coast}</h2>
          <h5>{card_date}</h5>
        </div>
        <div className="hdr-right">{children}</div>
      </header>
    </div>
  );
}
