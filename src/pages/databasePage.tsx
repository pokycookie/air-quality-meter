import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { getData } from "../lib";
import { IReduxStore } from "../redux";
import "../scss/pages/databasePage.scss";
import { ICoord, IData } from "../types";

export default function DatabasePage() {
  const [DB, setDB] = useState<IData[]>([]);
  const windowSize = useSelector<IReduxStore, ICoord>((state) => {
    return state.windowSize;
  }, shallowEqual);

  const refresh = () => {
    getData()
      .then((res) => {
        console.log(res.data);
        setDB(res.data);
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
          <button className="__btn refreshBtn" onClick={refresh}>
            <FontAwesomeIcon className="icon" icon={faRotateRight} />
          </button>
        </div>
        <div className="right"></div>
      </div>
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
              <p>{moment(element.updated).format("YYYY-MM-DD hh:mm:ss")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getHeight(windowSize: ICoord) {
  // windowSize.height * 80% - App.padding - nav.height - field.height
  return windowSize.y * 0.8 - 50 - 65 - 55;
}
