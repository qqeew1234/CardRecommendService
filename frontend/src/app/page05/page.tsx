import PageHeader from "@/components/PageHeader04";
export default function page05() {
  const hd_props = {
    num: "04",
    goods: "My Card",
    coast: "1,000,000",
    dates: "2024년 2월 1일 ~ 29일 사용내역",
  };
  return (
    <>
      <PageHeader
        number={hd_props.num}
        card_goods={hd_props.goods}
        total_coast={hd_props.coast}
        card_date={hd_props.dates}
      >
        <></>
      </PageHeader>
      <div className="page-body p05">
        <section></section>
      </div>
    </>
  );
}
