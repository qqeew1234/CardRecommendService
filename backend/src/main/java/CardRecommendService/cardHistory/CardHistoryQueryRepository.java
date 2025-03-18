package CardRecommendService.cardHistory;


import com.querydsl.core.types.dsl.DateTemplate;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class CardHistoryQueryRepository {

    private final JPAQueryFactory queryFactory;
    private final QCardHistory qCardHistory = QCardHistory.cardHistory;

    public CardHistoryQueryRepository(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    // 날짜 범위로 결제 내역 조회
    public List<CardHistoryDateResponse> findCardHistoryByDateRange(LocalDate startDate, LocalDate endDate) {
        // SQL DATE() 함수를 사용하여 LocalDateTime에서 날짜 부분만 추출
        return queryFactory
                .select(
                        Expressions.dateTemplate(LocalDate.class, "{0}", qCardHistory.paymentDateTime),  // SQL DATE() 함수 사용
                        qCardHistory.amount.sum()  // 결제 금액 합계
                )
                .from(qCardHistory)
                .where(Expressions.dateTemplate(LocalDate.class, "{0}", qCardHistory.paymentDateTime).between(startDate, endDate))  // 날짜 범위 조건
                .groupBy(Expressions.dateTemplate(LocalDate.class, "{0}", qCardHistory.paymentDateTime))  // 날짜별 그룹화
                .fetch()
                .stream()
                .map(record -> new CardHistoryDateResponse(record.get(0, LocalDate.class), record.get(1, Double.class)))  // 응답 객체 변환
                .toList();
    }


}
