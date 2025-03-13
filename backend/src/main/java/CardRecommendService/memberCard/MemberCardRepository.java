package CardRecommendService.memberCard;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberCardRepository extends JpaRepository<MemberCard, Long> {
    List<MemberCard> findByMemberId(Long memberId);

}
