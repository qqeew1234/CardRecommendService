package CardRecommendService.cardHistory;

import CardRecommendService.loginUtils.CurrentUserId;
import CardRecommendService.memberCard.MemberCardService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
public class CardHistoryController {

    private final CardHistoryService cardHistoryService;
    private final MemberCardService memberCardService;

    public CardHistoryController(CardHistoryService cardHistoryService, MemberCardService memberCardService) {
        this.cardHistoryService = cardHistoryService;
        this.memberCardService = memberCardService;
    }

    //사용자의 모든 카드 결제내역 조회
    @GetMapping("/cardhistories/{uuid}")
    public FindAllResponse getAllCardHistories(@PathVariable @CurrentUserId String uuid,
                                               @RequestParam (required = false) LocalDateTime startDate,
                                               @RequestParam (required = false) LocalDateTime endDate) {

        return cardHistoryService.getAll(uuid, startDate, endDate);
    }

    //선택한 카드 결제내역 조회
    @GetMapping("membercardhistories/{uuid}/{membercardids}")
    public FindAllResponse getSelectedMemberCards(@PathVariable @CurrentUserId String uuid,
                                                  @PathVariable (name = "membercardids") List<Long> memberCardIds,
                                                  @RequestParam (required = false) LocalDateTime startDate,
                                                  @RequestParam  (required = false) LocalDateTime endDate){

        return cardHistoryService.getSelected(uuid, memberCardIds, startDate, endDate);
    }

    //로그인된 유저의 id와 membercardlistresponse로 특정 카드의 이용내역 보기
//    @GetMapping("/analysiscards/{userId}")
//    public CardHistoryResponse getCardHistoryByUserIdAndCard(@PathVariable String userId,  // 로그인된 유저 ID
//                                                             @RequestParam Long cardId) {
//        MemberCardListResponse memberCardListResponse = memberCardService.getAllMemberCardListByUserId(userId);
//
//        return cardHistoryService.getCardHistoryByUserIdAndCard(userId, cardId);
//    }


    //(이용일별로) 결제내역 보기
//    @GetMapping("/daily")
//    public List<CardHistoryDateResponse> getDailyCardHistory(@RequestParam String startDate, @RequestParam String endDate) {
//        return cardHistoryService.getDailyCardHistory(startDate, endDate);
//    }


}
