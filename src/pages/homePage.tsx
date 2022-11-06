import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import DashboardTile from "../components/dashboardTile";
import Graph from "../components/graph";
import { getData } from "../lib";
import { IReduxStore } from "../redux";
import "../scss/pages/homePage.scss";
import { IData } from "../types";

export default function HomePage() {
  const [DB, setDB] = useState<IData[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const homeType = useSelector<IReduxStore, number>((state) => {
    return state.homeType;
  }, shallowEqual);

  const refresh = () => {
    getData()
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
    <div className="homePage">
      <div className="tileArea">
        <div className="titleArea">
          <button className="__btn refreshBtn" onClick={refresh}>
            <FontAwesomeIcon className="icon" icon={faRotateRight} />
          </button>
          <p className="time">{moment(currentTime).format("YYYY-MM-DD hh:mm:ss")}</p>
        </div>
        <div className="contentArea">
          <DashboardTile index={0} min={-20} max={60} value={DB[0] ? DB[0].temp : 0} type="temp" />
          <DashboardTile index={1} min={0} max={100} value={DB[0] ? DB[0].humi : 0} type="humi" />
          <DashboardTile index={2} min={0} max={100} value={DB[0] ? DB[0].pm25 : 0} type="pm" />
          <DashboardTile index={3} min={0} max={100} value={DB[0] ? DB[0].form : 0} type="form" />
        </div>
      </div>
      <div className="graphArea">
        <div className="titleArea">
          <p></p>
        </div>
        <div className="graph">
          <Graph data={getGraphData(homeType, DB)} type={homeType} />
        </div>
      </div>
    </div>
  );
}

function getGraphData(homeType: number, DB: IData[]): number[] {
  if (DB.length === 0) return [];
  switch (homeType) {
    case 0:
      return DB.map((element) => element.temp).slice(0, 25);
    case 1:
      return DB.map((element) => element.humi).slice(0, 25);
    case 2:
      return DB.map((element) => element.pm10).slice(0, 25);
    case 3:
      return DB.map((element) => element.form).slice(0, 25);
    default:
      return [];
  }
}
