package CardRecommendService.cardHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import CardRecommendService.loginUtils.CurrentUserId;
import CardRecommendService.memberCard.MemberCardService;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@RestController
public class CardHistoryController {

    private final CardHistoryService cardHistoryService;

    public CardHistoryController(CardHistoryService cardHistoryService) {
        this.cardHistoryService = cardHistoryService;
    }

    //특정 사용자의 선택한 카드들의 기간별 사용 내역을 조회
    @GetMapping("membercardhistories/{uuid}/selected")
    public FindAllResponse getSelectedMemberCards(@PathVariable String uuid,
                                                  @RequestParam(required = false) List<Long> memberCardIds,
                                                  @RequestParam(required = false) Integer monthOffset,
                                                  @RequestParam(defaultValue = "1") int page,
                                                  @RequestParam(defaultValue = "13") int size) {

        Pageable pageable = PageRequest.of(page -1, size);

        return cardHistoryService.getSelected(uuid, memberCardIds, monthOffset, pageable);
    }


    //기능 1. 결제 기록에 Classification 추가.
    @PatchMapping("/cardhistory/{cardHistoryId}/classification/{classificationId}")
    public CardHistoryWithClassificationResponse updateClassification(
            @PathVariable Long cardHistoryId,
            @PathVariable Long classificationId) {

        CardHistory updatedHistory = cardHistoryService.updateClassification(cardHistoryId, classificationId);

        return new CardHistoryWithClassificationResponse(updatedHistory);
    }

    //기능 2: 결제 기록에서 특정 Classification 삭제
    @DeleteMapping("/cardhistory/{cardHistoryId}/classification/{classificationId}")
    public CardHistoryWithClassificationResponse deleteClassification(
            @PathVariable Long cardHistoryId,
            @PathVariable Long classificationId) {

        // 서비스에서 해당 결제 기록에서 Classification 삭제 처리
        CardHistory updatedHistory = cardHistoryService.deleteClassification(cardHistoryId, classificationId);

        // 삭제된 결제 기록을 응답으로 반환
        return new CardHistoryWithClassificationResponse(updatedHistory);
    }

    //기능 3. 특정 ClassificationID N개로 해당 Classification들에 해당하는 CardHistory들과 마지막에 Classification들에 대한 총 결제 금액, 퍼센테이지 표시
    @GetMapping("/cardhistory/classification")
    public CardHistoryResultResponse calculatePayments(@RequestParam List<Long> classificationIds) {
        return cardHistoryService.calculateClassificationPayments(classificationIds);
    }


}