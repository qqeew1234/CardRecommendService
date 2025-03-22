아래는 각 API의 스펙을 정리한 내용입니다. 이를 통해 API 요청 방식과 필요한 파라미터들을 명확히 할 수 있습니다.

### **1. CardController**

#### **1.1. 모든 카드 리스트 조회**
- **Method**: `GET`
- **Endpoint**: `/cards`
- **Description**: 모든 카드 목록을 조회합니다.
- **Response**: `List<CardResponse>` - 카드 정보 리스트

#### **1.2. 특정 카드 상세 조회**
- **Method**: `GET`
- **Endpoint**: `/cards/{cardId}`
- **Description**: 카드 ID를 통해 특정 카드의 상세 정보를 조회합니다.
- **Parameters**:
    - `cardId` (Path Variable) - 카드 ID
- **Response**: `CardDetailResponse` - 카드 상세 정보

#### **1.3. 카드 추천 서비스**
- **Method**: `GET`
- **Endpoint**: `/cards/recommend`
- **Description**: 조건에 맞는 카드들을 추천합니다.
- **Parameters**:
    - `minAnnualFee` (Request Param) - 최소 연회비
    - `maxAnnualFee` (Request Param) - 최대 연회비
    - `storeCategories` (Request Param) - 추천할 카드의 상점 카테고리 목록
- **Response**: `List<long[]>` - 추천된 카드 ID 리스트

---

### **2. CardHistoryController**

#### **2.1. 특정 사용자의 선택한 카드들의 기간별 사용 내역 조회**
- **Method**: `GET`
- **Endpoint**: `/membercardhistories/{uuid}/selected`
- **Description**: 특정 사용자가 선택한 카드들의 사용 내역을 조회합니다.
- **Parameters**:
    - `uuid` (Path Variable) - 사용자의 UUID
    - `memberCardIds` (Request Param, Optional) - 카드 ID 목록
    - `startDate` (Request Param, Optional) - 조회 시작 날짜
    - `endDate` (Request Param, Optional) - 조회 종료 날짜
- **Response**: `FindAllResponse` - 사용 내역 응답

---

### **3. ClassificationController**

#### **3.1. 분류 생성**
- **Method**: `POST`
- **Endpoint**: `/classifications`
- **Description**: 새로운 분류를 생성합니다.
- **Request Body**: `CreateClassificationRequest` - 생성할 분류의 데이터
- **Response**: 없음 (201 Created 응답)

#### **3.2. 분류 목록 조회**
- **Method**: `GET`
- **Endpoint**: `/classifications`
- **Description**: 모든 분류 목록을 조회합니다.
- **Response**: `List<ClassificationResponse>` - 분류 목록

#### **3.3. 분류 삭제**
- **Method**: `DELETE`
- **Endpoint**: `/classifications/{classificationId}`
- **Description**: 특정 분류를 삭제합니다.
- **Parameters**:
    - `classificationId` (Path Variable) - 삭제할 분류의 ID
- **Response**: 없음 (204 No Content 응답)

---

### **4. MemberCardController**

#### **4.1. 사용자의 모든 카드 목록 조회**
- **Method**: `GET`
- **Endpoint**: `/membercard/{uuid}`
- **Description**: 특정 사용자의 모든 카드 목록을 조회합니다.
- **Parameters**:
    - `uuid` (Path Variable) - 사용자의 UUID
- **Response**: `List<CardBasicInfoResponse>` - 카드 목록

#### **4.2. 카드 선택**
- **Method**: `POST`
- **Endpoint**: `/api/cards/select`
- **Description**: 사용자가 선택한 카드 목록을 반환합니다.
- **Request Body**: `List<Long>` - 선택된 카드 ID 목록
- **Response**: `List<CardBasicInfoResponse>` - 선택된 카드 목록

#### **4.3. 카드 결제 내역 조회**
- **Method**: `GET`
- **Endpoint**: `/membercard/cards/history`
- **Description**: 선택된 카드들의 결제 내역을 월 단위로 조회합니다.
- **Parameters**:
    - `memberCardIds` (Request Param) - 카드 ID 목록
    - `month` (Request Param) - 조회할 월 (1~12)
- **Response**: `List<DailyCardHistoryResponse>` - 월 단위 결제 내역

---

### **📌 API 스펙 요약**

| **Controller**       | **Endpoint**                                      | **Method** | **Description**                                      |
|----------------------|--------------------------------------------------|------------|------------------------------------------------------|
| **CardController**    | `/cards`                                         | `GET`      | 모든 카드 목록 조회                                 |
|                      | `/cards/{cardId}`                                | `GET`      | 카드 상세 조회                                      |
|                      | `/cards/recommend`                               | `GET`      | 카드 추천 서비스                                    |
| **CardHistoryController** | `/membercardhistories/{uuid}/selected`         | `GET`      | 사용자의 선택 카드 기간별 사용 내역 조회          |
| **ClassificationController** | `/classifications`                          | `POST`     | 분류 생성                                           |
|                      | `/classifications`                               | `GET`      | 분류 목록 조회                                      |
|                      | `/classifications/{classificationId}`           | `DELETE`   | 분류 삭제                                           |
| **MemberCardController** | `/membercard/{uuid}`                           | `GET`      | 사용자 카드 목록 조회                              |
|                      | `/api/cards/select`                              | `POST`     | 카드 선택 API                                       |
|                      | `/membercard/cards/history`                      | `GET`      | 카드 결제 내역 조회 (월 단위 필터링)               |

---

이 API 스펙을 기반으로 **각각의 컨트롤러에서 제공하는 기능에 대한 설명과 필요한 파라미터들**을 정리하였습니다. 이 정보를 참고하여 API를 사용할 수 있습니다.