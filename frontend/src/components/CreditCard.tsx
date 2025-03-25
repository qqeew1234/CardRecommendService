"use client";

import { useState } from "react";
import styles from "@/styles/CreditCard.module.scss";

interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  brand?: "visa" | "mastercard" | "amex";
}

export default function CreditCard({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  brand = "visa",
}: CreditCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`${styles["credit-card"]} ${isFlipped ? styles.flipped : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={styles["card-inner"]}>
        {/* 카드 앞면 */}
        <div className={styles["card-front"]}>
          <div className={styles["card-brand"]}>
            <div>Card Fit</div>
            <div>{brand.toUpperCase()}</div>
          </div>
          <div className={styles["card-number"]}>{cardNumber}</div>
          <div className={styles["card-holder"]}>
            <div className={styles["name"]}>{cardHolder}</div>
            <div className={styles["expiry"]}>EXP {expiryDate}</div>
          </div>
        </div>

        {/* 카드 뒷면 */}
        <div className={styles["card-back"]}>
          <div className={styles["cvv"]}>CVV: {isFlipped ? cvv : "***"}</div>
        </div>
      </div>
    </div>
  );
}
