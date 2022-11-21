import moment from "moment";
import { useEffect, useState } from "react";
import "../scss/components/dateTimeSelector.scss";
import { ITime } from "../types";
import DateSelector from "./dateSelector";
import TimeSelector from "./timeSelector";

interface IProps {
  default: Date;
  onChange?: (date: Date) => void;
}

export default function DateTimeSelector(props: IProps) {
  const [date, setDate] = useState(props.default);

  const defaultTime: ITime = {
    hour: props.default.getHours(),
    minute: props.default.getMinutes(),
  };

  const dateHandler = (d: Date) => {
    const current = moment(date).year(d.getFullYear()).month(d.getMonth()).date(d.getDate());
    const result = new Date(current.toISOString());
    setDate(result);
  };
  const timeHandler = (t: ITime) => {
    const current = moment(date).hour(t.hour).minute(t.minute);
    const result = new Date(current.toISOString());
    setDate(result);
  };

  useEffect(() => {
    if (props.onChange) props.onChange(date);
  }, [date]);

  return (
    <div className="dateTimeSelector">
      <DateSelector default={props.default} onChange={(d) => dateHandler(d)} />
      <TimeSelector default={defaultTime} onChange={(t) => timeHandler(t)} />
    </div>
  );
}
