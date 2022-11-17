import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IReduxStore, RSetModal } from "../redux";
import "../scss/layout/modal.scss";
import { IModal, TModal } from "../types";

interface IProps {
  children: TModal;
}

export default function Modal(props: IProps) {
  const dispatch = useDispatch();

  const modal = useSelector<IReduxStore, IModal>((state) => {
    return state.modal;
  }, shallowEqual);

  const closeModal = () => {
    dispatch(RSetModal({ content: null }));
  };
  const closeModalHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) closeModal();
  };
  const sumbitHandler = () => {
    if (modal.onSubmit) modal.onSubmit();
    closeModal();
  };

  return (
    <div className="modal" onClick={closeModalHandler}>
      <div className="modalWindow">
        <div className="childrenArea">{props.children}</div>
        <div className="submitArea">
          <button className="__btn" onClick={sumbitHandler}>
            적용
          </button>
          <button className="__btn" onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
