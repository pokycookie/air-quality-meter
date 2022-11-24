import { faFilter, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Graph, { IGraphData } from "../components/graph";
import GraphFilter from "../layout/graphFilter";
import { getData, IGetDataOptions } from "../lib";
import { RSetModal } from "../redux";
import "../scss/pages/graphPage.scss";
import { IData } from "../types";

export default function GraphPage() {
  const dispatch = useDispatch();

  const [DB, setDB] = useState<IData[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(
    new Date(moment(new Date()).second(0).toISOString())
  );
  const [startTime, setStartTime] = useState<Date>(
    new Date(moment(new Date()).second(0).toISOString())
  );
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [limit, setLimit] = useState(0);

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

  const filterHandler = () => {
    dispatch(
      RSetModal({
        content: (
          <GraphFilter
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            limit={limit}
            setLimit={setLimit}
            refresh={refresh}
          />
        ),
      })
    );
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="graphPage">
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
      <div className="graphArea temp">
        <div className="titleArea">
          <p>온도(℃)</p>
        </div>
        {DB.length > 0 ? (
          <div className="graph">
            <Graph data={getGraphData(0, DB)} type={0} />
          </div>
        ) : null}
      </div>
      <div className="graphArea humi">
        <div className="titleArea">
          <p>습도(%)</p>
        </div>
        {DB.length > 1 ? (
          <div className="graph">
            <Graph data={getGraphData(1, DB)} type={1} />
          </div>
        ) : null}
      </div>
      <div className="graphArea pm">
        <div className="titleArea">
          <p>미세먼지(μg/m³)</p>
        </div>
        {DB.length > 2 ? (
          <div className="graph">
            <Graph data={getGraphData(2, DB)} type={2} />
          </div>
        ) : null}
      </div>
      <div className="graphArea form">
        <div className="titleArea">
          <p>포름알데히드(μg/m³)</p>
        </div>
        {DB.length > 3 ? (
          <div className="graph">
            <Graph data={getGraphData(3, DB)} type={3} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function getGraphData(homeType: number, DB: IData[]): IGraphData[] {
  if (DB.length === 0) return [];
  switch (homeType) {
    case 0:
      return DB.map((element) => ({
        value: element.temp,
        updated: element.updated,
      }));
    case 1:
      return DB.map((element) => ({
        value: element.humi,
        updated: element.updated,
      }));
    case 2:
      return DB.map((element) => ({
        value: element.pm25,
        updated: element.updated,
      }));
    case 3:
      return DB.map((element) => ({
        value: element.form,
        updated: element.updated,
      }));
    default:
      return [];
  }
}
