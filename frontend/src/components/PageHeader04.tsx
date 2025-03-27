import "@/styles/PageHeader.scss";

interface PaymentDate {
  yy: number;
  mm: number;
  sd: number;
  ed: number;
}

interface PageHeaderProps {
  number: string;
  card_goods: string;
  total_coast: string;
  card_date: PaymentDate[]; // 배열 형태
  children: React.ReactNode;
}

export default function PageHeader04({
  number,
  card_goods,
  total_coast,
  card_date,
  children,
}: PageHeaderProps) {
  // 첫 번째 결제 정보만 사용 (card_date가 비어있을 경우 기본값 설정)
  const { yy, mm, sd, ed } =
    card_date.length > 0 ? card_date[0] : { yy: 0, mm: 0, sd: 0, ed: 0 };

  return (
    <div className="page-header page-header-04">
      <header>
        <div className="hdr-left">
          <h6>{number}</h6>
          <h3>{card_goods}</h3>
          <h2>{total_coast}</h2>
          {yy > 0 && mm > 0 && (
            <h5>
              {yy}년 {mm}월 {sd}일 ~ {ed}일 사용내역
            </h5>
          )}
        </div>
        <div className="hdr-right">{children}</div>
      </header>
    </div>
  );
}
