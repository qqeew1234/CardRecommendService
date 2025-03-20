package CardRecommendService.card;


import CardRecommendService.cardBenefits.CardBenefits;
import CardRecommendService.cardHistory.Category;
import CardRecommendService.memberCard.MemberCard;
import jakarta.persistence.*;

import java.util.EnumSet;
import java.util.List;

@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false)
    private String cardIssuer;   // 카드 발급사

    @Column(nullable = false)
    private String cardName;     // 카드 이름

    @Column(nullable = false)
    private int annualFee;  // 연회비

    @OneToMany(mappedBy = "card")
    private List<MemberCard> memberCards;

    @OneToMany(mappedBy = "card")
    private List<CardBenefits> cardBenefits;

    EnumSet<Category> category; // cardHistory 패키지의 Category enum을 사용

    @Enumerated(EnumType.STRING)
    private Category store1;

    @Enumerated(EnumType.STRING)
    private Category store2;

    @Enumerated(EnumType.STRING)
    private Category store3;

    protected Card() {
    }

    public Card(String cardIssuer, String cardName, int annualFee, Category store1, Category store2, Category store3, List<CardBenefits> cardBenefits) {
        this.cardIssuer = cardIssuer;
        this.cardName = cardName;
        this.annualFee = annualFee;
        this.store1 = store1;
        this.store2 = store2;
        this.store3 = store3;
        this.cardBenefits = cardBenefits;
    }

    public Long getId() {
        return Id;
    }

    public String getCardIssuer() {
        return cardIssuer;
    }

    public String getCardName() {
        return cardName;
    }

    public int getAnnualFee() {
        return annualFee;
    }

    public List<MemberCard> getMemberCards() {
        return memberCards;
    }

    public List<CardBenefits> getCardBenefits() {
        return cardBenefits;
    }

    public Category getStore1() {
        return store1;
    }

    public Category getStore2() {
        return store2;
    }

    public Category getStore3() {
        return store3;
    }
}
