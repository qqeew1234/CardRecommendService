package CardRecommendService.member;

import CardRecommendService.cardHistory.CardHistory;
import CardRecommendService.memberCard.MemberCard;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Member {

    private String id;

    @OneToMany(mappedBy = "member")
    private List<CardHistory> cardHistories;

    @OneToMany(mappedBy = "member")
    private List<MemberCard> memberCards;

    protected Member() {
    }

    public Member(String id) {
        this.id = id;
    }

    public Member(String id, List<CardHistory> cardHistories, List<MemberCard> memberCards) {
        this.id = id;
        this.cardHistories = cardHistories;
        this.memberCards = memberCards;
    }

    public String getId() {
        return id;
    }

    public List<CardHistory> getCardHistories() {
        return cardHistories;
    }

    public List<MemberCard> getMemberCards() {
        return memberCards;
    }
}
