import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function signup(){
    const hd_props ={
      num:"01",
      tit:"회원가입",
      des: "회원가입을 원하시면 이메일과 비밀번호, 닉네임을 작성해주세요"
    }
  
  return(
    <>
      <PageHeader number={hd_props.num} title={hd_props.tit} description={hd_props.des}>
        <></>
      </PageHeader>
    
      <div className="page-body">
        <section>
          <form action="">
            <div className="email">
              <label>이메일</label>
              <input type="email" placeholder="example@cardfit.com"/>
            </div>
            <div className="nickname">
              <label>닉네임</label>
              <input type="text" placeholder="닉네임을 입력해주세요."/>
            </div>
            <div className="password">
              <label>비밀번호</label>
              <input type="password" placeholder="비밀번호를 입력해주세요."/>
            </div>
            <div className="password-re">
              <label>비밀번호 확인</label>
              <input type="password" placeholder="비밀번호를 다시 입력해주세요."/>
            </div>
            <div className="btns">
              <button type="reset">취소</button>
              <Link href={"/"}><button>완료</button></Link>
            </div>           
          </form>
        </section>
      </div>
    </>
  )

}