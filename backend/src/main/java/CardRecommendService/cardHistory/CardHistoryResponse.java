package CardRecommendService.cardHistory;

import CardRecommendService.memberCard.MemberCardResponse;

import java.time.LocalDateTime;

public record CardHistoryResponse(
        String storeName,
        double amount,
        LocalDateTime paymentDatetime,
        Category category

) {
}
