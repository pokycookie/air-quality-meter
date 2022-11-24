import { useEffect, useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DateTimeSelector from "../components/dateTimeSelector";
import ToggleArea from "../components/toggleArea";
import { IGetDataOptions } from "../lib";
import { IReduxStore, RSetModal } from "../redux";
import "../scss/layout/graphFilter.scss";
import { IModal } from "../types";

interface IProps {
  startTime: Date;
  endTime: Date;
  limit: number;
  setStartTime: React.Dispatch<React.SetStateAction<Date>>;
  setEndTime: React.Dispatch<React.SetStateAction<Date>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  refresh: (query: IGetDataOptions) => void;
}

export default function GraphFilter(props: IProps) {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(props.startTime);
  const [endTime, setEndTime] = useState(props.endTime);
  const [limit, setLimit] = useState(props.limit);
  const [endTimeOpen, setEndTImeOpen] = useState(false);
  const [limitOpen, setLimitOpen] = useState(false);

  const modal = useSelector<IReduxStore, IModal>((state) => {
    return state.modal;
  }, shallowEqual);

  const limitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (Number.isNaN(value)) value = 0;
    setLimit(value);
  };

  const onSubmit = useCallback(async () => {
    props.setLimit(limit);
    props.setStartTime(startTime);
    props.setEndTime(endTime);

    const query: IGetDataOptions = {
      filter: [
        {
          field: "updated",
          query: [
            {
              opertator: "gte",
              value: startTime.toISOString(),
            },
          ],
        },
      ],
    };

    if (limitOpen) query.limit = limit;
    if (endTimeOpen && query.filter)
      query.filter[0].query.push({
        opertator: "lte",
        value: endTime.toISOString(),
      });

    props.refresh(query);
  }, [endTime, endTimeOpen, limit, limitOpen, props, startTime]);

  useEffect(() => {
    const temp = { ...modal };
    temp.onSubmit = onSubmit;
    dispatch(RSetModal(temp));
  }, [dispatch, onSubmit, modal]);

  return (
    <div className="graphFilter">
      <ToggleArea title="시작 시간" alwaysOpen>
        <div className="dateTimeZone">
          <DateTimeSelector onChange={(d) => setStartTime(d)} default={startTime} />
        </div>
      </ToggleArea>
      <ToggleArea title="종료 시간" onChange={(bool) => setEndTImeOpen(bool)}>
        <div className="dateTimeZone">
          <DateTimeSelector onChange={(d) => setEndTime(d)} default={endTime} />
        </div>
      </ToggleArea>
      <ToggleArea title="데이터 개수 제한" onChange={(bool) => setLimitOpen(bool)}>
        <input className="limit" type={"number"} value={limit} onChange={limitHandler} />
      </ToggleArea>
    </div>
  );
}
