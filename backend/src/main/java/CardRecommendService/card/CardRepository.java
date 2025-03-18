package CardRecommendService.card;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository <Card, Long> {

    //로그인된 사용자의 카드만 조회.
    List<Card> findByUserId(String userId);

}
