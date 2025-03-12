package CardRecommendService.cardHistory;


import CardRecommendService.memberCard.MemberCard;
import jakarta.persistence.*;

@Entity
public class CardHistory {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;

    private String storeName;

    private String paymentCount; // 결제 횟수

    private String paymentDateTime; // 결제 시각

    private String paymentCategory;

    @ManyToOne
    private MemberCard memberCard;

    protected CardHistory() {
    }

    public CardHistory(Long id, double amount, String storeName, String paymentCount, String paymentDateTime, String paymentCategory, MemberCard memberCard) {
        this.id = id;
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

    public String getPaymentDateTime() {
        return paymentDateTime;
    }

    public String getPaymentCategory() {
        return paymentCategory;
    }

    public MemberCard getMemberCard() {
        return memberCard;
    }
}
