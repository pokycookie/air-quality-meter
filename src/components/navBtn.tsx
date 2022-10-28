import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/components/navBtn.scss";

interface IProps {
  icon: IconProp;
  selected?: boolean;
}

export default function NavBtn(props: IProps) {
  return (
    <div className={`navBtn${props.selected ? " selected" : ""}`}>
      <FontAwesomeIcon icon={props.icon} />
    </div>
  );
}
