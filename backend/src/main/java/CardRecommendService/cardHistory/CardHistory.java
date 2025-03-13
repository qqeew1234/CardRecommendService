package CardRecommendService.cardHistory;


import CardRecommendService.memberCard.MemberCard;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class CardHistory {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount; // 각 결제 금액

    private String storeName;

    private String paymentCount; // 결제 횟수

    private LocalDateTime paymentDateTime; // 결제 시각

    private String paymentCategory;

    @ManyToOne
    private MemberCard memberCard;

    protected CardHistory() {
    }

    public CardHistory(double amount, String storeName, String paymentCount, LocalDateTime paymentDateTime, String paymentCategory, MemberCard memberCard) {
        this.amount = amount;
        this.storeName = storeName;
        this.paymentCount = paymentCount;
        this.paymentDateTime = paymentDateTime;
        this.paymentCategory = paymentCategory;
        this.memberCard = memberCard;
    }

    public Long getId() {
        return id;
    }

    public double getAmount() {
        return amount;
    }

    public String getStoreName() {
        return storeName;
    }

    public String getPaymentCount() {
        return paymentCount;
    }

    public LocalDateTime getPaymentDateTime() {
        return paymentDateTime;
    }

    public String getPaymentCategory() {
        return paymentCategory;
    }

    public MemberCard getMemberCard() {
        return memberCard;
    }
}
