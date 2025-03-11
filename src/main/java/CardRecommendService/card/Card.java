package CardRecommendService.card;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String cardIssuer;   // 카드 발급사

    private String cardName;     // 카드 이름

    private CardType cardType;   // 카드 종류 (이넘) (신용카드, 체크카드)

    private int annualFee;       // 연회비


    public Card(String cardIssuer, String cardName, CardType cardType, int annualFee) {
        this.cardIssuer = cardIssuer;
        this.cardName = cardName;
        this.cardType = cardType;
        this.annualFee = annualFee;

    }
}
