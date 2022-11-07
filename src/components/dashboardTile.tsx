import {
  faCloudMeatball,
  faDroplet,
  faSkullCrossbones,
  faTemperature0,
  faTemperature1,
  faTemperature2,
  faTemperature3,
  faTemperature4,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUnit } from "../lib";
import { IReduxStore, RSetHomeType } from "../redux";
import "../scss/components/dashboardTile.scss";
import Guage from "./guage";

type TTile = "temp" | "humi" | "pm" | "form";

interface IProps {
  type: TTile;
  index: number;
  min: number;
  max: number;
  value: number;
  prev: number;
}

export default function DashboardTile(props: IProps) {
  const dispatch = useDispatch();
  const homeType = useSelector<IReduxStore, number>((state) => {
    return state.homeType;
  }, shallowEqual);

  const isSelected = props.index === homeType ? true : false;

  const clickHandler = () => {
    dispatch(RSetHomeType(props.index));
  };

  return (
    <div className={`dashboardTile${isSelected ? " selected" : ""}`} onClick={clickHandler}>
      <p className="title">
        {getTitle(props.type)}
        {getIcon(props.type)}
      </p>
      <div className="guage">
        <Guage
          min={props.min}
          max={props.max}
          value={props.value}
          prev={props.prev}
          unit={getUnit(props.type)}
        />
      </div>
    </div>
  );
}

// Functions
function getTitle(type: TTile, value?: number) {
  switch (type) {
    case "temp":
      return "온도";
    case "humi":
      return "습도";
    case "pm":
      return "미세먼지";
    case "form":
      return "포름알데히드";
  }
}

function getIcon(type: TTile) {
  switch (type) {
    case "temp":
      return <FontAwesomeIcon icon={faTemperature2} className="icon temp" />;
    case "humi":
      return <FontAwesomeIcon icon={faDroplet} className="icon humi" />;
    case "pm":
      return <FontAwesomeIcon icon={faCloudMeatball} className="icon pm" />;
    case "form":
      return <FontAwesomeIcon icon={faSkullCrossbones} className="icon form" />;
  }
}

function getTemperature(level: number) {
  switch (level) {
    case 0:
      return faTemperature0;
    case 1:
      return faTemperature1;
    case 2:
      return faTemperature2;
    case 3:
      return faTemperature3;
    case 4:
      return faTemperature4;
    default:
      return faTemperature4;
  }
}
