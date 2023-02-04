import "../scss/layout/header.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IReduxStore, RSetPage } from "../redux";

export default function Header() {
  const dispatch = useDispatch();
  const page = useSelector<IReduxStore, number>((state) => {
    return state.page;
  }, shallowEqual);

  const clickHandler = (page: number) => {
    dispatch(RSetPage(page));
  };

  return (
    <header>
      <div className="left">
        <p className="title">PKNU 집 안 공기 케어기</p>
      </div>
      <div className="right">
        <p className={page === 0 ? "selected" : ""} onClick={() => clickHandler(0)}>
          대시보드
        </p>
        <p className={page === 1 ? "selected" : ""} onClick={() => clickHandler(1)}>
          그래프
        </p>
        <p className={page === 2 ? "selected" : ""} onClick={() => clickHandler(2)}>
          DB
        </p>
      </div>
    </header>
  );
}
