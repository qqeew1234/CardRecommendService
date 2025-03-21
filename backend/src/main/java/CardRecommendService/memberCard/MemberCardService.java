package CardRecommendService.memberCard;

import CardRecommendService.card.CardBasicInfoResponse;
import CardRecommendService.card.CardDetailResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberCardService {

    private final MemberCardRepository memberCardRepository;

    public MemberCardService(MemberCardRepository memberCardRepository) {
        this.memberCardRepository = memberCardRepository;
    }

    // uuid에 해당하는 사용자의 모든 카드 정보 조회
    public List<CardBasicInfoResponse> getAllMemberCardBasicInfoByUserId(String uuid) {
        // uuid에 해당하는 모든 카드 조회 후, 카드 이름과 이미지만 추출하여 리스트 반환
        return memberCardRepository.findByUuid(uuid)
                .stream()
                .map(memberCard -> new CardBasicInfoResponse(
                        memberCard.getCard().getCardName(),
                        memberCard.getCard().getImgUrl(),
                        memberCard.getId()
                ))
                .collect(Collectors.toList()); // 리스트로 반환
    }
}
