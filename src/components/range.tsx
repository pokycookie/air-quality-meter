import { useEffect, useState } from "react";
import "../scss/components/range.scss";
import { IRange } from "../types";

interface IProps {
  min: number;
  max: number;
  default?: IRange;
  step?: number;
  onChange?: ({ min, max }: IRange) => void;
}

export default function Range(props: IProps) {
  const [min, setMin] = useState(props.default ? props.default.min : props.min);
  const [max, setMax] = useState(props.default ? props.default.max : props.max);

  const leftHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (value >= max) value = max - (props.step ? props.step : 1);
    setMin(value);
  };
  const rightHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (value <= min) value = min + (props.step ? props.step : 1);
    setMax(value);
  };
  const getLeft = (value: number) => {
    const percent = ((value - props.min) / (props.max - props.min)) * 100;
    return percent;
  };
  const getDiffWidth = () => {
    const left = getLeft(min);
    const right = getLeft(max);
    const width = right - left;
    return width;
  };

  useEffect(() => {
    if (props.onChange) props.onChange({ min, max });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max]);

  return (
    <div className="range">
      <input
        type="range"
        step={props.step ? props.step : 1}
        min={props.min}
        max={props.max}
        value={min}
        onChange={leftHandler}
      />
      <input
        type="range"
        step={props.step ? props.step : 1}
        min={props.min}
        max={props.max}
        value={max}
        onChange={rightHandler}
      />

      <div className="slider">
        <div className="track"></div>
        <div
          className="diff"
          style={{ width: `${getDiffWidth()}%`, left: `${getLeft(min)}%` }}
        ></div>
      </div>
    </div>
  );
}
