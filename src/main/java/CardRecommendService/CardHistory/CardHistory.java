package CardRecommendService.CardHistory;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CardHistory {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;

    private String storeName;

    private String paymentCount; // 결제 횟수

    private String patmentDateTime; // 결제 시각

    private String paymentCategory;







}
