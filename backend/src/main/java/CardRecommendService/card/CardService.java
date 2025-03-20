package CardRecommendService.card;


import CardRecommendService.cardBenefits.CardBenefitsResponse;
import CardRecommendService.cardHistory.Category;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final List<Card> allCards;


    public CardService(CardRepository cardRepository, List<Card> allCards) {
        this.cardRepository = cardRepository;
        this.allCards = allCards;
    }

    //모든 카드 리스트를 목록으로 조회
    @Transactional
    public List<CardResponse> getAllCards() {
        List<Card> cards = cardRepository.findAll();

        return cards.stream()
                .map(card -> new CardResponse(
                        card.getCardIssuer(),
                        card.getCardName(),
                        card.getAnnualFee(),
                        card.getCardBenefits().stream()
                                .map(cardBenefits -> new CardBenefitsResponse(
                                        cardBenefits.getBnfName(),
                                        cardBenefits.getBnfDetail(),
                                        cardBenefits.getBngDetail()
                                ))
                                .collect(Collectors.toList())

                ))
                .collect(Collectors.toList());


    }


    //카드 상세 조회
    public CardDetailResponse getCardDetailByCardId(Long cardId) {

        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new IllegalArgumentException("없는 카드"));

        // CardBenefits 객체들을 CardBenefitsResponse로 변환
        List<CardBenefitsResponse> cardBenefitsResponses = card.getCardBenefits().stream()
                .map(cardBenefits -> new CardBenefitsResponse(
                        cardBenefits.getBnfName(),
                        cardBenefits.getBnfDetail(),
                        cardBenefits.getBngDetail()))  // CardBenefits 객체의 값을 CardBenefitsResponse 생성자에 전달
                .collect(Collectors.toList());

        return new CardDetailResponse(
                card.getCardIssuer(),
                card.getCardName(),
                card.getAnnualFee(),
                cardBenefitsResponses
        );

    }


    //카드 추천 로직

    public List<Card> getRecommendCards(int minAnnualFee, int maxAnnualFee, Set<String> storeCategories) {

        Set<Category> selectedCategories = convertToCategoryEnumSet(storeCategories);

        //카테고리 최대 5개
        if (selectedCategories.size() > 5) {
            throw new IllegalArgumentException("최대 5개의 카테고리만 선택할 수 있습니다.");
        }

        //연회비 필터링
        List<Card> filteredCards = filterByAnnualFee(minAnnualFee, maxAnnualFee);

        //카드의 카테고리와 선택한 카테고리 비교
        List<Card> matchedCards = matchCategories(filteredCards, selectedCategories);

        //비교(매칭)된 카테고리 수를 기준으로 정렬
        matchedCards.sort(Comparator.comparingInt(this::countMatchedCategories).reversed());

        return matchedCards.stream()
                .limit(4)
                .collect(Collectors.toList());
    }

    //카테고리 문자열을 Category enum으로 변환
    private Set<Category> convertToCategoryEnumSet(Set<String> storeCategories) {
        Set<Category> selectedCategories = EnumSet.noneOf(Category.class);
        for (String storeCategory : storeCategories) {
            try {
                selectedCategories.add(Category.valueOf(storeCategory));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("존재하지 않는 카테고리입니다.");
            }
        }
        return selectedCategories;
    }

    //연회비 필터링
    private List<Card> filterByAnnualFee(int minAnnualFee, int maxAnnualFee) {
        return allCards.stream()
                .filter(card -> card.getAnnualFee() >= minAnnualFee && card.getAnnualFee() <= maxAnnualFee)
                .collect(Collectors.toList());
    }

    //카드의 카테고리와 선택한 카테고리 계산
    private List<Card> matchCategories(List<Card> cards, Set<Category> selectedCategories) {
        return cards.stream()
                .filter(card -> {
                    Set<Category> cardCategories = getCardCategories(card);
                    return !Collections.disjoint(cardCategories, selectedCategories);
                })
                .collect(Collectors.toList());
    }

    //카드를 기준으로 선택된 카테고리와 일치하는 갯수 계산(몇개인지)
    private int countMatchedCategories(Card card){
        Set<Category> cardCategories = getCardCategories(card);
        return (int) cardCategories.stream()
                .filter(category -> cardCategories.contains(category))
                .count();
    }

    //카드에서 카테고리 정보 추출
    private Set<Category> getCardCategories(Card card){
        Set<Category> cardCategories = EnumSet.noneOf(Category.class);
        if (card.getStore1() != null) cardCategories.add(Category.valueOf(card.getStore1()));
        if (card.getStore2() != null) cardCategories.add(Category.valueOf(card.getStore2()));
        if (card.getStore3() != null) cardCategories.add(Category.valueOf(card.getStore3()));
        return cardCategories;
    }




}


