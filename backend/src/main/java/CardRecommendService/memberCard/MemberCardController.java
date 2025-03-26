package CardRecommendService.memberCard;


import CardRecommendService.card.Card;
import CardRecommendService.card.CardBasicInfoResponse;
import CardRecommendService.cardHistory.CardHistoryResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.Map;

@RestController
public class MemberCardController {


    private MemberCardService memberCardService;

    public MemberCardController(MemberCardService memberCardService) {
        this.memberCardService = memberCardService;
    }

    // uuid에 해당하는 사용자의 모든 카드 목록 조회
    @GetMapping("/membercard/{uuid}")
    public List<CardBasicInfoResponse> getAllMemberCardBasicInfo(@PathVariable String uuid) {

        return memberCardService.getAllMemberCardBasicInfoByUserId(uuid); // 카드 목록을 리스트로 반환

    }

    // 카드 선택 API (Controller)
    @PostMapping("/api/cards/select")
    public List<CardBasicInfoResponse> selectCardsByIds(@RequestBody List<Long> memberCardIds) {
        // MemberCardService에서 선택된 카드들 반환
        return memberCardService.selectCardsByIds(memberCardIds);

    }

    // 멤버 카드와 결제 내역을 조회, 결제 내역을 월 단위로 필터링
    @GetMapping("/membercard/cards/history")
    public DailyCardHistoryPageResponse getCardsHistories(
            @RequestParam List<Long> memberCardIds,
            @RequestParam int month,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "13") int size) {
        Month convertedMonth = Month.of(month); // int를 Month로 변환

        Pageable pageable = PageRequest.of(page - 1, size);

        return memberCardService.getCardsHistories(memberCardIds, convertedMonth, pageable);
    }

}