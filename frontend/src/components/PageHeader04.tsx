import "@/styles/PageHeader.scss";

interface PaymentDate {
  yy: number;
  mm: number;
  sd: number;
  ed: number;
}

interface PageHeaderProps {
  number: string;
  cardName: string;
  totalPayment: string;
  card_date: PaymentDate[]; // 배열 형태
  children: React.ReactNode;
}

export default function PageHeader04({
  number,
  cardName,
  totalPayment,
  card_date,
  children,
}: PageHeaderProps) {
  const { yy, mm, sd, ed } =
    card_date.length > 0 ? card_date[0] : { yy: 0, mm: 0, sd: 0, ed: 0 };

  return (
    <header>
      <div className="hgroup">
        <h6 className="num">{number}</h6>
        <h3 className="name">{cardName}</h3>
        <h2 className="tit">
          {totalPayment}
          <span style={{ fontSize: ".6em", color: "#666" }}>원</span>
        </h2>
        {yy > 0 && mm > 0 && (
          <h5 className="date">
            {yy}년 {mm}월 {sd}일 ~ {ed}일 사용내역
          </h5>
        )}
      </div>
      <div className="btngroup">{children}</div>
    </header>
  );
}
