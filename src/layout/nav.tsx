import { faChartColumn, faDatabase, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import NavBtn from "../components/navBtn";
import "../scss/layout/nav.scss";

export default function Nav() {
  const [isEnter, setIsEnter] = useState<boolean>(false);

  const mouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsEnter(true);
  };
  const mouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsEnter(false);
  };

  return (
    <div className="navArea" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <div className={`nav${isEnter ? " hover" : ""}`}>
        <NavBtn index={0} icon={faChartColumn} />
        <NavBtn index={1} icon={faHouse} />
        <NavBtn index={2} icon={faDatabase} />
      </div>
    </div>
  );
}
