import Link from "next/link";
import Image from "next/image";
import { FaCheckSquare, FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import "@/styles/cardItem.scss";
interface myTypes {
  index: number;
  cardImg: string;
  cardName: string;
  cardCorp: string;
  altText: string;
  isChecked: boolean;
  onCheck: () => void;
}

export default function CardItem({
  index,
  cardImg,
  cardName,
  cardCorp,
  altText,
  isChecked,
  onCheck
}: myTypes) {
  return (
    <div className="card-item" key={index}>
      <input 
      type="checkbox" 
      id={"c" + index} 
      defaultChecked={isChecked} 
      onChange={onCheck}/>
      <input type="radio" name="card-item" id={"r" + index} />
      <div className="card-item_img">
        <label className="checkbox-set" htmlFor={"c" + index}>
          <span className="checked">
            <FaCheckSquare />
          </span>
          <span className="added">
            <FaMinusSquare />
            <FaPlusSquare />
          </span>
        </label>
        <Image
          src={cardImg ?? "/cardImg.png"}
          alt={altText ?? "신용카드그림"}
          layout="fill"
          // width={280}
          // height={180}
        />
      </div>
      <div className="card-item_inf">
        <h4>
          [<span className="card-company">{cardCorp}</span>]
          <span className="card-goods">{cardName}</span>
        </h4>
        <p>결제예정금액 : {"1,800,000"}</p>
      </div>
      <label className="radioBtn" htmlFor={"r" + index}></label>
    </div>
  );
}
