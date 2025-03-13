package CardRecommendService.member;

public record MemberResponse(


        String email,
        String nickname,
        Gender gender,
        int age


) {
}
