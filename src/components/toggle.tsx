import { useState } from "react";
import "../scss/components/toggle.scss";

interface IProps {
  size?: number;
  ratio?: number;
  onChange?: (value: boolean) => void;
}

export default function Toggle(props: IProps) {
  const size = props.size || 20;
  const ratio = props.ratio || 2.1;

  const [value, setValue] = useState(false);

  const clickHandler = () => {
    const tempValue = value ? false : true;
    setValue(tempValue);
    if (props.onChange) props.onChange(tempValue);
  };

  return (
    <div
      className={`toggle${value ? " selected" : ""}`}
      onClick={clickHandler}
      style={{
        width: `${size * ratio}px`,
        height: `${size}px`,
      }}
    >
      <div
        className="button"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: value ? `${size * ratio - size}px` : `0px`,
        }}
      ></div>
    </div>
  );
}
