import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { range } from "../lib";
import "../scss/components/timeSelector.scss";
import { ITime } from "../types";

interface IProps {
  onChange?: (time: ITime) => void;
}

export default function TimeSelector(props: IProps) {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen((prev) => (prev ? false : true));
  };

  useEffect(() => {
    if (props.onChange) props.onChange({ hour, minute });
  }, [hour, minute]);

  return (
    <div className="timeSelector">
      <div className="indicator" onClick={openHandler}>
        <div className="left">
          <div className="icon">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="timeText">
            <p>
              {getDoubleDigit(hour)}:{getDoubleDigit(minute)}
            </p>
          </div>
        </div>
        <div className="right">
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
      {isOpen ? (
        <div className="selector">
          <div className="hourSelector">
            {range(24).map((e) => {
              return (
                <div className={`element${isSelected(e, hour)}`} key={e} onClick={() => setHour(e)}>
                  {getDoubleDigit(e)}
                </div>
              );
            })}
          </div>
          <div className="minuteSelector">
            {range(60).map((e) => {
              return (
                <div
                  className={`element${isSelected(e, minute)}`}
                  key={e}
                  onClick={() => setMinute(e)}
                >
                  {getDoubleDigit(e)}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function getDoubleDigit(value: number) {
  return value < 10 ? `0${value}` : value;
}

function isSelected(current: number, state: number) {
  return current === state ? " selected" : "";
}
