package CardRecommendService.cardHistory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CardHistoryRepository extends JpaRepository<CardHistory, Long> {

    //조회

    List<CardHistory> findByMemberCard_IdAndPaymentDateTimeBetween(Long memberCardId, LocalDateTime startDateTime, LocalDateTime endDateTime);


    // 특정 사용자 ID와 카드 ID에 대한 결제 내역 단일 조회
    CardHistory findByMemberIdAndCardId(String userId, Long cardId);


}
