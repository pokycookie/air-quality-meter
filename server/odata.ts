// URI Example
// [GET] https://pknu-air-pokycookie.koyeb.app/api/data?f_temp=$lte40$gte20&f_humi=$gt0.34

interface IMongoose {
  [property: string]: {
    [operator: string]: number;
  };
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

  const filter: IMongoose = {};
  const sort: IMongoose = {};

  // filter
  const filterList = ["temp", "humi", "pm10", "pm25", "pm100", "form", "updated"];
  setFilter(query, filter, filterList);
}

function setFilter(query: IQuery, filter: IMongoose, property: string[]) {
  property.forEach((prop) => {
    if (query[`f_${prop}`] !== undefined) {
      const splitArr = splitQuery(query[`f_${prop}`]);
      splitArr.forEach((e) => {
        filter[prop][e.operator] = e.value;
      });
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
