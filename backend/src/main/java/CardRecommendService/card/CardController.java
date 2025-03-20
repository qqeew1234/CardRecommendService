package CardRecommendService.card;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/cards")
public class CardController {

    private final CardRepository cardRepository;
    private final CardService cardService;

    public CardController(CardRepository cardRepository, CardService cardService) {
        this.cardRepository = cardRepository;
        this.cardService = cardService;
    }

    //모든 카드 리스트를 목록으로 조회
    @GetMapping
    public List<CardResponse> getAllCards() {
        return cardService.getAllCards();
    }

    //특정 카드 상세 조회
    @GetMapping("/{cardId}")
    public CardDetailResponse getCardDetailByCardId(@PathVariable Long cardId) {

        return cardService.getCardDetailByCardId(cardId);
    }

//    //카드 추천 서비스 로직
//    @GetMapping("/recommend")
//    public List<Card> getRecommendCards(
//            @RequestParam int minAnnualFee,
//            @RequestParam int maxAnnualFee,
//            @RequestParam Set<String> storeCategories) {
//
//        return cardService.getRecommendCards(minAnnualFee, maxAnnualFee, storeCategories);
//
//    }

    @GetMapping("/recommend")
    public List<Card> getRecommendCards(
            @RequestParam int minAnnualFee,
            @RequestParam int maxAnnualFee,
            @RequestParam Set<String> storeCategories) {

        // 로그로 받은 파라미터 확인
        System.out.println("Received minAnnualFee: " + minAnnualFee);
        System.out.println("Received maxAnnualFee: " + maxAnnualFee);
        System.out.println("Received storeCategories: " + storeCategories);

        // 카드를 추천받기 위한 서비스 호출
        List<Card> recommendedCards = cardService.getRecommendCards(minAnnualFee, maxAnnualFee, storeCategories);

        // 추천된 카드가 없는 경우
        if (recommendedCards.isEmpty()) {
            System.out.println("추천된 카드가 없습니다.");
        } else {
            System.out.println("추천된 카드 수: " + recommendedCards.size());
        }

        return recommendedCards;
    }
}