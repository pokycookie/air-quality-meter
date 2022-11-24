import { SortOrder } from "mongoose";

export type TModal = JSX.Element | JSX.Element[] | null;

export interface IDB {
  _id: string;
  updated: Date;
}

export interface IData extends IDB {
  pm10: number;
  pm25: number;
  pm100: number;
  form: number;
  temp: number;
  humi: number;
}

export interface ICoord {
  x: number;
  y: number;
}

export interface IModal {
  content: TModal;
  onSubmit?: () => void;
}

export interface ITime {
  hour: number;
  minute: number;
}

export interface IRange {
  min: number;
  max: number;
}

export interface IGetDataOptions {
  filter?: IGetDataOptionsFilter[];
  sort?: IGetDataOptionsSort[];
  limit?: number;
}
export interface IGetDataOptionsFilter {
  field: string;
  query: IGetDataOptionsFilterQuery[];
}
export interface IGetDataOptionsSort {
  field: string;
  query: SortOrder;
}
export interface IGetDataOptionsFilterQuery {
  operator: string;
  value: number | string;
}
