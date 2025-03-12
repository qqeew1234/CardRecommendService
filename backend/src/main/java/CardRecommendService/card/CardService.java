package CardRecommendService.card;


import CardRecommendService.cardBenefits.CardBenefits;
import CardRecommendService.memberCard.MemberCard;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    //모든 카드 리스트를 목록으로 조회
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }


    //카드 상세 조회
    public CardDetailResponse getCardDetailByCardId(Long cardId) {

        Card card = cardRepository.findById(cardId)
                .orElseThrow(()-> new IllegalArgumentException("없는 카드"));
        return new CardDetailResponse(
                card.getCardIssuer(),
                card.getCardName(),
                card.getCardType().name(),
                card.getAnnualFee(),
                card.getMemberCards(),
                card.getCardBenefits()
        );

    }
}
