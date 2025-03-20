
package CardRecommendService.cardHistory;


import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class CardHistoryQueryRepository {

    private final JPAQueryFactory queryFactory;
    private final QCardHistory qCardHistory = QCardHistory.cardHistory;

    public CardHistoryQueryRepository(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public List<CardHistory> findByMemberIdAndPeriod(String uuid, LocalDateTime startDate, LocalDateTime endDate) {


        return queryFactory
                .selectFrom(qCardHistory)
                .where(qCardHistory.uuid.eq(uuid), queryConditions(startDate, endDate))
                .orderBy(qCardHistory.paymentDatetime.asc())
                .fetch();
    }

    public List<CardHistory> findSelectedByMemberIdAndPeriod(String uuid, List<Long> memberCardIds, LocalDateTime startDate, LocalDateTime endDate) {

        return queryFactory
                .selectFrom(qCardHistory)
                .where(qCardHistory.uuid.eq(uuid), qCardHistory.memberCard.id.in(memberCardIds), queryConditions(startDate, endDate))
                .orderBy(qCardHistory.paymentDatetime.asc())
                .fetch();
    }


    //기간 조건 설정하기(최대 3개월, 기본값은 한 달)
    private BooleanExpression queryConditions(LocalDateTime startDate, LocalDateTime endDate) {


        //startDate, endDate 값이 null일 때
        if (startDate == null && endDate == null) {
            endDate = LocalDateTime.now();
            startDate = endDate.minusMonths(1);
        } else if (startDate == null) {
            startDate = endDate.minusMonths(1);
        } else if (endDate == null) {
            endDate = startDate.plusMonths(1);
        }

        //종료날짜가 현재 날짜를 넘어가면 현재날짜로 강제함
        if (endDate.isAfter(LocalDateTime.now())) {
            endDate = LocalDateTime.now();
        }

        //종료날짜가 3개월보다 길면 3개월을 강제함
        if (endDate.isAfter(startDate.plusMonths(3))) {
            endDate = startDate.plusMonths(3);
        }


        return qCardHistory.paymentDatetime.between(startDate, endDate);
    }


    //총 결제금액 계산하기
    public int getTotalAmount(String uuid, LocalDateTime startDate, LocalDateTime endDate) {
        QCardHistory qCardHistory = QCardHistory.cardHistory;

        Integer totalAmount = queryFactory
                .select(qCardHistory.amount.sum())
                .from(qCardHistory)
                .where(qCardHistory.uuid.eq(uuid), queryConditions(startDate, endDate))
                .fetchOne();
        return (totalAmount != null) ? totalAmount : 0;

    }

    public int getMemberCardsTotalAmount(String uuid, List<Long> memberCardIds, LocalDateTime startDate, LocalDateTime endDate) {
        QCardHistory qCardHistory = QCardHistory.cardHistory;

        Integer totalAmount = queryFactory
                .select(qCardHistory.amount.sum())
                .from(qCardHistory)
                .where(qCardHistory.uuid.eq(uuid), qCardHistory.memberCard.id.in(memberCardIds), queryConditions(startDate, endDate))
                .fetchOne();
        return (totalAmount != null) ? totalAmount : 0;

    }




//
//    // 날짜 범위로 결제 내역 조회
//    public List<CardHistoryDateResponse> findCardHistoryByDateRange(LocalDate startDate, LocalDate endDate) {
//        // SQL DATE() 함수를 사용하여 LocalDateTime에서 날짜 부분만 추출
//        return queryFactory
//                .select(
//                        Expressions.dateTemplate(LocalDate.class, "{0}", qCardHistory.paymentDatetime),  // SQL DATE() 함수 사용
//                        qCardHistory.amount.sum()  // 결제 금액 합계
//                )
//                .from(qCardHistory)
//                .where(Expressions.dateTemplate(LocalDate.class, "{0}", qCardHistory.paymentDatetime).between(startDate, endDate))  // 날짜 범위 조건
//                .groupBy(Expressions.dateTemplate(LocalDate.class, "{0}", qCardHistory.paymentDatetime))  // 날짜별 그룹화
//                .fetch()
//                .stream()
//                .map(record -> new CardHistoryDateResponse(record.get(0, LocalDate.class), record.get(1, Double.class)))  // 응답 객체 변환
//                .toList();
//    }


}
