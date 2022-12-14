import { faFilter, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Filter from "../layout/filter";
import { getData } from "../lib";
import { IReduxStore, RSetModal } from "../redux";
import "../scss/pages/databasePage.scss";
import { ICoord, IData, IGetDataOptions } from "../types";

export default function DatabasePage() {
  const dispatch = useDispatch();

  const [DB, setDB] = useState<IData[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const windowSize = useSelector<IReduxStore, ICoord>((state) => {
    return state.windowSize;
  }, shallowEqual);

  const filterHandler = () => {
    dispatch(RSetModal({ content: <Filter refresh={refresh} /> }));
  };

  const refresh = (query?: IGetDataOptions) => {
    getData(query)
      .then((res) => {
        setDB(res.data);
        setCurrentTime(new Date());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="databasePage">
      <div className="nav">
        <div className="left">
          <button className="__btn refreshBtn" onClick={() => refresh()}>
            <FontAwesomeIcon className="icon" icon={faRotateRight} />
          </button>
          <p className="time">{moment(currentTime).format("YYYY-MM-DD HH:mm:ss")}</p>
        </div>
        <div className="right">
          <button className="__btn" onClick={filterHandler}>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>
      <div className="table">
        <div className="field">
          <p>온도</p>
          <p>습도</p>
          <p>pm1.0</p>
          <p>pm2.5</p>
          <p>pm10.0</p>
          <p>포름알데히드</p>
          <p>Updated</p>
        </div>
        <div className="main" style={{ height: getHeight(windowSize) }}>
          {DB.map((element, index) => {
            return (
              <div className="list" key={index}>
                <p>{element.temp.toFixed(2)}℃</p>
                <p>{element.humi.toFixed(2)}%</p>
                <p>{element.pm10.toFixed(2)}μg/m³</p>
                <p>{element.pm25.toFixed(2)}μg/m³</p>
                <p>{element.pm100.toFixed(2)}μg/m³</p>
                <p>{element.form.toFixed(2)}μg/m³</p>
                <p>{moment(element.updated).format("YYYY-MM-DD HH:mm:ss")}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getHeight(windowSize: ICoord) {
  return windowSize.y - 290;
}
