package CardRecommendService.card;

import CardRecommendService.cardBenefits.CardBenefitsResponse;
import CardRecommendService.memberCard.MemberCardResponse;

import java.util.List;

public record CardResponse(


        String cardIssuer,
        String cardName,
        int annualFee,
        List<CardBenefitsResponse> cardBenefits

) {
}
