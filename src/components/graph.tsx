import moment from "moment";
import { useEffect, useState } from "react";
import { range } from "../lib";

const MARGIN_LEFT = 20;
const MARGIN_TOP = 10;
const MARGIN_BOTTOM = 10;
const MARGIN_RIGTH = 5;
const GRAPH_WIDTH = 240;
const GRAPH_HEIGHT = 100;

const SVG_WIDTH = GRAPH_WIDTH + MARGIN_LEFT + MARGIN_RIGTH;
const SVG_HEIGHT = GRAPH_HEIGHT + MARGIN_TOP + MARGIN_BOTTOM;
const LINE_X = MARGIN_LEFT - 1;
const LINE_Y = SVG_HEIGHT - MARGIN_TOP + 1;
const ROW_COUNT = 5;
const COLUMN_COUNT = 12;

export interface IGraphData {
  value: number;
  updated: Date;
}

interface IProps {
  data: IGraphData[];
  type?: number;
}

export default function Graph(props: IProps) {
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [selected, setSelected] = useState<number>();
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const selectedHeight = getHeight(props.data[selectedIndex || 0]?.value || 0, max, min);

  const mouseHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const width = e.currentTarget.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const ratio = SVG_WIDTH / width;
    let svgValue = offset * ratio;
    svgValue =
      svgValue < MARGIN_LEFT
        ? MARGIN_LEFT
        : svgValue > MARGIN_LEFT + GRAPH_WIDTH
        ? MARGIN_LEFT + GRAPH_WIDTH
        : svgValue;
    const blockSize = GRAPH_WIDTH / (COLUMN_COUNT * 2);
    const tempIndex = Math.floor((svgValue + blockSize / 2) / blockSize);
    const tempSelected = tempIndex * blockSize;
    if (selected !== tempSelected) {
      setSelected(tempSelected);
    }
    if (selectedIndex !== tempIndex - 2) {
      setSelectedIndex(tempIndex - 2);
    }
  };

  useEffect(() => {
    if (props.type === undefined) {
      setMax(Math.max(...props.data.map((e) => e.value)));
    } else {
      switch (props.type) {
        case 0:
          setMin(-20);
          setMax(60);
          break;
        default:
          setMin(0);
          setMax(100);
          break;
      }
    }
  }, [props.data, props.type]);

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      onMouseMove={mouseHandler}
      onMouseLeave={() => setSelected(undefined)}
    >
      <g stroke="#0f296f" strokeWidth="0.7" strokeLinecap="square">
        <g>
          <path d={`M ${LINE_X} ${LINE_Y} L ${LINE_X} ${MARGIN_TOP}`} />
          {range(ROW_COUNT).map((e) => {
            const y = (GRAPH_HEIGHT / ROW_COUNT) * e + MARGIN_TOP;
            return (
              <g key={e}>
                <path d={`M ${LINE_X} ${y} L ${LINE_X - 2} ${y}`} />
                <text x={LINE_X - 4} y={y + 1.4} textAnchor="end" fontSize="4" strokeWidth={0.2}>
                  {((max - min) / ROW_COUNT) * (ROW_COUNT - e) + min}
                </text>
              </g>
            );
          })}
        </g>
        <g>
          <path d={`M ${LINE_X} ${LINE_Y} L ${GRAPH_WIDTH + MARGIN_LEFT} ${LINE_Y}`} />
          {range(COLUMN_COUNT).map((e) => {
            const x = (GRAPH_WIDTH / COLUMN_COUNT) * e + LINE_X + GRAPH_WIDTH / COLUMN_COUNT + 1;
            return (
              <g key={e}>
                <path d={`M ${x} ${LINE_Y} L ${x} ${LINE_Y + 2}`} />
              </g>
            );
          })}
        </g>
      </g>
      <g>
        <path
          d={`M 20 110 ${getPath(props.data, max, min)}L 260 110 Z`}
          opacity={0.3}
          fill="#0f296f"
        />
        <path
          d={`M ${getPath(props.data, max, min, true)}`}
          stroke="#0f296f"
          strokeWidth={1}
          fill="none"
        />
      </g>
      {selected && selectedIndex ? (
        <g stroke="#0f296f" strokeWidth="0.5" strokeLinecap="square">
          <path d={`M ${selected} ${GRAPH_HEIGHT + MARGIN_TOP} ${selected} ${MARGIN_TOP}`} />
          <circle
            cx={selected}
            cy={selectedHeight}
            r="1.7"
            stroke="white"
            strokeWidth="0.7"
            fill="#607eaa"
          />
          {SVG_WIDTH - selected > 40 ? (
            <g fontSize="4" stroke="white" strokeWidth={0.01} fill="white" strokeLinecap="butt">
              <rect
                x={selected + 2}
                y={selectedHeight - 20}
                width="40"
                height="15"
                fill="#393b3d"
                opacity={0.5}
                stroke="none"
                rx="1"
              />
              <text x={selected + 5} y={selectedHeight - 14}>
                {moment(props.data[selectedIndex].updated).format("YYYY-MM-DD hh:mm")}
              </text>
              <text x={selected + 5} y={selectedHeight - 8}>
                {props.data[selectedIndex].value.toFixed(2)}
              </text>
            </g>
          ) : (
            <g fontSize="4" stroke="white" strokeWidth={0.01} fill="white" strokeLinecap="butt">
              <rect
                x={selected - 42}
                y={selectedHeight - 20}
                width="40"
                height="15"
                fill="#393b3d"
                opacity={0.5}
                stroke="none"
                rx="1"
              />
              <text x={selected - 39} y={selectedHeight - 14}>
                {moment(props.data[selectedIndex].updated).format("YYYY-MM-DD hh:mm")}
              </text>
              <text x={selected - 39} y={selectedHeight - 8}>
                {props.data[selectedIndex].value.toFixed(2)}
              </text>
            </g>
          )}
        </g>
      ) : null}
    </svg>
  );
}

function getPath(arr: IGraphData[], max: number, min: number, line?: boolean) {
  let result = "";
  arr.forEach((e, index) => {
    const x = index * 10 + MARGIN_LEFT;
    const y = getHeight(e.value, max, min);
    if (index === 0 && line) {
      result = result.concat(`${x} ${y} `);
    } else {
      result = result.concat(`L ${x} ${y} `);
    }
  });
  return result;
}

function getHeight(value: number, max: number, min: number) {
  return GRAPH_HEIGHT - (GRAPH_HEIGHT / (max - min)) * (value - min) + 10;
}
