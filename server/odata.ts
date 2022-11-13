// URI Example
// [GET] https://pknu-air-pokycookie.koyeb.app/api/data?f_temp=$lte40$gte20&f_humi=$gt0.34&s_temp=asc

interface IFilter {
  [property: string]: {
    [operator: string]: number;
  };
}
interface ISort {
  [field: string]: string;
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

export default function query(query: IQuery) {
  if (typeof query !== "object") return;

  const filter: IFilter = {};
  const sort: ISort = {};

  const list = ["temp", "humi", "pm10", "pm25", "pm100", "form", "updated"];
  setFilter(query, filter, list);
  setSort(query, sort, list);
}

function setFilter(query: IQuery, filter: IFilter, list: string[]) {
  list.forEach((field) => {
    if (query[`f_${field}`] !== undefined) {
      const splitArr = splitQuery(query[`f_${field}`]);
      splitArr.forEach((e) => {
        filter[field][e.operator] = e.value;
      });
    }
  });
}

function setSort(query: IQuery, sort: ISort, list: string[]) {
  list.forEach((field) => {
    if (query[`s_${field}`] !== undefined) {
      sort[field] = query[`f_${field}`];
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
