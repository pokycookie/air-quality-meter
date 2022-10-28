import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallowEqual, useSelector } from "react-redux";
import { IReduxStore } from "../redux";
import "../scss/pages/databasePage.scss";
import { ICoord } from "../types";

export default function DatabasePage() {
  const windowSize = useSelector<IReduxStore, ICoord>((state) => {
    return state.windowSize;
  }, shallowEqual);

  return (
    <div className="databasePage">
      <div className="nav">
        <div className="left">
          <button className="__btn refreshBtn">
            <FontAwesomeIcon className="icon" icon={faRotateRight} />
          </button>
        </div>
        <div className="right"></div>
      </div>
      <div className="main" style={{ height: getHeight(windowSize) }}></div>
    </div>
  );
}

function getHeight(windowSize: ICoord) {
  return windowSize.y * 0.8 - 50 - 70;
}
