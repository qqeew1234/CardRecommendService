import PageHeader from "@/components/globals/PageHeader";
import Link from "next/link";

export default function Signup() {
  const header ={
    number: "02",
    title: "회원가입",
    description: "회원가입을 원하시면 이메일과 비밀번호를 사용할 별명을 입력해 주세요.",
  }
  return (
    <>
      <PageHeader number={header.number} title={header.title} description={header.description}>
          <div className="btns">
            
          </div>
      </PageHeader>
      <div className="page signup">
        <form action="">
          <div className="email">
            <label>이메일</label>
            <input type="text" />
          </div>
          <div className="password">
            <label>비밀번호</label>
            <input type="password"/>
          </div>
          <div className="password-re">
            <label>비밀번호확인</label>
            <input type="password"/>
          </div>
          <div className="nickname">
            <label>별명</label>
            <input type="text"/>
          </div>
          <div className="btns">
            <Link href={"/"}><button>취소</button></Link>
            <button>확인</button>
          </div>
        </form>
      </div>
    </>
  );
}
