import { ICoord } from "../types";

const RAD = Math.PI / 180;

interface IProps {
  min: number;
  max: number;
  value: number;
  prev: number;
  unit?: string;
}

export default function Guage(props: IProps) {
  let deg = (180 / (props.max - props.min)) * (props.value - props.min);
  if (props.value > props.max) deg = 180;
  if (props.value < props.min) deg = 0;

  const ep1: ICoord = { x: 50 - 50 * Math.cos(deg * RAD), y: 50 - 50 * Math.sin(deg * RAD) };
  const ep2: ICoord = { x: 50 - 40 * Math.cos(deg * RAD), y: 50 - 40 * Math.sin(deg * RAD) };

  let deg2 = (180 / (props.max - props.min)) * (props.prev - props.min);
  if (props.prev > props.max) deg2 = 180;
  if (props.prev < props.min) deg2 = 0;

  const ep3: ICoord = { x: 50 - 40 * Math.cos(deg2 * RAD), y: 50 - 40 * Math.sin(deg2 * RAD) };
  const ep4: ICoord = { x: 50 - 35 * Math.cos(deg2 * RAD), y: 50 - 35 * Math.sin(deg2 * RAD) };

  return (
    <svg viewBox="0 0 100 100">
      <path d={`M 0 50 A 50 50 0 0 1 100 50 M 90 50 A 30 30 0 0 0 10 50 Z`} fill="#f2f2f2" />
      <path
        d={`M 0 50 A 50 50 0 0 1 ${ep1.x} ${ep1.y} L ${ep2.x} ${ep2.y} A 40 40 0 0 0 10 50 Z`}
        fill="#0f296f"
      />
      <path d={`M 10 50 A 40 40 0 0 1 90 50 M 85 50 A 35 35 0 0 0 15 50 Z`} fill="#EAEAEA" />
      <path
        d={`M 10 50 A 40 40 0 0 1 ${ep3.x} ${ep3.y} L ${ep4.x} ${ep4.y} A 35 35 0 0 0 15 50 Z`}
        fill="#607eaa"
      />
      <text
        x="50"
        y="50"
        stroke="#0f296f"
        strokeWidth="0.5"
        fill="#0f296f"
        fontSize="9"
        textAnchor="middle"
      >
        {props.value.toFixed(2)} {props.unit}
      </text>
    </svg>
  );
}
