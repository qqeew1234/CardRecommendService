import PageHeader from "@/components/PageHeader";

export default function page02() {
  const hd_props = {
    num: "02",
    tit: "내 카드 불러오기",
    des: "카드를 선택하여 소비패턴을 분석하거나 기간별 사용 내역을 조회할수 있습니다.",
  };
  return (
    <>
      <PageHeader
        number={hd_props.num}
        title={hd_props.tit}
        description={hd_props.des}
      >
        <></>
      </PageHeader>
      <div className="page-body">
        <section></section>
      </div>
    </>
  );
}
