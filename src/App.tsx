import "./scss/app.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IReduxStore, RSetWindowSize } from "./redux";
import pageSwitcher from "./pages/pageSwitcher";
import { useEffect } from "react";
import Header from "./layout/header";

export default function App() {
  const dispatch = useDispatch();
  const page = useSelector<IReduxStore, number>((state) => {
    return state.page;
  }, shallowEqual);

  const resizeHandler = () => {
    const x = window.innerWidth;
    const y = window.innerHeight;
    dispatch(RSetWindowSize({ x, y }));
  };

  useEffect(() => {
    const x = window.innerWidth;
    const y = window.innerHeight;
    dispatch(RSetWindowSize({ x, y }));

    // EventListener
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Header />
      <main>{pageSwitcher(page)}</main>
    </div>
  );
}
