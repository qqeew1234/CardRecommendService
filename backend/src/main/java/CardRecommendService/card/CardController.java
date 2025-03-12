package CardRecommendService.card;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public List<Card> getAllCards(){
        return cardService.getAllCards();
    }

    //특정 카드 상세 조회
    @GetMapping("/{cardId}")
    public CardDetailResponse getCardDetailByCCardId(@PathVariable Long CardId){

        return cardService.getCardDetailByCardId(CardId);
    }



}
