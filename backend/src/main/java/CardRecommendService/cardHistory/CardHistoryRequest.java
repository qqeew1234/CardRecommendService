package CardRecommendService.cardHistory;

import java.time.LocalDateTime;

public record CardHistoryRequest(Long memberId,
                                 Long memberCardId,
                                 int amount,
                                 String storeName,
                                 LocalDateTime paymentDatetime,
                                 Category category) {
}
