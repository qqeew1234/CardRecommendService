package CardRecommendService.memberCard;

import CardRecommendService.card.CardDetailResponse;
import CardRecommendService.cardHistory.CardHistoryResponse;
import CardRecommendService.member.MemberResponse;

import java.util.List;

public record MemberCardResponse(

        String cardNumber,
        String cardImg,
        MemberResponse member,
        CardDetailResponse card,
        List<CardHistoryResponse> cardHistories,
        boolean isHidden


) {
}
