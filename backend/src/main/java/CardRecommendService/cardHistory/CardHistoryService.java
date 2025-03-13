package CardRecommendService.cardHistory;

import CardRecommendService.card.Card;
import CardRecommendService.card.CardResponse;
import CardRecommendService.cardBenefits.CardBenefitsResponse;
import CardRecommendService.memberCard.MemberCard;
import CardRecommendService.memberCard.MemberCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardHistoryService {

    private final CardHistoryRepository cardHistoryRepository;
    private final MemberCardRepository memberCardRepository;

    @Autowired
    public CardHistoryService(CardHistoryRepository cardHistoryRepository, MemberCardRepository memberCardRepository) {
        this.cardHistoryRepository = cardHistoryRepository;
        this.memberCardRepository = memberCardRepository;
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
                cardWithHighestAmount.getCardType().name(),
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


//    public double getTotalAmountForLastMonth(Long memberCardId) {
//
//        //최근 한달 날짜 구하기.
//        LocalDateTime endDateTime = LocalDateTime.now();
//        LocalDateTime startDateTime = endDateTime.minusMonths(1);
//
//        //카드 결제 내역 조회
//        List<CardHistory> cardHistoryList = cardHistoryRepository.findByMemberCard_IdAndPaymentDateTimeBetween
//                (memberCardId, startDateTime, endDateTime);
//
//        return cardHistoryList.stream()
//                .mapToDouble(CardHistory::getAmount)
//                .sum();
//
//    }


}
