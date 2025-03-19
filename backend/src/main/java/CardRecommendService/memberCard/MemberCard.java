package CardRecommendService.memberCard;


import CardRecommendService.cardHistory.CardHistory;
import CardRecommendService.card.Card;
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
    private Card card;

    @OneToMany(mappedBy = "memberCard")
    private List<CardHistory> cardHistories;

    private String uuid;

    public MemberCard() {
    }

    public MemberCard(String cardNumber, String cardImg, Card card, List<CardHistory> cardHistories, String uuid) {
        this.cardNumber = cardNumber;
        this.cardImg = cardImg;
        this.card = card;
        this.cardHistories = cardHistories;
        this.uuid = uuid;
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

    public Card getCard() {
        return card;
    }

    public String getUuid() {
        return uuid;
    }

    public List<CardHistory> getCardHistories() {
        return cardHistories;
    }
}
