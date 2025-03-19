package CardRecommendService.memberCard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberCardRepository extends JpaRepository<MemberCard, Long> {
    List<MemberCard> findByMemberId(String memberId);
}

