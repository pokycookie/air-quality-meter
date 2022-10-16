import axios from "axios";
import { IData } from "./types";

export default function App() {
  const axiosHandler = () => {
    axios.post<IData>("http://localhost:4000/api/upload", {
      pm10: 120,
      pm25: 150,
      pm100: 130,
      form: 0.12,
      temp: 33.25,
      humi: 12.34,
    });
  };

  return (
    <div className="App">
      <button onClick={axiosHandler}>AXIOS</button>
    </div>
  );
}
