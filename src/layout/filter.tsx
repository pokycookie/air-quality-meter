import { useCallback, useEffect, useState } from "react";
import Range from "../components/range";
import ToggleArea from "../components/toggleArea";
import "../scss/layout/filter.scss";
import { IGetDataOptions, IGetDataOptionsFilter, IModal, IRange } from "../types";
import { getUnit } from "../lib";
import { IReduxStore, RSetModal } from "../redux";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

interface IProps {
  refresh: (query: IGetDataOptions) => void;
}

export default function Filter(props: IProps) {
  const dispatch = useDispatch();
  const [tempFilter, setTempFilter] = useState<IRange>({ min: -20, max: 60 });
  const [humiFilter, setHumiFilter] = useState<IRange>({ min: 0, max: 100 });
  const [pm10Filter, setPm10Filter] = useState<IRange>({ min: 0, max: 5000 });
  const [pm25Filter, setPm25Filter] = useState<IRange>({ min: 0, max: 5000 });
  const [pm100Filter, setPm100Filter] = useState<IRange>({ min: 0, max: 5000 });
  const [formFilter, setFormFilter] = useState<IRange>({ min: 0, max: 1.6 });
  const [tempOpen, setTempOpen] = useState<boolean>(false);
  const [humiOpen, setHumiOpen] = useState<boolean>(false);
  const [pmOpen, setPmOpen] = useState<boolean>(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const modal = useSelector<IReduxStore, IModal>((state) => {
    return state.modal;
  }, shallowEqual);

  const filterHandler = (range: IRange, setter: React.Dispatch<React.SetStateAction<IRange>>) => {
    const temp = { ...range };
    setter(temp);
  };

  const onSubmit = useCallback(() => {
    const query: IGetDataOptions = {
      filter: [],
    };

    if (tempOpen) query.filter?.push(getQuery("temp", tempFilter));
    if (humiOpen) query.filter?.push(getQuery("humi", humiFilter));
    if (formOpen) query.filter?.push(getQuery("form", formFilter));
    if (pmOpen) {
      query.filter?.push(getQuery("pm10", pm10Filter));
      query.filter?.push(getQuery("pm25", pm25Filter));
      query.filter?.push(getQuery("pm100", pm100Filter));
    }
    console.log(query);
    props.refresh(query);
  }, [
    formFilter,
    formOpen,
    humiFilter,
    humiOpen,
    pm100Filter,
    pm10Filter,
    pm25Filter,
    pmOpen,
    props,
    tempFilter,
    tempOpen,
  ]);

  useEffect(() => {
    const temp = { ...modal };
    temp.onSubmit = onSubmit;
    dispatch(RSetModal(temp));
  }, [dispatch, modal, onSubmit]);

  return (
    <div className="filter">
      <ToggleArea title="온도 필터" onChange={(bool) => setTempOpen(bool)}>
        <Range
          min={-20}
          max={60}
          default={tempFilter}
          onChange={(r) => filterHandler(r, setTempFilter)}
        />
        <RangeIndicator target={tempFilter} unit={getUnit("temp")} />
      </ToggleArea>
      <ToggleArea title="습도 필터" onChange={(bool) => setHumiOpen(bool)}>
        <Range
          min={0}
          max={100}
          default={humiFilter}
          onChange={(r) => filterHandler(r, setHumiFilter)}
        />
        <RangeIndicator target={humiFilter} unit={getUnit("humi")} />
      </ToggleArea>
      <ToggleArea title="미세먼지 필터" onChange={(bool) => setPmOpen(bool)}>
        <Range
          min={0}
          max={5000}
          default={pm10Filter}
          onChange={(r) => filterHandler(r, setPm10Filter)}
        />
        <RangeIndicator target={pm10Filter} unit={getUnit("pm")} />
        <Range
          min={0}
          max={5000}
          default={pm25Filter}
          onChange={(r) => filterHandler(r, setPm25Filter)}
        />
        <RangeIndicator target={pm25Filter} unit={getUnit("pm")} />
        <Range
          min={0}
          max={5000}
          default={pm100Filter}
          onChange={(r) => filterHandler(r, setPm100Filter)}
        />
        <RangeIndicator target={pm100Filter} unit={getUnit("pm")} />
      </ToggleArea>
      <ToggleArea title="포름알데히드 필터" onChange={(bool) => setFormOpen(bool)}>
        <Range
          min={0}
          max={1.6}
          step={0.01}
          default={formFilter}
          onChange={(r) => filterHandler(r, setFormFilter)}
        />
        <RangeIndicator target={formFilter} unit={getUnit("form")} />
      </ToggleArea>
    </div>
  );
}

function RangeIndicator(props: { unit?: string; target: IRange }) {
  return (
    <div className="rangeIndicator">
      <p className="text min">{`${props.target.min}${props.unit}`}</p>
      <p>~</p>
      <p className="text max">{`${props.target.max}${props.unit}`}</p>
    </div>
  );
}

function getQuery(field: string, value: IRange): IGetDataOptionsFilter {
  return {
    field,
    query: [
      {
        operator: "gte",
        value: value.min,
      },
      {
        operator: "lte",
        value: value.max,
      },
    ],
  };
}
