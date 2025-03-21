package CardRecommendService.cardHistory;


import CardRecommendService.memberCard.MemberCard;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class CardHistory {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int amount; // 각 결제 금액

    @Column(nullable = false)
    private String storeName;

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime paymentDatetime; // 결제 시각

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @ManyToOne
    private MemberCard memberCard;


    private String uuid;

    protected CardHistory() {
    }

    public CardHistory(String storeName, int amount, LocalDateTime paymentDatetime, Category category, MemberCard memberCard) {
        this.storeName = storeName;
        this.amount = amount;
        this.paymentDatetime = paymentDatetime;
        this.category = category;
        this.memberCard = memberCard;
    }

    public CardHistory(int amount, String storeName, LocalDateTime paymentDatetime, Category category, String uuid) {
        this.amount = amount;
        this.storeName = storeName;
        this.paymentDatetime = paymentDatetime;
        this.category = category;
        this.uuid = uuid;
    }

    public CardHistory(int amount, String storeName, LocalDateTime paymentDatetime, Category category, MemberCard memberCard, String uuid) {
        this.amount = amount;
        this.storeName = storeName;
        this.paymentDatetime = paymentDatetime;
        this.category = category;
        this.memberCard = memberCard;
        this.uuid = uuid;
    }

    public Long getId() {
        return id;
    }

    public int getAmount() {
        return amount;
    }

    public String getStoreName() {
        return storeName;
    }

    public LocalDateTime getPaymentDateTime() {
        return paymentDatetime;
    }

    public Category getCategory() {
        return category;
    }

    public LocalDateTime getPaymentDatetime() {
        return paymentDatetime;
    }

    public MemberCard getMemberCard() {
        return memberCard;
    }
}
