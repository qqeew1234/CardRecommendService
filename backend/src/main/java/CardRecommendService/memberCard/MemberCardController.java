package CardRecommendService.memberCard;


import CardRecommendService.card.Card;
import CardRecommendService.cardHistory.CardHistoryResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/membercard")
public class MemberCardController {


    private MemberCardService memberCardService;

    public MemberCardController(MemberCardService memberCardService) {
        this.memberCardService = memberCardService;
    }

    //분석 카드 선택창 : (로그인된) 사용자가 가진 모든(ALL) 카드 가져오기
    @GetMapping("/{userId}")
    public MemberCardListResponse getAllMemberCardListByUserId(@PathVariable String userId) {
        return memberCardService.getAllMemberCardListByUserId(userId);
    }


    //분석 카드 선택 : 분석할 로그인된 유저의 카드를 1개 또는 여러개 선택
    @GetMapping("/analysiscards")
    public MemberCardListResponse getAnalysisCardsByUserIdAndCardIds(
            @PathVariable String userId,  // 사용자 ID
            @RequestParam List<Long> cardIds) {
        return memberCardService.getAnalysisCardsByUserIdAndCardIds(userId, cardIds);
    }


    //숨김온오프
    @PatchMapping("/{userId}/{cardId}/hidden")
    public boolean updateMemberCardIsHidden(
            @PathVariable String userId,
            @PathVariable Long cardId,
            @RequestParam boolean isHidden) {
        return memberCardService.updateMemberCardIsHidden(userId, cardId, isHidden);
    }







}


//    //분석 카드 선택창, 사용자가 가진 모든 카드 가져오기.
//
//    @GetMapping("/members/cards")
//    public MemberCardResponse listUserCards(@RequestHeader(HttpHeaders.AUTHORIZATION) String authToken) {
//        // "Bearer token값"에서 실제 토큰 값만 추출
//        String token = authToken.replace("Bearer ", "");
//
//        // Supabase JWT에서 사용자 ID 가져오기
//        String userId = supabaseClient.auth().getUser(token).getId();
//
//        return memberCardService.listUserCards(userId);
//    }
//
//
//    //카드 목록 불러오기
//
//    @GetMapping("/cards")
//    public List<Long> listUserCardIds(@RequestHeader(HttpHeaders.AUTHORIZATION) String authToken) {
//        // "Bearer {access_token}"에서 실제 토큰 값만 추출
//        String token = authToken.replace("Bearer ", "");
//
//        // Supabase JWT 토큰에서 로그인된 사용자 ID 가져오기
//        String userId = supabaseClient.auth().getUser(token).getId();
//
//        // 사용자의 모든 카드 ID 조회
//        return memberCardService.getMemberCardIds(userId);
//    }
//
//    //로그인된 유저의 카드별 결제내역
//    @GetMapping("/cards/transactions")
//    public List<CardHistoryResponse> getUserCardHistories(
//            @RequestHeader(HttpHeaders.AUTHORIZATION) String authToken,
//            @RequestParam List<Long> cardIds
//    ) {
//        // "Bearer {access_token}"에서 실제 토큰 값만 추출
//        String token = authToken.replace("Bearer ", "");
//
//        // Supabase JWT 토큰에서 로그인된 사용자 ID 가져오기
//        String userId = supabaseClient.auth().getUser(token).getId();
//
//        // 사용자의 카드별 결제 내역 조회
//        return memberCardService.getUserCardHistories(userId, cardIds);
//    }
//







