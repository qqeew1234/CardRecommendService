import PageHeader from "@/components/PageHeaderCopy";
import "@/styles/page09.scss";
import Link from "next/link";
export default function page09() {
  const hd_props = {
    num: "09",
    tit: "맞춤 카드 추천",
    des: "최대 5개까지 옵션을 추가하여 보다 적합한 카드를 추천 받을 수 있습니다.",
  };
  return (
    <>
      <div className="page-head page-head-09">
        <PageHeader
          number={hd_props.num}
          title={hd_props.tit}
          description={hd_props.des}
        >
          <Link href={"/page08"}>
            <button>옵션추가 돌아가기</button>
          </Link>
          <Link href={"/"}>
            <button className="active">처음으로 돌아가기</button>
          </Link>
        </PageHeader>
      </div>
      <div className="page-body page-body-09">
        <section></section>
      </div>
    </>
  );
}
