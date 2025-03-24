
package CardRecommendService.cardHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Repository
public class CardHistoryQueryRepository {

    private final JPAQueryFactory queryFactory;
    private final QCardHistory qCardHistory = QCardHistory.cardHistory;

    public CardHistoryQueryRepository(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    public Page<CardHistory> findByMemberIdAndPeriod(String uuid, Integer monthOffset, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page -1, pageSize);

        List<CardHistory> content = queryFactory
                .selectFrom(qCardHistory)
                .where(qCardHistory.uuid.eq(uuid), queryConditions(monthOffset))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(qCardHistory.paymentDatetime.asc())
                .fetch();

        Long total = queryFactory
                .select(qCardHistory.count())
                .from(qCardHistory)
                .where(qCardHistory.uuid.eq(uuid))
                .fetchOne();

        return new PageImpl<CardHistory>(content, pageable, total);
    }

    public Page<CardHistory> findSelectedByMemberIdAndPeriod(String uuid, List<Long> memberCardIds, Integer monthOffset, Pageable pageable) {

        List<CardHistory> content = queryFactory
                .selectFrom(qCardHistory)
                .where(qCardHistory.uuid.eq(uuid), qCardHistory.memberCard.id.in(memberCardIds), queryConditions(monthOffset))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(qCardHistory.paymentDatetime.asc())
                .fetch();

        Long pageCount = queryFactory
                .select(qCardHistory.count())
                .where(qCardHistory.uuid.eq(uuid), qCardHistory.memberCard.id.in(memberCardIds), queryConditions(monthOffset))
                .from(qCardHistory)
                .fetchOne();

        //pageCount null 방지
        long safePageCount = (pageCount != null) ? pageCount : 0L;

        return new PageImpl<>(content, pageable, safePageCount);
    }


    //기간 조건 설정하기
    private BooleanExpression queryConditions(Integer monthOffset) {

        //현재 날짜의 전월, 전전월, 전전전월. 최장 3개월
        YearMonth targetMonth = YearMonth.from(LocalDate.now()).minusMonths(monthOffset);

        LocalDateTime startDate = targetMonth.atDay(1).atStartOfDay();
        LocalDateTime endDate = targetMonth.atEndOfMonth().atTime(23, 59, 59);

        return qCardHistory.paymentDatetime.between(startDate, endDate);
    }


    //총 결제금액 계산하기
    public int getTotalAmount(String uuid, Integer monthOffset) {
        QCardHistory qCardHistory = QCardHistory.cardHistory;

        Integer totalAmount = queryFactory
                .select(qCardHistory.amount.sum())
                .from(qCardHistory)
                .where(qCardHistory.uuid.eq(uuid), queryConditions(monthOffset))
                .fetchOne();
        return (totalAmount != null) ? totalAmount : 0;
    }

    public int getMemberCardsTotalAmount(String uuid, List<Long> memberCardIds, Integer monthOffset) {
        QCardHistory qCardHistory = QCardHistory.cardHistory;

        Integer totalAmount = queryFactory
                .select(qCardHistory.amount.sum())
                .from(qCardHistory)
                .where(qCardHistory.uuid.eq(uuid), qCardHistory.memberCard.id.in(memberCardIds), queryConditions(monthOffset))
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
