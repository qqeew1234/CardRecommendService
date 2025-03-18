//package CardRecommendService;
//
//import io.restassured.RestAssured;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpStatus;
//import org.springframework.test.context.jdbc.Sql;
//
//public class ApplicationTests extends AcceptanceTest {
//
//
//    //카드 목록 조회
//    @DisplayName("카드 목록 조회")
//    @Test
//    void 카드목록조회() {
//
//        RestAssured
//                .given().log().all()
//                .when()
//                .get("/cards")
//                .then().log().all()
//                .statusCode(HttpStatus.OK.value());
//    }
//
//
//    //카드 상세 조회
//    @DisplayName("카드 상세 조회")
//    @Test
//    void 카드상세조회() {
//        RestAssured
//                .given().log().all()
//                .pathParam("cardId", 1L)
//
//                .when()
//                .get("/cards/{cardId}")
//                .then().log().all()
//                .statusCode(HttpStatus.OK.value());
//    }
//
//    //메인 카드 조회
//    @DisplayName("메인 카드 조회")
//    @Test
//    void 메인카드조회() {
//        RestAssured
//                .given().log().all()
//                .pathParam("memberId", 1L)
//
//                .when()
//                .get("/cardhistory/{memberId}")
//                .then().log().all()
//                .statusCode(HttpStatus.OK.value());
//    }
//
//
//}
