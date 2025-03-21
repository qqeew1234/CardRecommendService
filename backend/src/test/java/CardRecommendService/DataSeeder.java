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

        Card card1 = new Card("고금리은행", "넌이제파산", 10000, "할인점", "스트리밍", "배달앱", new ArrayList<>());
        Card card2 = new Card("황금은행", "부자되세요", 12000, "백화점", "음식점", "편의점", new ArrayList<>());
        Card card3 = new Card("희망은행", "미래희망", 15000, "온라인쇼핑", "교통", "보험", new ArrayList<>());
        Card card4 = new Card("무한대출은행", "적자행진", 13000, "주유소", "여행", "커피제과", new ArrayList<>());
        Card card5 = new Card("절약은행", "알뜰카드", 11000, "생활잡화", "병원", "교육", new ArrayList<>());
        Card card6 = new Card("풍요은행", "대출천국", 14000, "해외결제", "스트리밍", "항공", new ArrayList<>());
        Card card7 = new Card("천하은행", "VIP클럽", 16000, "영화", "주유소", "생활", new ArrayList<>());
        Card card8 = new Card("자유은행", "한도무제한", 17000, "편의점", "배달앱", "반려동물", new ArrayList<>());
        Card card9 = new Card("행복은행", "통장두둑", 18000, "온라인쇼핑", "음식점", "주유소", new ArrayList<>());
        Card card10 = new Card("미래은행", "절약마스터", 19000, "할인점", "병원", "여행", new ArrayList<>());
        Card card11 = new Card("하늘은행", "럭셔리클럽", 20000, "호텔", "레스토랑", "쇼핑", new ArrayList<>());
        Card card12 = new Card("별은행", "스타카드", 21000, "편의점", "헬스", "온라인쇼핑", new ArrayList<>());
        Card card13 = new Card("백만장자은행", "금고", 22000, "백화점", "영화", "보험", new ArrayList<>());
        Card card14 = new Card("파란하늘은행", "스카이클럽", 23000, "여행", "외식", "인터넷", new ArrayList<>());
        Card card15 = new Card("은하은행", "별빛카드", 24000, "주유소", "스트리밍", "자동차", new ArrayList<>());
        Card card16 = new Card("로얄은행", "황금카드", 25000, "골프장", "레스토랑", "헬스", new ArrayList<>());
        Card card17 = new Card("미래비전은행", "비전카드", 26000, "인터넷쇼핑", "패션", "여행", new ArrayList<>());
        Card card18 = new Card("그랜드은행", "슈퍼클럽", 27000, "쇼핑몰", "편의점", "음악", new ArrayList<>());
        Card card19 = new Card("넥스트은행", "넥스트레벨", 28000, "디지털기기", "음식점", "영화", new ArrayList<>());
        Card card20 = new Card("프리미엄은행", "최고의카드", 29000, "레스토랑", "의료", "항공", new ArrayList<>());

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
        cardRepository.save(card11);
        cardRepository.save(card12);
        cardRepository.save(card13);
        cardRepository.save(card14);
        cardRepository.save(card15);
        cardRepository.save(card16);
        cardRepository.save(card17);
        cardRepository.save(card18);
        cardRepository.save(card19);
        cardRepository.save(card20);

        String uuid = "1";  // 예시 Member 객체

        MemberCard memberCard1 = new MemberCard("1234-5678-9012-3456", "img1", card1, uuid);
        MemberCard memberCard2 = new MemberCard("5678-9012-3456-7890", "img2", card2, uuid);
        MemberCard memberCard3 = new MemberCard("9012-3456-7890-1234", "img3", card1, uuid);

        memberCardRepository.save(memberCard1);
        memberCardRepository.save(memberCard2);
        memberCardRepository.save(memberCard3);


        CardHistory history1 = new CardHistory(1000, "스타벅스", LocalDateTime.parse("2025-03-01T14:30:00"), Category.커피제과, memberCard1, uuid);
        CardHistory history2 = new CardHistory(5000, "파리바게트", LocalDateTime.parse("2025-03-02T09:15:00"), Category.커피제과, memberCard1, uuid);
        CardHistory history3 = new CardHistory(12000, "BBQ치킨", LocalDateTime.parse("2025-03-03T19:00:00"), Category.음식점, memberCard1, uuid);
        CardHistory history4 = new CardHistory(3000, "GS25", LocalDateTime.parse("2025-03-04T13:45:00"), Category.편의점, memberCard1, uuid);
        CardHistory history5 = new CardHistory(8000, "CGV", LocalDateTime.parse("2025-03-05T18:30:00"), Category.생활, memberCard2, uuid);
        CardHistory history6 = new CardHistory(1500, "투썸플레이스", LocalDateTime.parse("2025-03-06T10:00:00"), Category.커피제과, memberCard2, uuid);
        CardHistory history7 = new CardHistory(4200, "이마트24", LocalDateTime.parse("2025-03-07T15:20:00"), Category.편의점, memberCard2, uuid);
        CardHistory history8 = new CardHistory(25000, "교보문고", LocalDateTime.parse("2025-03-08T11:10:00"), Category.생활, memberCard3, uuid);
        CardHistory history9 = new CardHistory(13000, "맥도날드", LocalDateTime.parse("2025-03-09T17:50:00"), Category.음식점, memberCard3, uuid);
        CardHistory history10 = new CardHistory(6000, "올리브영", LocalDateTime.parse("2025-03-10T14:00:00"), Category.생활잡화, memberCard3, uuid);

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


    }
}
