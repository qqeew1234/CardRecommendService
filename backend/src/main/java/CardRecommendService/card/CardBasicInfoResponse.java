package CardRecommendService.card;

public record CardBasicInfoResponse(
        Long id,
        String cardCorp,
        String cardName,
        String cardImg,
        Long memberCardId,
        String altTxt

) {
}
