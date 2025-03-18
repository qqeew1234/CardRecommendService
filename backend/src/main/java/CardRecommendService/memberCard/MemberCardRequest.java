package CardRecommendService.memberCard;

public record MemberCardRequest(Long id,
                                String cardNumber,
                                Long memberId) {
}
