package CardRecommendService;

import CardRecommendService.card.Card;
import CardRecommendService.card.CardRepository;
import CardRecommendService.cardBenefits.CardBenefits;
import CardRecommendService.cardBenefits.CardBenefitsRepository;
import CardRecommendService.cardHistory.CardHistory;
import CardRecommendService.cardHistory.CardHistoryRepository;
import CardRecommendService.cardHistory.Category;
import CardRecommendService.member.Member;
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
        Card card = new Card(
                "고금리은행", "넌이제파산", 10000, new ArrayList<>()
        );
        cardRepository.save(card);

        CardBenefits benefits1 = new CardBenefits("우엥", "5원지급", "ㅇㅇ", card);
        cardBenefitsRepository.save(benefits1);

        Member member = new Member("1L");  // 예시 Member 객체


        MemberCard memberCard = new MemberCard(
//                1L,                      // 카드 고유 ID
                "1234-5678-9876-5432",   // 카드 번호
                "card_image.jpg",         // 카드 이미지 파일명 또는 URL
                member,                   // 회원 정보
                card,                     // 카드 정보
                new ArrayList<>()              // 카드 결제 내역 리스트
        );

        memberCardRepository.save(memberCard);


        List<CardHistory> cardHistories = Arrays.asList(  // 예시로 결제 내역 추가
                new CardHistory( "스타벅스", 10000, LocalDateTime.parse("2025-03-01T14:30:00"), Category.커피제과, memberCard),
                new CardHistory("맥도날드", 5000, LocalDateTime.parse("2025-03-02T12:00:00"), Category.음식점, memberCard)
        );

        cardHistoryRepository.saveAll(cardHistories);
    }
}
