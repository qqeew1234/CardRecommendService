package CardRecommendService.cardHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import CardRecommendService.loginUtils.CurrentUserId;
import CardRecommendService.memberCard.MemberCardService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


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

}