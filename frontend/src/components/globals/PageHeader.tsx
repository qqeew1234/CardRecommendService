export default function PageHeader({children}: {children: React.ReactNode}) {
  const header ={
    "pageNum": "01",
    "title": "CARD FIT",
    "description": "사용자의 소비 패턴, 라이프스타일, 금융 목표에 기반한 최적의 신용카드 추천 복잡한 카드 혜택 비교를 간소화하여 누구나 쉽게 자신에게 맞는 카드를 선택 가능",
  }
  return (
    <div className="pageHeader">
      <header>
        <div className="hdrLeft">
          <h3>{header.pageNum}</h3>
          <h2>{header.title}</h2>
          <p>{header.description}</p>
        </div>
        <div className="btns">
          {children}
        </div>
      </header>
    </div>
  );
}
