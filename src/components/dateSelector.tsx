import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import "../scss/components/dateSelector.scss";
import Calendar from "./calendar";

interface IProps {
  onChange?: (date: Date) => void;
}

export default function DateSelector(props: IProps) {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen((prev) => (prev ? false : true));
  };

  useEffect(() => {
    if (props.onChange) props.onChange(date);
  }, [date]);

  return (
    <div className="dateSelector">
      <div className="indicator" onClick={openHandler}>
        <div className="left">
          <div className="icon">
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className="dateText">
            <p>{moment(date).format("YYYY-MM-DD")}</p>
          </div>
        </div>
        <div className="right">
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
      {isOpen ? (
        <div className="calendar">
          <Calendar onChange={(e) => setDate(e)} />
        </div>
      ) : null}
    </div>
  );
}
