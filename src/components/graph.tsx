import { useEffect, useState } from "react";

interface IProps {
  data: number[];
}

export default function Graph(props: IProps) {
  const [max, setMax] = useState(0);
  const [value, setValue] = useState<number>();

  useEffect(() => {
    setMax(Math.max(...props.data));
  }, [props.data]);

  return (
    <svg viewBox="0 0 240 100">
      <rect width="240" height="100" fill="white" />
      <path d={`M 0 100 ${getPath(props.data, max)}L 240 100 Z`} fill="#7fb77e" />
      <g>
        {props.data.map((element, index) => {
          return (
            <circle
              key={index}
              cx={index * 10}
              cy={100 - (100 / max) * element + 10}
              r="1"
              fill="#323232"
              onMouseEnter={() => setValue(element)}
              onMouseLeave={() => setValue(undefined)}
            />
          );
        })}
      </g>
      <text x="5" y="95" fontSize={5}>
        {value?.toFixed(2)}
      </text>
    </svg>
  );
}

function getPath(arr: number[], max: number) {
  let result = "";
  arr.forEach((value, index) => {
    const y = 100 - (100 / max) * value + 10;
    result = result.concat(`L ${index * 10} ${y} `);
  });
  return result;
}
