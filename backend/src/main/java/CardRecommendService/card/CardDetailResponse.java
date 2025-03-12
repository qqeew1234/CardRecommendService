package CardRecommendService.card;

import CardRecommendService.cardBenefits.CardBenefits;
import CardRecommendService.memberCard.MemberCard;

import java.util.List;

public record CardDetailResponse(

        String cardIssuer,
        String cardName,
        String cardType,
        int annualFee,
        List<MemberCard> memberCards,
        List<CardBenefits> cardBenefits


) {
}
