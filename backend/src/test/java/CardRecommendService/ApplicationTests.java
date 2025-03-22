package CardRecommendService;

import CardRecommendService.Classification.ClassificationResponse;
import CardRecommendService.Classification.CreateClassificationRequest;
import CardRecommendService.cardHistory.CardHistoryResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.util.Arrays;
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


    @DisplayName("선택한 카드 조회")
    @Test
    void 선택한카드조회_결제총액() {

        String uuid = "1";

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .pathParam("uuid", uuid)
                .queryParam("memberCardIds", 1L, 2L)
                .get("membercardhistories/{uuid}/selected")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .jsonPath();
    }

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


    // uuid에 해당하는 사용자의 모든 카드 목록 조회
    @DisplayName("uuid에 해당하는 사용자의 모든 카드 목록 조회")
    @Test
    void uuid에사용자의모든카드목록조회() {
        RestAssured
                .given().log().all()
                .pathParam("uuid", 1L)// 카테고리 3개 선택
                .when()
                .get("/membercard/{uuid}")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath();
    }


    List<Long> memberCardId = Arrays.asList(1L, 2L, 3L); // 예시로  카드 선택

    @Test
    void 카드선택() {
        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(memberCardId)
                .when()
                .post("/api/cards/select")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath();
    }


    // 멤버 카드와 결제 내역을 조회, 결제 내역을 월 단위로 필터링
    @DisplayName("멤버 카드와 결제 내역을 조회, 결제 내역을 월 단위로 필터링")
    @Test
    void getCardsHistories() {
        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .param("memberCardIds", "1,2,3")  // 쿼리 파라미터로 memberCardIds 추가
                .param("month", "2")
                .when()
                .get("/membercard/cards/history")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath();
    }


    // 멤버 카드와 결제 내역을 조회, 결제 내역을 월 단위로 필터링2 - 3월
    @DisplayName("멤버 카드와 결제 내역을 조회, 결제 내역을 월 단위로 필터링2 - 3월")
    @Test
    void getCardsHistories2MonthOf3() {
        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .param("memberCardIds", "1,2,3")  // 쿼리 파라미터로 memberCardIds 추가
                .param("month", "3")
                .when()
                .get("/membercard/cards/history")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath();
    }


    // 분류 생성 테스트
    @DisplayName("분류 생성 테스트")
    @Test
    void 분류생성() {
        CreateClassificationRequest request = new CreateClassificationRequest("새로운 분류");

        RestAssured
                .given().log().all()
                .contentType("application/json")
                .body(request)
                .when()
                .post("/classifications")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    // 분류 목록 조회 테스트
    @DisplayName("분류 목록 조회 테스트")
    @Test
    void 분류목록조회() {

        CreateClassificationRequest request = new CreateClassificationRequest("새로운 분류");

        RestAssured
                .given().log().all()
                .contentType("application/json")
                .body(request)
                .when()
                .post("/classifications")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        RestAssured
                .given().log().all()
                .when()
                .get("/classifications")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    // 분류 삭제 테스트
    @DisplayName("분류 삭제 테스트")
    @Test
    void 분류삭제() {
        CreateClassificationRequest request = new CreateClassificationRequest("새로운 분류");

        RestAssured
                .given().log().all()
                .contentType("application/json")
                .body(request)
                .when()
                .post("/classifications")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        RestAssured
                .given().log().all()
                .when()
                .pathParam("classificationId", 1L)
                .delete("/classifications/{classificationId}")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }


}