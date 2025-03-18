package CardRecommendService.memberCard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberCardRepository extends JpaRepository<MemberCard, Long> {
    List<MemberCard> findByMemberId(Long memberId);


    // userId로 MemberCard 목록을 조회하는 메서드
    List<MemberCard> findByUserId(String userId);

    List<MemberCard> findByUserIdAndCardIdIn(String userId, List<Long> cardIds);


    Optional<MemberCard> findByUserIdAndCardId(String userId, Long cardId);
}

