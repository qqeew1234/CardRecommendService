package CardRecommendService.cardHistory;

import CardRecommendService.card.Card;
import CardRecommendService.card.CardResponse;
import CardRecommendService.cardBenefits.CardBenefitsResponse;
import CardRecommendService.memberCard.MemberCard;
import CardRecommendService.memberCard.MemberCardRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CardHistoryService {

    private final CardHistoryRepository cardHistoryRepository;
    private final MemberCardRepository memberCardRepository;
    private final CardHistoryQueryRepository cardHistoryQueryRepository;

    public CardHistoryService(CardHistoryRepository cardHistoryRepository, MemberCardRepository memberCardRepository, CardHistoryQueryRepository cardHistoryQueryRepository) {
        this.cardHistoryRepository = cardHistoryRepository;
        this.memberCardRepository = memberCardRepository;
        this.cardHistoryQueryRepository = cardHistoryQueryRepository;
    }


    //특정 사용자의 선택한 카드들의 기간별 사용 내역을 조회
    public FindAllResponse getSelected(String uuid, List<Long> memberCardIds, Integer monthOffset, Pageable pageable) {
        Page<CardHistory> selectedMemberCards = cardHistoryQueryRepository.findSelectedByMemberIdAndPeriod(uuid, memberCardIds, monthOffset, pageable);

        Integer memberCardsTotalCost
                = cardHistoryQueryRepository.getMemberCardsTotalAmount(uuid, memberCardIds, monthOffset);

        List<CardHistoryResponse> cardHistoryResponses = selectedMemberCards.getContent()
                .stream()
                .map(selectedMemberCard -> new CardHistoryResponse(
                        selectedMemberCard.getMemberCard().getCard().getCardName(),
                        selectedMemberCard.getMemberCard().getCard().getCardCrop(),
                        selectedMemberCard.getStoreName(),
                        selectedMemberCard.getAmount(),
                        selectedMemberCard.getPaymentDatetime(),
                        selectedMemberCard.getCategory()
                )).toList();

        long totalCount = selectedMemberCards.getTotalElements();

        return new FindAllResponse(cardHistoryResponses, totalCount, memberCardsTotalCost);
    }

//    public CHAnalysisResponse getClassification(){
//
//    }


//    //최근 한달 가장 많은 금액을 쓴 카드 선정하는 로직. 안씀.
//    public CardResponse getCardWithHighestAmount(String uuid) {
//
//        //최근 한 달 날짜 구하기.
//        LocalDateTime endDateTime = LocalDateTime.now();
//        LocalDateTime startDateTime = endDateTime.minusMonths(1);
//
//        //멤버가 가진 카드 리스트 조회
//        List<MemberCard> memberCards = memberCardRepository.findByUuid(uuid);
//
//        //최고 결제 금액을 가진 카드, 최고 결제 금액 저장 변수들.
//        Card cardWithHighestAmount = null;
//        double highestAmount = 0;
//
//        //각 카드의 결제 내역 조회 후 합산
//        for (MemberCard memberCard : memberCards) {
//
//            //카드 결제 내역 조회
//            List<CardHistory> cardHistoryList = cardHistoryRepository.findByMemberCard_IdAndPaymentDatetimeBetween(
//                    memberCard.getId(), startDateTime, endDateTime);
//
//            //결제 금액 합산
//            double totalAmount = cardHistoryList.stream()
//                    .mapToDouble(CardHistory::getAmount)
//                    .sum();
//
//            //가장 높은 결제 금액카드 찾기, 비교 후 선정
//            if (totalAmount > highestAmount) {
//                highestAmount = totalAmount;
//                cardWithHighestAmount = memberCard.getCard();
//            }
//        }
//
//        return new CardResponse(
//                cardWithHighestAmount.getCardCrop(),
//                cardWithHighestAmount.getCardName(),
//                cardWithHighestAmount.getAnnualFee(),
//                cardWithHighestAmount.getCardBenefits().stream()
//                        .map(benefit -> new CardBenefitsResponse(
//                                benefit.getBnfName(),
//                                benefit.getBnfDetail(),
//                                benefit.getBngDetail()
//                        ))
//                        .collect(Collectors.toList())
//        );
//
//
//    }
}