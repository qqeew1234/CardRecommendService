package CardRecommendService.Classification;


import CardRecommendService.cardHistory.CardHistory;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Classification {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    private CardHistory getCardHistories;

    @OneToMany
    private List<CardHistory> cardHistories;

    private boolean isChecked; // 체크 여부를 나타내는 필드

    public List<CardHistory> getCardHistories() {
        return cardHistories;
    }

    public CardHistory getGetCardHistories() {
        return getCardHistories;
    }

    public void setChecked(boolean checked) {
        isChecked = checked;
    }

    public Classification() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public CardHistory getCardHistory() {
        return getCardHistories;
    }

    public boolean isChecked() {
        return isChecked;
    }

    public Classification(String title) {
        this.title = title;
    }



}
