package CardRecommendService;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.util.List;


public class ApplicationTests extends AcceptanceTest {


    //카드 목록 조회
    @DisplayName("카드 목록 조회")
    @Test
    void 카드목록조회() {

        RestAssured
                .given().log().all()
                .when()
                .get("/cards")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }


    //카드 상세 조회
    @DisplayName("카드 상세 조회")
    @Test
    void 카드상세조회() {
        RestAssured
                .given().log().all()
                .pathParam("cardId", 1L)

                .when()
                .get("/cards/{cardId}")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    //메인 카드 조회
    @DisplayName("메인 카드 조회")
    @Test
    void 메인카드조회() {

        String uuid = "1";

//        LocalDateTime startDate = LocalDateTime.of(2025, 3, 1, 12, 0, 0);
//        LocalDateTime endDate = LocalDateTime.of(2025, 3, 10, 12, 0, 0);

        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .pathParam("uuid", uuid)
//                .queryParam("startDate", startDate.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
//                .queryParam("endDate", endDate.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .when()
                .get("/cardhistories/{uuid}")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }


//    //사용자의 모든 카드 결제내역 조회
//    @GetMapping("/cardhistories/{uuid}")
//    public FindAllResponse getAllCardHistories(@PathVariable String uuid,
//                                               @RequestParam(required = false) LocalDateTime startDate,
//                                               @RequestParam (required = false) LocalDateTime endDate) {
//
//        return cardHistoryService.getAll(uuid, startDate, endDate);
//    }

    //카드 추천 로직 테스트
    @DisplayName("카드 추천 로직 테스트")
    @Test
    void 카드추천로직테스트() {
        RestAssured
                .given().log().all()
                .queryParam("minAnnualFee", 10000) // 최소 연회비
                .queryParam("maxAnnualFee", 100000) // 최대 연회비
                .queryParam("storeCategories", "항공, 온라인쇼핑, 영화, 배달앱, 보험") // 카테고리 3개 선택
                .when()
                .get("/cards/recommend")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath();


    }

}
