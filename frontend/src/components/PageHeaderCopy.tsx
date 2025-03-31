import { Children } from "react";
import "@/styles/PageHeader.scss";

interface myType {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function PageHeaderCopy({
  number,
  title,
  description,
  children,
}: myType) {
  return (
    <header>
      <div className="hgroup">
        <h6 className="num">{number}</h6>
        <h2 className="tit">{title}</h2>
        <p className="des">{description}</p>
      </div>
      <div className="btngroup">{children}</div>
    </header>
  );
}
