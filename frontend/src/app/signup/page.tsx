import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import "@/styles/page01.scss";
import "@/styles/signup.page.scss";
import CreditCard from "@/components/CreditCard";
export default function signup() {
  const hd_props = {
    num: "01",
    tit: "회원가입",
    des: "회원가입을 원하시면 이메일과 비밀번호, 닉네임을 작성해 주세요.",
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
      <div className="page-body p01">
        <section>
          <div className="art-box">
            <form action="">
              <div className="email">
                <label>이메일</label>
                <input type="email" placeholder="이메일을 입력해 주세요." />
              </div>
              <div className="nickname">
                <label>닉네임</label>
                <input type="text" placeholder="닉네임을 입력해 주세요." />
              </div>
              <div className="password">
                <label>비밀번호</label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                />
              </div>
              <div className="password-re">
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  placeholder="비밀번호를 다시 입력해 주세요."
                />
              </div>
              <div className="btns">
                <button type="reset">취소</button>
                <Link href={"/"}>
                  <button type="submit" className="active">
                    완료
                  </button>
                </Link>
              </div>
            </form>
          </div>
          <div className="img-box">
            <CreditCard
              cardNumber="1234 5678 9012 3456"
              cardHolder="MOON SUNG HEE"
              expiryDate="12/26"
              cvv="123"
              brand="visa"
            />
          </div>
        </section>
      </div>
    </>
  );
}
