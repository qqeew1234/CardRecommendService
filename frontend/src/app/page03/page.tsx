import PageHeader from "@/components/PageHeader";

export default function page02() {
  const hd_props = {
    num: "04",
    tit: "소비패턴분석목록",
    des: "카드를 클릭하면 월별 소비내역을 확인할수 있습니다.",
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
