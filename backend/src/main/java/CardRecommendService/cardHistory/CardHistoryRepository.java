package CardRecommendService.cardHistory;

import CardRecommendService.Classification.Classification;
import CardRecommendService.memberCard.MemberCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CardHistoryRepository extends JpaRepository<CardHistory, Long> {

    List<CardHistory> findByMemberCard_IdAndPaymentDatetimeBetween(Long memberCardId, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<CardHistory> findByMemberCardInAndPaymentDatetimeBetween(List<MemberCard> memberCards, LocalDateTime startOfMonthTime, LocalDateTime endOfMonthTime);

    List<CardHistory> findByClassificationIdIn(List<Long> classificationIds);
}
