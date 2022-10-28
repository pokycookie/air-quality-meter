import axios from "axios";
import { IData } from "./types";
import "./scss/app.scss";
import TileArea from "./layout/tileArea";
import Nav from "./layout/nav";

export default function App() {
  const axiosHandler = () => {
    axios
      .get<IData[]>("http://localhost:4000/api/data")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    // axios.post<IData>("http://localhost:4000/api/data", {
    //   pm10: 120,
    //   pm25: 150,
    //   pm100: 130,
    //   form: 0.12,
    //   temp: 33.25,
    //   humi: 12.34,
    // });
  };

  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <TileArea />
      </main>
    </div>
  );
}
