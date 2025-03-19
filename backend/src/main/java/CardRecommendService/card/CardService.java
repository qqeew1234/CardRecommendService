package CardRecommendService.card;


import CardRecommendService.cardBenefits.CardBenefitsResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    //모든 카드 리스트를 목록으로 조회
    @Transactional
    public List<CardResponse> getAllCards() {
        List<Card> cards = cardRepository.findAll();

        return cards.stream()
                .map(card -> new CardResponse(
                        card.getCardIssuer(),
                        card.getCardName(),
                        card.getAnnualFee(),
                        card.getCardBenefits().stream()
                                .map(cardBenefits -> new CardBenefitsResponse(
                                        cardBenefits.getBnfName(),
                                        cardBenefits.getBnfDetail(),
                                        cardBenefits.getBngDetail()
                                ))
                                .collect(Collectors.toList())

                ))
                .collect(Collectors.toList());


    }


    //카드 상세 조회
    public CardDetailResponse getCardDetailByCardId(Long cardId) {

        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new IllegalArgumentException("없는 카드"));

        // CardBenefits 객체들을 CardBenefitsResponse로 변환
        List<CardBenefitsResponse> cardBenefitsResponses = card.getCardBenefits().stream()
                .map(cardBenefits -> new CardBenefitsResponse(
                        cardBenefits.getBnfName(),
                        cardBenefits.getBnfDetail(),
                        cardBenefits.getBngDetail()))  // CardBenefits 객체의 값을 CardBenefitsResponse 생성자에 전달
                .collect(Collectors.toList());

        return new CardDetailResponse(
                card.getCardIssuer(),
                card.getCardName(),
                card.getAnnualFee(),
                cardBenefitsResponses
        );

    }
}
