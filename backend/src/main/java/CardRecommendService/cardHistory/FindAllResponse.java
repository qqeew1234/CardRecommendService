package CardRecommendService.cardHistory;

import java.util.List;

public record FindAllResponse(List<CardHistoryResponse> cardHistoryList,
                              Long totalCount,
                              Integer totalCost) {
}
