package CardRecommendService.cardHistory;

import CardRecommendService.card.Card;
import CardRecommendService.card.CardResponse;
import CardRecommendService.cardBenefits.CardBenefitsResponse;
import CardRecommendService.memberCard.MemberCard;
import CardRecommendService.memberCard.MemberCardRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardHistoryService {

    private final CardHistoryRepository cardHistoryRepository;
    private final MemberCardRepository memberCardRepository;
    private final CardHistoryQueryRepository qCardRepository;

    public CardHistoryService(CardHistoryRepository cardHistoryRepository, MemberCardRepository memberCardRepository, CardRecommendService.cardHistory.CardHistoryQueryRepository qCardRepository) {
        this.cardHistoryRepository = cardHistoryRepository;
        this.memberCardRepository = memberCardRepository;
        this.qCardRepository = qCardRepository;
    }

    //사용자의 모든 카드 결제내역 조회 + 총 결제금액 합산
    public FindAllResponse getAll (String uuid, LocalDateTime startDate, LocalDateTime endDatetime){
        List<CardHistory> cardHistories = qCardRepository.findByMemberIdAndPeriod(uuid, startDate, endDatetime);

        List<CardHistoryResponse> cardHistoryResponses = cardHistories
                .stream()
                .map(cardHistory -> new CardHistoryResponse(
                        cardHistory.getStoreName(),
                        cardHistory.getAmount(),
                        cardHistory.getPaymentDatetime(),
                        cardHistory.getCategory()
                )).toList();

        Integer totalAmount = qCardRepository.getTotalAmount(uuid, startDate, endDatetime);
        Integer safeTotalAmount = (totalAmount != null) ? totalAmount : 0;

        return new FindAllResponse(cardHistoryResponses, totalAmount);
    }




    public CardResponse getCardWithHighestAmount(Long memberId) {

        //최근 한 달 날짜 구하기.
        LocalDateTime endDateTime = LocalDateTime.now();
        LocalDateTime startDateTime = endDateTime.minusMonths(1);

        //멤버가 가진 카드 리스트 조회
        List<MemberCard> memberCards = memberCardRepository.findByMemberId(memberId);

        //최고 결제 금액을 가진 카드, 최고 결제 금액 저장 변수들.
        Card cardWithHighestAmount = null;
        double highestAmount = 0;

        //각 카드의 결제 내역 조회 후 합산
        for (MemberCard memberCard : memberCards) {

            //카드 결제 내역 조회
            List<CardHistory> cardHistoryList = cardHistoryRepository.findByMemberCard_IdAndPaymentDateTimeBetween(
                    memberCard.getId(), startDateTime, endDateTime);

            //결제 금액 합산
            double totalAmount = cardHistoryList.stream()
                    .mapToDouble(CardHistory::getAmount)
                    .sum();

            //가장 높은 결제 금액카드 찾기, 비교 후 선정
            if (totalAmount > highestAmount) {
                highestAmount = totalAmount;
                cardWithHighestAmount = memberCard.getCard();
            }
        }

        return new CardResponse(
                cardWithHighestAmount.getCardIssuer(),
                cardWithHighestAmount.getCardName(),
                cardWithHighestAmount.getAnnualFee(),
                cardWithHighestAmount.getCardBenefits().stream()
                        .map(benefit -> new CardBenefitsResponse(
                                benefit.getBnfName(),
                                benefit.getBnfDetail(),
                                benefit.getBngDetail()
                        ))
                        .collect(Collectors.toList())
        );


    }

//    @Transactional
//    public CardHistoryResponse getCardHistoryByUserIdAndCard(String userId, Long cardId) {
//        // 사용자가 선택한 카드의 결제 내역 조회
//        CardHistory cardHistory = cardHistoryRepository.findByMemberIdAndCardId(userId, cardId);
//
//        // CardHistory 엔티티를 CardHistoryResponse로 변환하여 반환
//        return new CardHistoryResponse(
//                cardHistory.getAmount(),
//                cardHistory.getStoreName(),
//                cardHistory.getPaymentCount(),
//                cardHistory.getPaymentDateTime(),
//                cardHistory.getPaymentCategory()
//        );
//    }


//    public List<CardHistoryDateResponse> getDailyCardHistory(String startDate, String endDate) {
//        // String을 LocalDate로 변환
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        LocalDate parsedStartDate = LocalDate.parse(startDate, formatter);
//        LocalDate parsedEndDate = LocalDate.parse(endDate, formatter);
//
//        // CardHistoryQueryRepository의 인스턴스를 생성
//        CardHistoryQueryRepository cardHistoryQueryRepository = new CardHistoryQueryRepository(queryFactory);
//
//        // 변환된 LocalDate를 사용하여 findCardHistoryByDateRange 호출
//        return cardHistoryQueryRepository.findCardHistoryByDateRange(parsedStartDate, parsedEndDate);
//    }
}
