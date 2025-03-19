package CardRecommendService;

import CardRecommendService.card.Card;
import CardRecommendService.card.CardRepository;
import CardRecommendService.cardBenefits.CardBenefits;
import CardRecommendService.cardBenefits.CardBenefitsRepository;
import CardRecommendService.cardHistory.CardHistory;
import CardRecommendService.cardHistory.CardHistoryRepository;
import CardRecommendService.cardHistory.Category;
import CardRecommendService.memberCard.MemberCard;
import CardRecommendService.memberCard.MemberCardRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class DataSeeder {

    private final CardRepository cardRepository;
    private final CardBenefitsRepository cardBenefitsRepository;
    private final CardHistoryRepository cardHistoryRepository;
    private final MemberCardRepository memberCardRepository;

    public DataSeeder(CardRepository cardRepository, CardBenefitsRepository cardBenefitsRepository, CardHistoryRepository cardHistoryRepository, MemberCardRepository memberCardRepository) {
        this.cardRepository = cardRepository;
        this.cardBenefitsRepository = cardBenefitsRepository;
        this.cardHistoryRepository = cardHistoryRepository;
        this.memberCardRepository = memberCardRepository;
    }

    @Transactional
    public void initData() {
        Card card1 = new Card("고금리은행", "넌이제파산", 10000, new ArrayList<>());
        Card card2 = new Card("황금은행", "부자되세요", 12000, new ArrayList<>());
        Card card3 = new Card("희망은행", "미래희망", 15000, new ArrayList<>());
        Card card4 = new Card("무한대출은행", "적자행진", 13000, new ArrayList<>());
        Card card5 = new Card("절약은행", "알뜰카드", 11000, new ArrayList<>());
        Card card6 = new Card("풍요은행", "대출천국", 14000, new ArrayList<>());
        Card card7 = new Card("천하은행", "VIP클럽", 16000, new ArrayList<>());
        Card card8 = new Card("자유은행", "한도무제한", 17000, new ArrayList<>());
        Card card9 = new Card("행복은행", "통장두둑", 18000, new ArrayList<>());
        Card card10 = new Card("미래은행", "절약마스터", 19000, new ArrayList<>());

        cardRepository.save(card1);
        cardRepository.save(card2);
        cardRepository.save(card3);
        cardRepository.save(card4);
        cardRepository.save(card5);
        cardRepository.save(card6);
        cardRepository.save(card7);
        cardRepository.save(card8);
        cardRepository.save(card9);
        cardRepository.save(card10);

        String uuid = "1L";  // 예시 Member 객체

        CardHistory history1 = new CardHistory(1000, "스타벅스", LocalDateTime.parse("2025-03-01T14:30:00"), Category.커피제과, uuid);
        CardHistory history2 = new CardHistory(5000, "파리바게트", LocalDateTime.parse("2025-03-02T09:15:00"), Category.커피제과, uuid);
        CardHistory history3 = new CardHistory(12000, "BBQ치킨", LocalDateTime.parse("2025-03-03T19:00:00"), Category.음식점, uuid);
        CardHistory history4 = new CardHistory(3000, "GS25", LocalDateTime.parse("2025-03-04T13:45:00"), Category.편의점, uuid);
        CardHistory history5 = new CardHistory(8000, "CGV", LocalDateTime.parse("2025-03-05T18:30:00"), Category.생활, uuid);
        CardHistory history6 = new CardHistory(1500, "투썸플레이스", LocalDateTime.parse("2025-03-06T10:00:00"), Category.커피제과, uuid);
        CardHistory history7 = new CardHistory(4200, "이마트24", LocalDateTime.parse("2025-03-07T15:20:00"), Category.편의점, uuid);
        CardHistory history8 = new CardHistory(25000, "교보문고", LocalDateTime.parse("2025-03-08T11:10:00"), Category.생활, uuid);
        CardHistory history9 = new CardHistory(13000, "맥도날드", LocalDateTime.parse("2025-03-09T17:50:00"), Category.음식점, uuid);
        CardHistory history10 = new CardHistory(6000, "올리브영", LocalDateTime.parse("2025-03-10T14:00:00"), Category.생활잡화, uuid);

        cardHistoryRepository.save(history1);
        cardHistoryRepository.save(history2);
        cardHistoryRepository.save(history3);
        cardHistoryRepository.save(history4);
        cardHistoryRepository.save(history5);
        cardHistoryRepository.save(history6);
        cardHistoryRepository.save(history7);
        cardHistoryRepository.save(history8);
        cardHistoryRepository.save(history9);
        cardHistoryRepository.save(history10);


        MemberCard memberCard = new MemberCard(
                "1234-5678-9876-5432",
                "card_image.jpg",
                card1,
                List.of(history1, history2, history3, history4, history5, history6, history7, history8, history9, history10),
                uuid
        );

        memberCardRepository.save(memberCard);

    }
}
