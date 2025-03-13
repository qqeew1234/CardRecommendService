package CardRecommendService.cardHistory;

import CardRecommendService.memberCard.MemberCardResponse;

import java.time.LocalDateTime;

public record CardHistoryResponse(

        double amount,
        String storeName,
        String paymentCount,
        LocalDateTime paymentDateTime,
        String paymentCategory

) {
}
