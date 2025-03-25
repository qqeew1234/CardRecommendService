import PageHeader from "@/components/PageHeader";

export default function page02() {
  const hd_props = {
    num: "02",
    tit: "내 카드 불러오기",
    des: "소지하신 카드를 불러와 소비패턴 분석을 하거나 기간별 사용내역을 조회할 수 있습니다.",
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
