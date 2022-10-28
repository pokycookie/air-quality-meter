import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IReduxStore, RSetPage } from "../redux";
import "../scss/components/navBtn.scss";

interface IProps {
  icon: IconProp;
  index: number;
}

export default function NavBtn(props: IProps) {
  const dispatch = useDispatch();
  const page = useSelector<IReduxStore, number>((state) => {
    return state.page;
  }, shallowEqual);

  const clickHandler = () => {
    dispatch(RSetPage(props.index));
  };

  return (
    <div className={`navBtn${page === props.index ? " selected" : ""}`} onClick={clickHandler}>
      <FontAwesomeIcon icon={props.icon} />
    </div>
  );
}
