// URI Example
// [GET] https://pknu-air-pokycookie.koyeb.app/api/data?f_temp=$lte40$gte20&f_humi=$gt0.34&s_temp=asc&s_humi=desc

import { SortOrder } from "mongoose";

interface IFilter {
  [field: string]: {
    [operator: string]: number | Date;
  };
}
interface ISort {
  [field: string]: SortOrder;
}

interface IOperator {
  operator: string;
  value: string;
}
interface ITempOperator {
  operator?: string;
  value?: string;
}

interface IQuery {
  [keys: string]: string;
}

export default function odata(query: IQuery) {
  const filter: IFilter = {};
  const sort: ISort = {};
  let limit = 0;

  if (typeof query !== "object") return { filter, sort, limit };

  const list = ["temp", "humi", "pm10", "pm25", "pm100", "form", "updated"];
  setFilter(query, filter, list);
  setSort(query, sort, list);
  limit = setLimit(query, limit);

  return { filter, sort, limit };
}

function setFilter(query: IQuery, filter: IFilter, list: string[]) {
  list.forEach((field) => {
    if (query[`f_${field}`] !== undefined) {
      const splitArr = splitQuery(query[`f_${field}`]);
      const temp: { [key: string]: number | Date } = {};
      splitArr.forEach((e) => {
        temp[e.operator] =
          field === "updated" ? new Date(e.value) : parseFloat(e.value);
      });
      filter[field] = temp;
    }
  });
}

function setSort(query: IQuery, sort: ISort, list: string[]) {
  list.forEach((field) => {
    const sortField = query[`s_${field}`];
    if (sortField !== undefined) {
      if (sortField === "asc" || sortField === "desc")
        sort[field] = sortField as SortOrder;
    }
  });
}

function setLimit(query: IQuery, limit: number) {
  if (query.limit !== undefined) {
    const result = query.limit;
    try {
      return parseInt(result);
    } catch (error) {
      return 0;
    }
  } else {
    return 0;
  }
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
      result.value = str.slice(index);
    }
  });
  return result;
}
