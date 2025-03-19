package CardRecommendService.cardHistory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CardHistoryRepository extends JpaRepository<CardHistory, Long> {

    List<CardHistory> findByMemberCard_IdAndPaymentDatetimeBetween(Long memberCardId, LocalDateTime startDateTime, LocalDateTime endDateTime);

}
