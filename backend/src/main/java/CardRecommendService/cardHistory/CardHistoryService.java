package CardRecommendService.cardHistory;

import CardRecommendService.Classification.Classification;
import CardRecommendService.Classification.ClassificationRepository;
import CardRecommendService.card.Card;
import CardRecommendService.card.CardResponse;
import CardRecommendService.cardBenefits.CardBenefitsResponse;
import CardRecommendService.memberCard.MemberCard;
import CardRecommendService.memberCard.MemberCardRepository;

import jakarta.transaction.Transactional;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CardHistoryService {

    private final CardHistoryRepository cardHistoryRepository;
    private final MemberCardRepository memberCardRepository;
    private final CardHistoryQueryRepository qCardRepository;
    private final ClassificationRepository classificationRepository;

    public CardHistoryService(CardHistoryRepository cardHistoryRepository, MemberCardRepository memberCardRepository, CardHistoryQueryRepository qCardRepository, ClassificationRepository classificationRepository) {
        this.cardHistoryRepository = cardHistoryRepository;
        this.memberCardRepository = memberCardRepository;
        this.qCardRepository = qCardRepository;
        this.classificationRepository = classificationRepository;

    }

    //특정 사용자의 선택한 카드들의 기간별 사용 내역을 조회
    public FindAllResponse getSelected(String uuid, List<Long> memberCardIds, Integer monthOffset, Pageable pageable) {
        Page<CardHistory> selectedMemberCards = qCardRepository.findSelectedByMemberIdAndPeriod(uuid, memberCardIds, monthOffset, pageable);

        Integer memberCardsTotalCost
                = qCardRepository.getMemberCardsTotalAmount(uuid, memberCardIds, monthOffset);

        List<CardHistoryResponse> cardHistoryResponses = selectedMemberCards.getContent()
                .stream()
                .map(selectedMemberCard -> new CardHistoryResponse(
                        selectedMemberCard.getMemberCard().getCard().getCardName(),
                        selectedMemberCard.getMemberCard().getCard().getCardCrop(),
                        selectedMemberCard.getStoreName(),
                        selectedMemberCard.getAmount(),
                        selectedMemberCard.getPaymentDatetime(),
                        selectedMemberCard.getCategory(),
                        selectedMemberCard.getClassification() != null ? selectedMemberCard.getClassification().getTitle() : "-" // 🔥 `String` 변환
                )).toList();

        long totalCount = selectedMemberCards.getTotalElements();

        return new FindAllResponse(cardHistoryResponses, totalCount, memberCardsTotalCost);
    }


    //기능 1. 결제 기록에 Classification 추가.
    @Transactional
    public CardHistory updateClassification(Long cardHistoryId, Long classificationId) {

        CardHistory cardHistory = cardHistoryRepository.findById(cardHistoryId)
                .orElseThrow(() -> new IllegalArgumentException("결제 기록을 찾을 수 없습니다."));

        Classification classification = classificationRepository.findById(classificationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 분류를 찾을 수 없습니다."));

        // 추가: classification이 null이 아니고, 제대로 설정되었는지 확인
        System.out.println("업데이트할 classification: " + classification);

        cardHistory.setClassification(classification);

        CardHistory updatedHistory = cardHistoryRepository.save(cardHistory);

        // 추가: cardHistory가 제대로 업데이트되었는지 확인
        System.out.println("업데이트된 cardHistory: " + updatedHistory);

        return cardHistoryRepository.save(cardHistory);

    }

    //기능 2.결제 기록에 Classification 삭제.
    @Transactional
    public CardHistory deleteClassification(Long cardHistoryId, Long classificationId) {

        // 결제 기록 찾기
        CardHistory cardHistory = cardHistoryRepository.findById(cardHistoryId)
                .orElseThrow(() -> new IllegalArgumentException("결제 기록을 찾을 수 없습니다."));

        // 해당 Classification 찾기
        Classification classification = classificationRepository.findById(classificationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 분류를 찾을 수 없습니다."));

        // 만약 해당 결제 기록에 해당 Classification이 설정되어 있으면 null로 설정하여 삭제
        if (cardHistory.getClassification() != null && cardHistory.getClassification().equals(classification)) {
            cardHistory.setClassification(null);
        } else {
            throw new IllegalArgumentException("이 결제 기록에 해당 Classification이 연결되어 있지 않습니다.");
        }

        // 결제 기록 저장
        return cardHistoryRepository.save(cardHistory);
    }

    //기능 3. N개의 Classification 로 해당 Classification들에 해당하는 결제 기록과 총 결제 금액, 퍼센테이지 표시
    @Transactional
    public CardHistoryResultResponse calculateClassificationPayments(List<Long> classificationIds) {
        // classificationIds에 해당하는 CardHistory 목록을 조회
        List<CardHistory> cardHistories = cardHistoryRepository.findByClassificationIdIn(classificationIds);

        double totalAmount = 0;
        double selectedAmount = 0;

        List<CardHistoryResponse> filteredCardHistories = new ArrayList<>(); // ✅ CardHistoryResponse 리스트로 변경

        // 전체 결제 금액을 계산하고, 필터링된 카드 기록들을 모은다.
        for (CardHistory history : cardHistories) {
            totalAmount += history.getAmount(); // 전체 결제 금액
            if (classificationIds.contains(history.getClassification().getId())) { // ClassificationId로 필터링
                filteredCardHistories.add(
                        new CardHistoryResponse(
                                history.getMemberCard().getCard().getCardName(),
                                history.getMemberCard().getCard().getCardCrop(),
                                history.getStoreName(),
                                history.getAmount(),
                                history.getPaymentDatetime(),
                                history.getCategory(),
                                history.getClassification() != null ? history.getClassification().getTitle() : "-" // 🔥 이제 정상 작동
                        )
                );
                selectedAmount += history.getAmount(); // 선택된 금액의 합산
            }
        }

        // 퍼센티지 계산
        double percentage = totalAmount > 0 ? (selectedAmount / totalAmount) * 100 : 0;

        // 결과 반환
        return new CardHistoryResultResponse(filteredCardHistories, totalAmount, selectedAmount, percentage);
    }


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
    }
