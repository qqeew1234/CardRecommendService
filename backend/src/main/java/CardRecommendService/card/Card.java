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

    private String store1;

    private String store2;

    private String store3;

    protected Card() {
    }

    public Card(String cardIssuer, String cardName, int annualFee, String store1, String store2, String store3, List<CardBenefits> cardBenefits) {
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

    public String getStore1() {
        return store1;
    }

    public String getStore2() {
        return store2;
    }

    public String getStore3() {
        return store3;
    }
}
