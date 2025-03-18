package CardRecommendService.memberCard;

import CardRecommendService.card.Card;
import CardRecommendService.card.CardDetailResponse;
import CardRecommendService.card.CardRepository;
import CardRecommendService.card.CardResponse;
import CardRecommendService.cardBenefits.CardBenefitsResponse;
import CardRecommendService.cardHistory.CardHistory;
import CardRecommendService.cardHistory.CardHistoryRepository;
import CardRecommendService.cardHistory.CardHistoryResponse;
import CardRecommendService.member.MemberRepository;
import CardRecommendService.member.MemberResponse;
import jakarta.transaction.Transaction;
import jakarta.transaction.Transactional;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberCardService {

    private final MemberCardRepository memberCardRepository;
    private final CardRepository cardRepository;
    private final CardHistoryRepository cardHistoryRepository;
    private final MemberRepository memberRepository;

    public MemberCardService(MemberCardRepository memberCardRepository, CardRepository cardRepository, CardHistoryRepository cardHistoryRepository, MemberRepository memberRepository) {
        this.memberCardRepository = memberCardRepository;
        this.cardRepository = cardRepository;
        this.cardHistoryRepository = cardHistoryRepository;
        this.memberRepository = memberRepository;
    }

    //분석 카드 선택창 : (로그인된) 사용자가 가진 모든(ALL) 카드 가져오기
    @Transactional
    public MemberCardListResponse getAllMemberCardListByUserId(String userId) {

        // userId로 MemberCard 목록 조회
        List<MemberCard> memberCards = memberCardRepository.findByUserId(userId);

        // 조회된 데이터를 MemberCardListResponse 변환
        List<Card> cards = memberCards.stream()
                .map(MemberCard::getCard) // MemberCard에서 Card 객체 추출
                .collect(Collectors.toList());

        // MemberCardListResponse 객체 반환
        return new MemberCardListResponse(cards);
    }

    @Transactional
    public MemberCardListResponse getAnalysisCardsByUserIdAndCardIds(String userId, List<Long> cardIds) {
        // userId로 해당 사용자의 MemberCard 목록 조회
        List<MemberCard> memberCards = memberCardRepository.findByUserIdAndCardIdIn(userId, cardIds);

        // 조회된 데이터를 MemberCardListResponse 변환
        List<Card> cards = memberCards.stream()
                .map(MemberCard::getCard) // MemberCard에서 Card 객체 추출
                .collect(Collectors.toList());

        // 분석된 카드 목록 반환 (예: 통계, 그래프, 등 추가적인 분석이 필요할 수 있음)
        return new MemberCardListResponse(cards);
    }

    //숨김/보이기 상태 변경
    @Transactional
    public boolean updateMemberCardIsHidden(String userId, Long cardId, boolean isHidden) {

        // 사용자의 특정 카드 조회
        MemberCard memberCard = memberCardRepository.findByUserIdAndCardId(userId, cardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 카드가 존재하지 않습니다."));


        // 숨김/보이기 상태 변경
        memberCard.setHidden(isHidden);


        // 변경된 카드 정보 저장
        memberCardRepository.save(memberCard);

        // 숨김 상태를 반환 (on/off 여부)
        return memberCard.isHidden();
    }


//    //로그인된 사용자의 모든 카드 조회
//    @Transactional
//    public MemberCardResponse listUserCards(String userId) {
//        List<MemberCard> cards = memberCardRepository.findByUserId(userId);
//        return new MemberCardResponse(cards);
//    }
//
//
//
//    // 로그인된 사용자의 카드 ID 리스트 조회
//    @Transactional
//    public List<Long> getMemberCardIds(String userId) {
//        return memberCardRepository.findMemberCardIdsByUserId(userId);
//    }
//
//
//    public Page<CardHistoryResponse> getUserCardHistories(String userId, List<Long> cardIds, Pageable pageable) {
//        // 거래 내역 조회 (페이징 처리)
//        Page<CardHistory> cardHistoryPage = CardHistoryRepository.findByUserIdAndCardIdIn(userId, cardIds, pageable);
//
//        // CardHistory 엔티티를 CardHistoryResponse로 변환
//        return cardHistoryPage.map(cardHistory -> new CardHistoryResponse(cardHistory));
//    }


}
