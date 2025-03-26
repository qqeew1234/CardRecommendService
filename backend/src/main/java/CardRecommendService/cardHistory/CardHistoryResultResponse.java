package CardRecommendService.cardHistory;

import java.util.List;
import java.util.stream.Collectors;

public record CardHistoryResultResponse(
        List<CardHistoryResponse> filteredCardHistories, // 🔥 CardHistory 대신 CardHistoryResponse 사용
        double totalAmount,
        double selectedAmount,
        double percentage
) {
}
