import axios from "axios";
import { IData } from "./types";

const URI =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : process.env.REACT_APP_HOST;

export function getData() {
  return axios.get<IData[]>(`${URI}/api/data`);
}

export function range(size: number, startAt: number = 0): ReadonlyArray<number> {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(i + startAt);
  }
  return result;
}

export function getUnit(type: string) {
  switch (type) {
    case "temp":
      return "℃";
    case "humi":
      return "%";
    case "pm":
    case "form":
      return "μg/m³";
    default:
      break;
  }
}
