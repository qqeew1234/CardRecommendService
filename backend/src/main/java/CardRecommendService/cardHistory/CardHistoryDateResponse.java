package CardRecommendService.cardHistory;

import java.time.LocalDate;

public record CardHistoryDateResponse(LocalDate paymentDate, double totalAmount) {
}
