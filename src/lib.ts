import axios from "axios";
import { SortOrder } from "mongoose";
import { IData } from "./types";

const URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : process.env.REACT_APP_HOST;

interface IGetDataOptions {
  filter?: {
    field: string;
    query: { opertator: string; value: number | string }[];
  }[];
  sort?: { field: string; query: SortOrder }[];
  limit?: number;
}
export function getData(options?: IGetDataOptions) {
  let query = "";
  if (options) {
    // Filter
    if (options.filter) {
      const filter = options.filter;
      filter.forEach((e) => {
        let tempQuery = "";
        e.query.forEach((e2) => {
          tempQuery = tempQuery.concat(`$${e2.opertator}${e2.value}`);
        });
        query = query.concat(`f_${e.field}=${tempQuery}&`);
      });
    }
    // Sort
    if (options.sort) {
      const sort = options.sort;
      sort.forEach((e) => {
        query = query.concat(`s_${e.field}=${e.query}&`);
      });
    }
    // Limit
    if (options.limit) {
      query = query.concat(`limit=${options.limit}&`);
    }
  }
  query = query.slice(0, -1);
  console.log(query);
  return axios.get<IData[]>(`${URI}/api/data?${query}`);
}

export function range(
  size: number,
  startAt: number = 0
): ReadonlyArray<number> {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(i + startAt);
  }
  return result;
}

export function getUnit(type: string | number) {
  switch (type) {
    case "temp":
    case 0:
      return "℃";
    case 1:
    case "humi":
      return "%";
    case "pm":
    case 2:
    case "form":
    case 3:
      return "μg/m³";
    default:
      break;
  }
}
