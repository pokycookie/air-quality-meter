import { useEffect, useRef, useState } from "react";
import "../scss/components/range.scss";

interface IProps {
  min: number;
  max: number;
}

export default function Range(props: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [min, setMin] = useState(props.min);
  const [max, setMax] = useState(props.max);
  const [width, setWidth] = useState(0);

  const widthHandler = () => {
    if (ref.current !== null) setWidth(ref.current.clientWidth - 15);
  };
  const mouseHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.nativeEvent.offsetX);
  };

  const getPosition = (value: number) => {
    if (value < props.min) return 0;
    if (value > props.max) return width;
    return (value - min) * (width / (props.max - props.min));
  };

  useEffect(() => {
    widthHandler();
  }, [ref]);

  useEffect(() => {
    window.addEventListener("resize", widthHandler);
    return () => {
      window.removeEventListener("resize", widthHandler);
    };
  }, []);

  return (
    <div className="range" ref={ref}>
      <div className="bar" onMouseMove={mouseHandler}></div>
      <RangeBtn value={getPosition(min)} />
      <RangeBtn value={getPosition(max)} />
    </div>
  );
}

interface IBtnProps {
  value: number;
}

function RangeBtn(props: IBtnProps) {
  const [left, setLeft] = useState(props.value);

  useEffect(() => {
    setLeft(props.value);
  }, [props.value]);

  const downHandler = () => {
    console.log("down");
  };
  const upHandler = () => {
    console.log("up");
  };

  return (
    <div className="btn" onMouseDown={downHandler} onMouseUp={upHandler} style={{ left }}></div>
  );
}
