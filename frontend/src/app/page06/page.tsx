"use client";
import PageHeader from "@/components/PageHeaderCopy";
import Link from "next/link";
import "@/styles/page06.scss";
import {
  FaExchangeAlt,
  FaTimes,
  FaCheckSquare,
  FaRegSquare,
} from "react-icons/fa";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface MenuItem {
  id: number;
  name: string;
}

type CardPayment = {
  cardHistoryId: number;
  cardName: string;
  cardCorp: string;
  storeName: string;
  amount: number;
  paymentDatetime: string; // ISO 8601 형식의 문자열
  category: string;
  classification: string;
};

type Response = {
  setCardHistoriesResponses: CardPayment[];
  startDate: string; // 예: "2025-02-01"
  endDate: string; // 예: "2025-02-28"
  classificationCost: number;
  totalCost: number;
  percent: number;
};

type Classification = {
  classificationId: number;
  title: string;
};

export default function Page06() {
  let maxAddBtn = 6;
  const hd_props = {
    num: "06",
    tit: "소비 패턴 분석",
    des: "카드를 선택하여 소비패턴을 분석하거나 기간별 사용 내역을 조회할 수 있습니다.",
  };

  const searchParams = useSearchParams();
  const supabase = createClient();
  const [cardHistories, setCardHistories] = useState<Response | null>(null);
  //체크된 카드내역 id 저장
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  //분류id 저장
  const [selectedClassification, setSelectedClassification] =
    useState<number>(1);

  //체크 박스 감지
  const handleCheckBoxCahange = (id: number, checked: boolean) => {
    if (checked) {
      setCheckedIds((prev) => [...prev, id]); //체크 되면 id 리스트에 추가
    } else {
      setCheckedIds((prev) => prev.filter((item) => item !== id)); //체크 해제 되면 제거
    }
  };

  //바뀐 분류 Id 감지
  const handleClassificationCahnge = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newClassificationId = Number(event.target.value);
    setSelectedClassification(newClassificationId);
  };

  //첫화면 fetch
  useEffect(() => {
    const idsParam = searchParams.get("selectedCardIds");
    if (!idsParam) return;

    const fetchData = async () => {
      const cardHistories = await fetch(
        `http://localhost:8080/membercards/histories/classification?selectedCardIds=${idsParam}&classificationId=1`
      );

      const data: Response = await cardHistories.json();
      console.log("#########카드데이터 확인", data);

      setCardHistories(data);
    };
    fetchData();
  }, [searchParams]);

  //분류 소속 수정 후 목록 이동. 이동 후 바로 목록 조회
  const updateClassification = async () => {
    const body = {
      classificationId: selectedClassification,
      cardHistoriesIds: checkedIds,
    };

    closePopupMove();
    console.log("✔️팝업창닫기");

    const patchResponse = await fetch(
      "http://localhost:8080/cardhistories/changeclassification",
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!patchResponse) return;

    const updateResult = await patchResponse.json();
    console.log("✔️분류 업데이트 결과", updateResult);

    setSelectedClassification(body.classificationId);
    setCheckedIds([]);

    const idsParam = searchParams.get("selectedCardIds");
    const fetchResponse = await fetch(
      `http://localhost:8080/membercards/histories/classification?selectedCardIds=${idsParam}&classificationId=${selectedClassification}`
    );

    if (!fetchResponse) return;

    const newData = await fetchResponse.json();
    console.log("✔️분류 수정 후 조회될 데이터");

    setCardHistories(newData);
  };

  //사용자정의 menuItems 저장
  useEffect(() => {
    const fetchCustomMenus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const classificationResponse = await fetch(
        "http://localhost:8080/classifications",
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (!classificationResponse.ok) return;
      const result = await classificationResponse.json();
      console.log("✔️메뉴 확인", result);

      setMenuItems(result);
    };

    fetchCustomMenus();
  }, []);

  //분류 버튼 클릭시 해당 분류 조회
  const classificationClick = async (classificationId: number) => {
    const selectedCardParams = searchParams.get("selectedCardIds");
    if (!selectedCardParams) return;

    const classifiedCardHistoryResponse = await fetch(
      `http://localhost:8080/membercards/histories/classification?selectedCardIds=${selectedCardParams}&classificationId=${classificationId}`
    );

    if (!classifiedCardHistoryResponse.ok) return;

    const result = await classifiedCardHistoryResponse.json();
    setCardHistories(result);
  };

  //디자인 영역
  const [showPopupAdd, setShowPopupAdd] = useState<boolean>(false);
  const [showPopupDel, setShowPopupDel] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<Classification[]>([]);
  const [count, setCount] = useState<number>(1);
  const [newMenuName, setNewMenuName] = useState<string>("");
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [showPopupMove, setShowPopupMove] = useState<boolean>(false);

  const openPopupAdd = (): void => {
    setShowPopupAdd(true);
  };
  const openPopupDel = (id: number): void => {
    setPendingDeleteId(id);
    setShowPopupDel(true);
  };
  const openPopupMove = (): void => {
    setShowPopupMove(true);
  };
  const closePopupMove = (): void => {
    setShowPopupMove(false);
  };

  const handleAddMenuConfirm = async () => {
    //최대 항목 수 검사
    if (menuItems.length >= maxAddBtn) {
      alert("추가항목은 최대 8개까지 등록할 수 있습니다.");
      return;
    }

    // 입력값 유효성 검사
    if (!newMenuName.trim()) {
      alert("항목 이름을 입력해 주세요.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    //API 호출
    const createResponse = await fetch(
      "http://localhost:8080/classifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //uuid 헤더
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          title: newMenuName,
        }),
      }
    );

    if (!createResponse) return;

    const result = await createResponse.json();
    console.log("✔️분류 생성 결과", result);

    //상태 업데이트
    // setMenuItems([...menuItems, { id: count, name: newMenuName }]);
    setMenuItems([
      ...menuItems,
      { classificationId: result.classificationId, title: newMenuName },
    ]);
    setCount(count + 1);
    setNewMenuName("");
    setShowPopupAdd(false);
    console.log("✔️팝업창닫기");
  };

  const handleAddCancel = (): void => {
    setShowPopupAdd(false);
    setNewMenuName("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewMenuName(e.target.value);
  };

  const removeMenuItem = (id: number): void => {
    setMenuItems(menuItems.filter((item) => item.classificationId !== id));
  };

  const handleDeleteConfirm = (): void => {
    if (pendingDeleteId !== null) {
      removeMenuItem(pendingDeleteId);
    }
    setPendingDeleteId(null);
    setShowPopupDel(false);
  };

  const handleDeleteCancel = (): void => {
    setPendingDeleteId(null);
    setShowPopupDel(false);
  };

  const [defaultMenuItems, setDefaultMenuItems] = useState<MenuItem[]>([
    { id: 1, name: "미분류" },
    { id: 2, name: "주요식비" },
    { id: 3, name: "의류비" },
    { id: 4, name: "주거비" },
  ]);
  return (
    <>
      <div className="page-head page-head-06">
        <PageHeader
          number={hd_props.num}
          title={hd_props.tit}
          description={hd_props.des}
        >
          <Link href="/page05">
            <button>사용내역 확인하기</button>
          </Link>
          <Link href="/page07">
            <button className="active">소비패턴 분석결과</button>
          </Link>
        </PageHeader>
        <div className="table-head">
          <ul className="table-row">
            <li className="table-item table-item-01">소비계정항목</li>
            <li className="table-item table-item-02">
              <button className="moveBtn" onClick={openPopupMove}>
                <FaExchangeAlt />
              </button>
              계정별 소비내역
            </li>
            <li className="table-item table-item-03">계정별 소비금액</li>
            <li className="table-item table-item-04">소비비율</li>
          </ul>
        </div>
      </div>
      <div className="page-body page-body-06">
        <section>
          <div className="table-body">
            <ul className="table-row">
              <li className="table-item table-item-01">
                <div className="menu-group menu-group-default">
                  {defaultMenuItems.map((item, idx) => (
                    // <menu key={item.id}>
                    <menu key={`default-${item.id}`}>
                      <input
                        type="radio"
                        name="menuitem"
                        id={`def-${item.id}`}
                        // defaultChecked={idx === 0}
                        onChange={() => {
                          setSelectedClassification(item.id);
                          classificationClick(item.id);
                        }}
                        checked={selectedClassification === item.id}
                      />
                      <label htmlFor={`def-${item.id}`}>{item.name}</label>
                    </menu>
                  ))}
                </div>
                <div className="menu-group menu-group-variant">
                  {menuItems.length < maxAddBtn && (
                    <button onClick={openPopupAdd}>계정항목추가</button>
                  )}
                  {menuItems.map((item) => (
                    // <menu key={item.id}>
                    <menu key={`custom-${item.classificationId}`}>
                      <input
                        type="radio"
                        name="menuitem"
                        id={`item-${item.classificationId}`}
                        onChange={() => {
                          setSelectedClassification(item.classificationId);
                          classificationClick(item.classificationId);
                        }}
                        checked={
                          selectedClassification === item.classificationId
                        }
                      />
                      <label htmlFor={`item-${item.classificationId}`}>
                        {item.title}
                        <button
                          onClick={() => openPopupDel(item.classificationId)}
                        >
                          <FaTimes />
                        </button>
                      </label>
                    </menu>
                  ))}
                </div>
              </li>
              <li className="table-item table-item-02">
                {(cardHistories?.setCardHistoriesResponses ?? []).map(
                  (history, index) => (
                    <div className="pay-usage-wrap" key={index}>
                      <div className="pay-usage-item">
                        <div className="usage-unit usage-unit-01">
                          <input
                            type="checkbox"
                            id={`check-${history.cardHistoryId}`}
                            checked={checkedIds.includes(history.cardHistoryId)}
                            onChange={(e) =>
                              handleCheckBoxCahange(
                                history.cardHistoryId,
                                e.target.checked
                              )
                            }
                          />
                          <span className="uncheck">
                            <FaRegSquare />
                          </span>
                          <span className="checked">
                            <FaCheckSquare />
                          </span>
                        </div>
                        <div className="usage-unit usage-unit-02">
                          <h4>{history.storeName}</h4>
                          <p>{history.cardCorp}</p>
                        </div>
                        <div className="usage-unit usage-unit-03">
                          {history.amount.toLocaleString()}
                          <span>원</span>
                        </div>
                        <label
                          htmlFor={`check-${history.cardHistoryId}`}
                        ></label>
                      </div>
                    </div>
                  )
                )}
              </li>
              {/* <li className="table-item table-item-02">
                <div className="pay-usage-wrap">
                  <div className="pay-usage-item">
                    <div className="usage-unit usage-unit-01">
                      <input type="checkbox" name="" id="11" />
                      <span className="uncheck">
                        <FaRegSquare />
                      </span>
                      <span className="checked">
                        <FaCheckSquare />
                      </span>
                    </div>
                    <div className="usage-unit usage-unit-02">
                      <h4>dddd</h4>
                      <p>oooo</p>
                    </div>
                    <div className="usage-unit usage-unit-03">
                      {"10,000"}
                      <span>원</span>
                    </div>
                    <label htmlFor="11"></label>
                  </div>
                </div>
              </li> */}
              <li className="table-item table-item-03">
                <h4>
                  {cardHistories
                    ? cardHistories.classificationCost.toLocaleString()
                    : "0"}
                  원
                </h4>
              </li>
              <li className="table-item table-item-04">
                <h4>
                  {cardHistories ? cardHistories.percent.toFixed(2) : "0"}
                  <span>%</span>
                </h4>
                <h5>
                  총{" "}
                  {cardHistories
                    ? cardHistories.totalCost.toLocaleString()
                    : "0"}
                  원중
                </h5>
              </li>
            </ul>
          </div>
        </section>
      </div>

      {showPopupAdd && (
        <div className="popup popup-add">
          <div className="popup-contents">
            <section>
              <p>추가할 계정의 항목 이름을 작성해 주세요.</p>
              <div>
                <input
                  type="text"
                  value={newMenuName}
                  onChange={handleInputChange}
                />
              </div>
            </section>
            <footer className="btns">
              <button onClick={handleAddCancel}>취소</button>
              <button onClick={handleAddMenuConfirm} className="active">
                확인
              </button>
            </footer>
          </div>
        </div>
      )}

      {showPopupDel && (
        <div className="popup popup-del">
          <div className="popup-contents">
            <section>
              <p>
                추가항목을 삭제합니다.
                <br />
                삭제 시 항목의 내역은 기타항목으로 옮겨집니다.
              </p>
            </section>
            <footer className="btns">
              <button onClick={handleDeleteCancel}>취소</button>
              <button onClick={handleDeleteConfirm} className="active">
                확인
              </button>
            </footer>
          </div>
        </div>
      )}

      {showPopupMove && (
        <div className="popup popup-move">
          <div className="popup-contents">
            <section>
              <p>
                선택한 내역을 옮길 계정항목을 선택 후 확인 버튼을 클릭해 주세요.
              </p>
              <select
                onChange={handleClassificationCahnge}
                value={selectedClassification}
              >
                <optgroup label="기본항목">
                  {defaultMenuItems.map((item) => (
                    <option key={`default-${item.id}`} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="추가항목" className="added">
                  {menuItems
                    .slice()
                    .reverse()
                    .map((item) => (
                      <option
                        key={`custom-${item.classificationId}`}
                        value={item.classificationId}
                      >
                        {item.title}
                      </option>
                    ))}
                </optgroup>
              </select>
            </section>
            <footer className="btns">
              <button onClick={closePopupMove}>취소</button>
              <button className="active" onClick={updateClassification}>
                확인
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
