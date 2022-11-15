import { useDispatch } from "react-redux";
import { RSetModal } from "../redux";
import "../scss/layout/modal.scss";
import { TModal } from "../types";

interface IProps {
  children: TModal;
}

export default function Modal(props: IProps) {
  const dispatch = useDispatch();

  const closeModalHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) dispatch(RSetModal(null));
  };

  return (
    <div className="modal" onClick={closeModalHandler}>
      <div className="modalWindow">{props.children}</div>
    </div>
  );
}
