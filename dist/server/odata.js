"use strict";
// URI Example
// [GET] https://pknu-air-pokycookie.koyeb.app/api/data?f_temp=$lte40$gte20&f_humi=$gt0.34&s_temp=asc&s_humi=desc
Object.defineProperty(exports, "__esModule", { value: true });
function odata(query) {
    const filter = {};
    const sort = {};
    if (typeof query !== "object")
        return { filter, sort };
    const list = ["temp", "humi", "pm10", "pm25", "pm100", "form", "updated"];
    setFilter(query, filter, list);
    setSort(query, sort, list);
    return { filter, sort };
}
exports.default = odata;
function setFilter(query, filter, list) {
    list.forEach((field) => {
        if (query[`f_${field}`] !== undefined) {
            const splitArr = splitQuery(query[`f_${field}`]);
            const temp = {};
            splitArr.forEach((e) => {
                temp[e.operator] = e.value;
            });
            filter[field] = temp;
        }
    });
}
function setSort(query, sort, list) {
    list.forEach((field) => {
        if (query[`s_${field}`] !== undefined) {
            sort[field] = query[`s_${field}`];
        }
    });
}
function splitQuery(str) {
    // str example = $lte40$gte20
    const result = [];
    const stringArr = str.split("$");
    stringArr.forEach((e) => {
        const query = getOperator(e);
        if (query.operator !== undefined && query.value !== undefined) {
            result.push(query);
        }
    });
    return result;
}
function getOperator(str) {
    // str example = lte40
    const result = {};
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
