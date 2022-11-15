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
