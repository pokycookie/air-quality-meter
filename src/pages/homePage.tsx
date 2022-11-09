import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import DashboardTile from "../components/dashboardTile";
import Graph, { IGraphData } from "../components/graph";
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
        {DB.length > 0 ? (
          <div className="contentArea">
            <DashboardTile
              index={0}
              min={-20}
              max={60}
              value={DB[DB.length - 1].temp}
              prev={DB[DB.length - 2].temp}
              type="temp"
            />
            <DashboardTile
              index={1}
              min={0}
              max={100}
              value={DB[DB.length - 1].humi}
              prev={DB[DB.length - 2].humi}
              type="humi"
            />
            <DashboardTile
              index={2}
              min={0}
              max={100}
              value={DB[DB.length - 1].pm25}
              prev={DB[DB.length - 2].pm25}
              type="pm"
            />
            <DashboardTile
              index={3}
              min={0}
              max={100}
              value={DB[DB.length - 1].form}
              prev={DB[DB.length - 2].form}
              type="form"
            />
          </div>
        ) : null}
      </div>
      <div className="graphArea">
        <div className="titleArea">
          <p></p>
        </div>
        <div className="graph">
          {DB.length > 0 ? <Graph data={getGraphData(homeType, DB)} type={homeType} /> : null}
        </div>
      </div>
    </div>
  );
}

function getGraphData(homeType: number, DB: IData[]): IGraphData[] {
  if (DB.length === 0) return [];
  const end = DB.length;
  switch (homeType) {
    case 0:
      return DB.slice(end - 25, end).map((element) => ({
        value: element.temp,
        updated: element.updated,
      }));
    case 1:
      return DB.slice(end - 25, end).map((element) => ({
        value: element.humi,
        updated: element.updated,
      }));
    case 2:
      return DB.slice(end - 25, end).map((element) => ({
        value: element.pm25,
        updated: element.updated,
      }));
    case 3:
      return DB.slice(end - 25, end).map((element) => ({
        value: element.form,
        updated: element.updated,
      }));
    default:
      return [];
  }
}
