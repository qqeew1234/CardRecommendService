package CardRecommendService.card;


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

}
