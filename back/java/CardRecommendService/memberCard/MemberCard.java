package CardRecommendService.memberCard;


import CardRecommendService.card.Card;
import CardRecommendService.member.Member;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class MemberCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member member;

    @ManyToOne
    private Card card;

    private String cardNumber;

    private String cardImg;

    private LocalDateTime;


}
