import PageHeader from "@/components/PageHeader";
export default function page08() {
  const hd_props = {
    num: "08",
    tit: "맞춤 카드 추천",
    des: "최대 5개까지 옵션을 추가하여 보다 적합한 카드를 추천 받을 수 있습니다.",
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
