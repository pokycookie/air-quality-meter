import axios from "axios";
import { IData } from "./types";

const URI = process.env.NODE_ENV === "development" ? "http://localhost:4000" : process.env.HOST;

export function getData() {
  return axios.get<IData[]>(`${URI}/api/data`);
}
