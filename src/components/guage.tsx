import { ICoord } from "../types";

const RAD = Math.PI / 180;

interface IProps {
  min: number;
  max: number;
  value: number;
  unit?: string;
}

export default function Guage(props: IProps) {
  let deg = (180 / (props.max - props.min)) * (props.value - props.min);
  if (props.value > props.max) deg = 180;
  if (props.value < props.min) deg = 0;

  const ep1: ICoord = { x: 50 - 50 * Math.cos(deg * RAD), y: 50 - 50 * Math.sin(deg * RAD) };
  const ep2: ICoord = { x: 50 - 30 * Math.cos(deg * RAD), y: 50 - 30 * Math.sin(deg * RAD) };

  return (
    <svg viewBox="0 0 100 100">
      <path d="M 0 50 A 50 50 0 0 1 100 50 M 80 50 A 30 30 0 0 0 20 50 Z" fill="#323232" />
      <path
        d={`M 0 50 A 50 50 0 0 1 ${ep1.x} ${ep1.y} L ${ep2.x} ${ep2.y} A 30 30 0 0 0 20 50 Z`}
        fill="#7fb77e"
      />
    </svg>
  );
}
