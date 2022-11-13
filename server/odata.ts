// URI Example
// [GET] https://pknu-air-pokycookie.koyeb.app/api/data?f_temp=$lte40$gte20&f_humi=$gt0.34&s_temp=asc&s_humi=desc

import { SortOrder } from "mongoose";

interface IFilter {
  [field: string]: {
    [operator: string]: number;
  };
}
interface ISort {
  [field: string]: SortOrder;
}

interface IOperator {
  operator: string;
  value: number;
}
interface ITempOperator {
  operator?: string;
  value?: number;
}

interface IQuery {
  [keys: string]: string;
}

export default function odata(query: IQuery) {
  const filter: IFilter = {};
  const sort: ISort = {};

  if (typeof query !== "object") return { filter, sort };

  const list = ["temp", "humi", "pm10", "pm25", "pm100", "form", "updated"];
  setFilter(query, filter, list);
  setSort(query, sort, list);

  return { filter, sort };
}

function setFilter(query: IQuery, filter: IFilter, list: string[]) {
  list.forEach((field) => {
    if (query[`f_${field}`] !== undefined) {
      const splitArr = splitQuery(query[`f_${field}`]);
      const temp: { [key: string]: number } = {};
      splitArr.forEach((e) => {
        temp[e.operator] = e.value;
      });
      filter[field] = temp;
    }
  });
}

function setSort(query: IQuery, sort: ISort, list: string[]) {
  list.forEach((field) => {
    if (query[`s_${field}`] !== undefined) {
      sort[field] = query[`s_${field}`] as SortOrder;
    }
  });
}

function splitQuery(str: string) {
  // str example = $lte40$gte20
  const result: IOperator[] = [];
  const stringArr = str.split("$");
  stringArr.forEach((e) => {
    const query = getOperator(e);
    if (query.operator !== undefined && query.value !== undefined) {
      result.push(query as IOperator);
    }
  });
  return result;
}

function getOperator(str: string) {
  // str example = lte40
  const result: ITempOperator = {};
  const operatorList = ["lt", "lte", "gt", "gte", "eq", "ne"];
  operatorList.forEach((e) => {
    if (str.includes(e)) {
      const index = e.length;
      result.operator = `$${e}`;
      result.value = parseFloat(str.slice(index));
    }
  });
  return result;
}
