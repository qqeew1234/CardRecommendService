package CardRecommendService.memberCard;


import CardRecommendService.cardHistory.CardHistory;
import CardRecommendService.card.Card;
import CardRecommendService.member.Member;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class MemberCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cardNumber;

    private String cardImg;

    @ManyToOne
    private Member member;

    @ManyToOne
    private Card card;

    @OneToMany(mappedBy = "memberCard")
    private List<CardHistory> cardHistories;

    private boolean isHidden = false; // 숨김 여부 (기본값: false)

    public void setHidden(boolean isHidden) {
        this.isHidden = isHidden;
    }

    public MemberCard() {
    }


    public MemberCard(String cardNumber, String cardImg, Member member, Card card, List<CardHistory> cardHistories, boolean isHidden) {
        this.cardNumber = cardNumber;
        this.cardImg = cardImg;
        this.member = member;
        this.card = card;
        this.cardHistories = cardHistories;
        this.isHidden = isHidden;
    }

    public Long getId() {
        return id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getCardImg() {
        return cardImg;
    }

    public Member getMember() {
        return member;
    }

    public Card getCard() {
        return card;
    }

    public List<CardHistory> getCardHistories() {
        return cardHistories;
    }

    public boolean isHidden() {
        return isHidden;
    }
}
