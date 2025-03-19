package CardRecommendService.memberCard;

import CardRecommendService.card.CardDetailResponse;
import CardRecommendService.cardHistory.CardHistoryResponse;

import java.util.List;

public record MemberCardResponse(

        String cardNumber,
        String cardImg,
        Long memberId,
        CardDetailResponse card,
        List<CardHistoryResponse> cardHistories,
        boolean isHidden


) {
}
