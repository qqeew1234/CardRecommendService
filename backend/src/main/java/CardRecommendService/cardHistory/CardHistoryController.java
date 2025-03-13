package CardRecommendService.cardHistory;

import CardRecommendService.card.CardResponse;
import CardRecommendService.card.CardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


@RestController
@RequestMapping("/cardhistory")
public class CardHistoryController {

    private CardHistoryService cardHistoryService;

    public CardHistoryController(CardHistoryService cardHistoryService) {
        this.cardHistoryService = cardHistoryService;
    }


    //메인카드조회
    @GetMapping("/{memberId}")
    public CardResponse getCardWithHighestAmount(@PathVariable Long memberId){

        return cardHistoryService.getCardWithHighestAmount(memberId);

    }



}
