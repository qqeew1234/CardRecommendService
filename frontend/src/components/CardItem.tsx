import Link from "next/link";
import Image from "next/image";
import { FaCheckSquare, FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import "@/styles/cardItem.scss";

interface myTypes {
  index: number;
  cardId: number;
  cardImg: string;
  cardName: string;
  cardCorp: string;
  altText: string;
  isChecked: boolean;
  onCheck: () => void;
  onClick: () => void;
  cardTotalAmount: string;
}

export default function CardItem({
  index,
  cardId,
  cardImg,
  cardName,
  cardCorp,
  altText,
  isChecked,
  onCheck,
  onClick,
  cardTotalAmount
}: myTypes) {
  return (
    <div className="card-item" key={index}>
      <input
        type="checkbox"
        id={"c" + index}
        defaultChecked={isChecked}
        onChange={onCheck}
      />

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
      <input
        type="radio"
        name="card-item"
        id={"r" + index}
      />
      <div className="card-item_inf" onClick={onClick}>
        <h4>
          [<span className="card-company">{cardCorp}</span>]
          <span className="card-goods">{cardName}</span>
        </h4>
        <p>결제예정금액 : {cardTotalAmount}</p>
        <label className="radioBtn" htmlFor={"r" + index}></label>
      </div>
      {/* <label className="radioBtn" htmlFor={"c" + index}></label> */}
    </div>
  );
}
