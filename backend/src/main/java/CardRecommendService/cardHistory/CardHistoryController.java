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

    //특정 사용자의 선택한 카드들의 기간별 사용 내역을 조회
    @GetMapping("membercardhistories/{uuid}/selected")
    public FindAllResponse getSelectedMemberCards(@PathVariable String uuid,
                                                  @RequestParam(required = false) List<Long> memberCardIds,
                                                  @RequestParam(required = false) Integer monthOffset) {

        return cardHistoryService.getSelected(uuid, memberCardIds, monthOffset);
    }

}