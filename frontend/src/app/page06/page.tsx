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
import { useState, ChangeEvent } from "react";
interface MenuItem {
  id: number;
  name: string;
}

export default function Page06() {
  let maxAddBtn = 6;
  const hd_props = {
    num: "06",
    tit: "소비 패턴 분석",
    des: "카드를 선택하여 소비패턴을 분석하거나 기간별 사용 내역을 조회할 수 있습니다.",
  };

  const [showPopupAdd, setShowPopupAdd] = useState<boolean>(false);
  const [showPopupDel, setShowPopupDel] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
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

  const handleAddMenuConfirm = (): void => {
    if (menuItems.length >= maxAddBtn) {
      alert("추가항목은 최대 8개까지 등록할 수 있습니다.");
      return;
    }

    if (newMenuName.trim() !== "") {
      setMenuItems([...menuItems, { id: count, name: newMenuName }]);
      setCount(count + 1);
      setNewMenuName("");
      setShowPopupAdd(false);
    }
  };

  const handleAddCancel = (): void => {
    setShowPopupAdd(false);
    setNewMenuName("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewMenuName(e.target.value);
  };

  const removeMenuItem = (id: number): void => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
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
    { id: 0, name: "주요식비" },
    { id: 1, name: "기본항목2" },
    { id: 2, name: "기본항목3" },
    { id: 3, name: "기본항목4" },
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
                    <menu key={item.id}>
                      <input
                        type="radio"
                        name="menuitem"
                        id={`def-${item.id}`}
                        defaultChecked={idx === 0}
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
                    <menu key={item.id}>
                      <input
                        type="radio"
                        name="menuitem"
                        id={`item-${item.id}`}
                      />
                      <label htmlFor={`item-${item.id}`}>
                        {item.name}
                        <button onClick={() => openPopupDel(item.id)}>
                          <FaTimes />
                        </button>
                      </label>
                    </menu>
                  ))}
                </div>
              </li>
              <li className="table-item table-item-02">
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
              </li>
              <li className="table-item table-item-03">
                <h4>{"2,000,000"}원</h4>
              </li>
              <li className="table-item table-item-04">
                <h4>
                  {"10"}
                  <span>%</span>
                </h4>
                <h5>총 {"20,000,000"}원중</h5>
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
              <select>
                <optgroup label="기본항목">
                  {defaultMenuItems.map((item) => (
                    <option key={`default-${item.id}`} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="추가항목" className="added">
                  {menuItems
                    .slice()
                    .reverse()
                    .map((item) => (
                      <option key={`custom-${item.id}`} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </optgroup>
              </select>
            </section>
            <footer className="btns">
              <button onClick={closePopupMove}>취소</button>
              <button className="active">확인</button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
