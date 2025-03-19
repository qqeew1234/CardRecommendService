package CardRecommendService.card;


import CardRecommendService.cardBenefits.CardBenefits;
import CardRecommendService.memberCard.MemberCard;
import jakarta.persistence.*;

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

    protected Card() {
    }


    public Card(String cardIssuer, String cardName, int annualFee, List<CardBenefits> cardBenefits) {
        this.cardIssuer = cardIssuer;
        this.cardName = cardName;
        this.annualFee = annualFee;
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
}
