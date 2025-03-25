import PageHeader from "@/components/PageHeader";
import Image from "next/image";

export default function Home() {
  const hd_props ={
    num:"01",
    tit:"Card Fit",
    des: ""
  }
  return (
    <>
      <PageHeader number={hd_props.num} title={hd_props.tit} description={hd_props.des}>
        <button className="dim">로그인</button>
        <button className="active">카드다시불러오기</button>
        <button>선택카드목록보기</button>
      </PageHeader>
      <div className="page-body">
        <section></section>
      </div>
    </>
  );
}
