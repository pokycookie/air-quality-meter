import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import ToggleArea from "../components/toggleArea";
import { RSetModal } from "../redux";
import "../scss/layout/graphFilter.scss";

export default function GraphFilter() {
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(0);

  const limitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLimit(value);
  };

  const onSubmit = useCallback(() => {
    console.log(limit);
  }, [limit]);

  useEffect(() => {
    dispatch(RSetModal({ content: <GraphFilter />, onSubmit }));
  }, [dispatch, onSubmit]);

  return (
    <div className="graphFilter">
      <ToggleArea title="그래프 기간" alwaysOpen>
        <input type={"datetime-local"} />
      </ToggleArea>
      <ToggleArea title="데이터 개수 제한">
        <input type={"number"} value={limit} onChange={limitHandler} />
      </ToggleArea>
    </div>
  );
}
