import "./scss/app.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IReduxStore, RSetWindowSize } from "./redux";
import pageSwitcher from "./pages/pageSwitcher";
import { useEffect } from "react";
import Header from "./layout/header";
import Modal from "./layout/modal";
import { IModal } from "./types";

export default function App() {
  const dispatch = useDispatch();

  const page = useSelector<IReduxStore, number>((state) => {
    return state.page;
  }, shallowEqual);
  const modal = useSelector<IReduxStore, IModal>((state) => {
    return state.modal;
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
      {modal.content ? <Modal>{modal.content}</Modal> : null}
    </div>
  );
}
