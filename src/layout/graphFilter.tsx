import { useEffect, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DateTimeSelector from "../components/dateTimeSelector";
import ToggleArea from "../components/toggleArea";
import { getData } from "../lib";
import { IReduxStore, RSetModal } from "../redux";
import "../scss/layout/graphFilter.scss";
import { IModal } from "../types";

interface IProps {
  date: Date;
  limit: number;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export default function GraphFilter(props: IProps) {
  const dispatch = useDispatch();

  const modal = useSelector<IReduxStore, IModal>((state) => {
    return state.modal;
  }, shallowEqual);

  const dateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = new Date(e.target.value);
  };
  const limitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setLimit(value);
  };

  const onSubmit = useCallback(async () => {
    console.log(await getData({ limit: props.limit }));
  }, [props.limit]);

  useEffect(() => {
    const temp = { ...modal };
    temp.onSubmit = onSubmit;
    dispatch(RSetModal(temp));
  }, [dispatch, onSubmit, modal]);

  return (
    <div className="graphFilter">
      <ToggleArea title="시작 시간" alwaysOpen>
        <div className="dateTimeZone">
          <DateTimeSelector />
        </div>
      </ToggleArea>
      <ToggleArea title="종료 시간">
        <div className="dateTimeZone">
          <DateTimeSelector />
        </div>
      </ToggleArea>
      <ToggleArea title="데이터 개수 제한">
        <input type={"number"} value={props.limit} onChange={limitHandler} />
      </ToggleArea>
    </div>
  );
}
