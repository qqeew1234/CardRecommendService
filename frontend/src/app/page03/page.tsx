import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function page03() {
  const hd_props = {
    num: "03",
    tit: "분석 카드 목록",
    des: "카드를 클릭하면 월별 소비내역을 확인할수 있습니다.",
  };
  return (
    <>
      <PageHeader
        number={hd_props.num}
        title={hd_props.tit}
        description={hd_props.des}
      >
        <button>카드다시불러오기 </button>
      </PageHeader>
      <div className="page-body p03">
        <section>
          <article>
            <div className="card-image"></div>
            <h4>[삼성카드]아멕스블루</h4>
            <Link href={"/page04"}>page03</Link>
          </article>
        </section>
      </div>
    </>
  );
}
